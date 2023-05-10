import { Dispatch as ReduxDispatch } from 'redux';
import MapReducerType from '../../common/store/MapReducerType';
import { ACTION, GenericItemReducerAction, GenericMapReducerAction } from '../../common/store/ReduxHelper';
import { PayloadAction } from '../../common/store/redux';

export const RATING_STORE  = 'rating';

export interface RatingDto {
  id:       number;
  recipe:   string;
  comment:  string;
  rating:   number;

  author:   number;
  pub_username: string;
  pub_date: string; // ISO8601
  update_author?:   number;
  update_username?: string;
  update_date:      string; // ISO8601
}

export interface Rating {
  id:       number;
  comment:  string;
  rating:   number;

  author:       number;
  pub_username: string;
  pub_date:     string;
  update_author?:   number;
  update_username?: string;
  update_date:      string;
}

export interface RatingCreate {
  comment:  string;
  rating:   number;
}

export interface RatingUpdate {
  id:       number;
  comment:  string;
  rating:   number;
}

export const toRating = (dto: RatingDto): Rating => ({
  id:       dto.id,
  comment:  dto.comment,
  rating:   dto.rating,

  author:       dto.author,
  pub_username: dto.pub_username,
  pub_date:     dto.pub_date,
  update_author:   dto.update_author,
  update_username: dto.update_username,
  update_date:     dto.update_date,
});

export type IRatingAddAction = {
  store:  typeof RATING_STORE;
  typs:   ACTION.CREATE_SUCCESS;
} & PayloadAction<{
  recipe: string;
  rating: Rating;
}>;

export type IRatingUpdateAction = {
  store:  typeof RATING_STORE;
  typs:   ACTION.UPDATE_SUCCESS;
} & PayloadAction<{
  recipe: string;
  rating: Rating;
}>;

export type IRatingDeleteAction = {
  store:    typeof RATING_STORE;
  typs:     ACTION.DELETE_SUCCESS;
} & PayloadAction<{
  recipe:   string;
  ratingId: number;
}>;

export type RatingAction   = IRatingAddAction | IRatingUpdateAction | IRatingDeleteAction | GenericItemReducerAction<Rating>;
export type RatingDispatch = ReduxDispatch<RatingAction>;

export const RATINGS_STORE = 'ratings';

export type RatingsState    = MapReducerType<Rating[]>;
export type RatingsAction   = GenericMapReducerAction<Rating[]>;
export type RatingsDispatch = ReduxDispatch<RatingsAction>;
