import { RatingCreate, RatingDispatch, RatingsDispatch, RATINGS_STORE, RATING_STORE, toRating } from './types';
import { handleError, request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import ReduxHelper, { ACTION, toBasicAction } from '../../common/store/ReduxHelper';

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
    .catch(err => handleError(err, RATINGS_STORE));
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
    .catch(err => handleError(err, RATINGS_STORE));
};

export const add = (recipeSlug: string, rating: RatingCreate) => (dispatch: RatingDispatch) => {
  dispatch({ ...toBasicAction(RATING_STORE, ACTION.CREATE_START) });
  request()
    .post(serverURLs.ratings)
    .send({
      recipe:  recipeSlug,
      rating:  rating.rating,
      comment: rating.comment,
      author:  rating.userId,
    })
    .then(res => dispatch({
      ...toBasicAction(
        RATING_STORE,
        ACTION.CREATE_SUCCESS
      ),
      payload: {
        recipe: recipeSlug,
        rating:   toRating(res.body),
      },
    }))
    .catch(err => handleError(err, RATINGS_STORE));
};
