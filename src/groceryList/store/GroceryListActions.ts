import { handleError, handleFormError, request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { GroceryList, GroceryListAction, GroceryListActionTypes, GroceryListBulkAdd, GroceryListCreate, GroceryListDispatch, GroceryListDto, GroceryListUpdate, GROCERY_LIST_STORE, toGroceryList } from './GroceryListTypes';
import { Ingredient, SubRecipe } from '../../recipe/store/RecipeTypes';
import { AnyDispatch, toBasicAction } from '../../common/store/redux';
import { ACTION } from '../../common/store/ReduxHelper';
import { GroceryListItemDto, toGroceryListItem } from './GroceryListItemTypes';

export const getGroceryListSuccess = (groceryList: GroceryList): GroceryListAction => (
  { ...toBasicAction(GROCERY_LIST_STORE, ACTION.GET_SUCCESS), payload: groceryList }
);

export const load = (listId: string) => (dispatch: GroceryListDispatch) => {
  dispatch({ ...toBasicAction(GROCERY_LIST_STORE, ACTION.GET_START) });
  request()
    .get(`${serverURLs.list}${listId}/`)
    .then(res => {
      dispatch(getGroceryListSuccess(toGroceryList(res.body as GroceryListDto)));
    })
    .catch(err => dispatch(handleError(err, GROCERY_LIST_STORE)));
};

export const create = async (dispatch: AnyDispatch, item: GroceryListCreate) => {
  dispatch({ ...toBasicAction(GROCERY_LIST_STORE, ACTION.CREATE_START) });

  return request()
    .post(serverURLs.list)
    .send(item)
    .then(res => {
      const groceryList = toGroceryList(res.body);
      dispatch({
        ...toBasicAction(
          GROCERY_LIST_STORE,
          ACTION.CREATE_SUCCESS
        ),
        payload: groceryList,
      });
    })
    .catch(err => handleFormError(dispatch, err, GROCERY_LIST_STORE));
};

export const update = async (dispatch: AnyDispatch, slug: string, item: Partial<GroceryListUpdate>) => {
  dispatch({ ...toBasicAction(GROCERY_LIST_STORE, ACTION.UPDATE_START) });

  return request()
    .patch(`${serverURLs.list}${slug}/`)
    .send(item)
    .then(res => {
      const groceryList = toGroceryList(res.body);
      dispatch({
        ...toBasicAction(
          GROCERY_LIST_STORE,
          ACTION.UPDATE_SUCCESS
        ),
        payload: groceryList,
      });
    })
    .catch(err => handleFormError(dispatch, err, GROCERY_LIST_STORE));
};

export const remove = (id: number, slug: string) => (dispatch: GroceryListDispatch) => {
  dispatch({ ...toBasicAction(GROCERY_LIST_STORE, ACTION.DELETE_START) });

  request()
    .delete(`${serverURLs.list}${slug}/`)
    .then(() => {
      dispatch({
        ...toBasicAction(
          GROCERY_LIST_STORE,
          ACTION.DELETE_SUCCESS
        ),
        payload: { id: id },
      });
    })
    .catch(err => dispatch(handleError(err, GROCERY_LIST_STORE)));
};

function format(i: Ingredient | SubRecipe) {
  const quantityS = i.quantity && i.quantity !== '0' ? i.quantity : undefined;
  const measurementS = i.measurement ? i.measurement : undefined;
  return [quantityS, measurementS, i.title].filter(Boolean).join(' ');
}

export const bulkAdd = async (dispatch: AnyDispatch, list: number, data: GroceryListBulkAdd) => {
  const checkedIngredients = data.ingredientGroups.flatMap(ig => ig.ingredients.map(i => ({ list: list, title: format(i) })));
  const checkedSubRecipe = data.subrecipes.map(sr => ({ list: list, title: format(sr) }));
  const allItems = checkedIngredients.concat(checkedSubRecipe);

  if (allItems.length > 0) {
    dispatch({ ...toBasicAction(GROCERY_LIST_STORE, ACTION.UPDATE_START) });
    return request()
      .post(serverURLs.bulk_list_item)
      .send(allItems)
      .then(res => {
        dispatch({ ...toBasicAction(GROCERY_LIST_STORE, GroceryListActionTypes.BULK_ADD), payload: res.body.map((i: GroceryListItemDto) => toGroceryListItem(list, i)) });
        dispatch({ ...toBasicAction(GROCERY_LIST_STORE, ACTION.UPDATE_SUCCESS) });
      })
      .catch(err => dispatch(handleError(err, GROCERY_LIST_STORE)));
  } else {
    return null;
  }
};

export const preload = (list: Partial<GroceryList>) => (dispatch: GroceryListDispatch) => {
  dispatch({ ...toBasicAction(GROCERY_LIST_STORE, ACTION.PRELOAD), payload: list });
};

export const reset = () => (dispatch: GroceryListDispatch) => {
  dispatch({ ...toBasicAction(GROCERY_LIST_STORE, ACTION.RESET) });
};
