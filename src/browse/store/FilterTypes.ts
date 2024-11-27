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

export const BROWSE_FILTER_COURSE_STORE  = 'filter_courses';
export const BROWSE_FILTER_CUISINE_STORE = 'filter_cuisines';
export const BROWSE_FILTER_RATING_STORE  = 'filter_ratings';
export const BROWSE_FILTER_SEASONS_STORE = 'filter_seasons';
export const BROWSE_FILTER_TAGS_STORE    = 'filter_tags';

export type CategoryCountState = MapReducerType<Array<CategoryCount>>;
export type RatingCountState   = MapReducerType<Array<RatingCount>>;

export type FilterAction   = GenericMapReducerAction<Array<CategoryCount>> | GenericMapReducerAction<Array<RatingCount>>;
export type FilterDispatch = ReduxDispatch<FilterAction>;
export interface FilterState {
  filter_courses:  CategoryCountState;
  filter_cuisines: CategoryCountState;
  filter_ratings:  RatingCountState;
  filter_seasons:  CategoryCountState;
  filter_tags:     CategoryCountState;
}
