import { Dispatch as ReduxDispatch } from 'redux';
import { ACTION, GenericResetAction } from '../../common/store/ReduxHelper';
import { PayloadAction } from '../../common/store/redux';

export interface InternalError {
  store: string;

  name:    string;
  message: string;
  stack?:  string;

  url?: string;
  method?: string;
  data?: string;
  response?: unknown;

  error: Error;
}

export const INTERNAL_ERROR_STORE = 'internalError';

type IInternalErrorSetAction = {
  store: typeof INTERNAL_ERROR_STORE;
  typs:  ACTION.ERROR;
} & PayloadAction<InternalError>;

export type InternalErrorAction = IInternalErrorSetAction | GenericResetAction;
export type InternalErrorDispatch = ReduxDispatch<InternalErrorAction>;
export type InternalErrorState = {
  readonly item: InternalError | undefined;
};
