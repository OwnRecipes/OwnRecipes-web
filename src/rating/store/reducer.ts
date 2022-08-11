import * as _ from 'lodash-es';

import ReduxHelper, { ACTION } from '../../common/store/ReduxHelper';
import { Rating, RatingAction, RatingsAction, IRatingAddAction, IRatingDeleteAction, RatingsState, RATINGS_STORE, RATING_STORE } from './types';

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
    switch (ratingAction.type) {
      case ACTION.CREATE_SUCCESS:
        return addRating(state, (ratingAction as IRatingAddAction).recipe, ratingAction.data);
      case ACTION.DELETE_SUCCESS:
        return deleteRating(state, (ratingAction as IRatingDeleteAction).recipe, (ratingAction as IRatingDeleteAction).ratingId);
      default:
        return ReduxHelper.caseMapDefaultReducer(state, action, defaultState);
    }
  }

  return ReduxHelper.caseMapDefaultReducer(state, action, defaultState);
};

export default reducer;
