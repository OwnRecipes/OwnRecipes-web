import jwtDecode, { JwtPayload } from 'jwt-decode';
import moment from 'moment';

import { handleFormError, refreshToken, request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { AccountActionTypes, ACCOUNT_STORE, AccountDispatch, ACCOUNT_TOKEN_STORAGE_KEY, UserAccount, LoginDto, toUserAccount } from './types';
import { ACTION } from '../../common/store/ReduxHelper';
import LocalStorageHelper from '../../common/LocalStorageHelper';
import { AnyDispatch, toBasicAction } from '../../common/store/redux';

export const getToken = async (dispatch: AnyDispatch, username: string, pass: string, remember: boolean) => {
  dispatch({ ...toBasicAction(ACCOUNT_STORE, ACTION.UPDATE_START) });

  const url = serverURLs.auth_token;
  return request()
    .post(url)
    .send({ username: username, password: pass })
    .then(res => {
      const data: LoginDto = res.body;
      dispatch({ ...toBasicAction(ACCOUNT_STORE, AccountActionTypes.LOGIN), payload: toUserAccount(data, remember) });
      return null;
    })
    .catch(err => handleFormError(dispatch, err, ACCOUNT_STORE));
};

export const tryAutoLogin = () => (dispatch: AccountDispatch) => {
  const storageItem = LocalStorageHelper.getItem(ACCOUNT_TOKEN_STORAGE_KEY);
  if (storageItem == null) {
    return;
  }

  const user: UserAccount = JSON.parse(storageItem);
  if (!user.remember) {
    dispatch({ ...toBasicAction(ACCOUNT_STORE, AccountActionTypes.FORGET_LOGIN) });
    return;
  }

  dispatch({ ...toBasicAction(ACCOUNT_STORE, ACTION.GET_START) });
  const decodedToken: JwtPayload | undefined = user.token ? jwtDecode<JwtPayload>(user.token) : undefined;

  if (user.token != null && decodedToken != null) {
    if (decodedToken.exp != null && (moment(new Date()).add(2, 'days') > moment.unix(decodedToken.exp))) {
      refreshToken.instance(user.token, user.remember);
    } else {
      dispatch({ ...toBasicAction(ACCOUNT_STORE, AccountActionTypes.LOGIN), payload: user });
    }
  } else {
    dispatch({ ...toBasicAction(ACCOUNT_STORE, ACTION.SOFT_RESET) });
  }
};

export const forgetLogin = () => (dispatch: AccountDispatch) => {
  dispatch({ ...toBasicAction(ACCOUNT_STORE, AccountActionTypes.FORGET_LOGIN) });
};

export const logUserOut = () => (dispatch: AccountDispatch) => {
  dispatch({ ...toBasicAction(ACCOUNT_STORE, AccountActionTypes.LOGOUT) });
};
