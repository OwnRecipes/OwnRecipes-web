import { useContext, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import AuthContext from '../context/AuthContext';
import Modal from '../../common/components/Modal';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import { clearToken, getToken } from '../../common/CustomSuperagent';
import { useDispatch } from '../../common/store/redux';
import { logUserOut } from '../store/actions';

const messages = defineMessages({
  logout: {
    id: 'logout.title',
    description: 'Title for the logout modal',
    defaultMessage: 'Logging out',
  },
});

const LogoutModal: React.FC = () => {
  const intl = useIntl();
  const { formatMessage } = intl;

  const authContext = useContext(AuthContext);

  return (
    <Modal
        show = {authContext.isForceLogout}
        title = {formatMessage(messages.logout)}
        noCloseButton>
      {authContext.isForceLogout && <LogoutModalFC />}
    </Modal>
  );
};

const LogoutModalFC: React.FC = () => {
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext.isLoggingOut) return;
    authContext.setLoggingOut();

    const account = getToken();
    if (!account) {
      clearToken();
    }

    logUserOut(dispatch, account?.refresh);
  }, [authContext]);

  return (
    <LoadingSpinner style={{ color: 'var(--primaryMain)', marginLeft: 'auto', marginRight: 'auto', height: '2rem', width: '2rem' }} />
  );
};

export default LogoutModal;
