import { combineReducers } from 'redux';

import account from '../account/store/reducer';
import browse from '../browse/store/Reducer';
import connection from '../connection/store/reducer';
import groceryList from '../groceryList/store/GroceryListReducer';
import groceryLists from '../groceryList/store/GroceryListsReducer';
import groceryListItem from '../groceryList/store/GroceryListItemReducer';
import groceryListItems from '../groceryList/store/GroceryListItemsReducer';
import internalError from '../internal_error/store/reducer';
import recipe from '../recipe/store/RecipeReducer';
import recipeForm from '../recipe_form/store/reducer';
import recipeGroups from '../recipe_groups/store/reducer';
// import menu from '../../menu/reducers/reducer';
import news from '../news/store/reducer';
import ratings from '../rating/store/reducer';
import settings from '../account/store/settings/reducer';

const reducer = combineReducers({
  account,
  browse,
  connection,
  groceryList,
  groceryLists,
  groceryListItem,
  groceryListItems,
  internalError,
  // menu,
  news,
  ratings,
  recipe,
  recipeForm,
  recipeGroups,
  settings,
});

export type RootState = ReturnType<typeof reducer>;

export default reducer;
