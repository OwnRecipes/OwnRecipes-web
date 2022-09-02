import ReduxHelper, { ACTION } from '../../common/store/ReduxHelper';
import { INTERNAL_ERROR_STORE, InternalErrorAction, InternalErrorState } from './types';

const defaultState: InternalErrorState = { item: undefined };

const reducer = (state = defaultState, action: InternalErrorAction): InternalErrorState => {
  if (INTERNAL_ERROR_STORE === action.store) {
    switch (action.typs) {
      case ACTION.RESET: return defaultState;
      case ACTION.ERROR: return ReduxHelper.setItem(state, action.payload);
      default: break;
    }
  }

  return state;
};

export default reducer;
