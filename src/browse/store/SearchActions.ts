import request from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { ACTION } from '../../common/store/ReduxHelper';
import { objToSearchString } from '../../common/utility';
import { toBasicAction } from '../../common/store/redux';
import { handleError } from '../../common/requestUtils';
import { BROWSER_SEARCH_STORE, SearchDispatch, SearchResultDto, toSearchResult } from './SearchTypes';
import { parseCSV } from '../utilts/utility';

const FILTER_QUERY_PARAMETER_MAPPING: Record<string, string> = {
  author:  'author__username',
  course:  'course__slug',
  cuisine: 'cuisine__slug',
  season:  'season__slug',
  tag:     'tag__slug',
};

const FIELDS = ['author', 'course', 'cuisine', 'directions', 'info', 'ordering', 'rating', 'season', 'source', 'tag', 'title'];

export function extractSearchStringToFields(filters: Record<string, string>): Record<string, string> {
  if (!filters.search || !filters.search.includes(':')) return filters;

  const result = { ...filters };
  const parsedFields = parseCSV(result.search, { delimiter: ' ' })[0];

  const extractedSearchArray: Array<string> = [];
  parsedFields.forEach(delimitedString => {
    if (delimitedString.includes(':')) {
      const keyValues = parseCSV(delimitedString, { delimiter: ':' })[0];
      if (keyValues.length === 2) {
        const fieldKey = keyValues[0].toLocaleLowerCase();
        if (FIELDS.includes(fieldKey)) {
          result[fieldKey] = keyValues[1];
          return;
        }
      }
    }

    extractedSearchArray.push(delimitedString);
  });

  result.search = extractedSearchArray.join(' ');

  return result;
}

function mapFilterNames(filters: Record<string, string>, mapping: Record<string, string>): Record<string, string> {
  const mappedFilters: Record<string, string> = {};

  Object.keys(filters).forEach(f => {
    if (filters[f] !== null) {
      mappedFilters[f in mapping ? mapping[f] : f] = filters[f];
    }
  });

  return mappedFilters;
}

export const loadRecipes = (filters: Record<string, string>) => (dispatch: SearchDispatch) => {
  dispatch({ ...toBasicAction(BROWSER_SEARCH_STORE, ACTION.LOADING) });

  let parsedFilters: Record<string, string> = extractSearchStringToFields(filters);
  parsedFilters = mapFilterNames(parsedFilters, FILTER_QUERY_PARAMETER_MAPPING);

  request()
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

  request()
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
