import { refreshToken, request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { AccountActionTypes, ACCOUNT_STORE, AccountDispatch, ACCOUNT_TOKEN_STORAGE_KEY, UserAccount } from './types';
import { ACTION, GenericErrorAction } from '../../common/store/ReduxHelper';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import moment from 'moment';

export const getToken = (username: string, pass: string) => (dispatch: AccountDispatch) => {
  const url = serverURLs.auth_token;
  request()
    .post(url)
    .send({ username: username, password: pass })
    .then(res => {
      dispatch({ store: ACCOUNT_STORE, type: AccountActionTypes.LOGIN, user: res.body });
    })
    .catch(err => {
      const errorAction: GenericErrorAction = { store: ACCOUNT_STORE, type: ACTION.ERROR, data: err };
      dispatch(errorAction);
      // TODO properly handle error
      // dispatch(setError(ACCOUNT_STORE, err));
    });
};

export const tryAutoLogin = () => (dispatch: AccountDispatch) => {
  const storageItem = localStorage.getItem(ACCOUNT_TOKEN_STORAGE_KEY);
  if (storageItem == null) return;
  const user: UserAccount = JSON.parse(storageItem);
  const decodedToken: JwtPayload | undefined = user.token ? jwtDecode<JwtPayload>(user.token) : undefined;
  if (user.token != null && decodedToken != null) {
    if (decodedToken.exp != null && (moment(new Date()).add(10, 'days') > moment.unix(decodedToken.exp))) {
      refreshToken.instance(user.token);
    } else {
      dispatch({ store: ACCOUNT_STORE, type: AccountActionTypes.LOGIN, user: user });
    }
  }
};

export const logUserOut = () => (dispatch: AccountDispatch) => {
  dispatch({ store: ACCOUNT_STORE, type: AccountActionTypes.LOGOUT });
};