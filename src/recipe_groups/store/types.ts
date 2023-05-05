import { Dispatch as ReduxDispatch } from 'redux';

import ArrayReducerType from '../../common/store/ArrayReducerType';
import { GenericArrayReducerAction } from '../../common/store/ReduxHelper';
import { Course, Cuisine, Tag } from '../../recipe/store/RecipeTypes';

export const RECIPE_GROUPS_STORE  = 'recipeGroups';

export const COURSES_STORE  = 'courses';
export const CUISINES_STORE = 'cuisines';
export const TAGS_STORE     = 'tags';

export type CoursesState  = ArrayReducerType<Course>;
export type CuisinesState = ArrayReducerType<Cuisine>;
export type TagsState     = ArrayReducerType<Tag>;

export type RecipeGroupsAction   = GenericArrayReducerAction<Course | Cuisine | Tag>;
export type RecipeGroupsDispatch = ReduxDispatch<RecipeGroupsAction>;
export interface RecipeGroupsState {
  [COURSES_STORE]:  CoursesState,
  [CUISINES_STORE]: CuisinesState,
  [TAGS_STORE]:     TagsState,
}
