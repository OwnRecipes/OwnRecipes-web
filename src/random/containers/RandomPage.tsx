import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import '../css/random.css';

import * as RecipeActions from '../../recipe/store/RecipeActions';
import * as SearchActions from '../../browse/store/SearchActions';
import * as RecipeGroupActions from '../../recipe_groups/store/actions';

import useDispatch from '../../common/hooks/useDispatch';
import DefaultFilters from '../constants/DefaultFilters';
import PageWrapper from '../../common/components/PageWrapper';
import { CombinedStore } from '../../app/Store';
import { RecipeList } from '../../recipe/store/RecipeTypes';
import { buildSearchUrl, mergeDefaultFilters } from '../../browse/containers/BrowsePage';
import SearchReload from '../components/SearchReload';
import RandomHeader from '../components/RandomHeader';
import useSingle from '../../common/hooks/useSingle';
import SearchResults from '../../browse/containers/SearchResults';
import { objToSearchString } from '../../common/utility';
import { useSearchParams } from 'react-router-dom';

const RandomPage: React.FC = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [searchParams] = useSearchParams();

  const search   = useSelector((state: CombinedStore) => state.browse.search.items);

  const qs = Object.fromEntries(searchParams);
  const qsMergedDefaults = mergeDefaultFilters(DefaultFilters, qs);
  const qsMergedString = objToSearchString(qsMergedDefaults);

  const fetchCourses = useCallback(() => dispatch(RecipeGroupActions.fetchCourses()) , [dispatch, RecipeGroupActions]);
  const courses  = useSelector((state: CombinedStore) => state.recipeGroups.courses.items);
  useSingle(fetchCourses , courses);

  const fetchCuisines = useCallback(() => dispatch(RecipeGroupActions.fetchCuisines()) , [dispatch, RecipeGroupActions]);
  const cuisines  = useSelector((state: CombinedStore) => state.recipeGroups.cuisines.items);
  useSingle(fetchCuisines , cuisines);

  const reloadData = () => {
    dispatch(SearchActions.loadRandomRecipes(qsMergedDefaults));
  };

  useEffect(() => {
    reloadData();
  }, [searchParams]);

  const handleBuildUrl = useCallback((name: string, value: string, multiSelect = false) => (
    buildSearchUrl('random', qs, name, value, multiSelect)
  ), [qs]);

  const handleOpenRecipe = useCallback((rec: RecipeList) => {
    dispatch(RecipeActions.preload(rec));
  }, [dispatch]);

  return (
    <PageWrapper title={intl.messages['nav.recipes'] as string}>
      <RandomHeader
          search   = {search}
          courses  = {courses}
          cuisines = {cuisines}
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
