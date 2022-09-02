import { Dispatch as ReduxDispatch } from 'redux';

import ItemReducerType from '../../common/store/ItemReducerType';
import { GenericItemReducerAction, PayloadAction } from '../../common/store/ReduxHelper';
import { ValidationResult } from '../../common/store/Validation';
import { Recipe } from '../../recipe/store/RecipeTypes';

export type AutocompleteListItem = {
  name: string;
  char: string;
}

export const RECIPE_FORM_STORE  = '@@recipeForm';

export enum RecipeFormActionTypes {
  RECIPE_FORM_INIT   = 'RECIPE_FORM_INIT',
  RECIPE_FORM_UPDATE = 'RECIPE_FORM_UPDATE',
  RECIPE_FORM_ERROR  = 'RECIPE_FORM_ERROR',
}

export type IRecipeInitAction = {
  store: typeof RECIPE_FORM_STORE;
  typs:  typeof RecipeFormActionTypes.RECIPE_FORM_INIT;
} & PayloadAction<Partial<Recipe>>;

type FormUpdate = {
  name:  string;
  value: unknown;
  validation: ValidationResult | undefined;
};

export type IRecipeUpdateAction = {
  store: typeof RECIPE_FORM_STORE;
  typs:  typeof RecipeFormActionTypes.RECIPE_FORM_UPDATE;
} & PayloadAction<FormUpdate>;

export type RecipeFormAction   = IRecipeInitAction | IRecipeUpdateAction | GenericItemReducerAction<Recipe>;
export type RecipeFormDispatch = ReduxDispatch<RecipeFormAction>;
export type RecipeFormState    = ItemReducerType<Recipe>;
