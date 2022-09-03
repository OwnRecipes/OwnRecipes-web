import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import * as FilterActions from '../store/FilterActions';
import { CombinedStore } from '../../app/Store';
import SearchMenu from '../components/SearchMenu';
import { getResourcePath } from '../../common/utility';
import { useDispatch } from '../../common/store/redux';

export interface ISearchMenuContainerProps {
  qs:       Record<string, string>;
  qsString: string;

  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
}

const SearchMenuContainer: React.FC<ISearchMenuContainerProps> = ({
    qs, qsString, buildUrl }: ISearchMenuContainerProps) => {
  const dispatch = useDispatch();

  const courses  = useSelector((state: CombinedStore) => state.browse.filters.courses.items);
  const cuisines = useSelector((state: CombinedStore) => state.browse.filters.cuisines.items);
  const ratings  = useSelector((state: CombinedStore) => state.browse.filters.ratings.items);
  const tags     = useSelector((state: CombinedStore) => state.browse.filters.tags.items);

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

  const handleChangeOpenFilters = (newOpenFilters: Array<string>) => {
    setOpenFilters(newOpenFilters);
  };

  useEffect(() => {
    reloadData();
  }, [qsString, openFilters]);

  const resetFilterUrl = useMemo(() => {
    if (!qs.search) {
      return getResourcePath('/browser');
    } else {
      const searchString = new URLSearchParams({ search: qs.search }).toString();
      return getResourcePath(`/browser?${searchString}`);
    }
  }, [qs]);

  const hasActiveFilter = Object.keys(qs).filter(key => !['limit', 'offset', 'search'].includes(key)).length !== 0;

  return (
    <SearchMenu
        courses  = {courses?.[qsString]}
        cuisines = {cuisines?.[qsString]}
        ratings  = {ratings?.[qsString]}
        tags     = {tags?.[qsString]}
        qs       = {qs}

        hasActiveFilter = {hasActiveFilter}
        resetFilterUrl  = {resetFilterUrl}
        openFilters    = {openFilters}
        setOpenFilters = {handleChangeOpenFilters}

        buildUrl = {buildUrl} />
  );
};

export default SearchMenuContainer;
