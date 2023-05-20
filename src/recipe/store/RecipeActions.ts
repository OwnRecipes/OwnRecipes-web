import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { ACTION } from '../../common/store/ReduxHelper';
import { toBasicAction } from '../../common/store/redux';
import { handleError } from '../../common/requestUtils';
import { Recipe, RecipeAction, RecipeActionTypes, RecipeDispatch, RecipeDto, RECIPE_STORE, toRecipe } from './RecipeTypes';

export const getRecipeSuccess = (recipe: Recipe): RecipeAction => (
  { ...toBasicAction(RECIPE_STORE, ACTION.GET_SUCCESS), payload: recipe }
);

export const load = (recipeSlug: string) => (dispatch: RecipeDispatch) => {
  dispatch({ ...toBasicAction(RECIPE_STORE, ACTION.GET_START) });
  request
    .get(`${serverURLs.recipe}${recipeSlug}/`)
    .then(res => {
      dispatch(getRecipeSuccess(toRecipe(res.body as RecipeDto)));
    })
    .catch(err => dispatch(handleError(err, RECIPE_STORE)));
};

export const deleteRecipe = (id: number, recipeSlug: string) => (dispatch: RecipeDispatch) => {
  dispatch({ ...toBasicAction(RECIPE_STORE, ACTION.DELETE_START) });
  request
    .delete(`${serverURLs.recipe}${recipeSlug}/`)
    .then(() => {
      dispatch({ ...toBasicAction(RECIPE_STORE, RecipeActionTypes.RECIPE_DELETE), payload: { id: id } });
    })
    .catch(err => dispatch(handleError(err, RECIPE_STORE)));
};

export const updateServings = (recipeSlug: string, value: number) => (dispatch: RecipeDispatch) => {
  dispatch({
    ...toBasicAction(
      RECIPE_STORE,
      RecipeActionTypes.RECIPE_INGREDIENT_SERVINGS_UPDATE
    ),
    payload: {
      recipeSlug: recipeSlug,
      customServings: value,
    },
  });
};

export const preload = (recipe: Partial<Recipe>) => (dispatch: RecipeDispatch) => {
  dispatch({ ...toBasicAction(RECIPE_STORE, ACTION.PRELOAD), payload: recipe });
};

export const reset = () => (dispatch: RecipeDispatch) => {
  dispatch({ ...toBasicAction(RECIPE_STORE, ACTION.RESET) });
};
