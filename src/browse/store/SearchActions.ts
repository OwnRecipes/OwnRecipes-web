import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { ACTION } from '../../common/store/ReduxHelper';
import { objToSearchString } from '../../common/utility';
import { toBasicAction } from '../../common/store/redux';
import { handleError } from '../../common/requestUtils';
import { BROWSER_SEARCH_STORE, SearchDispatch, SearchResultDto, toSearchResult } from './SearchTypes';

const FILTER_QUERY_PARAMETER_MAPPING: Record<string, string> = {
  cuisine: 'cuisine__slug',
  course:  'course__slug',
  tag:     'tag__slug',
};

export const loadRecipes = (filters: Record<string, string>) => (dispatch: SearchDispatch) => {
  dispatch({ ...toBasicAction(BROWSER_SEARCH_STORE, ACTION.LOADING) });

  const parsedFilters: Record<string, string> = {};
  Object.keys(filters).forEach(f => {
    if (filters[f] !== null) {
      parsedFilters[f in FILTER_QUERY_PARAMETER_MAPPING ? FILTER_QUERY_PARAMETER_MAPPING[f] : f] = filters[f];
    }
  });

  request
    .get(serverURLs.browse)
    .query(parsedFilters)
    .then(res => {
      const resDto: SearchResultDto = res.body;
      dispatch({
        ...toBasicAction(
          BROWSER_SEARCH_STORE,
          ACTION.GET_SUCCESS
        ),
        id: objToSearchString(filters),
        payload: toSearchResult(resDto),
      });
    })
    .catch(err => { dispatch(handleError(err, BROWSER_SEARCH_STORE)); });
};

export const loadRandomRecipes = (filters: Record<string, string>) => (dispatch: SearchDispatch) => {
  dispatch({ ...toBasicAction(BROWSER_SEARCH_STORE, ACTION.LOADING) });

  const parsedFilters: Record<string, string> = {};
  Object.keys(filters).forEach(f => {
    if (filters[f] !== null) {
      parsedFilters[f in FILTER_QUERY_PARAMETER_MAPPING ? FILTER_QUERY_PARAMETER_MAPPING[f] : f] = filters[f];
    }
  });

  request
    .get(serverURLs.mini_browse)
    .query(parsedFilters)
    .then(res => {
      const resDto: SearchResultDto = res.body;
      dispatch({
        ...toBasicAction(
          BROWSER_SEARCH_STORE,
          ACTION.GET_SUCCESS
        ),
        id: objToSearchString(filters),
        payload: toSearchResult(resDto),
      });
    })
    .catch(err => { dispatch(handleError(err, BROWSER_SEARCH_STORE)); });
};
