import ReduxHelper, { ACTION, GenericItemReducerAction } from '../../common/store/ReduxHelper';
import { GroceryListItemsAction, GroceryListItemsActionTypes, GROCERY_LIST_ITEMS_STORE } from './GroceryListItemsTypes';
import { GroceryListItemAction, GROCERY_LIST_ITEM_STORE } from './GroceryListItemTypes';
import { GroceryList, GroceryListAction, GroceryListActionTypes, GroceryListState, GROCERY_LIST_STORE } from './GroceryListTypes';

const defaultState: GroceryListState = ReduxHelper.getItemReducerDefaultState(GROCERY_LIST_STORE);

function increaseItemCount(state: GroceryListState, items: number): GroceryListState {
  if (items <= 0) return state;

  const updState = ReduxHelper.cloneState(state);
  if (!updState.item) return state;
  const updItem  = { ...updState.item };

  updItem.item_count += items;

  updState.item = updItem;
  return updState;
}

const reducer = (state = defaultState, action: GroceryListAction): GroceryListState => {
  if (action.store === GROCERY_LIST_ITEM_STORE) {
    const itemAction = action as GroceryListItemAction;
    switch (itemAction.typs) {
      case ACTION.CREATE_SUCCESS:
        {
          if (!state.item || itemAction.payload.listId !== state.item.id) break;
          return increaseItemCount(state, 1);
        }
      case ACTION.DELETE_SUCCESS:
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (!state.item || (itemAction.payload as any).listId !== state.item.id) break;

          const updState = ReduxHelper.cloneState(state);
          if (!updState.item) return state;
          const updItem  = { ...updState.item };

          updItem.item_count -= 1;

          updState.item = updItem;
          return updState;
        }
      default: break;
    }
  } else if (action.store === GROCERY_LIST_ITEMS_STORE) {
    const itemAction = action as GroceryListItemsAction;
    switch (itemAction.typs) {
      case GroceryListItemsActionTypes.DELETE_COMPLETED_ITEMS:
        {
          if (!state.item || itemAction.payload.listId !== state.item.id) break;

          const updState = ReduxHelper.cloneState(state);
          if (!updState.item) return state;
          const updItem  = { ...updState.item };

          updItem.item_count = Math.max(updItem.item_count - itemAction.payload.ids.length, 0);

          updState.item = updItem;
          return updState;
        }
      default: break;
    }
  } else if (action.store === state.ident) {
    switch (action.typs) {
      case GroceryListActionTypes.BULK_ADD: {
        const items = action.payload.filter(i => i.listId === state.item?.id);
        return increaseItemCount(state, items.length);
      }
      default: break;
    }
  }

  return ReduxHelper.caseItemDefaultReducer(state, action as GenericItemReducerAction<GroceryList>, defaultState);
};

export default reducer;
