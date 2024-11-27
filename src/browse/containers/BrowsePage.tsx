import { useCallback, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import * as _ from 'lodash-es';

import '../css/browse.css';

import Search from '../components/Search';
import * as SearchActions from '../store/SearchActions';
import * as RecipeActions from '../../recipe/store/RecipeActions';
import { useDispatch, useSelector } from '../../common/store/redux';
import DefaultFilters from '../constants/DefaultFilters';
import PageWrapper from '../../common/components/PageWrapper';
import PageScroller from '../../common/components/PageScroller';
import { getRoutePath, objToSearchString } from '../../common/utility';
import { RootState } from '../../app/Store';
import { RecipeList } from '../../recipe/store/RecipeTypes';

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
  return getRoutePath(str ? `/${route}?${str}` : `/${route}`);
}

export function buildSearchUrl(route: string, qs: Record<string, string>, name: string, value: string, multiSelect = false): string {
  if (!name) return getRoutePath(`/${route}`);

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
  return getRoutePath(str ? `/${route}?${str}` : `/${route}`);
}

const BrowsePage: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  const search   = useSelector((state: RootState) => state.browse.browserSearch.items);

  const qs = useMemo(() => Object.fromEntries(searchParams), [searchParams]);
  const qsMergedDefaults = useMemo(() => mergeDefaultFilters(DefaultFilters, qs), [DefaultFilters, qs]);
  const qsMergedString = useMemo(() => objToSearchString(qsMergedDefaults), [qsMergedDefaults]);

  useEffect(() => {
    dispatch(SearchActions.loadRecipes(qsMergedDefaults));
  }, [searchParams]);

  const handleBuildUrl = useCallback((name: string, value: string, multiSelect = false) => (
    buildSearchUrl('browser', qs, name, value, multiSelect)
  ), [buildSearchUrl, qs]);

  const doSearch = useCallback((value: string) => {
    const str = buildSearchString('browser', qs, value);
    nav(str);
  }, [buildSearchString, qs, nav]);

  const handleOpenRecipe = useCallback((rec: RecipeList) => {
    dispatch(RecipeActions.preload(rec));
  }, []);

  return (
    <PageWrapper title={intl.messages['nav.recipes'] as string}>
      <PageScroller scrollOnKeyChange />
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
