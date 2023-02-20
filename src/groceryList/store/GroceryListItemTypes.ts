import { Dispatch as ReduxDispatch } from 'redux';

import ItemReducerType from '../../common/store/ItemReducerType';
import { PayloadAction } from '../../common/store/redux';
import { ACTION, GenericItemReducerAction } from '../../common/store/ReduxHelper';

export interface GroceryListItemDto {
  id:    number;
  title: string; // Tasty Chili 24
  completed: boolean;
  order: number;
}

export interface GroceryListItem {
  listId: number;

  id:    number;
  title: string; // Tasty Chili 24
  completed: boolean;
}

export const toGroceryListItem = (listId: number, dto: GroceryListItemDto): GroceryListItem => ({
  listId: listId,

  id:    dto.id,
  title: dto.title,
  completed: dto.completed ?? false,
});

export interface GroceryListItemCreateDto {
  list: number;
  title: string;
}

export interface GroceryListItemCreate {
  title: string;
}

export interface GroceryListItemUpdate {
  title: string;
}

export const GROCERY_LIST_ITEM_STORE = '@@groceryListItem';

export enum GroceryListItemActionTypes {
  TOGGLE_ITEM = 'TOGGLE_ITEM',
}

export type IGroceryListItemDeleteSuccessAction = {
  typs: typeof ACTION.DELETE_SUCCESS;
} & PayloadAction<{ listId: number, id: number }>;

export type IGroceryListItemToggleAction = {
  store: typeof GROCERY_LIST_ITEM_STORE;
  typs:  typeof GroceryListItemActionTypes.TOGGLE_ITEM;
} & PayloadAction<{ listId: number, id: number }>;

export type GroceryListItemState     = ItemReducerType<GroceryListItem>;
export type GroceryListItemAction    = IGroceryListItemDeleteSuccessAction | IGroceryListItemToggleAction | GenericItemReducerAction<GroceryListItem>;
export type GroceryListItemDispatch  = ReduxDispatch<GroceryListItemAction>;
