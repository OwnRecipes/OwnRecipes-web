import request from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import ReduxHelper, { ACTION } from '../../common/store/ReduxHelper';
import { AnyDispatch, toBasicAction } from '../../common/store/redux';
import { handleError, handleFormError } from '../../common/requestUtils';
import { RatingCreate, RatingDispatch, RatingsDispatch, RATINGS_STORE, RATING_STORE, toRating, RatingUpdate } from './types';

export const load = (recipeSlug: string) => (dispatch: RatingsDispatch) => {
  dispatch({ ...toBasicAction(RATINGS_STORE, ACTION.GET_START) });
  request()
    .get(`${serverURLs.ratings}?recipe__slug=${recipeSlug}`)
    .then(res => dispatch({
      ...toBasicAction(
        RATINGS_STORE,
        ACTION.GET_SUCCESS
      ),
      id: recipeSlug,
      payload: ReduxHelper.transformEntities(res.body.results, toRating),
    }))
    .catch(err => dispatch(handleError(err, RATINGS_STORE)));
};

export const add = async (dispatch: AnyDispatch, recipeSlug: string, rating: RatingCreate) => {
  dispatch({ ...toBasicAction(RATING_STORE, ACTION.CREATE_START) });
  return request()
    .post(serverURLs.ratings)
    .send({
      recipe:  recipeSlug,
      rating:  rating.rating,
      comment: rating.comment,
    })
    .then(res => {
      dispatch({
        ...toBasicAction(
          RATING_STORE,
          ACTION.CREATE_SUCCESS
        ),
        payload: {
          recipe: recipeSlug,
          rating:   toRating(res.body),
        },
      });
      return null;
    })
    .catch(err => handleFormError(dispatch, err, RATINGS_STORE));
};

export const update = async (dispatch: AnyDispatch, recipeSlug: string, rating: RatingUpdate) => {
  dispatch({ ...toBasicAction(RATING_STORE, ACTION.UPDATE_START) });
  return request()
    .patch(`${serverURLs.ratings}${rating.id}/`)
    .send({
      rating:  rating.rating,
      comment: rating.comment,
    })
    .then(res => {
      dispatch({
        ...toBasicAction(
          RATING_STORE,
          ACTION.UPDATE_SUCCESS
        ),
        payload: {
          recipe: recipeSlug,
          rating: toRating(res.body),
        },
      });
      return null;
    })
    .catch(err => handleFormError(dispatch, err, RATINGS_STORE));
};

export const remove = (recipeSlug: string, id: number) => (dispatch: RatingDispatch) => {
  dispatch({ ...toBasicAction(RATING_STORE, ACTION.DELETE_START) });
  request()
    .delete(`${serverURLs.ratings}${id}/`)
    .then(() => dispatch({
      ...toBasicAction(
        RATING_STORE,
        ACTION.DELETE_SUCCESS
      ),
      payload: {
        ratingId: id,
        recipe:   recipeSlug,
      },
    }))
    .catch(err => dispatch(handleError(err, RATINGS_STORE)));
};
