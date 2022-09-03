import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import * as _ from 'lodash-es';

import '../css/browse.css';

import Search from '../components/Search';
import * as SearchActions from '../store/SearchActions';
import * as RecipeActions from '../../recipe/store/RecipeActions';
import { useDispatch } from '../../common/store/redux';
import DefaultFilters from '../constants/DefaultFilters';
import PageWrapper from '../../common/components/PageWrapper';
import { CombinedStore } from '../../app/Store';
import { RecipeList } from '../../recipe/store/RecipeTypes';
import { getResourcePath, objToSearchString } from '../../common/utility';
import { useSearchParams } from 'react-router-dom';

export function mergeDefaultFilters(
    defaultFilters: Record<string, unknown>,
    params: Record<string, string>
  ): Record<string, string> {
  const filterS: Record<string, string> = {};
  Object.keys(defaultFilters).forEach(key => {
    filterS[key] = String(defaultFilters[key]);
  });

  return _.merge(filterS, params);
}

export function buildSearchString(route: string, qs: Record<string, string>, value: string): string {
  const qsBuilder = _.cloneDeep(qs);

  delete qsBuilder.offset;
  if (value !== '') {
    qsBuilder.search = value;
  } else {
    delete qsBuilder.search;
  }

  const str = objToSearchString(qsBuilder);
  return getResourcePath(str ? `/${route}?${str}` : `/${route}`);
}

export function buildSearchUrl(route: string, qs: Record<string, string>, name: string, value: string, multiSelect = false): string {
  if (!name) return getResourcePath(`/${route}`);

  const qsBuilder = _.cloneDeep(qs);

  delete qsBuilder.offset;

  if (value !== '') {
    if (qsBuilder[name] && multiSelect) {
      const query = qsBuilder[name].split(',');
      if (query.includes(value.toString())) {
        if (query.length === 1) {
          delete qsBuilder[name];
        } else {
          let str = '';
          // eslint-disable-next-line
          query.map(val => { val != value ? str += val + ',' : ''});
          qsBuilder[name] = str.substring(0, str.length - 1);
        }
      } else {
        qsBuilder[name] = `${qsBuilder[name]},${value}`;
      }
    } else {
      qsBuilder[name] = value;
    }
  } else {
    delete qsBuilder[name];
  }

  const str = objToSearchString(qsBuilder);
  return getResourcePath(str ? `/${route}?${str}` : `/${route}`);
}

const BrowsePage: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  const search   = useSelector((state: CombinedStore) => state.browse.search.items);

  const qs = Object.fromEntries(searchParams);
  const qsMergedDefaults = mergeDefaultFilters(DefaultFilters, qs);
  const qsMergedString = objToSearchString(qsMergedDefaults);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(SearchActions.loadRecipes(qsMergedDefaults));
  }, [searchParams]);

  const handleBuildUrl = useCallback((name: string, value: string, multiSelect = false) => (
    buildSearchUrl('browser', qs, name, value, multiSelect)
  ), [qs]);

  const doSearch = useCallback((value: string) => {
    const str = buildSearchString('browser', qs, value);
    nav(str);
  }, [qs, nav]);

  const handleOpenRecipe = useCallback((rec: RecipeList) => {
    dispatch(RecipeActions.preload(rec));
  }, [dispatch]);

  return (
    <PageWrapper title={intl.messages['nav.recipes'] as string}>
      <Search
          qs        = {qsMergedDefaults}
          qsString  = {qsMergedString}
          buildUrl  = {handleBuildUrl}
          doSearch  = {doSearch}
          onOpenRecipe = {handleOpenRecipe}

          search    = {search} />
    </PageWrapper>
  );
};

export default BrowsePage;
