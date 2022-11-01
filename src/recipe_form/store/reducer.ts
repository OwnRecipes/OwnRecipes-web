import ReduxHelper, { GenericItemReducerAction } from '../../common/store/ReduxHelper';
import { Recipe } from '../../recipe/store/RecipeTypes';
import { RecipeFormAction, RecipeFormState, RECIPE_FORM_STORE } from './types';

const defaultState: RecipeFormState = ReduxHelper.getItemReducerDefaultState(RECIPE_FORM_STORE) as RecipeFormState;

const reducer = (state = defaultState, action: RecipeFormAction): RecipeFormState => ReduxHelper.caseItemDefaultReducer(state, action as GenericItemReducerAction<Recipe>, defaultState) as RecipeFormState;

export default reducer;
