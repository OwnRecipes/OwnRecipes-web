import { useEffect, useRef, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { CombinedStore } from '../../app/Store';
import NavigationPrompt from '../../common/components/NavigationPrompt';

import Toast from '../../common/components/Toast';
import { PendingState } from '../../common/store/GenericReducerType';

const Status: React.FC = () => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    save_success: {
      id: 'status.save_success',
      description: 'Toast for successfully saved form.',
      defaultMessage: 'Changes saved.',
    },
  });

  const isDirty = useSelector((state: CombinedStore) => state.recipeForm.meta.dirty);
  const pending = useSelector((state: CombinedStore) => state.recipeForm.meta.pending);
  const prevPending = useRef<PendingState>();
  const [showSaveSuccess, setShowSaveSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (prevPending.current === PendingState.SAVING && pending === PendingState.COMPLETED) {
      setShowSaveSuccess(true);
    }

    prevPending.current = pending;
  }, [pending]);

  const handleCloseSaveSuccessToast = () => {
    setShowSaveSuccess(false);
  };

  return (
    <>
      <NavigationPrompt isDirty={isDirty} />
      <Toast
          show = {showSaveSuccess}
          variant = 'success'
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          onClose = {handleCloseSaveSuccessToast}>
        {formatMessage(messages.save_success)}
      </Toast>
    </>
  );
};

export default Status;
