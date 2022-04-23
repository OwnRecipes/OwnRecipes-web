import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import { useIntl } from 'react-intl';
import { useLocation, useNavigate } from 'react-router';
import * as _ from 'lodash';

import Search from '../components/Search';

import * as RecipeActions from '../../recipe/store/RecipeActions';
import * as SearchActions from '../store/SearchActions';
import * as FilterActions from '../store/FilterActions';
import DefaultFilters from '../constants/DefaultFilters';
import PageWrapper from '../../common/components/PageWrapper';
import { CombinedStore } from '../../app/Store';
import { RecipeList } from '../../recipe/store/RecipeTypes';
import { getResourcePath } from '../../common/utility';

function mergeDefaultFilters(query: queryString.ParsedQuery<string | number | boolean>) {
  const filter: Record<string, unknown> = {};

  Object.keys(DefaultFilters).forEach(key => {
    filter[key] = _.get(DefaultFilters, key);
  });

  Object.keys(query).forEach(key => {
    filter[key] = query[key];
  });

  return filter;
}

const Browse: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const location = useLocation();
  const nav = useNavigate();

  const search   = useSelector((state: CombinedStore) => state.browse.search.items);
  const courses  = useSelector((state: CombinedStore) => state.browse.filters.courses.items);
  const cuisines = useSelector((state: CombinedStore) => state.browse.filters.cuisines.items);
  const ratings  = useSelector((state: CombinedStore) => state.browse.filters.ratings.items);

  const locationSearch = location.search;
  const qs: Record<string, string> = queryString.parse(locationSearch) as Record<string, string>;
  const qsMergedDefaults = mergeDefaultFilters(qs) as Record<string, string>;
  const qsMergedString = queryString.stringify(qsMergedDefaults);

  const reloadData = () => {
    window.scrollTo(0, 0);
    if (search?.[qsMergedString] == null) {
      dispatch(SearchActions.loadRecipes(qsMergedDefaults));
      dispatch(FilterActions.loadCourses(qsMergedDefaults));
      dispatch(FilterActions.loadCuisines(qsMergedDefaults));
      dispatch(FilterActions.loadRatings(qsMergedDefaults));
    } else {
      if (courses?.[qsMergedString] == null) {
        dispatch(FilterActions.loadCourses(qsMergedDefaults));
      }
      if (cuisines?.[qsMergedString] == null) {
        dispatch(FilterActions.loadCuisines(qsMergedDefaults));
      }
      if (ratings?.[qsMergedString] == null) {
        dispatch(FilterActions.loadRatings(qsMergedDefaults));
      }
    }
  };

  useEffect(() => {
    reloadData();
  }, [locationSearch]);

  const buildUrl = useCallback((name: string, value: string, multiSelect = false) => {
    if (!name) return getResourcePath('/browser');

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

    const str = queryString.stringify(qsBuilder);
    return getResourcePath(str ? `/browser?${str}` : '/browser');
  }, [qs]);

  const doSearch = useCallback((value: string) => {
    const qsBuilder = _.cloneDeep(qs);

    delete qsBuilder.offset;
    if (value !== '') {
      qsBuilder.search = value;
    } else {
      delete qsBuilder.search;
    }

    let str = queryString.stringify(qsBuilder);
    str = getResourcePath(str ? `/browser?${str}` : '/browser');
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
          buildUrl = {buildUrl}
          doSearch = {doSearch}
          onOpenRecipe = {handleOpenRecipe}

          search   = {search}
          courses  = {courses}
          cuisines = {cuisines}
          ratings  = {ratings} />
    </PageWrapper>
  );
};

export default Browse;
