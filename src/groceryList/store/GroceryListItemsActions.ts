import { handleError, handleFormError, request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { toBasicAction } from '../../common/store/redux';
import { ACTION } from '../../common/store/ReduxHelper';
import { GroceryListItemsActionTypes, GroceryListItemsDispatch, GROCERY_LIST_ITEMS_STORE } from './GroceryListItemsTypes';
import { GroceryListItem, GroceryListItemDto, toGroceryListItem } from './GroceryListItemTypes';

export const load = (listId: number) => (dispatch: GroceryListItemsDispatch) => {
  dispatch({ ...toBasicAction(GROCERY_LIST_ITEMS_STORE, ACTION.GET_START) });
  request()
    .get(`${serverURLs.list_item}?list=${String(listId)}`)
    .then(res => {
      dispatch({
        ...toBasicAction(
          GROCERY_LIST_ITEMS_STORE,
          ACTION.GET_SUCCESS
        ),
        payload: res.body.results.map((i: GroceryListItemDto) => toGroceryListItem(listId, i)),
      });
    })
    .catch(err => dispatch(handleError(err, GROCERY_LIST_ITEMS_STORE)));
};

export const toggleItems = (listId: number, items: Array<GroceryListItem>, checked: boolean) => (dispatch: GroceryListItemsDispatch) => {
  dispatch({ ...toBasicAction(GROCERY_LIST_ITEMS_STORE, ACTION.GET_START) });

  const ids = items.filter(i => i.completed !== checked).map(i => ({ id: i.id, completed: checked }));

  request()
    .patch(serverURLs.bulk_list_item)
    .send(ids)
    .then(() => {
      dispatch({
        ...toBasicAction(
          GROCERY_LIST_ITEMS_STORE,
          GroceryListItemsActionTypes.TOGGLE_ITEMS
        ),
        payload: ids,
      });
    })
    .catch(err => dispatch(handleError(err, GROCERY_LIST_ITEMS_STORE)));
};

export const clearCompleted = async (dispatch: GroceryListItemsDispatch, listId: number, items: Array<GroceryListItem>) => {
  const ids = items.filter(i => i.completed).map(i => i.id);

  return request()
    .delete(serverURLs.bulk_list_item)
    .send(ids)
    .then(() => {
      dispatch({
        ...toBasicAction(
          GROCERY_LIST_ITEMS_STORE,
          GroceryListItemsActionTypes.DELETE_COMPLETED_ITEMS
        ),
        payload: {
          listId: listId,
          ids: ids,
        },
      });
    })
    .catch(err => handleFormError(dispatch, err, GROCERY_LIST_ITEMS_STORE));
};

export const reset = () => (dispatch: GroceryListItemsDispatch) => {
  dispatch({ ...toBasicAction(GROCERY_LIST_ITEMS_STORE, ACTION.RESET) });
};
