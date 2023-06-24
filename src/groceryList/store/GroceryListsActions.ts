import request from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { toBasicAction } from '../../common/store/redux';
import { ACTION } from '../../common/store/ReduxHelper';
import { handleError } from '../../common/requestUtils';
import { GroceryListsDispatch, GROCERY_LISTS_STORE } from './GroceryListsTypes';
import { toGroceryList } from './GroceryListTypes';

// eslint-disable-next-line import/prefer-default-export
export const load = () => (dispatch: GroceryListsDispatch) => {
  dispatch({ ...toBasicAction(GROCERY_LISTS_STORE, ACTION.GET_START) });
  request()
    .get(serverURLs.list)
    .then(res => {
      dispatch({
        ...toBasicAction(
          GROCERY_LISTS_STORE,
          ACTION.GET_SUCCESS
        ),
        payload: res.body.results.map(toGroceryList),
      });
    })
    .catch(err => dispatch(handleError(err, GROCERY_LISTS_STORE)));
};
