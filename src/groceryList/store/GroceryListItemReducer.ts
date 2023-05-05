import { PendingState } from '../../common/store/GenericReducerType';
import ReduxHelper, { GenericItemReducerAction } from '../../common/store/ReduxHelper';
import { GroceryListItemsAction, GroceryListItemsActionTypes, GROCERY_LIST_ITEMS_STORE } from './GroceryListItemsTypes';
import { GroceryListItem, GroceryListItemAction, GroceryListItemActionTypes, GroceryListItemState, GROCERY_LIST_ITEM_STORE } from './GroceryListItemTypes';

const defaultState: GroceryListItemState = ReduxHelper.getItemReducerDefaultState(GROCERY_LIST_ITEM_STORE);

const reducer = (state = defaultState, action: GroceryListItemAction): GroceryListItemState => {
  if (action.store === GROCERY_LIST_ITEMS_STORE) {
    const itemAction = action as GroceryListItemsAction;
    switch (itemAction.typs) {
      case GroceryListItemsActionTypes.DELETE_COMPLETED_ITEMS:
        {
          if (!state.item || itemAction.payload.listId !== state.item.listId) break;
          const isDeleted = itemAction.payload.ids.includes(state.item.id);
          if (!isDeleted) break;

          return defaultState;
        }
      default: break;
    }
  } else if (action.store === state.ident) {
    switch (action.typs) {
      case GroceryListItemActionTypes.TOGGLE_ITEM:
        {
          const updState = ReduxHelper.cloneState(state);
          if (!updState.item) return state;
          const updItem  = { ...updState.item };

          updItem.completed = !updItem.completed;
          updState.meta.pending = PendingState.COMPLETED;

          updState.item = updItem;
          return updState;
        }
      default: break;
    }
  }
  return ReduxHelper.caseItemDefaultReducer(state, action as GenericItemReducerAction<GroceryListItem>, defaultState);
};

export default reducer;
