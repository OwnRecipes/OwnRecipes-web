import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { AnyDispatch, toBasicAction } from '../../common/store/redux';
import { ACTION } from '../../common/store/ReduxHelper';
import { handleError, handleFormError } from '../../common/requestUtils';
import { GroceryListItem, GroceryListItemAction, GroceryListItemActionTypes, GroceryListItemCreate, GroceryListItemCreateDto, GroceryListItemDispatch, GroceryListItemUpdate, GROCERY_LIST_ITEM_STORE, toGroceryListItem } from './GroceryListItemTypes';

export const getGroceryListItemSuccess = (groceryList: GroceryListItem): GroceryListItemAction => (
  { ...toBasicAction(GROCERY_LIST_ITEM_STORE, ACTION.GET_SUCCESS), payload: groceryList }
);

export const load = (listId: number) => (dispatch: GroceryListItemDispatch) => {
  dispatch({ ...toBasicAction(GROCERY_LIST_ITEM_STORE, ACTION.GET_START) });
  request
    .get(`${serverURLs.list_item}?list=${listId}`)
    .then(res => {
      dispatch(getGroceryListItemSuccess(toGroceryListItem(listId, res.body)));
    })
    .catch(err => dispatch(handleError(err, GROCERY_LIST_ITEM_STORE)));
};

export const create = async (dispatch: AnyDispatch, listId: number, item: GroceryListItemCreate) => {
  dispatch({ ...toBasicAction(GROCERY_LIST_ITEM_STORE, ACTION.CREATE_START) });

  const dto: GroceryListItemCreateDto = {
    list: listId,
    ...item,
  };

  return request
    .post(serverURLs.list_item)
    .send(dto)
    .then(res => {
      const groceryListItem = toGroceryListItem(listId, res.body);
      dispatch({
        ...toBasicAction(
          GROCERY_LIST_ITEM_STORE,
          ACTION.CREATE_SUCCESS
        ),
        payload: groceryListItem,
      });
    })
    .catch(err => handleFormError(dispatch, err, GROCERY_LIST_ITEM_STORE));
};

export const update = async (dispatch: AnyDispatch, listId: number, id: number, item: GroceryListItemUpdate) => {
  dispatch({ ...toBasicAction(GROCERY_LIST_ITEM_STORE, ACTION.UPDATE_START) });

  return request
    .patch(`${serverURLs.list_item}${id}/`)
    .send(item)
    .then(res => {
      const groceryListItem = toGroceryListItem(listId, res.body);
      dispatch({
        ...toBasicAction(
          GROCERY_LIST_ITEM_STORE,
          ACTION.UPDATE_SUCCESS
        ),
        payload: groceryListItem,
      });
    })
    .catch(err => handleFormError(dispatch, err, GROCERY_LIST_ITEM_STORE));
};

export const remove = (listId: number, id: number) => (dispatch: GroceryListItemDispatch) => {
  dispatch({ ...toBasicAction(GROCERY_LIST_ITEM_STORE, ACTION.DELETE_START) });

  request
    .delete(`${serverURLs.list_item}${id}/`)
    .then(() => {
      dispatch({
        ...toBasicAction(
          GROCERY_LIST_ITEM_STORE,
          ACTION.DELETE_SUCCESS
        ),
        payload: { listId: listId, id: id },
      });
    })
    .catch(err => dispatch(handleError(err, GROCERY_LIST_ITEM_STORE)));
};

export const toggleItem = (listId: number, id: number, completed: boolean) => (dispatch: GroceryListItemDispatch) => {
  dispatch({ ...toBasicAction(GROCERY_LIST_ITEM_STORE, ACTION.UPDATE_START) });

  request
    .patch(`${serverURLs.list_item}${id}/`)
    .send({ completed: completed })
    .then(() => {
      dispatch({
        ...toBasicAction(
          GROCERY_LIST_ITEM_STORE,
          GroceryListItemActionTypes.TOGGLE_ITEM
        ),
        payload: { listId: listId, id: id },
      });
    })
    .catch(err => dispatch(handleError(err, GROCERY_LIST_ITEM_STORE)));
};

export const preload = (list: Partial<GroceryListItem>) => (dispatch: GroceryListItemDispatch) => {
  dispatch({ ...toBasicAction(GROCERY_LIST_ITEM_STORE, ACTION.PRELOAD), payload: list });
};

export const reset = () => (dispatch: GroceryListItemDispatch) => {
  dispatch({ ...toBasicAction(GROCERY_LIST_ITEM_STORE, ACTION.RESET) });
};
