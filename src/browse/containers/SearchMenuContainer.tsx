import { useEffect, useMemo, useState } from 'react';
import { Dispatch } from 'redux';
import { pickBy } from 'lodash-es';

import * as FilterActions from '../store/FilterActions';
import { RootState } from '../../app/Store';
import SearchMenu from '../components/SearchMenu';
import { getRoutePath } from '../../common/utility';
import { useDispatch, useSelector } from '../../common/store/redux';

export interface ISearchMenuContainerProps {
  qs:       Record<string, string>;
  qsString: string;

  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
}

const SearchMenuContainer: React.FC<ISearchMenuContainerProps> = ({
    qs, qsString, buildUrl }: ISearchMenuContainerProps) => {
  const dispatch = useDispatch();

  const courses  = useSelector((state: RootState) => state.browse.browserFilter.filter_courses.items);
  const cuisines = useSelector((state: RootState) => state.browse.browserFilter.filter_cuisines.items);
  const ratings  = useSelector((state: RootState) => state.browse.browserFilter.filter_ratings.items);
  const seasons  = useSelector((state: RootState) => state.browse.browserFilter.filter_seasons.items);
  const tags     = useSelector((state: RootState) => state.browse.browserFilter.filter_tags.items);

  const [openFilters, setOpenFilters] = useState<Array<string>>(Object.keys(qs));

  const qsMergedDefaults = qs;

  const reloadData = () => {
    const dispatchQueue: Array<(dispatch: Dispatch) => void> = [];

    if (openFilters.includes('course') && courses?.[qsString] == null) {
      dispatchQueue.push(FilterActions.loadCourses(qsMergedDefaults));
    }
    if (openFilters.includes('cuisine') && cuisines?.[qsString] == null) {
      dispatchQueue.push(FilterActions.loadCuisines(qsMergedDefaults));
    }
    if (openFilters.includes('rating') && ratings?.[qsString] == null) {
      dispatchQueue.push(FilterActions.loadRatings(qsMergedDefaults));
    }
    if (openFilters.includes('season') && seasons?.[qsString] == null) {
      dispatchQueue.push(FilterActions.loadSeasons(qsMergedDefaults));
    }
    if (openFilters.includes('tag') && tags?.[qsString] == null) {
      dispatchQueue.push(FilterActions.loadTags(qsMergedDefaults));
    }

    let delay = 0;
    const ADD_DELAY = 50;
    for (let ix = 0; ix < dispatchQueue.length; ++ix) {
      setTimeout(() => {
        dispatch(dispatchQueue[ix]);
      }, delay);
      delay += ADD_DELAY;
    }
  };

  useEffect(() => {
    reloadData();
  }, [qsString, openFilters]);

  const resetFilterUrl = useMemo(() => {
    if (!qs.search) {
      return getRoutePath('/browser');
    } else {
      const searchString = new URLSearchParams({ search: qs.search }).toString();
      return getRoutePath(`/browser?${searchString}`);
    }
  }, [qs]);

  const activeFiltersKeys = useMemo(() => pickBy(qs, (_, key) => !['limit', 'ordering', 'offset', 'search'].includes(key)), [qs]);

  return (
    <SearchMenu
        courses  = {courses?.[qsString]}
        cuisines = {cuisines?.[qsString]}
        ratings  = {ratings?.[qsString]}
        seasons  = {seasons?.[qsString]}
        tags     = {tags?.[qsString]}
        qs       = {qs}

        activeFilters  = {activeFiltersKeys}
        resetFilterUrl = {resetFilterUrl}
        openFilters    = {openFilters}
        setOpenFilters = {setOpenFilters}

        buildUrl = {buildUrl} />
  );
};

export default SearchMenuContainer;
