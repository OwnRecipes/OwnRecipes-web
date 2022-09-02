import * as _ from 'lodash-es';

import ingredient, { RecipeIngredientReducerActionTypes, RECIPE_INGREDIENTS_STORE } from './IngredientReducer';
import subrecipes, { RecipeSubrecipesReducerActionTypes, RECIPE_SUBRECIPES_STORE } from './SubRecipeReducer';
import fq from '../utilts/formatQuantity';
import ReduxHelper, { ACTION, GenericItemReducerAction, toBasicAction } from '../../common/store/ReduxHelper';
import { Recipe, RecipeAction, RecipeActionTypes, RecipeState, RECIPE_STORE } from './RecipeTypes';

const defaultState: RecipeState = ReduxHelper.getItemReducerDefaultState<Recipe>(RECIPE_STORE);

const recipe = (state = defaultState, action: RecipeAction): RecipeState => {
  if (action.store === RECIPE_STORE) {
      switch (action.typs) {
      case ACTION.GET_SUCCESS:
        {
          const actionRecipe = action.payload;

          const isNew = state.item == null || state.item.id !== actionRecipe.id || state.item.ingredientGroups == null;
          const updServings = isNew ? actionRecipe.servings : (state.item?.customServings ?? 1);
          const subRecipes = subrecipes(
            [],
            {
              ...toBasicAction(
                RECIPE_SUBRECIPES_STORE,
                RecipeSubrecipesReducerActionTypes.RECIPE_SUBRECIPES_LOAD
              ),
              payload: actionRecipe.subrecipes,
              // TODO this is magic
              // just pass updServings and actionRecipe.servings via the payload
              formatQuantity: fq.bind(this, updServings, actionRecipe.servings),
            }
          );
          const ingredients = ingredient(
            [],
            {
              ...toBasicAction(
                RECIPE_INGREDIENTS_STORE,
                RecipeIngredientReducerActionTypes.RECIPE_INGREDIENTS_LOAD
              ),
              payload: actionRecipe.ingredientGroups,
              formatQuantity: fq.bind(this, updServings, actionRecipe.servings),
            }
          );

          const updItem: Recipe = {
            ...actionRecipe,
            subrecipes:       subRecipes,
            ingredientGroups: ingredients,
            customServings:   updServings,
          };
          return ReduxHelper.setItem(state, updItem);
        }
      case RecipeActionTypes.RECIPE_DELETE:
        return defaultState;
      case RecipeActionTypes.RECIPE_INGREDIENT_SERVINGS_UPDATE:
        {
          if (state.item == null) return state;

          const { customServings } = action.payload;
          let updItem: Recipe = _.clone(state.item);

          const subRecipes = subrecipes(
            updItem.subrecipes,
            {
              ...toBasicAction(
                RECIPE_SUBRECIPES_STORE,
                RecipeSubrecipesReducerActionTypes.RECIPE_SUBRECIPES_SERVINGS_UPDATE
              ),
              formatQuantity: fq.bind(this, updItem.servings, customServings),
            }
          );
          const ingredients = ingredient(
            updItem.ingredientGroups,
            {
              ...toBasicAction(
                RECIPE_INGREDIENTS_STORE,
                RecipeIngredientReducerActionTypes.RECIPE_INGREDIENTS_SERVINGS_UPDATE
              ),
              formatQuantity: fq.bind(this, updItem.servings, customServings),
            }
          );
          updItem = {
            ...updItem,
            subrecipes: subRecipes,
            ingredientGroups: ingredients,
            customServings: customServings,
          };

          return ReduxHelper.setItem(state, updItem);
        }
      /*
      case RecipeActionTypes.RECIPE_INGREDIENT:
      case RecipeActionTypes.RECIPE_INGREDIENT_CHECK_INGREDIENT:
      case RecipeActionTypes.RECIPE_INGREDIENT_CHECK_SUBRECIPE:
      case RecipeActionTypes.RECIPE_INGREDIENT_CHECK_ALL:
      case RecipeActionTypes.RECIPE_INGREDIENT_UNCHECK_ALL:
      case RecipeActionTypes.RECIPE_INGREDIENT_SERVINGS_RESET:
        return state.items?.map(recipe => {
          if (recipe.slug === action.payload.recipeSlug) {
            return {
              ...recipe,
              subrecipes: subrecipes(recipe.subrecipes, action),
              ingredient_groups: ingredient(recipe.ingredient_groups, action),
            };
          }
          return recipe;
        });
        return state; */
      default: break;
    }
  }

  return ReduxHelper.caseItemDefaultReducer(state, action as GenericItemReducerAction<Recipe>, defaultState);
};

export default recipe;
