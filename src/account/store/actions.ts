import jwtDecode, { JwtPayload } from 'jwt-decode';
import moment from 'moment';

import { refreshToken, request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { ACTION } from '../../common/store/ReduxHelper';
import LocalStorageHelper from '../../common/LocalStorageHelper';
import { AnyDispatch, toBasicAction } from '../../common/store/redux';
import { handleFormError } from '../../common/requestUtils';
import { AccountActionTypes, ACCOUNT_STORE, AccountDispatch, ACCOUNT_TOKEN_STORAGE_KEY, UserAccount, LoginDto, toUserAccount, AccountAction } from './types';

export function shouldForceReLogin(refresh: string): boolean {
  const decodedToken: JwtPayload = jwtDecode<JwtPayload>(refresh);
  return decodedToken.exp == null
      || (moment(new Date()).add(1, 'day') > moment.unix(decodedToken.exp));
}

export function shouldRefreshToken(token: string | undefined): boolean {
  const decodedToken: JwtPayload | undefined = token ? jwtDecode<JwtPayload>(token) : undefined;
  return decodedToken != null && decodedToken.exp != null
      && (moment(new Date()).add(2, 'minutes') > moment.unix(decodedToken.exp));
}

export const getToken = async (dispatch: AnyDispatch, username: string, pass: string, remember: boolean) => {
  dispatch({ ...toBasicAction(ACCOUNT_STORE, ACTION.UPDATE_START) });

  const url = serverURLs.auth_token;
  return request
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
  if (!user.remember || !user.refresh || shouldForceReLogin(user.refresh)) {
    dispatch({ ...toBasicAction(ACCOUNT_STORE, AccountActionTypes.FORGET_LOGIN) });
    return;
  }

  dispatch({ ...toBasicAction(ACCOUNT_STORE, ACTION.GET_START) });

  if (user.token) {
    if (shouldRefreshToken(user.token)) {
      refreshToken.instance(user.remember);
    } else {
      dispatch({ ...toBasicAction(ACCOUNT_STORE, AccountActionTypes.LOGIN), payload: user });
    }
  } else {
    dispatch({ ...toBasicAction(ACCOUNT_STORE, ACTION.SOFT_RESET) });
  }
};

export const tryRefresh = () => (dispatch: AccountDispatch) => {
  const storageItem = LocalStorageHelper.getItem(ACCOUNT_TOKEN_STORAGE_KEY);
  if (storageItem == null) {
    return;
  }

  const user: UserAccount = JSON.parse(storageItem);
  if (!user.remember || !user.token) {
    return;
  }

  const decodedToken: JwtPayload | undefined = jwtDecode<JwtPayload>(user.token);
  if (decodedToken.exp && decodedToken.exp <= moment().unix()) {
    dispatch({ ...toBasicAction(ACCOUNT_STORE, AccountActionTypes.FORGET_LOGIN) });
  } else if (shouldRefreshToken(user.token)) {
    refreshToken.instance(user.remember);
  } else {
    dispatch({ ...toBasicAction(ACCOUNT_STORE, AccountActionTypes.LOGIN), payload: user });
  }
};

const authSideloadToken = (user: UserAccount): AccountAction => ({
  ...toBasicAction(ACCOUNT_STORE, AccountActionTypes.SIDELOAD_TOKEN), payload: { ...user },
});

export const sideloadToken = (user: UserAccount) => (dispatch: AccountDispatch) => {
  dispatch(authSideloadToken(user));
};

export const forgetLogin = () => (dispatch: AccountDispatch) => {
  dispatch({ ...toBasicAction(ACCOUNT_STORE, AccountActionTypes.FORGET_LOGIN) });
};

export const logUserOut = async (dispatch: AccountDispatch, oldToken: string | undefined) => {
  const url = serverURLs.revoke_token;
  return request
    .post(url)
    .send({ refresh: oldToken })
    .then(() => {
      dispatch({ ...toBasicAction(ACCOUNT_STORE, AccountActionTypes.LOGOUT) });
      return null;
    })
    .catch(() => {
      dispatch({ ...toBasicAction(ACCOUNT_STORE, AccountActionTypes.LOGOUT) });
      return null;
    });
};
