import request from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { ACTION } from '../../common/store/ReduxHelper';
import { AnyDispatch, toBasicAction } from '../../common/store/redux';
import { AutocompleteListItem } from '../../common/components/Input/TextareaAutocomplete';
import { handleError, handleFormError } from '../../common/requestUtils';
import { Recipe, RecipeDto, toRecipe, toRecipeRequest } from '../../recipe/store/RecipeTypes';
import { COURSES_STORE, CUISINES_STORE, SEASONS_STORE, TAGS_STORE } from '../../recipe_groups/store/types';
import { getRecipeSuccess } from '../../recipe/store/RecipeActions';
import { RecipeFormDispatch, RECIPE_FORM_STORE } from './types';

export const load = (recipeSlug: string) => (dispatch: RecipeFormDispatch) => {
  dispatch({ ...toBasicAction(RECIPE_FORM_STORE, ACTION.GET_START) });
  request()
    .get(`${serverURLs.recipe}${recipeSlug}/`)
    .then(res => {
      const recipe = toRecipe(res.body);
      dispatch({
        ...toBasicAction(
          RECIPE_FORM_STORE,
          ACTION.GET_SUCCESS
        ),
        payload: recipe,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(getRecipeSuccess(recipe) as any);
    })
    .catch(err => dispatch(handleError(err, RECIPE_FORM_STORE)));
};

export const preload = (recipe: Partial<Recipe>) => (dispatch: RecipeFormDispatch) => {
  dispatch({ ...toBasicAction(RECIPE_FORM_STORE, ACTION.PRELOAD), payload: recipe });
};

export const reset = () => (dispatch: RecipeFormDispatch) => {
  dispatch({ ...toBasicAction(RECIPE_FORM_STORE, ACTION.RESET) });
};

export const save = async (dispatch: AnyDispatch, data: Recipe) => {
  const photo = (typeof data.photo === 'object') ? data.photo : undefined;

  const isNew = !data.id;
  const r = isNew
      ? request().post(serverURLs.recipe)
      : request().patch(`${serverURLs.recipe}${data.slug}/`);

  dispatch({
    ...toBasicAction(
      RECIPE_FORM_STORE,
      isNew ? ACTION.CREATE_START : ACTION.UPDATE_START
    ),
  });

  const dto = toRecipeRequest(data);
  return r.send(dto)
    .then(res => {
      if (photo) {
        return request()
          .patch(`${serverURLs.recipe}${res.body.slug}/`)
          .attach('photo', photo)
          .then(resPhoto => {
            const recipe = toRecipe(resPhoto.body);
            dispatch({
              ...toBasicAction(
                RECIPE_FORM_STORE,
                isNew ? ACTION.CREATE_SUCCESS : ACTION.UPDATE_SUCCESS
              ),
              oldId: data.id,
              payload: recipe,
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dispatch(getRecipeSuccess(recipe) as any);
          })
          .catch(err => handleFormError(dispatch, err, RECIPE_FORM_STORE));
        } else {
          const recipe = toRecipe(res.body);
          dispatch({
            ...toBasicAction(
              RECIPE_FORM_STORE,
              isNew ? ACTION.CREATE_SUCCESS : ACTION.UPDATE_SUCCESS
            ),
            oldId: isNew ? (null as any) : data.id, // eslint-disable-line @typescript-eslint/no-explicit-any
            payload: recipe,
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          dispatch(getRecipeSuccess(recipe) as any);
        }
      // OPT HACK: Move this to recipe_groups
      dispatch(invalidateCreatableLists(data, toRecipe(res.body)));
      return null;
    })
    .catch(err => handleFormError(dispatch, err, RECIPE_FORM_STORE));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const invalidateCreatableLists = (oldRecipe: Recipe, savedRecipe: Recipe): any => (dispatch: any) => {
  if (oldRecipe.course?.id !== savedRecipe.course?.id) {
    dispatch({ ...toBasicAction(COURSES_STORE, ACTION.RESET) });
  }
  if (oldRecipe.cuisine?.id !== savedRecipe.cuisine?.id) {
    dispatch({ ...toBasicAction(CUISINES_STORE, ACTION.RESET) });
  }
  if (oldRecipe.season?.id !== savedRecipe.season?.id) {
    dispatch({ ...toBasicAction(SEASONS_STORE, ACTION.RESET) });
  }
  if (oldRecipe.tags?.map(t => t.id).join('/') !== savedRecipe.tags?.map(t => t.id).join('/')) {
    dispatch({ ...toBasicAction(TAGS_STORE, ACTION.RESET) });
  }
};

export const fetchRecipeList = (searchTerm: string): Promise<Array<AutocompleteListItem>> => request()
    .get(`${serverURLs.recipe}?fields=id,title,slug&limit=5&search=${searchTerm}`)
    .then(res => res.body.results.map((recipe: RecipeDto) => ({ key: recipe.slug, name: recipe.slug, char: recipe.title } as AutocompleteListItem)))
    .catch(() => []);
