import { useCallback } from 'react';
import { useDispatch as useReduxDispatch, useSelector as useSelectorRedux } from 'react-redux';
import { get as _get } from 'lodash-es';

import useCrash from '../hooks/useCrash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyDispatch = (dispatch: any) => any;

export function useDispatch() {
  const dispatch = useReduxDispatch();
  const crash = useCrash();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useCallback((disp: any) => {
    try {
      return dispatch(disp);
    } catch (err) {
      crash(err as Error);
      return null;
    }
  }, []);
}

export function useSelector<TState = {}, TSelected = unknown>(
    selector: (state: TState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
  ): TSelected {
  const storeValue: TSelected = useSelectorRedux(selector, equalityFn);

  return storeValue;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function keySelector<T>(state: T, key: string): any { return _get(state, key); }

export type BasicReduxAction = {
  /** @deprecated */
  type: string;
}

export type BasicAction = {
  store: string;
  // typs: string; // uncommented to not generalize the typ-ids
} & BasicReduxAction;

export type PayloadAction<T> = {
  payload: T;
} & BasicAction;

export function toBasicAction<TStore extends string, TTyps>(store: TStore, typs: TTyps): {
  store: TStore,
  type:  string,
  typs:  TTyps,
} {
  return {
    store: store,
    type:  `${store}/${typs}`,
    typs:  typs,
  };
}
