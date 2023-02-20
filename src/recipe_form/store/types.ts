import { Dispatch as ReduxDispatch } from 'redux';

import ItemReducerType from '../../common/store/ItemReducerType';
import { GenericItemReducerAction } from '../../common/store/ReduxHelper';
import { Recipe } from '../../recipe/store/RecipeTypes';

export interface AutocompleteListItem {
  name: string;
  char: string;
}

export const RECIPE_FORM_STORE  = '@@recipeForm';

export type RecipeFormAction   = GenericItemReducerAction<Recipe>;
export type RecipeFormDispatch = ReduxDispatch<RecipeFormAction>;
export type RecipeFormState    = ItemReducerType<Recipe>;
