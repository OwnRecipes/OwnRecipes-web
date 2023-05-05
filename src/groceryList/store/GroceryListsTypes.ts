import { Dispatch as ReduxDispatch } from 'redux';

import ArrayReducerType from '../../common/store/ArrayReducerType';
import { GenericArrayReducerAction } from '../../common/store/ReduxHelper';
import { GroceryList } from './GroceryListTypes';

export const GROCERY_LISTS_STORE  = 'groceryLists';

export type GroceryListsState = ArrayReducerType<GroceryList>;
export type GroceryListsAction   = GenericArrayReducerAction<GroceryList>;
export type GroceryListsDispatch = ReduxDispatch<GroceryListsAction>;
