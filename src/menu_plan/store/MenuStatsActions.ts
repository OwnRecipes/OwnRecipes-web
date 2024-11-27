import request from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { toBasicAction } from '../../common/store/redux';
import { ACTION } from '../../common/store/ReduxHelper';
import { handleError } from '../../common/requestUtils';
import { MenuStatDto, MenuStatsDispatch, MENU_STATS_STORE, toMenuStat } from './MenuStatsTypes';

export const load = () => (dispatch: MenuStatsDispatch) => {
  dispatch({ ...toBasicAction(MENU_STATS_STORE, ACTION.GET_START) });
  request()
    .get(serverURLs.menu_stats)
    .then(res => {
      dispatch({
        ...toBasicAction(
          MENU_STATS_STORE,
          ACTION.GET_SUCCESS
        ),
        payload: res.body?.map((i: MenuStatDto) => toMenuStat(i)) || [],
      });
    })
    .catch(err => dispatch(handleError(err, MENU_STATS_STORE)));
};

export const reset = () => (dispatch: MenuStatsDispatch) => {
  dispatch({ ...toBasicAction(MENU_STATS_STORE, ACTION.RESET) });
};
