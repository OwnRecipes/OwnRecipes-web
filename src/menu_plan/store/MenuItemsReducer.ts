import ReduxHelper, { GenericArrayReducerAction } from '../../common/store/ReduxHelper';
import { MenuItemsAction, MenuItemsState, MENU_ITEMS_STORE } from './MenuItemsTypes';
import { MenuItem, MenuItemAction, MenuItemActionTypes, MENU_ITEM_STORE } from './MenuItemTypes';

const defaultState: MenuItemsState = ReduxHelper.getArrayReducerDefaultState<MenuItem>(MENU_ITEMS_STORE);

const reducer = (state = defaultState, action: MenuItemsAction): MenuItemsState => {
  if (action.store === MENU_ITEM_STORE) {
    const itemAction = action as MenuItemAction;
    switch (itemAction.typs) {
      case MenuItemActionTypes.HIDE_COMPLETED:
        {
          const updState = ReduxHelper.cloneState(state);

          updState.items = updState.items?.filter(itm => itm.id !== itemAction.payload);

          return updState;
        }
      default: break;
    }
  }
  return ReduxHelper.caseArrayDefaultReducer(state, action as GenericArrayReducerAction<MenuItem>, defaultState, MENU_ITEM_STORE);
};

export default reducer;
