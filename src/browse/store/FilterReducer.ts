import { combineReducers, Reducer } from 'redux';

import ReduxHelper from '../../common/store/ReduxHelper';
import { BROWSE_FILTER_COURSE_STORE, BROWSE_FILTER_CUISINE_STORE, BROWSE_FILTER_RATING_STORE, BROWSE_FILTER_TAGS_STORE, CategoryCount, FilterAction, FilterState, RatingCount } from './FilterTypes';

const defaultCourseState  = ReduxHelper.getMapReducerDefaultState<Array<CategoryCount>>(BROWSE_FILTER_COURSE_STORE);
const defaultCuisineState = ReduxHelper.getMapReducerDefaultState<Array<CategoryCount>>(BROWSE_FILTER_CUISINE_STORE);
const defaultRatingsState = ReduxHelper.getMapReducerDefaultState<Array<RatingCount>>(BROWSE_FILTER_RATING_STORE);
const defaultTagsState    = ReduxHelper.getMapReducerDefaultState<Array<RatingCount>>(BROWSE_FILTER_TAGS_STORE);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createFilterWithNamedType(defaultState: any): Reducer<any, FilterAction> {
  return function reducer(state = defaultState, action: FilterAction) {
    return ReduxHelper.caseMapDefaultReducer(state, action as any, defaultState);
  };
}

const filters: Reducer<FilterState, FilterAction> = combineReducers({
  courses:  createFilterWithNamedType(defaultCourseState),
  cuisines: createFilterWithNamedType(defaultCuisineState),
  ratings:  createFilterWithNamedType(defaultRatingsState),
  tags:     createFilterWithNamedType(defaultTagsState),
});

export default filters;
