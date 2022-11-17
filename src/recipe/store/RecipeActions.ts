import { handleError, request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { Recipe, RecipeAction, RecipeActionTypes, RecipeDispatch, RecipeDto, RECIPE_STORE, toRecipe } from './RecipeTypes';
import { ACTION } from '../../common/store/ReduxHelper';
import { toBasicAction } from '../../common/store/redux';

export const getRecipeSuccess = (recipe: Recipe): RecipeAction => (
  { ...toBasicAction(RECIPE_STORE, ACTION.GET_SUCCESS), payload: recipe }
);

export const load = (recipeSlug: string) => (dispatch: RecipeDispatch) => {
  dispatch({ ...toBasicAction(RECIPE_STORE, ACTION.GET_START) });
  request()
    .get(`${serverURLs.recipe}${recipeSlug}/`)
    .then(res => {
      dispatch(getRecipeSuccess(toRecipe(res.body as RecipeDto)));
    })
    .catch(err => dispatch(handleError(err, RECIPE_STORE)));
};

export const deleteRecipe = (recipeSlug: string) => (dispatch: RecipeDispatch) => {
  dispatch({ ...toBasicAction(RECIPE_STORE, ACTION.DELETE_START) });
  request()
    .delete(`${serverURLs.recipe}${recipeSlug}/`)
    .then(() => {
      dispatch({ ...toBasicAction(RECIPE_STORE, RecipeActionTypes.RECIPE_DELETE), payload: { slug: recipeSlug } });
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

export const resetServings = (recipeSlug: string) => (dispatch: RecipeDispatch) => {
  dispatch({
    ...toBasicAction(
      RECIPE_STORE,
      RecipeActionTypes.RECIPE_INGREDIENT_SERVINGS_RESET
    ),
    payload: {
      recipeSlug: recipeSlug,
    },
  });
};

export const checkIngredient = (recipeSlug: string, id: number, value: boolean) => (dispatch: RecipeDispatch) => {
  dispatch({
    ...toBasicAction(
      RECIPE_STORE,
      RecipeActionTypes.RECIPE_INGREDIENT_CHECK_INGREDIENT
    ),
    payload: {
      recipeSlug: recipeSlug,
      id: id,
      value: value,
    },
  });
};

export const checkSubRecipe = (recipeSlug: string, id: number, value: boolean) => (dispatch: RecipeDispatch) => {
  dispatch({
    ...toBasicAction(
      RECIPE_STORE,
      RecipeActionTypes.RECIPE_INGREDIENT_CHECK_SUBRECIPE
    ),
    payload: {
      recipeSlug: recipeSlug,
      id: id,
      value: value,
    },
  });
};

export const checkAll = (recipeSlug: string) => (dispatch: RecipeDispatch) => {
  dispatch({
    ...toBasicAction(
      RECIPE_STORE,
      RecipeActionTypes.RECIPE_INGREDIENT_CHECK_ALL
    ),
    payload: {
      recipeSlug: recipeSlug,
    },
  });
};

export const unCheckAll = (recipeSlug: string) => (dispatch: RecipeDispatch) => {
  dispatch({
    ...toBasicAction(
      RECIPE_STORE,
      RecipeActionTypes.RECIPE_INGREDIENT_UNCHECK_ALL
    ),
    payload: {
      recipeSlug: recipeSlug,
    },
  });
};

/*
export const bulkAdd = (recipeState: Recipe, list: string) => (dispatch: RecipeDispatch) => {
  const format = (i: Ingredient) => {
    const quantity = i.quantity && i.quantity !== '0' ? `${i.quantity} ` : '';
    const measurement = i.measurement ? `${i.measurement} ` : '';
    return quantity + measurement + i.title;
  };

  let checkedIngredients = recipeState.ingredient_groups.map(item => item.ingredients.reduce((myList, ingredient) => {
      if (ingredient && ingredient.checked) {
        myList.push({ list: list, title: format(ingredient) });
      }
      return myList;
    }, []));

  const checkedSubRecipe = recipeState.subrecipes.reduce((myList, ingredient) => {
    if (ingredient && ingredient.checked) {
      myList.push({ list: list, title: format(ingredient) });
    }
    return myList;
  }, []);

  checkedIngredients = checkedIngredients.reduce((a, b) => a.concat(b), []).concat(checkedSubRecipe);

  if (checkedIngredients.length > 0) {
    dispatch({ ...toBasicAction(RECIPE_LIST_STORE, RecipeConstants.RECIPE_LIST_LOADING) });
    request()
      .post(serverURLs.bulk_list_item)
      .send(checkedIngredients)
      .then(res => {
        dispatch({ ...toBasicAction(RECIPE_LIST_STORE, RecipeConstants.RECIPE_LIST_COMPLETE) });
        dispatch({
          ...toBasicAction(
            RECIPE_LIST_STORE
            RecipeConstants.RECIPE_INGREDIENT_UNCHECK_ALL
          ),
          payload: {
            recipeSlug: recipeState.slug,
          },
        });
      })
      .catch(err => dispatch(handleError(err, RECIPE_LIST_STORE)));
  }
};
*/

export const preload = (recipe: Partial<Recipe>) => (dispatch: RecipeDispatch) => {
  dispatch({ ...toBasicAction(RECIPE_STORE, ACTION.PRELOAD), payload: recipe });
};

export const reset = () => (dispatch: RecipeDispatch) => {
  dispatch({ ...toBasicAction(RECIPE_STORE, ACTION.RESET) });
};
