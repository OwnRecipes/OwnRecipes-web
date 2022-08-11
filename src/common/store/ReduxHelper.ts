import { AnyAction } from 'redux';
import * as _ from 'lodash-es';

import GenericReducerType, { PendingState } from './GenericReducerType';
import ArrayReducerType from './ArrayReducerType';
import ItemReducerType from './ItemReducerType';
import MapReducerType from './MapReducerType';
import { createValidationResult, isValidationResult, ValidationResult } from './Validation';

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
  store: string;
  type:  typeof ACTION.CREATE_START;
}

export type ItemCreateSuccessAction<T> = {
  store: string;
  type:  typeof ACTION.CREATE_SUCCESS;
  data:  T;
}

export type GenericDeleteStartAction = {
  store: string;
  type:  typeof ACTION.DELETE_START;
}

export type ItemDeleteSuccessAction = {
  store: string;
  type:  typeof ACTION.DELETE_SUCCESS;
  data:  { id: number }
}

export type GenericErrorAction = {
  store: string;
  type:  typeof ACTION.ERROR;
  data?: ValidationResult | Error;
}

export type GenericGetStartAction = {
  store: string;
  type:  typeof ACTION.GET_START;
}

export type ArrayGetSuccessAction<T> = {
  store: string;
  type:  typeof ACTION.GET_SUCCESS;
  data:  Array<T>;
}

export type ItemGetSuccessAction<T> = {
  store: string;
  type:  typeof ACTION.GET_SUCCESS;
  data:  T;
}

export type MapGetSuccessAction<T> = {
  store: string;
  type:  typeof ACTION.GET_SUCCESS;
  id:    string | number;
  data:  T;
}

export type GenericLoadingAction = {
  store: string;
  type:  typeof ACTION.LOADING;
}

export type GenericNoConnectionAction = {
  store: string;
  type:  typeof ACTION.NO_CONNECTION;
}

export type GenericPreloadAction<T> = {
  store: string;
  type:  typeof ACTION.PRELOAD;
  data:  Partial<T>;
}

export type GenericResetAction = {
  store: string;
  type:  typeof ACTION.RESET;
}

export type GenericSoftResetAction = {
  store: string;
  type:  typeof ACTION.SOFT_RESET;
}

export type GenericUpdateStartAction = {
  store: string;
  type:  typeof ACTION.UPDATE_START;
}

export type ItemUpdateSuccessAction<T> = {
  store: string;
  type:  typeof ACTION.UPDATE_SUCCESS;
  oldId: number;
  data:  T;
}

