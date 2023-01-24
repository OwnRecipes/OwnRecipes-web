import { defineMessages, useIntl } from 'react-intl';

import P from '../../common/components/P';

const SignUpInfo: React.FC = () => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    sign_up_info: {
      id: 'login.sign_up_info',
      description: 'Info that the sign up is handled by the admin.',
      defaultMessage: 'Not signed up, yet? OwnRecipes is a private instance. Kindly ask the administrator to sign up an account for you.',
    },
  });

  return (
    <P variant='body2'>
      {formatMessage(messages.sign_up_info)}
    </P>
  );
};

export default SignUpInfo;
