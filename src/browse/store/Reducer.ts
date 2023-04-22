import { combineReducers } from 'redux';

import filters from './FilterReducer';
import { BROWSE_FILTER_STORE } from './FilterTypes';
import miniBrowse from './MiniBrowseReducer';
import { MINI_BROWSE_STORE } from './MiniBrowseTypes';
import search from './SearchReducer';
import { BROWSER_SEARCH_STORE } from './SearchTypes';

export const BROWSE_STORE = 'browse';

const reducer = combineReducers({
  [BROWSE_FILTER_STORE]:  filters,
  [MINI_BROWSE_STORE]:    miniBrowse,
  [BROWSER_SEARCH_STORE]: search,
});

export default reducer;
