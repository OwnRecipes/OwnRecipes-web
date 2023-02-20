import { Dispatch as ReduxDispatch } from 'redux';

import ItemReducerType from '../../common/store/ItemReducerType';
import { PayloadAction } from '../../common/store/redux';
import { GenericItemReducerAction } from '../../common/store/ReduxHelper';
import { IngredientGroup, SubRecipe } from '../../recipe/store/RecipeTypes';

export interface GroceryListDto {
  id:    number;
  title: string; // Tasty Chili 24
  slug:  string; // tasty-werwerchili-4
  item_count: number;
}

export interface GroceryList {
  id:    number;
  title: string; // Tasty Chili 24
  slug:  string; // tasty-werwerchili-4
  item_count: number;
}

export const toGroceryList = (dto: GroceryListDto): GroceryList => ({
  id:    dto.id,
  title: dto.title,
  slug:  dto.slug,
  item_count: dto.item_count,
});

export interface GroceryListCreate {
  title: string;
}

export interface GroceryListUpdate {
  title: string;
}

export interface GroceryListBulkAdd {
  subrecipes: Array<SubRecipe>;
  ingredientGroups: Array<IngredientGroup>;
}

export const GROCERY_LIST_STORE = '@@groceryList';

export enum GroceryListActionTypes {
  BULK_ADD = 'BULK_ADD',
}

export type IGroceryListBulkAddAction = {
  store: typeof GROCERY_LIST_STORE;
  typs:  typeof GroceryListActionTypes.BULK_ADD;
} & PayloadAction<Array<{ listId: number, item: string }>>;

export type GroceryListState     = ItemReducerType<GroceryList>;
export type GroceryListAction    = IGroceryListBulkAddAction | GenericItemReducerAction<GroceryList>;
export type GroceryListDispatch  = ReduxDispatch<GroceryListAction>;
