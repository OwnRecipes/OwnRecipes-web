import * as _ from 'lodash-es';

import ReduxHelper, { ACTION, GenericItemReducerAction, toBasicAction } from '../../common/store/ReduxHelper';
import { Recipe } from '../../recipe/store/RecipeTypes';
import { RecipeFormAction, RecipeFormActionTypes, RecipeFormState, RECIPE_FORM_STORE } from './types';
import ingredient, { RecipeIngredientReducerActionTypes, RECIPE_INGREDIENTS_STORE } from '../../recipe/store/IngredientReducer';
import subrecipes, { RecipeSubrecipesReducerActionTypes, RECIPE_SUBRECIPES_STORE } from '../../recipe/store/SubRecipeReducer';
import fq from '../../recipe/utilts/formatQuantity';

const defaultState: RecipeFormState = ReduxHelper.getItemReducerDefaultState(RECIPE_FORM_STORE) as RecipeFormState;

const reducer = (state = defaultState, action: RecipeFormAction): RecipeFormState => {
  if (RECIPE_FORM_STORE === action.store) {
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
      case RecipeFormActionTypes.RECIPE_FORM_INIT:
         {
           const newState = _.cloneDeep(defaultState);

           newState.item  = action.payload as Recipe;

           return newState;
         }
      case RecipeFormActionTypes.RECIPE_FORM_UPDATE:
        {
          const newState = ReduxHelper.cloneState(state);

          const newItem  = _.clone(newState.item) ?? {} as Recipe;
          _.set(newItem, action.payload.name, action.payload.value);

          if (state.item?.ingredientGroups !== newItem.ingredientGroups && newItem.ingredientGroups) {
            const ingredients = ingredient(
              [],
              {
                ...toBasicAction(
                  RECIPE_INGREDIENTS_STORE,
                  RecipeIngredientReducerActionTypes.RECIPE_INGREDIENTS_LOAD
                ),
                payload: newItem.ingredientGroups,
                formatQuantity: fq.bind(this, newItem.servings ?? 1, newItem.servings ?? 1),
              }
            );
            newItem.ingredientGroups = ingredients;
          }

          newState.item   = newItem;
          newState.meta.dirty  = true;
          ReduxHelper.doSetValidation(newState, action.payload.validation, 'merge');

          return newState;
        }
      default: break;
    }
  }

  return ReduxHelper.caseItemDefaultReducer(state, action as GenericItemReducerAction<Recipe>, defaultState) as RecipeFormState;
};

export default reducer;
