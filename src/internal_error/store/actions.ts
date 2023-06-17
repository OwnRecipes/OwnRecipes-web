import * as _ from 'lodash-es';

import { isResponseError, ResponseError } from '../../common/requestUtils';
import { toBasicAction } from '../../common/store/redux';
import { ACTION } from '../../common/store/ReduxHelper';
import { InternalErrorDispatch, InternalError, INTERNAL_ERROR_STORE } from './types';

export const setInternalError = (store: string, error: Error | ResponseError) => (dispatch: InternalErrorDispatch) => {
  if (isResponseError(error)) {
    const respErr = error as ResponseError;
    let errMessage;
    if (respErr.response == null) {
      errMessage = respErr.message;
    } else {
      const respErrorMessage = _.get(respErr.response, 'error.message');
      if (respErrorMessage) {
        errMessage = respErrorMessage;
      } else {
        const statusText = _.get(respErr.response, 'statusText');
        errMessage = `${String(respErr.response.status)}: ${statusText}`;
      }
    }

    dispatch({
      ...toBasicAction(
        INTERNAL_ERROR_STORE,
        ACTION.ERROR
      ),
      payload: {
        store:   store,
        name:    respErr.name,
        message: errMessage,
        stack:   respErr.stack,

        url:     _.get(respErr.response, 'req.url'),
        method:  _.get(respErr.response, 'req.method'),
        data:    _.get(respErr.response, 'req.data'),

        response: respErr.response,
        error:    respErr,
      } as InternalError,
    });
  } else {
    const err = error as Error;
    dispatch({
      ...toBasicAction(
        INTERNAL_ERROR_STORE,
        ACTION.ERROR
      ),
      payload: {
        store:   store,
        name:    err.name,
        message: err.message,
        stack:   err.stack,

        error: err,
      } as InternalError,
    });
  }
};

export const reset = () => (dispatch: InternalErrorDispatch) => {
  dispatch({ ...toBasicAction(INTERNAL_ERROR_STORE, ACTION.RESET) });
};
