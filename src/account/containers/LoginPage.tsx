import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Modal } from 'react-bootstrap';

import '../../common/css/modal.css';
import '../css/login.css';

import * as AuthActions from '../store/actions';
import { useDispatch, useSelector } from '../../common/store/redux';
import LoginForm from '../components/LoginForm';
import PageWrapper from '../../common/components/PageWrapper';
import SignUpInfo from '../components/SignUpInfo';
import { CombinedStore } from '../../app/Store';
import PageSpinner from '../../app/components/PageSpinner';
import { PendingState } from '../../common/store/GenericReducerType';
import classNames from 'classnames';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const accountMeta = useSelector((state: CombinedStore) => state.account.meta);

  const handleLogin = useCallback(async (username: string, password: string) => AuthActions.getToken(dispatch, username, password), [dispatch]);

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
