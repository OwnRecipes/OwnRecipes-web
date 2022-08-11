import * as _ from 'lodash-es';
import * as defaults from 'superagent-defaults';
import superRequest, { SuperAgentStatic } from 'superagent';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import moment from 'moment';

import store from './store/store';
import { serverURLs } from './config';
import { AccountAction, AccountActionTypes, ACCOUNT_STORE, LoginDto, toUserAccount } from '../account/store/types';
import { ACTION } from './store/ReduxHelper';
import * as InternalErrorActions from '../internal_error/store/actions';
import { logUserOut } from '../account/store/actions';
import { toValidationErrors, ValidationError } from './store/Validation';
import { isDemoMode } from './utility';

export type ResponseError = superRequest.ResponseError;
export const isResponseError = (obj: unknown): obj is ResponseError => (
  obj != null
    && (obj as ResponseError).status != null
    && typeof (obj as ResponseError).status === 'number'
    && (obj as ResponseError).response != null); // eslint-disable-line no-underscore-dangle, @typescript-eslint/no-explicit-any

export type NetworkError = {
  message: string;
  method:  'DELETE' | 'GET' | 'PATCH' | 'PUT' | 'POST';
  status:  undefined;
  url:     string;
};
export const isNetworkError = (obj: unknown): obj is NetworkError => (
  obj != null
    && (obj as NetworkError).status === undefined
    && ['DELETE', 'GET', 'PATCH', 'PUT', 'POST'].includes((obj as NetworkError).method)
    && (obj as NetworkError).url != null && (obj as NetworkError).url.length > 0
    && !isResponseError(obj)
);

export const refreshToken = (() => {
  let blocking = false;

  const refresh = (token: string) => {
    superRequest
      .post(serverURLs.refresh_token)
      .set('Accept', 'application/json')
      .send({ token: token })
      .then(res => {
        blocking = false;
        const data: LoginDto = res.body;
        store.dispatch({ store: ACCOUNT_STORE, type: AccountActionTypes.LOGIN, user: toUserAccount(data) } as AccountAction);
      })
      .catch(() => {
        blocking = false;
        store.dispatch({ store: ACCOUNT_STORE, type: AccountActionTypes.LOGOUT } as AccountAction);
      });
  };

  return {
    instance: (token: string) => {
      if (!blocking) {
        blocking = true;
        refresh(token);
      }
    },
  };
})();

// Create a defaults context
export const request = (): SuperAgentStatic => {
  const customRequest = defaults();

  if (!isDemoMode()) {
  // Add the user token if the user is logged in
  const accountState = store.getState().account;
  const account = accountState.item;
  if (account && account.id) {
    const decodedToken: JwtPayload | undefined = account.token ? jwtDecode<JwtPayload>(account.token) : undefined;

    // Check if the user's token is outdated.
    // The token expired after 14 days.
    // See: https://github.com/open-eats/openeats-api/blob/master/base/settings.py#L174
    if (decodedToken == null || decodedToken.exp == null) {
      // If the token is undefined.
      // Log the user out and direct them to the login page.
      store.dispatch({ store: ACCOUNT_STORE, type: AccountActionTypes.LOGOUT });
    } else if (moment(new Date()).add(2, 'days') > moment.unix(decodedToken.exp)) {
      // If it is then call for a refreshed token.
      // If the token is to old, the request will fail and
      // the user will be logged-out and redirect to the login screen.
      refreshToken.instance(account.token);
    }
    customRequest.set('Authorization', `JWT ${account.token}`);
    }
  }

  // Make sure every request we get is json
  customRequest.set('Accept', 'application/json');
  customRequest.timeout({
    response: 30000, // 30 s
    deadline: 60000, // 60 s
  });

  return customRequest;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (error: Error, storeIdent: string): any => (dispatch: any): any => {
  if (isResponseError(error)) {
    const respErr: ResponseError = error;
    if (respErr.response != null && (respErr.response.status === 400 || respErr.response.status === 409)) {
      // Validation Error
      dispatch({
        store:   storeIdent,
        type:    ACTION.VALIDATION,
        data:    toValidationErrors(respErr),
      });
    } else if (_.get(respErr.response, 'req.method') === 'get' && respErr.response != null && respErr.response.status === 404) {
      dispatch({
        store:   storeIdent,
        type:    ACTION.GET_SUCCESS,
        data:    undefined,
      });
    } else if (respErr.response != null && respErr.response.status === 401) {
      // Invalid token
      dispatch(logUserOut());
    } else if (respErr.response != null && respErr.response.status === 403) {
      // Forbidden
      dispatch(InternalErrorActions.setInternalError(storeIdent, error));
    } else {
      // Internal server error
      const validationError: ValidationError = { code: '500', message: respErr.message, sourceError: respErr };
      dispatch(InternalErrorActions.setInternalError(storeIdent, error));
      dispatch({
        store: storeIdent,
        type:  ACTION.ERROR,
        data:  validationError,
      });
    }

    dispatch({
      store:   storeIdent,
      type:    ACTION.ERROR,
      data:    error,
    });
  } else if (isNetworkError(error)) {
    dispatch({
      store:   storeIdent,
      type:    ACTION.NO_CONNECTION,
    });
  } else {
    // Unknown internal error
    dispatch(InternalErrorActions.setInternalError(storeIdent, error));
    dispatch({
      store: storeIdent,
      type:  ACTION.ERROR,
      data:  error,
    });
  }
};

export default request;
