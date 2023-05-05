import { Dispatch as ReduxDispatch } from 'redux';

import ArrayReducerType from '../../common/store/ArrayReducerType';
import { GenericArrayReducerAction } from '../../common/store/ReduxHelper';
import { RecipeList } from '../../recipe/store/RecipeTypes';

export const MINI_BROWSE_STORE = 'browserMini';

export type MiniBrowseState    = ArrayReducerType<RecipeList>;
export type MiniBrowseAction   = GenericArrayReducerAction<RecipeList>;
export type MiniBrowseDispatch = ReduxDispatch<MiniBrowseAction>;
