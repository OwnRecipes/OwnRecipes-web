import ReduxHelper, { ACTION, GenericArrayReducerAction } from '../../common/store/ReduxHelper';
import { GroceryListItemsAction, GroceryListItemsActionTypes, GroceryListItemsState, GROCERY_LIST_ITEMS_STORE } from './GroceryListItemsTypes';
import { GroceryListItem, GroceryListItemAction, GroceryListItemActionTypes, GROCERY_LIST_ITEM_STORE } from './GroceryListItemTypes';

const defaultState: GroceryListItemsState = ReduxHelper.getArrayReducerDefaultState<GroceryListItem>(GROCERY_LIST_ITEMS_STORE);

const reducer = (state = defaultState, action: GroceryListItemsAction): GroceryListItemsState => {
  if (action.store === state.ident) {
    switch (action.typs) {
      case GroceryListItemsActionTypes.TOGGLE_ITEMS:
        {
          const updState = ReduxHelper.cloneState(state);
          const updItems = state.items != null ? [...state.items] : [];

          updState.items = updItems.map(item => {
            const toggleItem = action.payload.find(i => i.id === item.id);
            return toggleItem ? { ...item, completed: toggleItem.completed } : item;
          });
          return updState;
        }
      case GroceryListItemsActionTypes.DELETE_COMPLETED_ITEMS:
        {
          const updState = ReduxHelper.cloneState(state);
          const updItems = state.items != null ? [...state.items] : [];

          updState.items = updItems.filter(i => action.payload.ids.indexOf(i.id) === -1);
          return updState;
        }
      default: break;
    }
  } else if (action.store === GROCERY_LIST_ITEM_STORE) {
    const itemAction: GroceryListItemAction = action as GroceryListItemAction;
    switch (itemAction.typs) {
      case GroceryListItemActionTypes.TOGGLE_ITEM:
        {
          const updState = ReduxHelper.cloneState(state);
          const updItems = state.items != null ? [...state.items] : [];

          updState.items = updItems.map(item => (
            item.id === itemAction.payload.id
              ? { ...item, completed: !item.completed }
              : item
          ));
          return updState;
        }
      case ACTION.DELETE_SUCCESS:
        {
          const updState = ReduxHelper.cloneState(state);
          const updItems = state.items != null ? [...state.items] : [];

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          updState.items = updItems.filter(item => item.listId !== (itemAction.payload as any).listId || item.id !== itemAction.payload.id);
          return updState;
        }
      default: break;
    }
  }

  return ReduxHelper.caseArrayDefaultReducer(state, action as GenericArrayReducerAction<GroceryListItem>, defaultState, GROCERY_LIST_ITEM_STORE);
};

export default reducer;
