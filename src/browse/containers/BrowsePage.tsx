import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { useLocation, useNavigate } from 'react-router';
import * as _ from 'lodash-es';

import '../css/browse.css';

import Search from '../components/Search';
import * as RecipeActions from '../../recipe/store/RecipeActions';
import * as SearchActions from '../store/SearchActions';
import * as FilterActions from '../store/FilterActions';
import useDispatch from '../../common/hooks/useDispatch';
import DefaultFilters from '../constants/DefaultFilters';
import PageWrapper from '../../common/components/PageWrapper';
import { CombinedStore } from '../../app/Store';
import { RecipeList } from '../../recipe/store/RecipeTypes';
import { getResourcePath, objToSearchString } from '../../common/utility';

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
  const location = useLocation();
  const nav = useNavigate();

  const search   = useSelector((state: CombinedStore) => state.browse.search.items);
  const courses  = useSelector((state: CombinedStore) => state.browse.filters.courses.items);
  const cuisines = useSelector((state: CombinedStore) => state.browse.filters.cuisines.items);
  const ratings  = useSelector((state: CombinedStore) => state.browse.filters.ratings.items);
  const tags     = useSelector((state: CombinedStore) => state.browse.filters.tags.items);

  const locationSearch = location.search;
  const qs = Object.fromEntries(new URLSearchParams(locationSearch));
  const qsMergedDefaults = mergeDefaultFilters(DefaultFilters, qs);
  const qsMergedString = objToSearchString(qsMergedDefaults);

  const reloadData = () => {
    window.scrollTo(0, 0);
    if (search?.[qsMergedString] == null) {
      dispatch(SearchActions.loadRecipes(qsMergedDefaults));
      dispatch(FilterActions.loadCourses(qsMergedDefaults));
      dispatch(FilterActions.loadCuisines(qsMergedDefaults));
      setTimeout(() => {
        dispatch(FilterActions.loadRatings(qsMergedDefaults));
      }, 100);
      setTimeout(() => {
        dispatch(FilterActions.loadTags(qsMergedDefaults));
      }, 200);
    } else {
      if (courses?.[qsMergedString] == null) {
        dispatch(FilterActions.loadCourses(qsMergedDefaults));
      }
      if (cuisines?.[qsMergedString] == null) {
        dispatch(FilterActions.loadCuisines(qsMergedDefaults));
      }
      if (ratings?.[qsMergedString] == null) {
        setTimeout(() => {
          dispatch(FilterActions.loadRatings(qsMergedDefaults));
        }, 100);
      }
      if (tags?.[qsMergedString] == null) {
        setTimeout(() => {
          dispatch(FilterActions.loadTags(qsMergedDefaults));
        }, 200);
      }
    }
  };

  useEffect(() => {
    reloadData();
  }, [locationSearch]);

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
          qs = {qs}
          qsString = {qsMergedString}
          buildUrl = {handleBuildUrl}
          doSearch = {doSearch}
          onOpenRecipe = {handleOpenRecipe}

          search   = {search}
          courses  = {courses}
          cuisines = {cuisines}
          ratings  = {ratings}
          tags     = {tags} />
    </PageWrapper>
  );
};

export default BrowsePage;