export type ValidationResultAction = {
  store: string;
  type:  typeof ACTION.VALIDATION;
  data?: ValidationResult;
  mode?: 'overwrite' | 'merge';
}

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

      item: undefined,
      dirty: false,

      error: undefined,
      validation: undefined,
      pending: PendingState.INITIAL,
      hasConnection: true,
    };

    return newState;
  };

  static getArrayReducerDefaultState = <T>(ident: string): ArrayReducerType<T> => {
    const newState: ArrayReducerType<T> = {
      ident: ident,

      items: undefined,

      error: undefined,
      validation: undefined,
      pending: PendingState.INITIAL,
      hasConnection: true,
    };

    return newState;
  };

  static getMapReducerDefaultState = <T>(ident: string): MapReducerType<T> => {
    const newState: MapReducerType<T> = {
      ident: ident,

      items: undefined,

      error: undefined,
      validation: undefined,
      pending: PendingState.INITIAL,
      hasConnection: true,
    };

    return newState;
  };

  static setItem = <T>(state: T, item: unknown | undefined): T => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newState = { ...state } as any;

    newState.error   = undefined;
    newState.pending = PendingState.COMPLETED;
    newState.hasConnection = true;

    newState.item  = item;
    newState.dirty = false;

    return newState;
  };

  static preloadItem = <T>(state: T, item: unknown | undefined): T => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newState = { ...state } as any;

    newState.error   = undefined;
    newState.pending = PendingState.INITIAL;

    newState.item  = item;

    return newState;
  };

  static setArray<T>(state: ArrayReducerType<T>, items: Array<T>): ArrayReducerType<T> {
    const updState = _.clone(state);

    updState.error = undefined;
    updState.pending = PendingState.COMPLETED;
    updState.hasConnection = true;
    updState.items = items;
    return updState;
  }

  static setMapItem<T>(state: MapReducerType<T>, id: string, item: T): MapReducerType<T> {
    const updState = _.clone(state);
    const map = updState.items;
    const updMap = map ? _.clone(map) : {};

    _.set(updMap, id, item);

    updState.error = undefined;
    updState.pending = PendingState.COMPLETED;
    updState.hasConnection = true;
    updState.items = updMap;
    return updState;
  }

  static deleteMapItem<T>(state: MapReducerType<T>, id: string): MapReducerType<T> {
    const updState = _.clone(state);
    const map = updState.items;
    const updMap = map ? _.clone(map) : {};

    _.unset(updMap, id);

    updState.error = undefined;
    updState.pending = PendingState.COMPLETED;
    updState.hasConnection = true;
    updState.items = updMap;
    return updState;
  }

  static setError = <T extends GenericReducerType>(state: T, error: Error | undefined): T => {
    const newState = { ...state };

    newState.error   = error;
    newState.pending = PendingState.ABORTED;
    newState.hasConnection = true;

    return newState;
  };

  static setNoConnection = <T extends GenericReducerType>(state: T): T => {
    const newState = { ...state };

    newState.error = undefined;
    newState.pending = PendingState.INITIAL;
    newState.hasConnection = false;

    return newState;
  };

  static setPending = <T extends GenericReducerType>(state: T, pending: PendingState): T => {
    const newState = { ...state };

    newState.error   = undefined;
    newState.pending = pending;

    return newState;
  };

  static setSoftReset = <T extends GenericReducerType>(state: T): T => {
    const newState = { ...state };

    newState.error = undefined;
    newState.pending = PendingState.INITIAL;
    newState.hasConnection = true;

    return newState;
  };

  static doSetValidation = <T extends GenericReducerType>(newState: T, validation: ValidationResult | undefined, mode: 'overwrite' | 'merge') => {
    if (mode === 'overwrite' || validation == null) {
      newState.validation = validation;
    } else {
      const newErrors = isValidationResult(newState.validation) ? _.clone(newState.validation) : createValidationResult();

      Object.keys(validation).forEach(key => {
        _.set(newErrors, key, validation[key]);
      });
      newState.validation = newErrors;
    }
  };

  static setValidation = <T extends GenericReducerType>(state: T, validation: ValidationResult | undefined, mode: 'overwrite' | 'merge' = 'overwrite'): T => {
    const newState = { ...state };

    ReduxHelper.doSetValidation(newState, validation, mode);

    newState.pending = PendingState.ABORTED;
    if (mode === 'overwrite') {
      newState.hasConnection = true;
    }
    return newState;
  };

  static caseItemDefaultReducer = <T>(state: ItemReducerType<T>, action: AnyAction, defaultState: ItemReducerType<T>): ItemReducerType<T> => {
    if (state.ident === action.store) {
      switch (action.type) {
        case ACTION.CREATE_START:
        case ACTION.UPDATE_START:
          return ReduxHelper.setPending(state, PendingState.SAVING);
        case ACTION.DELETE_START:
          return ReduxHelper.setPending(state, PendingState.DELETING);
        case ACTION.GET_START:
          return ReduxHelper.setPending(state, PendingState.LOADING);

        case ACTION.CREATE_SUCCESS:
          return ReduxHelper.setItem(state, action.data);
        case ACTION.DELETE_SUCCESS:
          return defaultState;
        case ACTION.GET_SUCCESS:
        case ACTION.UPDATE_SUCCESS:
          return ReduxHelper.setItem(state, action.data);

        case ACTION.PRELOAD:
            return ReduxHelper.preloadItem(state, action.data);
        case ACTION.VALIDATION:
            return ReduxHelper.setValidation(state, action.data, action.mode);
        default:
          break;
      }
    }

    return ReduxHelper.caseDefaultReducer(state, action, defaultState);
  };

  static caseArrayDefaultReducer = <T>(state: ArrayReducerType<T>, action: AnyAction, defaultState: ArrayReducerType<T>, itemStoreIdent?: string): ArrayReducerType<T> => {
    if (itemStoreIdent === action.store) {
      const itemAction: GenericItemReducerAction<T> = action as GenericItemReducerAction<T>;
      switch (itemAction.type) {
        case ACTION.CREATE_SUCCESS:
        case ACTION.GET_SUCCESS:
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const itemId = (itemAction.data as any)?.id;
            if (itemId == null) return state;

            const updState = { ...state };
            const updItems = state.items != null ? [...state.items] : [];

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const oldIndex = updItems.findIndex(updItem => (updItem as any).id === itemId);
            if (oldIndex > -1) {
              updItems.splice(oldIndex, 1, itemAction.data);
            } else {
              updItems.push(itemAction.data);
            }

            updState.items = updItems;
            return updState;
          }
        case ACTION.DELETE_SUCCESS:
          {
            if (itemAction.data == null || state.items == null) return state;

            const updState = { ...state };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const updItems = [...state.items].filter((item: any) => item.id === itemAction.data);
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
            if (itemAction.data == null || (itemAction.data as any).id == null) return state;

            const updState = { ...state };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const updItems = state.items != null ? [...state.items].filter((item: any) => item.id === itemAction.data) : [];
            updItems.push(itemAction.data);
            updState.items = updItems;
            return updState;
          }
        default: ReduxHelper.caseDefaultReducer(state, action, defaultState);
      }
    }

    if (state.ident === action.store) {
      switch (action.type) {
        case ACTION.GET_START:
          return ReduxHelper.setPending(state, PendingState.LOADING);
        case ACTION.GET_SUCCESS:
          {
            if (action.data == null) return state;
            return ReduxHelper.setArray(state, action.data);
          }
        default:
          break;
      }
    }

    return ReduxHelper.caseDefaultReducer(state, action, defaultState);
  };

  static caseMapDefaultReducer = <T>(state: MapReducerType<T>, action: AnyAction, defaultState: MapReducerType<T>, itemStoreIdent?: string): MapReducerType<T> => {
    if (itemStoreIdent === action.store) {
      const itemAction: GenericItemReducerAction<T> = action as GenericItemReducerAction<T>;
      switch (itemAction.type) {
        case ACTION.GET_SUCCESS:
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (itemAction.data == null || (itemAction.data as any).id == null) return state;

            const updState = { ...state };
            const updItems = state.items != null ? _.clone(state.items) : {};
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            _.set(updItems, (itemAction.data as any).id, itemAction.data);
            updState.items = updItems;
            return updState;
          }
        case ACTION.DELETE_SUCCESS:
          {
            if (itemAction.data == null || state.items == null || itemAction.data.id == null) return state;

            const updState = { ...state };
            const updItems = _.clone(state.items);
            if (_.unset(updItems, String(itemAction.data.id))) {
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
      switch (action.type) {
        case ACTION.GET_START:
          return ReduxHelper.setPending(state, PendingState.LOADING);
        case ACTION.GET_SUCCESS:
          return ReduxHelper.setMapItem(state, String(action.id), action.data);
        default:
          break;
      }
    }

    return ReduxHelper.caseDefaultReducer(state, action, defaultState);
  };

  static caseDefaultReducer = <T extends GenericReducerType>(state: T, action: AnyAction, defaultState: T): T => {
    if (state.ident === action.store) {
      switch (action.type) {
        case ACTION.LOADING:       return ReduxHelper.setPending(state, PendingState.LOADING);
        case ACTION.ERROR:         return ReduxHelper.setError(state, action.data);

        case ACTION.RESET:         return defaultState;
        case ACTION.SOFT_RESET:    return ReduxHelper.setSoftReset(state);

        case ACTION.NO_CONNECTION: return ReduxHelper.setNoConnection(state);

        default: break;
      }
    }

    return state;
  };
}
