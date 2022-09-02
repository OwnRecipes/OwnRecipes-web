import { Dispatch as ReduxDispatch } from 'redux';
import { BasicAction, PayloadAction } from '../../common/store/ReduxHelper';
import { Ingredient, IngredientGroup } from './RecipeTypes';

export const RECIPE_INGREDIENTS_STORE = '@@recipeIngredients';

export type QuantityFormatter = (numerator: number | undefined, denominator: number) => string;

export enum RecipeIngredientReducerActionTypes {
  RECIPE_INGREDIENTS_LOAD = 'RECIPE_INGREDIENTS_LOAD',
  RECIPE_INGREDIENTS_SERVINGS_UPDATE = 'RECIPE_INGREDIENTS_SERVINGS_UPDATE',
}

export type IRecipeIngredientLoadAction = {
  store: typeof RECIPE_INGREDIENTS_STORE;
  typs: typeof RecipeIngredientReducerActionTypes.RECIPE_INGREDIENTS_LOAD;
  formatQuantity: (numerator: number | undefined, denominator: number) => string;
} & PayloadAction<Array<IngredientGroup>>;

export type IRecipeIngredientServingsUpdateAction = {
  store: typeof RECIPE_INGREDIENTS_STORE;
  typs: typeof RecipeIngredientReducerActionTypes.RECIPE_INGREDIENTS_SERVINGS_UPDATE;
  formatQuantity: (numerator: number | undefined, denominator: number) => string;
} & BasicAction;

export type RecipeIngredientsState = Array<IngredientGroup>;
export type RecipeIngredientsAction = IRecipeIngredientLoadAction | IRecipeIngredientServingsUpdateAction;
export type RecipeIngredientsDispatch  = ReduxDispatch<RecipeIngredientsAction>;

type IngredientReduceFunction = (ingr: Ingredient) => Ingredient;

const ingredients = (state: RecipeIngredientsState, cb: IngredientReduceFunction): RecipeIngredientsState => state.map(ig => ({
  ...ig,
  ingredients: ig.ingredients.map(ingredient => cb(ingredient)),
}));

const merge = (state: RecipeIngredientsState, ingredientGroups: Array<IngredientGroup>, formatQuantity: QuantityFormatter) => {
  const list: Array<number> = [];
  state
    .map(ig => ig.ingredients)
    .forEach(ingrArray => {
      ingrArray
        .filter(ingr => ingr.checked)
        .forEach(ingr => list.push(ingr.id));
    });

  return ingredients(ingredientGroups, ingr => {
    const checked = list.includes(ingr.id);
    const custom = formatQuantity(ingr.numerator, ingr.denominator);
    return { ...ingr, quantity: custom, checked: checked };
  });
};

const defaultState: RecipeIngredientsState = [];

const recipes = (state = defaultState, action: RecipeIngredientsAction): RecipeIngredientsState => {
  if (action.store === RECIPE_INGREDIENTS_STORE) {
    switch (action.typs) {
      case RecipeIngredientReducerActionTypes.RECIPE_INGREDIENTS_LOAD:
        return merge(state, action.payload, action.formatQuantity);
      case RecipeIngredientReducerActionTypes.RECIPE_INGREDIENTS_SERVINGS_UPDATE:
        return ingredients(state, i => {
          const custom = action.formatQuantity(i.numerator, i.denominator);
          return { ...i, quantity: custom };
        });
      /*
      case RecipeActionTypes.RECIPE_INGREDIENT_CHECK_INGREDIENT:
        return ingredients(state, i => {
          if (i.id === action.id) {
            return { ...i, checked: action.value };
          }
          return i;
        });
      case RecipeActionTypes.RECIPE_INGREDIENT_CHECK_ALL:
        return ingredients(state, i => ({ ...i, checked: true }));
      case RecipeActionTypes.RECIPE_INGREDIENT_UNCHECK_ALL:
        return ingredients(state, i => ({ ...i, checked: false }));
      */
      default:
        break;
    }
  }

  return state;
};

export default recipes;
