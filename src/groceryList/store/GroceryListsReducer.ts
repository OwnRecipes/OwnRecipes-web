import ReduxHelper, { ACTION } from '../../common/store/ReduxHelper';
import { GroceryList, GroceryListAction, GroceryListActionTypes, GROCERY_LIST_STORE } from './GroceryListTypes';
import { GroceryListsAction, GroceryListsState, GROCERY_LISTS_STORE } from './GroceryListsTypes';
import { GroceryListItemsAction, GroceryListItemsActionTypes, GROCERY_LIST_ITEMS_STORE } from './GroceryListItemsTypes';
import { GroceryListItemAction, GROCERY_LIST_ITEM_STORE } from './GroceryListItemTypes';

const defaultState: GroceryListsState = ReduxHelper.getArrayReducerDefaultState<GroceryList>(GROCERY_LISTS_STORE);

const reducer = (state = defaultState, action: GroceryListsAction): GroceryListsState => {
  if (action.store === GROCERY_LIST_ITEM_STORE) {
    const itemAction = action as GroceryListItemAction;
    switch (itemAction.typs) {
      case ACTION.CREATE_SUCCESS:
        {
          if (!state.items) break;
          const ixStateList = state.items?.findIndex(i => i.id === itemAction.payload.listId);
          if (ixStateList === -1) break;

          const updState = ReduxHelper.cloneState(state);
          const updItems = [...state.items];
          const updItem  = { ...state.items[ixStateList] };

          updItem.item_count += 1;

          updItems[ixStateList] = updItem;
          updState.items = updItems;
          return updState;
        }
      default: break;
    }
  } else if (action.store === GROCERY_LIST_ITEMS_STORE) {
    const itemAction = action as GroceryListItemsAction;
    switch (itemAction.typs) {
      case GroceryListItemsActionTypes.DELETE_COMPLETED_ITEMS:
        {
          if (!state.items) break;
          const ixStateList = state.items?.findIndex(i => i.id === itemAction.payload.listId);
          if (ixStateList === -1) break;

          const updState = ReduxHelper.cloneState(state);
          const updItems = [...state.items];
          const updItem  = { ...state.items[ixStateList] };

          updItem.item_count = Math.max(updItem.item_count - itemAction.payload.ids.length, 0);

          updItems[ixStateList] = updItem;
          updState.items = updItems;
          return updState;
        }
      default: break;
    }
  } else if (action.store === GROCERY_LIST_STORE) {
    const itemAction = action as GroceryListAction;
    switch (itemAction.typs) {
      case GroceryListActionTypes.BULK_ADD:
        {
          if (!state.items) break;
          if (itemAction.payload.length === 0) return state;

          const ixStateList = state.items?.findIndex(i => i.id === itemAction.payload[0].listId);
          if (ixStateList === -1) break;

          const updState = ReduxHelper.cloneState(state);
          const updItems = [...state.items];
          const updItem  = { ...state.items[ixStateList] };

          updItem.item_count += itemAction.payload.length;

          updItems[ixStateList] = updItem;
          updState.items = updItems;
          return updState;
        }
      default: break;
    }
  }

  return ReduxHelper.caseArrayDefaultReducer(state, action, defaultState, GROCERY_LIST_STORE);
};

export default reducer;
