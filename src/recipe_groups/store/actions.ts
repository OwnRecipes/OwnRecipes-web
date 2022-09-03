import { handleError, request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { ACTION } from '../../common/store/ReduxHelper';
import { CourseDto, toCourse, CuisineDto, toCuisine, TagDto, toTag } from '../../recipe/store/RecipeTypes';
import { COURSES_STORE, CUISINES_STORE, RecipeGroupsDispatch, TAGS_STORE } from './types';
import { toBasicAction } from '../../common/store/redux';

export const fetchCourses = () => (dispatch: RecipeGroupsDispatch) => {
  dispatch({ ...toBasicAction(COURSES_STORE, ACTION.GET_START) });

  request()
    .get(serverURLs.course)
    .then(res => {
      dispatch({
        ...toBasicAction(
          COURSES_STORE,
          ACTION.GET_SUCCESS
        ),
        payload: res.body.results
            .filter((courseDto: CourseDto) => courseDto.title !== '-')
            .map((courseDto: CourseDto) => toCourse(courseDto)),
      });
    })
    .catch(err => dispatch(handleError(err, COURSES_STORE)));
};

export const fetchCuisines = () => (dispatch: RecipeGroupsDispatch) => {
  dispatch({ ...toBasicAction(CUISINES_STORE, ACTION.GET_START) });

  request()
    .get(serverURLs.cuisine)
    .then(res => {
      dispatch({
        ...toBasicAction(
          CUISINES_STORE,
          ACTION.GET_SUCCESS
        ),
        payload: res.body.results
            .filter((cuisineDto: CuisineDto) => cuisineDto.title !== '-')
            .map((cuisineDto: CuisineDto) => toCuisine(cuisineDto)),
      });
    })
    .catch(err => dispatch(handleError(err, CUISINES_STORE)));
};

export const fetchTags = () => (dispatch: RecipeGroupsDispatch) => {
  dispatch({ ...toBasicAction(TAGS_STORE, ACTION.GET_START) });

  request()
    .get(serverURLs.tag)
    .then(res => {
      dispatch({
        ...toBasicAction(
          TAGS_STORE,
          ACTION.GET_SUCCESS
        ),
        payload: res.body.results.map((tagDto: TagDto) => toTag(tagDto)),
      });
    })
    .catch(err => dispatch(handleError(err, TAGS_STORE)));
};
