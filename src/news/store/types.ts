import { Dispatch as ReduxDispatch } from 'redux';

import ArrayReducerType from '../../common/store/ArrayReducerType';
import { GenericArrayReducerAction } from '../../common/store/ReduxHelper';

export interface NewsItemDto {
  id:        number;
  image:     string;
  title:     string;
  content:   string;
  frontpage: boolean;
}

export type NewsItem = NewsItemDto;

export const toNewsItem = (dto: NewsItemDto): NewsItem => dto;

export const NEWS_STORE = 'news';

export type NewsState    = ArrayReducerType<NewsItem>;
export type NewsAction   = GenericArrayReducerAction<NewsItem>;
export type NewsDispatch = ReduxDispatch<NewsAction>;
