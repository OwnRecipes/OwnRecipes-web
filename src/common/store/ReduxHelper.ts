import { AnyAction, Dispatch } from 'redux';
import * as _ from 'lodash-es';

import GenericReducerType, { PendingState } from './GenericReducerType';
import ArrayReducerType from './ArrayReducerType';
import ItemReducerType from './ItemReducerType';
import MapReducerType from './MapReducerType';
import { createValidationResult, isValidationResult, runValidators, ValidationResult, ValidatorsType } from './Validation';
import { BasicAction, PayloadAction, toBasicAction } from './redux';

export enum ACTION {
  CREATE_START   = 'CREATE_START',
  CREATE_SUCCESS = 'CREATE_SUCCESS',

  DELETE_START   = 'DELETE_START',
  DELETE_SUCCESS = 'DELETE_SUCCESS',

  GET_START      = 'GET_START',
  GET_SUCCESS    = 'GET_SUCCESS',

  UPDATE_START   = 'UPDATE_START',
  UPDATE_SUCCESS = 'UPDATE_SUCCESS',

  LOADING    = 'LOADING',
  ERROR      = 'ERROR',
  VALIDATION = 'VALIDATION',

  PRELOAD    = 'PRELOAD',
  RESET      = 'RESET',
  SOFT_RESET = 'SOFT_RESET',

  NO_CONNECTION = 'NO_CONNECTION',
}

export type GenericCreateStartAction = {
  typs: typeof ACTION.CREATE_START;
} & BasicAction;

export type ItemCreateSuccessAction<T> = {
  typs: typeof ACTION.CREATE_SUCCESS;
} & PayloadAction<T>;

export type GenericDeleteStartAction = {
  typs: typeof ACTION.DELETE_START;
} & BasicAction;

export type ItemDeleteSuccessAction = {
  typs: typeof ACTION.DELETE_SUCCESS;
} & PayloadAction<{ id: number }>;

export type GenericErrorAction = {
  typs: typeof ACTION.ERROR;
} & BasicAction & Partial<PayloadAction<ValidationResult | Error>>;

export type GenericGetStartAction = {
  typs: typeof ACTION.GET_START;
} & BasicAction;

export type ArrayGetSuccessAction<T> = {
  typs: typeof ACTION.GET_SUCCESS;
} & PayloadAction<Array<T>>;

export type ItemGetSuccessAction<T> = {
  typs: typeof ACTION.GET_SUCCESS;
} & PayloadAction<T>;

export type MapGetSuccessAction<T> = {
  typs: typeof ACTION.GET_SUCCESS;
  id:   string | number;
} & PayloadAction<T>;

export type GenericLoadingAction = {
  typs: typeof ACTION.LOADING;
} & BasicAction;

export type GenericNoConnectionAction = {
  typs: typeof ACTION.NO_CONNECTION;
} & BasicAction;

export type GenericPreloadAction<T> = {
  typs: typeof ACTION.PRELOAD;
} & PayloadAction<Partial<T>>;

export type GenericResetAction = {
  typs: typeof ACTION.RESET;
} & BasicAction;

export type GenericSoftResetAction = {
  typs: typeof ACTION.SOFT_RESET;
} & BasicAction;

export type GenericUpdateStartAction = {
  typs: typeof ACTION.UPDATE_START;
} & BasicAction;

export type ItemUpdateSuccessAction<T> = {
  typs: typeof ACTION.UPDATE_SUCCESS;
  oldId: number;
} & PayloadAction<T>;

export type ValidationResultAction = {
  typs:  typeof ACTION.VALIDATION;
  mode?: 'overwrite' | 'merge';
} & BasicAction & Partial<PayloadAction<ValidationResult>>;

