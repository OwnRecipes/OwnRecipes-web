import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import '../css/form_errors.css';

import { ValidationError } from '../store/Validation';
import Alert from './Alert';
import NavigationPrompt from './NavigationPrompt';
import P from './P';
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

interface IFormErrorRowErrorProps {
  name: string;
  err: ValidationError;
}

const FormErrorRowError: React.FC<IFormErrorRowErrorProps> = ({ name, err }: IFormErrorRowErrorProps) => {
  const label = document.querySelector(`[data-api-field="${name}"] > label`)?.textContent ?? name;

  const messages: Array<string> = [];
  if (Array.isArray(err)) {
    messages.push(...(err.map(errr => errr.message)));
  } else {
    messages.push(err.message);
  }

  return (
    <tr>
      <td>{label}</td>
      <td>{messages.join('. ')}</td>
    </tr>
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
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    form_errors_title: {
      id: 'status.form_errors_title',
      description: 'Title for the form error box.',
      defaultMessage: 'The form contains an error.',
    },
    form_errors_alert: {
      id: 'status.form_errors_alert',
      description: 'Alert text for the form error box.',
      defaultMessage: 'Please fix the described error(s) and continue.',
    },
    form_errors_table_heading_error: {
      id: 'status.form_errors_table_heading_error',
      description: 'The form-errors will be displayed as table, with an error column. This is the column\'s title.',
      defaultMessage: 'Error',
    },
    form_errors_table_heading_message: {
      id: 'status.form_errors_table_heading_message',
      description: 'The form-errors will be displayed as table, with a message column. This is the column\'s title.',
      defaultMessage: 'Message',
    },
  });

  const visibleErrors = useMemo(() => (
    errors != null ? getVisibleErrors(errors) : undefined
  ), [errors]);

  const errorTableRowsJsx = useMemo(() => {
    if (visibleErrors == null || Object.keys(visibleErrors).length === 0) return [];
    const res: Array<React.ReactNode> = [];
    Object.keys(visibleErrors).forEach(key => {
      const nextErr = visibleErrors[key];
      res.push(<FormErrorRowError key={key} name={key} err={nextErr} />);
    });
    return res;
  }, [visibleErrors]);

  if (visibleErrors == null || Object.keys(visibleErrors).length === 0) return null;

  // console.log(`[FormErrors] ${JSON.stringify(visibleErrors)}`);

  const errorTableJsx = (
    <table>
      <thead>
        <tr>
          <th>{formatMessage(messages.form_errors_table_heading_error)}</th>
          <th>{formatMessage(messages.form_errors_table_heading_message)}</th>
        </tr>
      </thead>
      <tbody>
        {errorTableRowsJsx}
      </tbody>
    </table>
  );

  return (
    <Alert
        severity = 'danger'
        className = 'form-errors'
        title = {formatMessage(messages.form_errors_title)}>
      {errorTableJsx}
      <P className='alert-post-message'>{formatMessage(messages.form_errors_alert)}</P>
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
  const { formatMessage } = useIntl();
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

  const handleCloseSaveSuccessToast = useCallback(() => {
    setShowSaveSuccess(false);
  }, []);

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
