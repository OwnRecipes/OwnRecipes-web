import { Dispatch as ReduxDispatch } from 'redux';

import MapReducerType from '../../common/store/MapReducerType';
import { GenericMapReducerAction } from '../../common/store/ReduxHelper';

export interface CategoryCount {
  id:     number;
  total:  number;
  title:  string; // Category title, e. g. "Entry".
  slug:   string; // Category title slug, e.g. "entry".
}

export interface RatingCount {
  rating: number;
  total:  number;
}

export const BROWSE_FILTER_STORE = 'browserFilter';

export const BROWSE_FILTER_COURSE_STORE  = 'courses';
export const BROWSE_FILTER_CUISINE_STORE = 'cuisines';
export const BROWSE_FILTER_RATING_STORE  = 'ratings';
export const BROWSE_FILTER_TAGS_STORE    = 'tags';

export type CategoryCountState = MapReducerType<Array<CategoryCount>>;
export type RatingCountState   = MapReducerType<Array<RatingCount>>;

export type FilterAction   = GenericMapReducerAction<Array<CategoryCount>> | GenericMapReducerAction<Array<RatingCount>>;
export type FilterDispatch = ReduxDispatch<FilterAction>;
export interface FilterState {
  courses:  CategoryCountState;
  cuisines: CategoryCountState;
  ratings:  RatingCountState;
  tags:     CategoryCountState;
}
