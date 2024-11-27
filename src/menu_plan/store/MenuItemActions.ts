import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { handleError, handleFormError } from '../../common/requestUtils';
import { ACTION } from '../../common/store/ReduxHelper';
import { AnyDispatch, toBasicAction } from '../../common/store/redux';
import { MENU_ITEM_STORE, MenuItemDispatch, MenuItemUpdate, toMenuItem, MenuItemActionTypes } from './MenuItemTypes';

export const create = async (dispatch: AnyDispatch, item: MenuItemUpdate) => {
  dispatch({ ...toBasicAction(MENU_ITEM_STORE, ACTION.CREATE_START) });

  return request()
    .post(serverURLs.menu_item)
    .send(item)
    .then(res => {
      const menuItem = toMenuItem(res.body);
      dispatch({
        ...toBasicAction(
          MENU_ITEM_STORE,
          ACTION.CREATE_SUCCESS
        ),
        payload: menuItem,
      });
    })
    .catch(err => handleFormError(dispatch, err, MENU_ITEM_STORE));
};

export const update = async (dispatch: AnyDispatch, id: number, item: Partial<MenuItemUpdate>) => {
  dispatch({ ...toBasicAction(MENU_ITEM_STORE, ACTION.UPDATE_START) });

  return request()
    .patch(`${serverURLs.menu_item}${id}/`)
    .send(item)
    .then(res => {
      const menuItem = toMenuItem(res.body);
      dispatch({
        ...toBasicAction(
          MENU_ITEM_STORE,
          ACTION.UPDATE_SUCCESS
        ),
        payload: menuItem,
      });
    })
    .catch(err => handleFormError(dispatch, err, MENU_ITEM_STORE));
};

export const updateComplete = async (dispatch: AnyDispatch, id: number) => {
  dispatch({ ...toBasicAction(MENU_ITEM_STORE, ACTION.UPDATE_START) });

  return request()
    .patch(`${serverURLs.menu_item}${id}/`)
    .send({ complete: true })
    .then(res => {
      const menuItem = toMenuItem(res.body);
      dispatch({
        ...toBasicAction(
          MENU_ITEM_STORE,
          ACTION.UPDATE_SUCCESS
        ),
        payload: menuItem,
      });
    })
    .catch(err => handleFormError(dispatch, err, MENU_ITEM_STORE));
};

export const hideCompleted = (id: number) => (dispatch: MenuItemDispatch) => {
  dispatch({ ...toBasicAction(MENU_ITEM_STORE, MenuItemActionTypes.HIDE_COMPLETED), payload: id });
};

export const remove = (id: number) => (dispatch: MenuItemDispatch) => {
  dispatch({ ...toBasicAction(MENU_ITEM_STORE, ACTION.DELETE_START) });

  request()
    .delete(`${serverURLs.menu_item}${id}/`)
    .then(() => {
      dispatch({
        ...toBasicAction(
          MENU_ITEM_STORE,
          ACTION.DELETE_SUCCESS
        ),
        payload: { id: id },
      });
    })
    .catch(err => dispatch(handleError(err, MENU_ITEM_STORE)));
};
