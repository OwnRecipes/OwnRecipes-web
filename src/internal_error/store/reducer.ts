import { ACTION } from '../../common/store/ReduxHelper';
import { INTERNAL_ERROR_STORE, InternalErrorAction, InternalErrorState, InternalError } from './types';

const defaultState: InternalErrorState = { item: undefined };

const setError = (state: InternalErrorState, item: InternalError | undefined): InternalErrorState => {
  const updState = { ...state };
  updState.item = item;
  return updState;
};

const reducer = (state = defaultState, action: InternalErrorAction): InternalErrorState => {
  if (INTERNAL_ERROR_STORE === action.store) {
    switch (action.typs) {
      case ACTION.RESET: return defaultState;
      case ACTION.ERROR: return setError(state, action.payload);
      default: break;
    }
  }

  return state;
};

export default reducer;
