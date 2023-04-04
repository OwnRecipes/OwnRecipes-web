import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Modal } from 'react-bootstrap';
import classNames from 'classnames';

import '../../common/css/modal.css';
import '../css/login.css';

import * as AuthActions from '../store/actions';
import { useDispatch, useSelector } from '../../common/store/redux';
import { PendingState } from '../../common/store/GenericReducerType';
import PageWrapper from '../../common/components/PageWrapper';
import LoginForm from '../components/LoginForm';
import SignUpInfo from '../components/SignUpInfo';
import { RootState } from '../../app/Store';
import PageSpinner from '../../app/components/PageSpinner';

const LoginPage: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const accountMeta = useSelector((state: RootState) => state.account.meta);

  const handleLogin = useCallback(async (username: string, password: string, remember: boolean) => (
    AuthActions.getToken(dispatch, username, password, remember)
  ), [dispatch]);

  return (
    <PageWrapper title={intl.messages['nav.login.title'] as string}>
      <Modal.Dialog className='form-signin'>
        <Modal.Header className='form-header'>
          <h1>OwnRecipes</h1>
        </Modal.Header>
        <Modal.Body>
          <>
            <div className={classNames('login-form-wrapper', { autologin: [PendingState.LOADING].includes(accountMeta.pending) })}>
              <LoginForm onSubmit={handleLogin} />
              <hr />
              <SignUpInfo />
            </div>
            {[PendingState.LOADING].includes(accountMeta.pending) && (
              <PageSpinner />
            )}
          </>
        </Modal.Body>
      </Modal.Dialog>
    </PageWrapper>
  );
};

export default LoginPage;
