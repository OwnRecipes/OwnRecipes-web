import request from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { ACTION } from '../../common/store/ReduxHelper';
import { handleError } from '../../common/requestUtils';
import { objToSearchString } from '../../common/utility';
import { toBasicAction } from '../../common/store/redux';
import { BROWSE_FILTER_COURSE_STORE, BROWSE_FILTER_CUISINE_STORE, BROWSE_FILTER_RATING_STORE, BROWSE_FILTER_TAGS_STORE, FilterDispatch } from './FilterTypes';

const parsedFilter = (filters: Record<string, string>): Record<string, string> => {
  const parsedFilters: Record<string, string> = {};
  Object.keys(filters).forEach(f => {
    if (!['limit', 'offset', 'ordering'].includes(f)) {
      parsedFilters[f] = filters[f];
    }
  });
  return parsedFilters;
};

export const loadCourses = (filters: Record<string, string>) => (dispatch: FilterDispatch) => {
  dispatch({ ...toBasicAction(BROWSE_FILTER_COURSE_STORE, ACTION.LOADING) });

  request()
    .get(serverURLs.course_count)
    .query(parsedFilter(filters))
    .then(res => (
      dispatch({
        ...toBasicAction(
          BROWSE_FILTER_COURSE_STORE,
          ACTION.GET_SUCCESS
        ),
        id: objToSearchString(filters),
        payload: res.body.results,
      })
    ))
    .catch(err => dispatch(handleError(err, BROWSE_FILTER_COURSE_STORE)));
};

export const loadCuisines = (filters: Record<string, string>) => (dispatch: FilterDispatch) => {
  dispatch({ ...toBasicAction(BROWSE_FILTER_CUISINE_STORE, ACTION.LOADING) });

  request()
    .get(serverURLs.cuisine_count)
    .query(parsedFilter(filters))
    .then(res => (
      dispatch({
        ...toBasicAction(
          BROWSE_FILTER_CUISINE_STORE,
          ACTION.GET_SUCCESS
        ),
        id: objToSearchString(filters),
        payload: res.body.results,
      })
    ))
    .catch(err => dispatch(handleError(err, BROWSE_FILTER_CUISINE_STORE)));
};

export const loadRatings = (filter: Record<string, string>) => (dispatch: FilterDispatch) => {
  dispatch({ ...toBasicAction(BROWSE_FILTER_RATING_STORE, ACTION.LOADING) });

  request()
    .get(serverURLs.rating_count)
    .query(parsedFilter(filter))
    .then(res => (
      dispatch({
        ...toBasicAction(
          BROWSE_FILTER_RATING_STORE,
          ACTION.GET_SUCCESS
        ),
        id: objToSearchString(filter),
        payload: res.body.results,
      })
    ))
    .catch(err => dispatch(handleError(err, BROWSE_FILTER_RATING_STORE)));
};

export const loadTags = (filters: Record<string, string>) => (dispatch: FilterDispatch) => {
  dispatch({ ...toBasicAction(BROWSE_FILTER_TAGS_STORE, ACTION.LOADING) });

  request()
    .get(serverURLs.tag_count)
    .query(parsedFilter(filters))
    .then(res => (
      dispatch({
        ...toBasicAction(
          BROWSE_FILTER_TAGS_STORE,
          ACTION.GET_SUCCESS
        ),
        id: objToSearchString(filters),
        payload: res.body.results,
      })
    ))
    .catch(err => {
      // Older backend versions may not support this action.
      if (err.status === 404) {
        dispatch({
          ...toBasicAction(
            BROWSE_FILTER_TAGS_STORE,
            ACTION.GET_SUCCESS
          ),
          id: objToSearchString(filters),
          payload: [],
        });
      } else {
        dispatch(handleError(err, BROWSE_FILTER_TAGS_STORE));
      }
    });
};
