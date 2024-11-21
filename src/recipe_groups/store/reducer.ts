import { combineReducers, Reducer } from 'redux';

import ReduxHelper from '../../common/store/ReduxHelper';
import { Course, Cuisine, Season, Tag } from '../../recipe/store/RecipeTypes';
import { COURSES_STORE, CUISINES_STORE, RecipeGroupsAction, RecipeGroupsState, SEASONS_STORE, TAGS_STORE } from './types';

const defaultCourseState  = ReduxHelper.getArrayReducerDefaultState<Array<Course>>(COURSES_STORE);
const defaultCuisineState = ReduxHelper.getArrayReducerDefaultState<Array<Cuisine>>(CUISINES_STORE);
const defaultSeasonsState = ReduxHelper.getArrayReducerDefaultState<Array<Season>>(SEASONS_STORE);
const defaultTagsState    = ReduxHelper.getArrayReducerDefaultState<Array<Tag>>(TAGS_STORE);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createRecipeGroupsWithNamedType(defaultState: any): Reducer<any, RecipeGroupsAction> {
  return function reducer(state = defaultState, action: RecipeGroupsAction) {
    return ReduxHelper.caseArrayDefaultReducer(state, action, defaultState);
  };
}

const recipeGroups: Reducer<RecipeGroupsState, RecipeGroupsAction> = combineReducers({
  courses:  createRecipeGroupsWithNamedType(defaultCourseState),
  cuisines: createRecipeGroupsWithNamedType(defaultCuisineState),
  seasons:  createRecipeGroupsWithNamedType(defaultSeasonsState),
  tags:     createRecipeGroupsWithNamedType(defaultTagsState),
});

export default recipeGroups;
