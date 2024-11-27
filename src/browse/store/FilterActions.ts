import * as _ from 'lodash-es';

import request from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { ACTION } from '../../common/store/ReduxHelper';
import { handleError } from '../../common/requestUtils';
import { objToSearchString } from '../../common/utility';
import { toBasicAction } from '../../common/store/redux';
import { BROWSE_FILTER_COURSE_STORE, BROWSE_FILTER_CUISINE_STORE, BROWSE_FILTER_RATING_STORE, BROWSE_FILTER_SEASONS_STORE, BROWSE_FILTER_TAGS_STORE, FilterDispatch } from './FilterTypes';
import { extractSearchStringToFields } from './SearchActions';

const parsedFilter = (filters: Record<string, string>): Record<string, string> => {
  let parsedFilters: Record<string, string> = _.omit(filters, ['limit', 'offset', 'ordering']);
  parsedFilters = extractSearchStringToFields(parsedFilters);
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

export const loadSeasons = (filters: Record<string, string>) => (dispatch: FilterDispatch) => {
  dispatch({ ...toBasicAction(BROWSE_FILTER_SEASONS_STORE, ACTION.LOADING) });

  request()
    .get(serverURLs.season_count)
    .query(parsedFilter(filters))
    .then(res => (
      dispatch({
        ...toBasicAction(
          BROWSE_FILTER_SEASONS_STORE,
          ACTION.GET_SUCCESS
        ),
        id: objToSearchString(filters),
        payload: res.body.results,
      })
    ))
    .catch(err => dispatch(handleError(err, BROWSE_FILTER_SEASONS_STORE)));
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
    .catch(err => dispatch(handleError(err, BROWSE_FILTER_TAGS_STORE)));
};
