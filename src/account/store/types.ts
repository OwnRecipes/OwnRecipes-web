import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Dispatch as ReduxDispatch } from 'redux';

import ItemReducerType from '../../common/store/ItemReducerType';
import { BasicAction, PayloadAction } from '../../common/store/redux';
import { GenericItemReducerAction } from '../../common/store/ReduxHelper';
import UserRole from '../../common/types/UserRole';

export type LoginDto = {
  id:    number;
  token: string;
}

export type UserAccount = {
  id:       number;
  token:    string;
  username: string;
  email:    string;
  role:     UserRole;
  remember: boolean;
}

export type OwnrecipesPayload = {
  username: string;
  email:    string;
  user_id:  number;
} & JwtPayload;

function getRole(decodedToken: OwnrecipesPayload): UserRole {
  const username = decodedToken.username?.toLocaleLowerCase();
  if (username == null) return UserRole.GUEST;

  if (username.startsWith('guest') || username.startsWith('gast')) return UserRole.GUEST;
  else if (['admin'].includes(username)) return UserRole.ADMIN;
  else return UserRole.USER;
}

export const toUserAccount = (loginDto: LoginDto, remember: boolean): UserAccount => {
  const { token } = loginDto;
  if (token == null) throw new Error('Invalid response: token may not be null');
  const decodedToken: OwnrecipesPayload | undefined = jwtDecode<OwnrecipesPayload>(token);

  if (decodedToken.username == null) throw new Error('Invalid response: The token is incomplete (username is missing)');
  if (decodedToken.email == null)    throw new Error('Invalid response: The token is incomplete (email is missing)');

  return {
    id:       loginDto.id,
    token:    token,
    username: decodedToken.username,
    email:    decodedToken.email,
    role:     getRole(decodedToken),
    remember: remember,
  };
};

export enum AccountActionTypes {
  LOGIN  = 'LOGIN',
  FORGET_LOGIN = 'FORGET_LOGIN',
  LOGOUT = 'LOGOUT',
}

export const ACCOUNT_STORE = '@@account';
export const ACCOUNT_TOKEN_STORAGE_KEY = 'token';

export type IAccountLoginAction = {
  store: typeof ACCOUNT_STORE;
  typs:  typeof AccountActionTypes.LOGIN;
} & PayloadAction<UserAccount>;

export type IAccountForgetLoginAction = {
  store: typeof ACCOUNT_STORE;
  typs:  typeof AccountActionTypes.FORGET_LOGIN;
} & BasicAction;

export type IAccountLogoutAction = {
  store: typeof ACCOUNT_STORE;
  typs:  typeof AccountActionTypes.LOGOUT;
} & BasicAction;

export type AccountState    = ItemReducerType<UserAccount>;
export type AccountAction   = IAccountLoginAction | IAccountForgetLoginAction | IAccountLogoutAction | GenericItemReducerAction<UserAccount>;
export type AccountDispatch = ReduxDispatch<AccountAction>;
