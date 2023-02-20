import { useCallback, useMemo } from 'react';
import { Button, Form } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';
import { Form as ReduxForm, FormSpy } from 'react-final-form';

import '../css/login.css';

import Icon from '../../common/components/Icon';
import InitialValuesResetter from '../../common/components/ReduxForm/ReInitialValuesResetter';
import ReInput from '../../common/components/ReduxForm/ReInput';
import ReCheckbox from '../../common/components/ReduxForm/ReCheckbox';
import { ValidationResult } from '../../common/store/Validation';
import LoginAlert from './LoginAlert';

export interface ILoginFormProps {
  onSubmit: (username: string, password: string, remember: boolean) => Promise<ValidationResult>;
}

interface LoginFormData {
  username: string;
  password: string;
  remember: boolean;
}

const LoginForm: React.FC<ILoginFormProps> = ({ onSubmit }: ILoginFormProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    please_sign_in: {
      id: 'login.please_sign_in',
      description: 'Please sign in header',
      defaultMessage: 'Sign In',
    },
    username: {
      id: 'login.username',
      description: 'Username placeholder',
      defaultMessage: 'Username',
    },
    password: {
      id: 'login.password',
      description: 'Password placeholder',
      defaultMessage: 'Password',
    },
    remember: {
      id: 'login.remember',
      description: 'Remember checkbox',
      defaultMessage: 'Remember me for 14 days',
    },
    sign_in: {
      id: 'login.sign_in',
      description: 'Sign in button',
      defaultMessage: 'Sign in',
    },
  });

  const handleSubmit = useCallback(async (form: LoginFormData) => onSubmit(form.username, form.password, form.remember), [onSubmit]);

  const initialValues = useMemo(() => ({ remember: true }), []);

  return (
    <ReduxForm
        initialValues = {initialValues}
        onSubmit = {handleSubmit}
        subscription = {{}}
        render = {({ form, handleSubmit: renderSubmit }) => (
          <Form className='form-signin' onSubmit={renderSubmit}>
            <InitialValuesResetter form={form} initialValues={initialValues} />
            <FormSpy subscription={{ submitError: true }}>
              {({ submitError }) => (
                <LoginAlert submitError={submitError} />
              )}
            </FormSpy>

            <h2 className='form-signin-heading'>{formatMessage(messages.please_sign_in)}</h2>
            <ReInput
                name  = 'username'
                placeholder = {formatMessage(messages.username)}
                autoComplete = 'username'
                required
                inputAdornmentStart = {<Icon icon='person' size='2x' />} />
            <ReInput
                name  = 'password'
                type  = 'password'
                placeholder = {formatMessage(messages.password)}
                autoComplete = 'password'
                required
                inputAdornmentStart = {<Icon icon='key' size='2x' />} />

            <ReCheckbox
                name  = 'remember'
                label = {formatMessage(messages.remember)} />

            <FormSpy subscription={{ submitting: true }}>
              {({ submitting }) => (
                <Button variant='primary' type='submit' disabled={submitting}>
                  {formatMessage(messages.sign_in)}
                </Button>
              )}
            </FormSpy>
          </Form>
    )} />
  );
};

export default LoginForm;