export type GenericReducerAction         = GenericErrorAction | GenericLoadingAction | GenericNoConnectionAction | GenericResetAction | GenericSoftResetAction;
export type GenericItemReducerAction<T>  = ItemCreateSuccessAction<T> | ItemDeleteSuccessAction | ItemGetSuccessAction<T> | ItemUpdateSuccessAction<T> | ValidationResultAction | GenericCreateStartAction | GenericDeleteStartAction | GenericGetStartAction | GenericPreloadAction<T> | GenericUpdateStartAction | GenericReducerAction;
export type GenericArrayReducerAction<T> = GenericGetStartAction | ArrayGetSuccessAction<T> | GenericReducerAction;
export type GenericMapReducerAction<T>   = GenericGetStartAction | MapGetSuccessAction<T> | GenericReducerAction;

export default class ReduxHelper {
  static transformEntities<TDto, TEntity>(arr: Array<TDto>, toEntity: (dto: TDto) => TEntity): Array<TEntity> {
    return arr.map(it => toEntity(it));
  }

  static getItemReducerDefaultState = <T>(ident: string): ItemReducerType<T> => {
    const newState: ItemReducerType<T> = {
      ident: ident,

      meta: {
        dirty: false,
        error: undefined,
        validation: undefined,
        pending: PendingState.INITIAL,
        hasConnection: true,
      },

      item: undefined,
    };

    return newState;
  };

  static getArrayReducerDefaultState = <T>(ident: string): ArrayReducerType<T> => {
    const newState: ArrayReducerType<T> = {
      ident: ident,

      meta: {
        dirty: false,
        error: undefined,
        validation: undefined,
        pending: PendingState.INITIAL,
        hasConnection: true,
      },

      items: undefined,

    };

    return newState;
  };

  static getMapReducerDefaultState = <T>(ident: string): MapReducerType<T> => {
    const newState: MapReducerType<T> = {
      ident: ident,

      meta: {
        dirty: false,
        error: undefined,
        validation: undefined,
        pending: PendingState.INITIAL,
        hasConnection: true,
      },

      items: undefined,
    };

    return newState;
  };

  static setItem = <TItem, TState extends ItemReducerType<TItem>>(state: TState, item: TItem | undefined): TState => {
    const updState = ReduxHelper.cloneState(state);

    updState.item  = item;

    updState.meta.error   = undefined;
    updState.meta.pending = PendingState.COMPLETED;
    updState.meta.hasConnection = true;
    updState.meta.dirty = false;

    return updState;
  };

  static preloadItem = <TItem, TState extends ItemReducerType<TItem>>(state: TState, item: TItem | undefined): TState => {
    const updState = ReduxHelper.cloneState(state);

    updState.item  = item;

    updState.meta.error   = undefined;
    updState.meta.pending = PendingState.INITIAL;

    return updState;
  };

  static setArray<T>(state: ArrayReducerType<T>, items: Array<T>): ArrayReducerType<T> {
    const updState = ReduxHelper.cloneState(state);

    updState.items = items;

    updState.meta.error = undefined;
    updState.meta.pending = PendingState.COMPLETED;
    updState.meta.hasConnection = true;

    return updState;
  }

  static setMapItem<T>(state: MapReducerType<T>, id: string, item: T): MapReducerType<T> {
    const updState = ReduxHelper.cloneState(state);

    updState.items = state.items ? _.clone(state.items) : {};
    _.set(updState.items, id, item);

    updState.meta.error = undefined;
    updState.meta.pending = PendingState.COMPLETED;
    updState.meta.hasConnection = true;

    return updState;
  }

  static deleteMapItem<T>(state: MapReducerType<T>, id: string): MapReducerType<T> {
    const updState = ReduxHelper.cloneState(state);

    updState.items = state.items ? _.clone(state.items) : {};
    _.unset(updState.items, id);

    updState.meta.error = undefined;
    updState.meta.pending = PendingState.COMPLETED;
    updState.meta.hasConnection = true;

    return updState;
  }

  static setError = <T extends GenericReducerType>(state: T, error: Error | undefined): T => {
    const updState = ReduxHelper.cloneState(state);

    updState.meta.error   = error;
    updState.meta.pending = PendingState.ABORTED;
    updState.meta.hasConnection = true;

    return updState;
  };

