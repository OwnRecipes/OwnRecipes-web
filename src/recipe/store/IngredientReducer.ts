import { Dispatch as ReduxDispatch } from 'redux';

import { BasicAction, PayloadAction } from '../../common/store/redux';
import { Ingredient, IngredientGroup, RecipeActionTypes } from './RecipeTypes';

export const RECIPE_INGREDIENTS_STORE = '@@recipeIngredients';

export type QuantityFormatter = (numerator: number | undefined, denominator: number) => string;

export enum RecipeIngredientReducerActionTypes {
  RECIPE_INGREDIENTS_LOAD            = 'RECIPE_INGREDIENTS_LOAD',
}

export type IRecipeIngredientLoadAction = {
  store: typeof RECIPE_INGREDIENTS_STORE;
  typs: typeof RecipeIngredientReducerActionTypes.RECIPE_INGREDIENTS_LOAD;
  formatQuantity: (numerator: number | undefined, denominator: number) => string;
} & PayloadAction<Array<IngredientGroup>>;

export type IRecipeIngredientServingsUpdateAction = {
  store: typeof RECIPE_INGREDIENTS_STORE;
  typs: typeof RecipeActionTypes.RECIPE_INGREDIENT_SERVINGS_UPDATE;
  formatQuantity: (numerator: number | undefined, denominator: number) => string;
} & BasicAction;

export type RecipeIngredientsState = Array<IngredientGroup>;
export type RecipeIngredientsAction = IRecipeIngredientLoadAction | IRecipeIngredientServingsUpdateAction;
export type RecipeIngredientsDispatch  = ReduxDispatch<RecipeIngredientsAction>;

type RecalcFunction<T> = (ingr: T) => T;

const ingredients = (igs: Array<IngredientGroup>, cb: RecalcFunction<Ingredient>): Array<IngredientGroup> => igs.map(ig => ({
  ...ig,
  ingredients: ig.ingredients.map(ingredient => cb(ingredient)),
}));

// eslint-disable-next-line arrow-body-style
const merge = (state: RecipeIngredientsState, ingredientGroups: Array<IngredientGroup>, formatQuantity: QuantityFormatter) => {
  return ingredients(ingredientGroups, ingr => {
    const custom = formatQuantity(ingr.numerator, ingr.denominator);
    return { ...ingr, quantity: custom };
  });
};

const defaultState: RecipeIngredientsState = [];

const ingredient = (state = defaultState, action: RecipeIngredientsAction): RecipeIngredientsState => {
  if (action.store === RECIPE_INGREDIENTS_STORE) {
    switch (action.typs) {
      case RecipeIngredientReducerActionTypes.RECIPE_INGREDIENTS_LOAD:
        return merge(state, action.payload, action.formatQuantity);
      case RecipeActionTypes.RECIPE_INGREDIENT_SERVINGS_UPDATE:
        return ingredients(state, i => {
          const custom = action.formatQuantity(i.numerator, i.denominator);
          return { ...i, quantity: custom };
        });
      default:
        break;
    }
  }

  return state;
};

export default ingredient;
