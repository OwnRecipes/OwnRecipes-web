import { useCallback, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import classNames from 'classnames';

import '../../common/css/modal.css';
import '../css/login.css';

import LoginForm from '../components/LoginForm';
import AuthContext from '../context/AuthContext';
import PageSpinner from '../../app/components/PageSpinner';
import * as AuthActions from '../store/actions';
import { RootState } from '../../app/Store';
import { useDispatch, useSelector } from '../../common/store/redux';
import { PendingState } from '../../common/store/GenericReducerType';

const LoginModal: React.FC = () => {
  const dispatch = useDispatch();

  const authContext = useContext(AuthContext);

  const accountMeta = useSelector((state: RootState) => state.account.meta);
  const tokenValid  = useSelector((state: RootState) => state.account.valid);
  const token       = useSelector((state: RootState) => state.account.item);

  const handleLogin = useCallback(async (username: string, password: string, remember: boolean) => (
    AuthActions.getToken(dispatch, username, password, remember)
  ), []);

  const handleLogout = useCallback(() => {
    authContext.forceLogout();
  }, []);

  return (
    <Modal
        show = {token && tokenValid === false}
        title = 'OwnRecipes'
        noCloseButton
        className='form-signin'>
      <Modal.Header className='form-header'>
        <h1>OwnRecipes</h1>
      </Modal.Header>
      <Modal.Body>
        <>
          <div className={classNames('login-form-wrapper', { autologin: accountMeta.pending === PendingState.LOADING })}>
            <LoginForm username={token?.username} onSubmit={handleLogin} onLogout={handleLogout} />
          </div>
          {accountMeta.pending === PendingState.LOADING && (
            <PageSpinner />
          )}
        </>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
