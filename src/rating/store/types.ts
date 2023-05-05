import { Dispatch as ReduxDispatch } from 'redux';
import MapReducerType from '../../common/store/MapReducerType';
import { ACTION, GenericItemReducerAction, GenericMapReducerAction } from '../../common/store/ReduxHelper';
import { PayloadAction } from '../../common/store/redux';

export const RATING_STORE  = 'rating';

export interface RatingDto {
  id:       number;
  comment:  string;
  user_id:  number;
  username: string;
  rating:   number;

  recipe?:  string;
  author?:  number;

  pub_date:    string; // ISO8601
  update_date: string; // ISO8601
}

export interface Rating {
  id:       number;
  comment:  string;
  userId:   number;
  userName: string;
  rating:   number;

  pubDate:    string;
  updateDate: string;
}

export interface RatingCreate {
  comment:  string;
  userId:   number;
  rating:   number;
}

export const toRating = (dto: RatingDto): Rating => ({
  id:       dto.id,
  comment:  dto.comment,
  userId:   dto.user_id,
  userName: dto.username,
  rating:   dto.rating,

  pubDate:    dto.pub_date,
  updateDate: dto.update_date,
});

export type IRatingAddAction = {
  store:  typeof RATING_STORE;
  typs:   ACTION.CREATE_SUCCESS;
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

export type RatingAction   = IRatingAddAction | IRatingDeleteAction | GenericItemReducerAction<Rating>;
export type RatingDispatch = ReduxDispatch<RatingAction>;

export const RATINGS_STORE = 'ratings';

export type RatingsState    = MapReducerType<Rating[]>;
export type RatingsAction   = GenericMapReducerAction<Rating[]>;
export type RatingsDispatch = ReduxDispatch<RatingsAction>;
