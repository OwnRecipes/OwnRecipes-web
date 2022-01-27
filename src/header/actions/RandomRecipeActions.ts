import { Dispatch } from 'react';
import { NavigateFunction } from 'react-router';

import { request } from '../../common/CustomSuperagent';
import { serverURLs } from '../../common/config';
import { setError } from '../../error/store/actions';
import { getResourcePath } from '../../common/utility';

// eslint-disable-next-line import/prefer-default-export
export const randomRecipe = (nav: NavigateFunction) => (dispatch: Dispatch<unknown>) => {
  request()
    .get(`${serverURLs.mini_browse}?limit=1&fields=slug`)
    .then(res => { nav(getResourcePath(`/recipe/${res.body.results[0].slug}`)); })
    .catch(err => dispatch(setError('UNKNOWN', err)));
};
