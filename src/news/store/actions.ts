import { handleError, request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { NewsDispatch, NEWS_STORE, toNewsItem } from './types';
import { ACTION } from '../../common/store/ReduxHelper';
import { toBasicAction } from '../../common/store/redux';

// eslint-disable-next-line import/prefer-default-export
export const load = () => (dispatch: NewsDispatch) => {
  dispatch({ ...toBasicAction(NEWS_STORE, ACTION.GET_START) });

  request()
    .get(serverURLs.news)
    .then(res => {
      dispatch({
        ...toBasicAction(
          NEWS_STORE,
          ACTION.GET_SUCCESS
        ),
        payload: res.body.results?.map(toNewsItem),
      });
    })
    .catch(err => dispatch(handleError(err, NEWS_STORE)));
};
