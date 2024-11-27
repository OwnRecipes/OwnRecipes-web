import { Dispatch as ReduxDispatch } from 'redux';

import ArrayReducerType from '../../common/store/ArrayReducerType';
import { GenericArrayReducerAction } from '../../common/store/ReduxHelper';

export const MENU_STATS_STORE  = 'menuStats';

export interface MenuStatDto {
  title:         string;
  slug:          string;
  num_menuitems: number;
  last_made:     string;
}

export type MenuStat = MenuStatDto;

export const toMenuStat = (dto: MenuStatDto): MenuStat => dto;

export type MenuStatsState    = ArrayReducerType<MenuStat>;
export type MenuStatsAction   = GenericArrayReducerAction<MenuStat>;
export type MenuStatsDispatch = ReduxDispatch<MenuStatsAction>;
