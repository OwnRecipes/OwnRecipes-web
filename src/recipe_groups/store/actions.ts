import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { ACTION } from '../../common/store/ReduxHelper';
import { CourseDto, toCourse, CuisineDto, toCuisine, toTag } from '../../recipe/store/RecipeTypes';
import { toBasicAction } from '../../common/store/redux';
import { handleError } from '../../common/requestUtils';
import { COURSES_STORE, CUISINES_STORE, RecipeGroupsDispatch, TAGS_STORE } from './types';

export const fetchCourses = () => (dispatch: RecipeGroupsDispatch) => {
  dispatch({ ...toBasicAction(COURSES_STORE, ACTION.GET_START) });

  request
    .get(serverURLs.course)
    .then(res => {
      dispatch({
        ...toBasicAction(
          COURSES_STORE,
          ACTION.GET_SUCCESS
        ),
        payload: res.body.results
            .filter((courseDto: CourseDto) => courseDto.title !== '-')
            .map(toCourse),
      });
    })
    .catch(err => dispatch(handleError(err, COURSES_STORE)));
};

export const fetchCuisines = () => (dispatch: RecipeGroupsDispatch) => {
  dispatch({ ...toBasicAction(CUISINES_STORE, ACTION.GET_START) });

  request
    .get(serverURLs.cuisine)
    .then(res => {
      dispatch({
        ...toBasicAction(
          CUISINES_STORE,
          ACTION.GET_SUCCESS
        ),
        payload: res.body.results
            .filter((cuisineDto: CuisineDto) => cuisineDto.title !== '-')
            .map(toCuisine),
      });
    })
    .catch(err => dispatch(handleError(err, CUISINES_STORE)));
};

export const fetchTags = () => (dispatch: RecipeGroupsDispatch) => {
  dispatch({ ...toBasicAction(TAGS_STORE, ACTION.GET_START) });

  request
    .get(serverURLs.tag)
    .then(res => {
      dispatch({
        ...toBasicAction(
          TAGS_STORE,
          ACTION.GET_SUCCESS
        ),
        payload: res.body.results.map(toTag),
      });
    })
    .catch(err => dispatch(handleError(err, TAGS_STORE)));
};
