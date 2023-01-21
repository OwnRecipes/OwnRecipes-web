import { Dispatch as ReduxDispatch } from 'redux';
import { BasicAction, PayloadAction } from '../../common/store/redux';
import { QuantityFormatter } from './IngredientReducer';
import { RecipeActionTypes, SubRecipe } from './RecipeTypes';

export const RECIPE_SUBRECIPES_STORE = '@@recipeSubrecipes';

export enum RecipeSubrecipesReducerActionTypes {
  RECIPE_SUBRECIPES_LOAD = 'RECIPE_SUBRECIPES_LOAD',
}

export type IRecipeSubrecipesLoadAction = {
  store: typeof RECIPE_SUBRECIPES_STORE;
  typs: typeof RecipeSubrecipesReducerActionTypes.RECIPE_SUBRECIPES_LOAD;
  formatQuantity: QuantityFormatter;
} & PayloadAction<Array<SubRecipe>>;

export type IRecipeSubrecipesIngredientsUpdateAction = {
  store: typeof RECIPE_SUBRECIPES_STORE;
  typs: typeof RecipeActionTypes.RECIPE_INGREDIENT_SERVINGS_UPDATE;
  formatQuantity: QuantityFormatter;
} & BasicAction;

export type RecipeSubrecipesState    = Array<SubRecipe>;
export type RecipeSubrecipesAction   = IRecipeSubrecipesLoadAction | IRecipeSubrecipesIngredientsUpdateAction;
export type RecipeSubrecipesDispatch = ReduxDispatch<RecipeSubrecipesAction>;

// eslint-disable-next-line arrow-body-style
const merge = (state: RecipeSubrecipesState, subrecipes: Array<SubRecipe>, formatQuantity: QuantityFormatter) => {
  return subrecipes.map(subrecipe => {
    const custom = formatQuantity(subrecipe.numerator, subrecipe.denominator);
    return { ...subrecipe, quantity: custom };
  });
};

const defaultState: RecipeSubrecipesState = [];

const subRecipes = (state = defaultState, action: RecipeSubrecipesAction) => {
  if (action.store === RECIPE_SUBRECIPES_STORE) {
    switch (action.typs) {
      case RecipeSubrecipesReducerActionTypes.RECIPE_SUBRECIPES_LOAD:
        return merge(state, action.payload, action.formatQuantity);
      case RecipeActionTypes.RECIPE_INGREDIENT_SERVINGS_UPDATE:
        return state.map(i => {
          const custom = action.formatQuantity(i.numerator, i.denominator);
          return { ...i, quantity: custom };
        });
      default:
        break;
    }
  }

  return state;
};

export default subRecipes;
