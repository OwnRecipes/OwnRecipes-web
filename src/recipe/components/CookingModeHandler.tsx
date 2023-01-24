import { useCallback, useContext, useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import '../css/recipe_header.css';

import { useWakeLock } from '../../common/hooks/useWakeLock';
import usePageVisibility from '../../common/components/pageVisibility/usePageVisibility';

import Toast from '../../common/components/Toast';
import Modal from '../../common/components/Modal';
import CookingModeContext from '../context/CookingModeContext';

const CookingModeHandler: React.FC = () => {
  const intl = useIntl();
  const { formatMessage } = intl;

  const messages = defineMessages({
    activated_cooking_mode_toast: {
      id: 'recipe.activated_cooking_mode_toast',
      description: 'Toast displayed when activating the cooking mode button',
      defaultMessage: 'Your display will stay awake now.\nHappy cooking!',
    },
    still_cooking_modal_title: {
      id: 'recipe.still_cooking_modal_title',
      description: 'Title of the modal to ask to continue keeping the display awake.',
      defaultMessage: 'Still cooking?',
    },
    still_cooking_modal_text: {
      id: 'recipe.still_cooking_modal_text',
      description: 'Body text of the modal to ask to continue keeping the display awake.',
      defaultMessage: 'Do you want to continue keeping the display awake?',
    },
    still_cooking_modal_yes: {
      id: 'recipe.still_cooking_modal_yes',
      description: 'Yes button.',
      defaultMessage: 'Yes',
    },
    still_cooking_modal_no: {
      id: 'recipe.still_cooking_modal_no',
      description: 'no button.',
      defaultMessage: 'No',
    },
  });

  const cookingModeContext = useContext(CookingModeContext);
  const isCookingMode = cookingModeContext?.cookingMode ?? false;

  let timer: NodeJS.Timeout | undefined;

  const [showCookingModeToast, setShowCookingModeToast] = useState<boolean>(false);
  const [askIfStillActive, setAskIfStillActive] = useState<boolean>(false);

  const { isSupported, request, release, released } = useWakeLock();

  const isPageVisible = usePageVisibility();
  useEffect(() => {
    if (!isSupported || !isCookingMode) return;

    if (!isPageVisible) {
      if (released === false) {
        release();
      }
    } else {
      request();
    }
  }, [isPageVisible]);

  useEffect(() => {
    if (!isCookingMode) {
      clearTimer();
      if (released === false) {
        release();
      }
    } else if (isSupported) {
      request()
        .then(() => {
          renewTimer();
          setTimeout(() => {
            setShowCookingModeToast(true);
          }, 1);
        });
    }
  }, [isCookingMode]);

  // componentWillUnmount
  useEffect(() => () => {
    clearTimer(false);
    if (released === false) {
      release();
    }
  }, []);

  const pauseLock = () => {
    release();
    setAskIfStillActive(true);
  };

  const renewTimer = () => {
    clearTimer();
    timer = setTimeout(() => {
      pauseLock();
    }, 1000 * 60 * 30);
  };

  const clearTimer = (resetState = true) => {
    if (resetState) {
      setShowCookingModeToast(false);
      setAskIfStillActive(false);
    }
    if (timer != null) {
      clearTimeout(timer);
    }
  };

  const handleStillActive = useCallback(() => {
    request()
      .then(() => {
        renewTimer();
      });
  }, [request, renewTimer]);

  const handleNotActiveAnymore = useCallback((autoClose: boolean) => {
    if (!autoClose) {
      cookingModeContext?.setCookingMode(false);
    }
  }, [cookingModeContext?.setCookingMode]);

  return (
    <>
      <Toast
          show = {isCookingMode && showCookingModeToast}
          autoHide = {10000}
          anchorOrigin = {{ horizontal: 'center', vertical: 'bottom' }}
          onClose = {() => setShowCookingModeToast(false)}>
        {formatMessage(messages.activated_cooking_mode_toast)}
      </Toast>

      <Modal
          show = {askIfStillActive}
          title = {formatMessage(messages.still_cooking_modal_title)}
          acceptTitle = {formatMessage(messages.still_cooking_modal_yes)}
          closeTitle = {formatMessage(messages.still_cooking_modal_no)}
          onAccept = {handleStillActive}
          onClose = {handleNotActiveAnymore}>
        {formatMessage(messages.still_cooking_modal_text)}
      </Modal>
    </>
  );
};

export default CookingModeHandler;
