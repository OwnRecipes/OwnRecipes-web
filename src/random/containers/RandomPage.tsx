import { useCallback, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';

import '../css/random.css';

import * as RecipeActions from '../../recipe/store/RecipeActions';
import * as SearchActions from '../../browse/store/SearchActions';
import * as RecipeGroupActions from '../../recipe_groups/store/actions';

import { useDispatch, useSelector } from '../../common/store/redux';
import DefaultFilters from '../constants/DefaultFilters';
import PageWrapper from '../../common/components/PageWrapper';
import { RootState } from '../../app/Store';
import { RecipeList } from '../../recipe/store/RecipeTypes';
import { buildSearchUrl, mergeDefaultFilters } from '../../browse/containers/BrowsePage';
import SearchReload from '../components/SearchReload';
import RandomHeader from '../components/RandomHeader';
import useSingle from '../../common/hooks/useSingle';
import SearchResults from '../../browse/containers/SearchResults';
import { objToSearchString } from '../../common/utility';

const RandomPage: React.FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const search   = useSelector((state: RootState) => state.browse.browserSearch.items);

  const qs = useMemo(() => Object.fromEntries(searchParams), [searchParams]);
  const qsMergedDefaults = useMemo(() => mergeDefaultFilters(DefaultFilters, qs), [DefaultFilters, qs]);
  const qsMergedString = useMemo(() => objToSearchString(qsMergedDefaults), [qsMergedDefaults]);

  const fetchCourses = useCallback(() => { dispatch(RecipeGroupActions.fetchCourses()); }, []);
  const courses  = useSelector((state: RootState) => state.recipeGroups.courses.items);
  useSingle(fetchCourses, courses);

  const fetchCuisines = useCallback(() => { dispatch(RecipeGroupActions.fetchCuisines()); }, []);
  const cuisines  = useSelector((state: RootState) => state.recipeGroups.cuisines.items);
  useSingle(fetchCuisines, cuisines);

  const fetchSeasons = useCallback(() => { dispatch(RecipeGroupActions.fetchSeasons()); }, []);
  const seasons  = useSelector((state: RootState) => state.recipeGroups.seasons.items);
  useSingle(fetchSeasons, seasons);

  const reloadData = useCallback(() => {
    dispatch(SearchActions.loadRandomRecipes(qsMergedDefaults));
  }, [qsMergedDefaults]);

  useEffect(() => {
    reloadData();
  }, [searchParams]);

  const handleBuildUrl = useCallback((name: string, value: string, multiSelect = false) => (
    buildSearchUrl('random', qs, name, value, multiSelect)
  ), [buildSearchUrl, qs]);

  const handleOpenRecipe = useCallback((rec: RecipeList) => {
    dispatch(RecipeActions.preload(rec));
  }, []);

  return (
    <PageWrapper title={intl.messages['nav.recipes'] as string}>
      <RandomHeader
          search   = {search}
          courses  = {courses}
          cuisines = {cuisines}
          seasons  = {seasons}
          qs       = {qs}
          qsString = {qsMergedString}
          buildUrl = {handleBuildUrl}
          />
      <SearchResults
          qs       = {qs}
          qsString = {qsMergedString}
          buildUrl = {handleBuildUrl}
          onOpenRecipe = {handleOpenRecipe}
          />
      <SearchReload onReloadClick={reloadData} />
    </PageWrapper>
  );
};

export default RandomPage;
