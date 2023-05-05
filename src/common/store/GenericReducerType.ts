import { ValidationResult } from './Validation';

export enum PendingState {
  INITIAL   = 'INITIAL',
  LOADING   = 'LOADING',
  SAVING    = 'SAVING',
  DELETING  = 'DELETING',
  COMPLETED = 'COMPLETED',
  ABORTED   = 'ABORTED',
}

export interface ReducerMeta {
  error:      Error | undefined;
  validation: ValidationResult | undefined;
  pending:    PendingState;

  hasConnection: boolean;
  dirty: boolean;
}

interface GenericReducerType {
  readonly ident: string;

  meta: ReducerMeta;
}

export default GenericReducerType;
