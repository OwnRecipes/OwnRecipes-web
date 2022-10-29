import { useEffect, useRef, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import NavigationPrompt from './NavigationPrompt';
import Toast from './Toast';

interface IFormStatusProps {
  dirty: boolean;
  submitting: boolean;
  submitSucceeded: boolean;

  onSubmitSuccess?: () => void;
}

const FormStatus: React.FC<IFormStatusProps> = ({
  dirty, submitting, submitSucceeded, onSubmitSuccess }: IFormStatusProps) => (
    <>
      <NavigationPrompt isDirty={dirty} />
      <SubmitSuccess submitting={submitting} succeeded={submitSucceeded} onSubmitSuccess={onSubmitSuccess} />
    </>
);

interface ISubmitSuccessProps {
  submitting: boolean;
  succeeded: boolean;

  onSubmitSuccess?: () => void;
}

const SubmitSuccess: React.FC<ISubmitSuccessProps> = ({ submitting, succeeded, onSubmitSuccess }: ISubmitSuccessProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    save_success: {
      id: 'status.save_success',
      description: 'Toast for successfully saved form.',
      defaultMessage: 'Changes saved.',
    },
  });

  const prevSubmitting = useRef<boolean>(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (prevSubmitting.current === true && submitting === false && succeeded) {
      setShowSaveSuccess(true);
      onSubmitSuccess?.();
    }

    prevSubmitting.current = submitting;
  }, [submitting, succeeded]);

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

export default FormStatus;
