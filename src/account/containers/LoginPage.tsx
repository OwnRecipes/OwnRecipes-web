import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Modal } from 'react-bootstrap';

import '../../common/css/modal.css';

import * as AuthActions from '../store/actions';
import { useDispatch } from '../../common/store/redux';
import LoginForm from '../components/LoginForm';
import PageWrapper from '../../common/components/PageWrapper';
import SignUpInfo from '../components/SignUpInfo';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const handleLogin = useCallback(async (username: string, password: string) => AuthActions.getToken(dispatch, username, password), [dispatch]);

  return (
    <PageWrapper title={intl.messages['nav.login.title'] as string}>
      <Modal.Dialog className='form-signin'>
        <Modal.Header className='form-header'>
          <h1>OwnRecipes</h1>
        </Modal.Header>

        <Modal.Body>
          <LoginForm onSubmit={handleLogin} />
          <hr />
          <SignUpInfo />
        </Modal.Body>
      </Modal.Dialog>
    </PageWrapper>
  );
};

export default LoginPage;
