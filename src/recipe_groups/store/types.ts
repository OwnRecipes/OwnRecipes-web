import { Dispatch as ReduxDispatch } from 'redux';

import ArrayReducerType from '../../common/store/ArrayReducerType';
import { GenericArrayReducerAction } from '../../common/store/ReduxHelper';
import { Course, Cuisine, Tag } from '../../recipe/store/RecipeTypes';

export const COURSES_STORE  = '@@COURSES_STORE';
export const CUISINES_STORE = '@@CUISINES_STORE';
export const TAGS_STORE     = '@@TAGS_STORE';

export type CoursesState  = ArrayReducerType<Course>;
export type CuisinesState = ArrayReducerType<Cuisine>;
export type TagsState     = ArrayReducerType<Tag>;

export type RecipeGroupsAction   = GenericArrayReducerAction<Course | Cuisine | Tag>;
export type RecipeGroupsDispatch = ReduxDispatch<RecipeGroupsAction>;
export interface RecipeGroupsState {
  courses:  CoursesState,
  cuisines: CuisinesState,
  tags:     TagsState,
}
