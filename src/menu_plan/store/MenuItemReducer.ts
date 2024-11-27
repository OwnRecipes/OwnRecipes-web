import ReduxHelper, { GenericItemReducerAction } from '../../common/store/ReduxHelper';
import { MenuItem, MenuItemAction, MenuItemState, MENU_ITEM_STORE } from './MenuItemTypes';

const defaultState: MenuItemState = ReduxHelper.getItemReducerDefaultState(MENU_ITEM_STORE) as MenuItemState;

const reducer = (state = defaultState, action: MenuItemAction): MenuItemState => ReduxHelper.caseItemDefaultReducer(state, action as GenericItemReducerAction<MenuItem>, defaultState) as MenuItemState;

export default reducer;
