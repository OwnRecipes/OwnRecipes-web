import { Dispatch as ReduxDispatch } from 'redux';
import ArrayReducerType from '../../common/store/ArrayReducerType';
import { PayloadAction } from '../../common/store/redux';

import { GenericArrayReducerAction } from '../../common/store/ReduxHelper';
import { GroceryListItem } from './GroceryListItemTypes';

export enum GroceryListItemsActionTypes {
  TOGGLE_ITEMS = 'TOGGLE_ITEMS',
  DELETE_COMPLETED_ITEMS = 'DELETE_COMPLETED_ITEMS',
}

export const GROCERY_LIST_ITEMS_STORE = '@@groceryListItems';

export type IGroceryListItemsToggleAllAction = {
  store: typeof GROCERY_LIST_ITEMS_STORE;
  typs:  typeof GroceryListItemsActionTypes.TOGGLE_ITEMS;
} & PayloadAction<Array<{ id: number, completed: boolean }>>;

export type IGroceryListItemsDeleteCompletedAction = {
  store: typeof GROCERY_LIST_ITEMS_STORE;
  typs:  typeof GroceryListItemsActionTypes.DELETE_COMPLETED_ITEMS;
} & PayloadAction<{ listId: number, ids: Array<number> }>;

export type GroceryListItemsState    = ArrayReducerType<GroceryListItem>;
export type GroceryListItemsAction   = IGroceryListItemsToggleAllAction | IGroceryListItemsDeleteCompletedAction | GenericArrayReducerAction<GroceryListItem>;
export type GroceryListItemsDispatch = ReduxDispatch<GroceryListItemsAction>;