  static setNoConnection = <T extends GenericReducerType>(state: T): T => {
    const updState = ReduxHelper.cloneState(state);

    updState.meta.error = undefined;
    updState.meta.pending = PendingState.INITIAL;
    updState.meta.hasConnection = false;

    return updState;
  };

  static setPending = <T extends GenericReducerType>(state: T, pending: PendingState): T => {
    const updState = ReduxHelper.cloneState(state);

    updState.meta.error   = undefined;
    updState.meta.pending = pending;

    return updState;
  };

  static setSoftReset = <T extends GenericReducerType>(state: T): T => {
    const updState = ReduxHelper.cloneState(state);

    updState.meta.error = undefined;
    updState.meta.pending = PendingState.INITIAL;
    updState.meta.hasConnection = true;

    return updState;
  };

  static doSetValidation = <T extends GenericReducerType>(updState: T, validation: ValidationResult | undefined, mode: 'overwrite' | 'merge') => {
    if (mode === 'overwrite' || validation == null) {
      updState.meta.validation = validation;
    } else {
      const newErrors = isValidationResult(updState.meta.validation) ? _.clone(updState.meta.validation) : createValidationResult();

      Object.keys(validation).forEach(key => {
        _.set(newErrors, key, validation[key]);
      });
      updState.meta.validation = newErrors;
    }
  };

  static setValidation = <T extends GenericReducerType>(state: T, validation: ValidationResult | undefined, mode: 'overwrite' | 'merge' = 'overwrite'): T => {
    const updState = ReduxHelper.cloneState(state);

    ReduxHelper.doSetValidation(updState, validation, mode);

    updState.meta.pending = PendingState.ABORTED;
    if (mode === 'overwrite') {
      updState.meta.hasConnection = true;
    }

    return updState;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static validate = <TEntity>(store: string, data: TEntity, validations: ValidatorsType): any => (dispatch: Dispatch) => {
    const valResult: ValidationResult = runValidators(validations, data);

    if (Object.keys(valResult).length) {
      dispatch({
        ...toBasicAction(
          store,
          ACTION.VALIDATION
        ),
        payload: valResult,
        mode:    'overwrite',
      });
    }
  };

  static caseItemDefaultReducer = <T>(state: ItemReducerType<T>, action: GenericItemReducerAction<T>, defaultState: ItemReducerType<T>): ItemReducerType<T> => {
    if (state.ident === action.store) {
      switch (action.typs) {
        case ACTION.CREATE_START:
        case ACTION.UPDATE_START:
          return ReduxHelper.setPending(state, PendingState.SAVING);
        case ACTION.DELETE_START:
          return ReduxHelper.setPending(state, PendingState.DELETING);
        case ACTION.GET_START:
          return ReduxHelper.setPending(state, PendingState.LOADING);

        case ACTION.CREATE_SUCCESS:
          return ReduxHelper.setItem(state, action.payload);
        case ACTION.DELETE_SUCCESS:
          return defaultState;
        case ACTION.GET_SUCCESS:
        case ACTION.UPDATE_SUCCESS:
          return ReduxHelper.setItem(state, action.payload);

        case ACTION.PRELOAD:
            return ReduxHelper.preloadItem(state, action.payload);
        case ACTION.VALIDATION:
            return ReduxHelper.setValidation(state, action.payload, action.mode);
        default:
          break;
      }
    }

    return ReduxHelper.caseDefaultReducer(state, action, defaultState);
  };

  static caseArrayDefaultReducer = <T>(state: ArrayReducerType<T>, action: GenericArrayReducerAction<T>, defaultState: ArrayReducerType<T>, itemStoreIdent?: string): ArrayReducerType<T> => {
    if (itemStoreIdent === action.store) {
      const itemAction: GenericItemReducerAction<T> = action as GenericItemReducerAction<T>;
      switch (itemAction.typs) {
        case ACTION.CREATE_SUCCESS:
        case ACTION.GET_SUCCESS:
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const itemId = (itemAction.payload as any)?.id;
            if (itemId == null) return state;

            const updState = { ...state };
            const updItems = state.items != null ? [...state.items] : [];

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const oldIndex = updItems.findIndex(updItem => (updItem as any).id === itemId);
            if (oldIndex > -1) {
              updItems.splice(oldIndex, 1, itemAction.payload);
            } else {
              updItems.push(itemAction.payload);
            }

            updState.items = updItems;
            return updState;
          }
        case ACTION.DELETE_SUCCESS:
          {
            if (itemAction.payload == null || state.items == null) return state;

            const updState = { ...state };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const updItems = [...state.items].filter((item: any) => item.id === itemAction.payload);
            if (updItems.length < state.items.length) {
              updState.items = updItems;
              return updState;
            } else {
              return state;
            }
          }
        case ACTION.UPDATE_SUCCESS:
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (itemAction.payload == null || (itemAction.payload as any).id == null) return state;

            const updState = { ...state };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const updItems = state.items != null ? [...state.items].filter((item: any) => item.id === itemAction.payload) : [];
            updItems.push(itemAction.payload);
            updState.items = updItems;
            return updState;
          }
        default: ReduxHelper.caseDefaultReducer(state, action, defaultState);
      }
    }

