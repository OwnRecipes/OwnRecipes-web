import { combineReducers, Reducer } from 'redux';

import filters from './FilterReducer';
import { FilterAction, FilterState } from './FilterTypes';
import miniBrowse from './MiniBrowseReducer';
import { MiniBrowseAction, MiniBrowseState } from './MiniBrowseTypes';
import search from './SearchReducer';
import { SearchAction, SearchState } from './SearchTypes';

export interface BrowseState {
  filters:    FilterState;
  miniBrowse: MiniBrowseState;
  search:     SearchState;
}

type BrowseAction = FilterAction | MiniBrowseAction | SearchAction;

const reducer: Reducer<BrowseState, BrowseAction> = combineReducers({
  filters,
  miniBrowse,
  search,
});

export default reducer;
