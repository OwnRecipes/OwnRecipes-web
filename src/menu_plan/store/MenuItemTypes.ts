import { Dispatch as ReduxDispatch } from 'redux';

import { GenericItemReducerAction } from '../../common/store/ReduxHelper';
import ItemReducerType from '../../common/store/ItemReducerType';
import { RecipeList, RecipeListDto, toRecipeList } from '../../recipe/store/RecipeTypes';
import { PayloadAction } from '../../common/store/redux';

export const MENU_ITEM_STORE  = 'menuItem';

export interface MenuItemDto {
  id:          number;
  recipe_data: RecipeListDto;
  start_date:  string;
  complete:    boolean;
}

export type MenuItem = Omit<MenuItemDto, 'recipe_data'> & {
  recipe_data: RecipeList;
};

export const toMenuItem = (dto: MenuItemDto): MenuItem => ({ ...dto, recipe_data: toRecipeList(dto.recipe_data) });

export type MenuItemUpdate = Omit<MenuItem, 'id' | 'recipe_data'> & {
  recipe: number;
};

export enum MenuItemActionTypes {
  HIDE_COMPLETED             = 'MENU_ITEM_HIDE_COMPLETED',
}

export type IMenuItemHideCompletedAction = {
  store:   typeof MENU_ITEM_STORE;
  typs:    typeof MenuItemActionTypes.HIDE_COMPLETED;
} & PayloadAction<number>;

export type MenuItemState    = ItemReducerType<MenuItem>;
export type MenuItemAction   = GenericItemReducerAction<MenuItem> | IMenuItemHideCompletedAction;
export type MenuItemDispatch = ReduxDispatch<MenuItemAction>;