    if (state.ident === action.store) {
      switch (action.typs) {
        case ACTION.GET_START:
          return ReduxHelper.setPending(state, PendingState.LOADING);
        case ACTION.GET_SUCCESS:
          {
            if (action.payload == null) return state;
            return ReduxHelper.setArray(state, action.payload);
          }
        default:
          break;
      }
    }

    return ReduxHelper.caseDefaultReducer(state, action, defaultState);
  };

  static caseMapDefaultReducer = <T>(state: MapReducerType<T>, action: GenericMapReducerAction<T>, defaultState: MapReducerType<T>, itemStoreIdent?: string): MapReducerType<T> => {
    if (itemStoreIdent === action.store) {
      const itemAction: GenericItemReducerAction<T> = action as GenericItemReducerAction<T>;
      switch (itemAction.typs) {
        case ACTION.GET_SUCCESS:
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (itemAction.payload == null || (itemAction.payload as any).id == null) return state;

            const updState = { ...state };
            const updItems = state.items != null ? _.clone(state.items) : {};
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            _.set(updItems, (itemAction.payload as any).id, itemAction.payload);
            updState.items = updItems;
            return updState;
          }
        case ACTION.DELETE_SUCCESS:
          {
            if (itemAction.payload == null || state.items == null || itemAction.payload.id == null) return state;

            const updState = { ...state };
            const updItems = _.clone(state.items);
            if (_.unset(updItems, String(itemAction.payload.id))) {
              updState.items = updItems;
              return updState;
            } else {
              return state;
            }
          }
        default: ReduxHelper.caseDefaultReducer(state, itemAction, defaultState);
      }
    }

    if (state.ident === action.store) {
      switch (action.typs) {
        case ACTION.GET_START:
          return ReduxHelper.setPending(state, PendingState.LOADING);
        case ACTION.GET_SUCCESS:
          return ReduxHelper.setMapItem(state, String(action.id), action.payload);
        default:
          break;
      }
    }

    return ReduxHelper.caseDefaultReducer(state, action, defaultState);
  };

  static caseDefaultReducer = <T extends GenericReducerType>(state: T, action: AnyAction, defaultState: T): T => {
    if (state.ident === action.store) {
      switch (action.typs) {
        case ACTION.LOADING:       return ReduxHelper.setPending(state, PendingState.LOADING);
        case ACTION.ERROR:         return ReduxHelper.setError(state, action.data);

        case ACTION.RESET:         return defaultState;
        case ACTION.SOFT_RESET:    return ReduxHelper.setSoftReset(state);

        case ACTION.NO_CONNECTION: return ReduxHelper.setNoConnection(state);

        default: break;
      }

      // eslint-disable-next-line no-console
      console.warn(`Unhandled action occured (type = ${action.type}. This is most likely a bug and not intended.)`);
    }

    return state;
  };

  static cloneState = <T extends GenericReducerType>(state: T): T => {
    const cpy = { ...state };
    cpy.meta = { ...state.meta };
    return cpy;
  };
}
