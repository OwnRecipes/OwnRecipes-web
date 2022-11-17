import { useEffect, useMemo, useRef, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import '../css/form_errors.css';

import { ValidationError } from '../store/Validation';
import Alert from './Alert';
import NavigationPrompt from './NavigationPrompt';
import Toast from './Toast';

interface IFormStatusProps {
  dirty: boolean;
  submitting: boolean;
  errors: Record<string, ValidationError> | undefined;

  onSubmitSuccess?: () => void;
}

const FormStatus: React.FC<IFormStatusProps> = ({
    // eslint-disable-next-line arrow-body-style
    dirty, submitting, errors, onSubmitSuccess }: IFormStatusProps) => {
  // console.log(`[FormStatus] dirty=${dirty}, submitting=${submitting}, errors=${JSON.stringify(errors)}`);
  return (
    <>
      <NavigationPrompt isDirty={dirty} />
      <FormErrors errors={errors} />
      <SubmitSuccess dirty={dirty} submitting={submitting} onSubmitSuccess={onSubmitSuccess} errors={errors} />
    </>
  );
};

function getVisibleErrors(errors: Record<string, ValidationError>): Record<string, ValidationError> {
  const visibleErrorsArray = Object.entries(errors).filter(([key]) => !key.startsWith('_'));
  return Object.fromEntries(visibleErrorsArray);
}

interface IFormErrorsProps {
  errors: Record<string, ValidationError> | undefined;
}

const FormErrors: React.FC<IFormErrorsProps> = ({ errors }: IFormErrorsProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const messages = defineMessages({
    form_errors_title: {
      id: 'status.form_errors_title',
      description: 'Title for the form error box.',
      defaultMessage: 'The form contains an error.',
    },
    form_errors_alert: {
      id: 'status.form_errors_alert',
      description: 'Alert text for the form error box.',
      defaultMessage: 'Please fix the error(s).',
    },
  });

  if (!errors || Object.keys(errors).length === 0) return null;
  const visibleErrors = useMemo(() => getVisibleErrors(errors), [errors]);
  if (Object.keys(visibleErrors).length === 0) return null;
  // console.log(`[FormErrors] ${JSON.stringify(visibleErrors)}`);

  return (
    <Alert
        severity = 'danger'
        className = 'form-errors'
        title = {formatMessage(messages.form_errors_title)}>
      {JSON.stringify(visibleErrors)}
    </Alert>
  );
};

interface ISubmitSuccessProps {
  dirty: boolean;
  submitting: boolean;
  errors: Record<string, ValidationError> | undefined;

  onSubmitSuccess?: () => void;
}

const SubmitSuccess: React.FC<ISubmitSuccessProps> = ({ dirty, submitting, errors, onSubmitSuccess }: ISubmitSuccessProps) => {
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
    if (prevSubmitting.current === true && submitting === false && errors == null) {
      setShowSaveSuccess(true);
      onSubmitSuccess?.();
    }

    prevSubmitting.current = submitting;
  }, [submitting]);

  useEffect(() => {
    if (dirty && showSaveSuccess) {
      setShowSaveSuccess(false);
    }
  }, [dirty]);

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
