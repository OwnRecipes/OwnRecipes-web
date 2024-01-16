/* eslint-disable no-underscore-dangle */
import * as defaults from 'superagent-defaults';
import superRequest, { SuperAgentRequest, SuperAgentStatic } from 'superagent';

import store from './store/store';
import { serverURLs } from './config';
import { AccountAction, AccountActionTypes, ACCOUNT_STORE, LoginDto, toUserAccount, ACCOUNT_TOKEN_STORAGE_KEY, UserAccount } from '../account/store/types';
import { toBasicAction } from './store/redux';
import LocalStorageHelper from './LocalStorageHelper';
import { isNetworkError } from './requestUtils';
import { ACTION } from './store/ReduxHelper';

export const refreshToken = (() => {
  let blocking = false;

  const refresh = async (token: string, remember: boolean) => (
    superRequest
      .post(serverURLs.refresh_token)
      .set('Accept', 'application/json')
      .send({ refresh: token })
      .then(res => {
        blocking = false;
        const data: LoginDto = { ...res.body };
        const user = toUserAccount(data, remember);
        LocalStorageHelper.setItem(ACCOUNT_TOKEN_STORAGE_KEY, JSON.stringify(user));
        request().set('Authorization', `Bearer ${user.token}`);

        store.dispatch({ ...toBasicAction(ACCOUNT_STORE, AccountActionTypes.LOGIN), payload: toUserAccount(data, remember) } as AccountAction);
        return res;
      })
      .catch(error => {
        blocking = false;
        if (isNetworkError(error)) {
          store.dispatch({ ...toBasicAction(ACCOUNT_STORE, ACTION.NO_CONNECTION) });
        } else {
          store.dispatch({ ...toBasicAction(ACCOUNT_STORE, AccountActionTypes.INVALIDATE_TOKEN) } as AccountAction);
        }
        return null;
      })
  );

  return {
    instance: async (remember: boolean) => {
      if (!blocking) {
        blocking = true;

        const storageItem = LocalStorageHelper.getItem(ACCOUNT_TOKEN_STORAGE_KEY);
        if (storageItem == null) {
          return null;
        }
        const user: UserAccount = JSON.parse(storageItem);

        if (!user.refresh) {
          return null;
        }

        return refresh(user.refresh, remember);
      } else {
        return null;
      }
    },
  };
})();

// Create a defaults context
export const initializeSuperagent = (): SuperAgentStatic & SuperAgentRequest => {
  const customRequest = defaults();

  // Make sure every request we get is json
  customRequest.set('Accept', 'application/json');
  customRequest.timeout({
    response: 30000, // 30 s
    deadline: 60000, // 60 s
  });

  return customRequest;
};

export const getToken = (): UserAccount | undefined => {
  const storageItem = LocalStorageHelper.getItem(ACCOUNT_TOKEN_STORAGE_KEY);
  const user: UserAccount = storageItem ? JSON.parse(storageItem) : undefined;
  return user;
};

export const clearToken = () => {
  const storageItem = LocalStorageHelper.getItem(ACCOUNT_TOKEN_STORAGE_KEY);
  const user: UserAccount = storageItem ? JSON.parse(storageItem) : undefined;
  if (user) {
    LocalStorageHelper.removeItem(ACCOUNT_TOKEN_STORAGE_KEY, user.username);
  }

  request().unset('Authorization');
};

let requestInstance: SuperAgentStatic & SuperAgentRequest;

// Create a defaults context
export function request() {
  if (!requestInstance) {
    requestInstance = initializeSuperagent();
  }
  return requestInstance;
}

export default request;
