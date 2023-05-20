import * as _ from 'lodash-es';
import superRequest from 'superagent';

import { ACTION } from './store/ReduxHelper';
import * as InternalErrorActions from '../internal_error/store/actions';
import { logUserOut } from '../account/store/actions';
import { createInternalHiddenValidationResult, toValidationErrors, ValidationError } from './store/Validation';
import { AnyDispatch, toBasicAction } from './store/redux';
import LocalStorageHelper from './LocalStorageHelper';
import { ACCOUNT_TOKEN_STORAGE_KEY, UserAccount } from '../account/store/types';
import { isDemoMode } from './utility';

export type ResponseError = superRequest.ResponseError;
export const isResponseError = (obj: unknown): obj is ResponseError => (
  obj != null
      && (obj as ResponseError).status != null
      && typeof (obj as ResponseError).status === 'number'
      && (obj as ResponseError).response != null); // eslint-disable-line no-underscore-dangle, @typescript-eslint/no-explicit-any

export interface NetworkError {
  message: string;
  method: 'DELETE' | 'GET' | 'PATCH' | 'PUT' | 'POST';
  status: undefined;
  url: string;
}
export const isNetworkError = (obj: unknown): obj is NetworkError => (
  obj != null
      && (obj as NetworkError).status === undefined
      && ['DELETE', 'GET', 'PATCH', 'PUT', 'POST'].includes((obj as NetworkError).method)
      && (obj as NetworkError).url != null && (obj as NetworkError).url.length > 0
      && !isResponseError(obj)
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getResponseMethod(resp: any): string {
  const mth = _.get(resp, 'req.method');
  if (mth) {
    return String(mth).toLocaleUpperCase();
  } else {
    return '';
  }
}

const handleErrorUnauthorized = async (dispatch: AnyDispatch, error: ResponseError) => {
  if (isDemoMode()) {
    return null;
  }

  const storageItem = LocalStorageHelper.getItem(ACCOUNT_TOKEN_STORAGE_KEY);
  const user: UserAccount | undefined = storageItem ? JSON.parse(storageItem) : undefined;

  if (!user) {
    return toValidationErrors(error);
  } else {
    logUserOut(dispatch, user?.token);
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (error: Error, storeIdent: string): any => (dispatch: any) => {
  if (isResponseError(error)) {
    const respErr: ResponseError = error;
    if (respErr.response != null && (respErr.response.status === 400 || respErr.response.status === 409)) {
      // Validation Error
      dispatch({
        ...toBasicAction(
          storeIdent,
          ACTION.VALIDATION
        ),
        payload: toValidationErrors(respErr),
      });
    } else if (getResponseMethod(respErr.response) === 'GET' && respErr.response != null && respErr.response.status === 404) {
      dispatch({
        ...toBasicAction(
          storeIdent,
          ACTION.GET_SUCCESS
        ),
        payload: undefined,
      });
    } else if (respErr.response != null && respErr.response.status === 401) {
      // Invalid token
      handleErrorUnauthorized(dispatch, respErr);
    } else if (respErr.response != null && respErr.response.status === 403) {
      // Forbidden
      dispatch(InternalErrorActions.setInternalError(storeIdent, error));
    } else {
      // Internal server error
      const validationError: ValidationError = { code: '500', message: respErr.message, sourceError: respErr };
      dispatch(InternalErrorActions.setInternalError(storeIdent, error));
      dispatch({
        ...toBasicAction(
          storeIdent,
          ACTION.ERROR
        ),
        payload: validationError,
      });
    }

    dispatch({
      ...toBasicAction(
        storeIdent,
        ACTION.ERROR
      ),
      payload: error,
    });
  } else if (isNetworkError(error)) {
    dispatch({ ...toBasicAction(storeIdent, ACTION.NO_CONNECTION) });
  } else {
    // Unknown internal error
    dispatch(InternalErrorActions.setInternalError(storeIdent, error));
    dispatch({
      ...toBasicAction(
        storeIdent,
        ACTION.ERROR
      ),
      payload: error,
    });
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleFormError = (dispatch: AnyDispatch, error: Error, storeIdent: string): any => {
  if (isResponseError(error)) {
    const respErr: ResponseError = error;

    dispatch({
      ...toBasicAction(
        storeIdent,
        ACTION.ERROR
      ),
      payload: error,
    });

    if (respErr.response != null && (respErr.response.status === 400 || respErr.response.status === 409)) {
      return toValidationErrors(respErr);
    } else if (getResponseMethod(respErr.response) === 'GET' && respErr.response != null && respErr.response.status === 404) {
      // -> Use a new action to set the 404 error state.
      dispatch({
        ...toBasicAction(
          storeIdent,
          ACTION.GET_SUCCESS
        ),
        payload: undefined,
      });
    } else if (respErr.response != null && respErr.response.status === 401) {
      // Invalid token
      return handleErrorUnauthorized(dispatch, respErr);
    } else if (respErr.response != null && respErr.response.status === 403) {
      // Forbidden
      dispatch(InternalErrorActions.setInternalError(storeIdent, error));
      return createInternalHiddenValidationResult('403', 'forbidden', error);
    } else {
      // Internal server error
      const validationError: ValidationError = { code: '500', message: respErr.message, sourceError: respErr };
      dispatch(InternalErrorActions.setInternalError(storeIdent, error));
      dispatch({
        ...toBasicAction(
          storeIdent,
          ACTION.ERROR
        ),
        payload: validationError,
      });
      return createInternalHiddenValidationResult('500', respErr.message, error);
    }
  } else if (isNetworkError(error)) {
    dispatch({ ...toBasicAction(storeIdent, ACTION.NO_CONNECTION) });
    return createInternalHiddenValidationResult('Connection', 'NetworkError', error);
  } else {
    // Unknown internal error
    dispatch(InternalErrorActions.setInternalError(storeIdent, error));
    dispatch({
      ...toBasicAction(
        storeIdent,
        ACTION.ERROR
      ),
      payload: error,
    });
    return createInternalHiddenValidationResult('500', 'Internal error', error);
  }

  return null;
};
