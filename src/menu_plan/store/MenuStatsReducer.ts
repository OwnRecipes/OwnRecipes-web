import ReduxHelper, { GenericArrayReducerAction } from '../../common/store/ReduxHelper';
import { MenuStat, MenuStatsAction, MenuStatsState, MENU_STATS_STORE } from './MenuStatsTypes';

const defaultState: MenuStatsState = ReduxHelper.getArrayReducerDefaultState<MenuStat>(MENU_STATS_STORE);

const reducer = (state = defaultState, action: MenuStatsAction): MenuStatsState => ReduxHelper.caseArrayDefaultReducer(state, action as GenericArrayReducerAction<MenuStat>, defaultState);

export default reducer;
