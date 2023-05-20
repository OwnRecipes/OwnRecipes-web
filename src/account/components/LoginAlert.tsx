import { defineMessages, useIntl } from 'react-intl';

import Alert from '../../common/components/Alert';

const messages = defineMessages({
  errorTitle: {
    id: 'login.alert.error_title',
    description: 'Fail to login header',
    defaultMessage: 'Login failed',
  },
  errorMessage: {
    id: 'login.alert.incorrect_credentials',
    description: 'Fail to login message',
    defaultMessage: 'Incorrect username or password.',
  },
});

export interface ILoginAlert {
  submitError: boolean;
}

const LoginAlert: React.FC<ILoginAlert> = ({ submitError }: ILoginAlert) => {
  const { formatMessage } = useIntl();

  if (!submitError) return null;

  return (
    <Alert severity='danger' title={formatMessage(messages.errorTitle)}>
      {formatMessage(messages.errorMessage)}
    </Alert>
  );
};

export default LoginAlert;
