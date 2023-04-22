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

export interface NewsItem {
  id:        number;
  image:     string;
  title:     string;
  content:   string;
  frontpage: boolean;
}

export const toNewsItem = (dto: NewsItemDto): NewsItem => ({
  id:        dto.id,
  image:     dto.image,
  title:     dto.title,
  content:   dto.content,
  frontpage: dto.frontpage,
});

export const NEWS_STORE = 'news';

export type NewsState    = ArrayReducerType<NewsItem>;
export type NewsAction   = GenericArrayReducerAction<NewsItem>;
export type NewsDispatch = ReduxDispatch<NewsAction>;
