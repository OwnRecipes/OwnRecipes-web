import * as _ from 'lodash-es';

import ReduxHelper, { ACTION } from '../../common/store/ReduxHelper';
import { Rating, RatingAction, RatingsAction, IRatingAddAction, IRatingDeleteAction, RatingsState, RATINGS_STORE, RATING_STORE, IRatingUpdateAction } from './types';

const defaultState = ReduxHelper.getMapReducerDefaultState<Rating[]>(RATINGS_STORE);

function addRating(state: RatingsState, recipe: string, rating: Rating): RatingsState {
  const updState = { ...state };
  const updMap = state.items != null ? _.clone(state.items) : {};

  let ratings = _.get(updMap, recipe) ?? [];
  ratings = [...ratings];
  ratings.push(rating);

  _.set(updMap, recipe, ratings);
  updState.items = updMap;
  return updState;
}

function updateRating(state: RatingsState, recipe: string, rating: Rating): RatingsState {
  const updState = { ...state };
  const updMap = state.items != null ? _.clone(state.items) : {};

  let ratings = _.get(updMap, recipe) ?? [];
  ratings = [...ratings];
  const oldRatingIx = ratings.findIndex(r => r.id === rating.id);
  if (oldRatingIx === -1) return state;
  ratings.splice(oldRatingIx, 1, rating);

  _.set(updMap, recipe, ratings);
  updState.items = updMap;
  return updState;
}

function deleteRating(state: RatingsState, recipe: string, ratingId: number): RatingsState {
  const updState = { ...state };
  if (state.items == null) return state;
  const updMap = _.clone(state.items);

  let ratings = _.get(updMap, recipe);
  if (ratings == null) return state;
  ratings = ratings.filter(r => r.id !== ratingId);

  _.set(updMap, recipe, ratings);
  updState.items = updMap;
  return updState;
}

const reducer = (state = defaultState, action: RatingsAction): RatingsState => {
  if (RATING_STORE === action.store) {
    const ratingAction = action as RatingAction;
    switch (ratingAction.typs) {
      case ACTION.CREATE_SUCCESS:
        return addRating(state, (ratingAction as IRatingAddAction).payload.recipe, (ratingAction as IRatingAddAction).payload.rating);
      case ACTION.UPDATE_SUCCESS:
        return updateRating(state, (ratingAction as IRatingUpdateAction).payload.recipe, (ratingAction as IRatingUpdateAction).payload.rating);
      case ACTION.DELETE_SUCCESS:
        return deleteRating(state, (ratingAction as IRatingDeleteAction).payload.recipe, (ratingAction as IRatingDeleteAction).payload.ratingId);
      default:
        return ReduxHelper.caseMapDefaultReducer(state, action, defaultState);
    }
  }

  return ReduxHelper.caseMapDefaultReducer(state, action, defaultState);
};

export default reducer;
