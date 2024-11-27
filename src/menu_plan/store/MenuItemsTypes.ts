import { Dispatch as ReduxDispatch } from 'redux';

import ArrayReducerType from '../../common/store/ArrayReducerType';
import { GenericArrayReducerAction } from '../../common/store/ReduxHelper';
import { MenuItem } from './MenuItemTypes';

export const MENU_ITEMS_STORE  = 'menuItems';

export type MenuItemsState    = ArrayReducerType<MenuItem>;
export type MenuItemsAction   = GenericArrayReducerAction<MenuItem>;
export type MenuItemsDispatch = ReduxDispatch<MenuItemsAction>;
