import { useEffect, useRef, useState } from 'react';
import { FormSpy } from 'react-final-form';
import { defineMessages, useIntl } from 'react-intl';
import NavigationPrompt from '../../common/components/NavigationPrompt';

import Toast from '../../common/components/Toast';

// eslint-disable-next-line arrow-body-style
const Status: React.FC = () => {
  return (
    <FormSpy subscription={{ submitting: true, submitSucceeded: true, dirty: true }}>
      {({ submitting, submitSucceeded, dirty }) => (
        <>
          <NavigationPrompt isDirty={dirty} />
          <SubmitSuccess pending={submitting} succeeded={submitSucceeded} />
        </>
      )}
    </FormSpy>
  );
};

interface ISubmitSuccessProps {
  pending: boolean;
  succeeded: boolean;
}

const SubmitSuccess: React.FC<ISubmitSuccessProps> = ({ pending, succeeded }: ISubmitSuccessProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    save_success: {
      id: 'status.save_success',
      description: 'Toast for successfully saved form.',
      defaultMessage: 'Changes saved.',
    },
  });

  const prevPending = useRef<boolean>(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (prevPending.current === true && pending === false && succeeded) {
      setShowSaveSuccess(true);
    }

    prevPending.current = pending;
  }, [pending, succeeded]);

  const handleCloseSaveSuccessToast = () => {
    setShowSaveSuccess(false);
  };

  return (
    <Toast
        show = {showSaveSuccess}
        variant = 'success'
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        onClose = {handleCloseSaveSuccessToast}>
      {formatMessage(messages.save_success)}
    </Toast>
  );
};

export default Status;
