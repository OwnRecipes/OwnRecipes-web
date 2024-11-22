import { useCallback, useMemo } from 'react';
import { Button, Form } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';
import { Form as ReduxForm, FormSpy } from 'react-final-form';

import '../css/login.css';

import Icon from '../../common/components/Icon';
import InitialValuesResetter from '../../common/components/ReInput/ReInitialValuesResetter';
import ReInput from '../../common/components/ReInput/ReInput';
import ReCheckbox from '../../common/components/ReInput/ReCheckbox';
import { ValidationResult } from '../../common/store/Validation';
import LoginAlert from './LoginAlert';

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
  logout: {
    id: 'login.logout',
    description: 'Sign out button',
    defaultMessage: 'Sign out',
  },
});

export interface ILoginFormProps {
  username?: string;
  onSubmit: (username: string, password: string, remember: boolean) => Promise<ValidationResult>;
  onLogout?: () => void;
}

interface LoginFormData {
  username: string;
  password: string;
  remember: boolean;
}

const LoginForm: React.FC<ILoginFormProps> = ({ username, onSubmit, onLogout }: ILoginFormProps) => {
  const { formatMessage } = useIntl();

  const handleSubmit = useCallback(async (form: LoginFormData) => onSubmit(form.username, form.password, form.remember), [onSubmit]);

  const initialValues = useMemo(() => ({ username: username, remember: true }), [username]);

  return (
    <ReduxForm
        initialValues = {initialValues}
        onSubmit = {handleSubmit}
        subscription = {{}}
        render = {({ form, handleSubmit: renderSubmit }) => (
          <Form className='form-signin' onSubmit={renderSubmit}>
            <InitialValuesResetter form={form} initialValues={initialValues} />
            <FormSpy subscription={{ submitErrors: true }}>
              {({ submitErrors }) => (
                <LoginAlert submitError={submitErrors != null} />
              )}
            </FormSpy>

            <h2 className='form-signin-heading'>{formatMessage(messages.please_sign_in)}</h2>
            <ReInput
                name  = 'username'
                placeholder = {formatMessage(messages.username)}
                autoComplete = 'username'
                required
                readOnly = {Boolean(username)}
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
            {username && (
              <Button variant='outline-secondary' style={{ marginTop: '1em' }} onClick={onLogout}>
                {formatMessage(messages.logout)}
              </Button>
            )}
          </Form>
    )} />
  );
};

export default LoginForm;
