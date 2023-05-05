import { Dispatch as ReduxDispatch } from 'redux';

import MapReducerType from '../../common/store/MapReducerType';
import { GenericMapReducerAction } from '../../common/store/ReduxHelper';
import { RecipeList, RecipeListDto, toRecipeList } from '../../recipe/store/RecipeTypes';

export const BROWSER_SEARCH_STORE = 'browserSearch';

export interface SearchResultDto {
  results: Array<RecipeListDto>;
  count:   number;
}

export interface SearchResult {
  recipes:      Array<RecipeList>;
  totalRecipes: number;
}

export const toSearchResult = (dto: SearchResultDto): SearchResult => ({
  recipes:      dto.results.map(toRecipeList),
  totalRecipes: dto.count,
});

export type SearchAction   = GenericMapReducerAction<SearchResult>;
export type SearchState    = MapReducerType<SearchResult>;
export type SearchDispatch = ReduxDispatch<SearchAction>;
