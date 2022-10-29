import { useMemo } from 'react';
import { Button, Form } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';
import { Form as ReduxForm, FormSpy } from 'react-final-form';

import '../css/login.css';

import Icon from '../../common/components/Icon';
import LoginAlert from './LoginAlert';
import InitialValuesResetter from '../../common/components/ReduxForm/ReInitialValuesResetter';
import ReInput from '../../common/components/ReduxForm/ReInput';

export interface ILoginFormProps {
  onLogin: (username: string, password: string) => void;
}

type LoginFormData = {
  username: string;
  password: string;
}

const LoginForm: React.FC<ILoginFormProps> = ({ onLogin }: ILoginFormProps) => {
  const intl = useIntl();

  const { formatMessage } = intl;
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
    sign_in: {
      id: 'login.sign_in',
      description: 'Sign in button',
      defaultMessage: 'Sign in',
    },
  });

  const handleSubmit = (form: LoginFormData) => onLogin(form.username, form.password);

  const initialValues = useMemo(() => ({}), []);

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
