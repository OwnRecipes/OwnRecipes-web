import request from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { ACTION } from '../../common/store/ReduxHelper';
import { toBasicAction } from '../../common/store/redux';
import { handleError } from '../../common/requestUtils';
import { toRecipeList } from '../../recipe/store/RecipeTypes';
import { MiniBrowseDispatch, MINI_BROWSE_STORE } from './MiniBrowseTypes';

// eslint-disable-next-line import/prefer-default-export
export const loadMiniBrowse = (filter: string) => (dispatch: MiniBrowseDispatch) => {
  dispatch({ ...toBasicAction(MINI_BROWSE_STORE, ACTION.GET_START) });
  request()
    .get(`${serverURLs.mini_browse}${filter ? `&${filter}` : ''}`)
    .then(res => {
        dispatch({
          ...toBasicAction(
            MINI_BROWSE_STORE,
            ACTION.GET_SUCCESS
          ),
          payload: res.body.results?.map(toRecipeList),
        });
    })
    .catch(err => dispatch(handleError(err, MINI_BROWSE_STORE)));
};
