import { AnyAction } from 'redux';
import { ACTION } from '../../common/store/ReduxHelper';
import { ConnectionState } from './types';

const defaultState: ConnectionState = { hasConnection: true };

const reducer = (state = defaultState, action: AnyAction): ConnectionState => {
  switch (action.typs) {
    case ACTION.NO_CONNECTION:
      return { hasConnection: false };
    case ACTION.GET_SUCCESS:
      return { hasConnection: true };
    default:
      return state;
  }
};

export default reducer;
