import request from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { toBasicAction } from '../../common/store/redux';
import { ACTION } from '../../common/store/ReduxHelper';
import { handleError } from '../../common/requestUtils';
import { MENU_ITEMS_STORE, MenuItemsDispatch } from './MenuItemsTypes';
import { MenuItemDto, toMenuItem } from './MenuItemTypes';
import { RecipeDto } from '../../recipe/store/RecipeTypes';
import { SelectDataType } from '../../common/components/Input/Select';

export const load = () => (dispatch: MenuItemsDispatch) => {
  dispatch({ ...toBasicAction(MENU_ITEMS_STORE, ACTION.GET_START) });
  request()
    .get(`${serverURLs.menu_item}?complete=false`)
    .then(res => {
      dispatch({
        ...toBasicAction(
          MENU_ITEMS_STORE,
          ACTION.GET_SUCCESS
        ),
        payload: res.body.results.map((i: MenuItemDto) => toMenuItem(i)),
      });
    })
    .catch(err => dispatch(handleError(err, MENU_ITEMS_STORE)));
};

export const reset = () => (dispatch: MenuItemsDispatch) => {
  dispatch({ ...toBasicAction(MENU_ITEMS_STORE, ACTION.RESET) });
};

export const fetchRecipeList = (searchTerm: string) => request()
    .get(`${serverURLs.recipe}?fields=id,title&limit=5&search=${searchTerm}`)
    .then(res => {
      const titles: Array<SelectDataType> = [];
      res.body.results.map((recipe: RecipeDto) => {
        titles.push({ value: String(recipe.id), label: recipe.title });
        return recipe;
      });
      return titles;
    })
    .catch(() => []);
