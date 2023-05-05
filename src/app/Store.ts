import { combineReducers } from 'redux';

import account from '../account/store/reducer';
import { ACCOUNT_STORE } from '../account/store/types';
import browse, { BROWSE_STORE } from '../browse/store/Reducer';
import connection from '../connection/store/reducer';
import { CONNECTION_STORE } from '../connection/store/types';
import groceryList from '../groceryList/store/GroceryListReducer';
import { GROCERY_LIST_STORE } from '../groceryList/store/GroceryListTypes';
import groceryLists from '../groceryList/store/GroceryListsReducer';
import { GROCERY_LISTS_STORE } from '../groceryList/store/GroceryListsTypes';
import groceryListItem from '../groceryList/store/GroceryListItemReducer';
import { GROCERY_LIST_ITEM_STORE } from '../groceryList/store/GroceryListItemTypes';
import groceryListItems from '../groceryList/store/GroceryListItemsReducer';
import { GROCERY_LIST_ITEMS_STORE } from '../groceryList/store/GroceryListItemsTypes';
import internalError from '../internal_error/store/reducer';
import { INTERNAL_ERROR_STORE } from '../internal_error/store/types';
// import menu from '../../menu/reducers/reducer';
import news from '../news/store/reducer';
import { NEWS_STORE } from '../news/store/types';
import ratings from '../rating/store/reducer';
import { RATINGS_STORE } from '../rating/store/types';
import recipe from '../recipe/store/RecipeReducer';
import { RECIPE_STORE } from '../recipe/store/RecipeTypes';
import recipeForm from '../recipe_form/store/reducer';
import { RECIPE_FORM_STORE } from '../recipe_form/store/types';
import recipeGroups from '../recipe_groups/store/reducer';
import { RECIPE_GROUPS_STORE } from '../recipe_groups/store/types';
import settings from '../account/store/settings/reducer';
import { SETTINGS_STORE } from '../account/store/settings/types';

const reducer = combineReducers({
  [ACCOUNT_STORE]: account,
  [BROWSE_STORE]: browse,
  [CONNECTION_STORE]: connection,
  [GROCERY_LIST_STORE]: groceryList,
  [GROCERY_LISTS_STORE]: groceryLists,
  [GROCERY_LIST_ITEM_STORE]: groceryListItem,
  [GROCERY_LIST_ITEMS_STORE]: groceryListItems,
  [INTERNAL_ERROR_STORE]: internalError,
  // menu,
  [NEWS_STORE]: news,
  [RATINGS_STORE]: ratings,
  [RECIPE_STORE]: recipe,
  [RECIPE_FORM_STORE]: recipeForm,
  [RECIPE_GROUPS_STORE]: recipeGroups,
  [SETTINGS_STORE]: settings,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
