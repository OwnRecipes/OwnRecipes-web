import { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { RootState } from '../../app/Store';
import { useSelector } from '../../common/store/redux';
import { PendingState } from '../../common/store/GenericReducerType';
import { RecipeList } from '../../recipe/store/RecipeTypes';
import DefaultFilters from '../constants/DefaultFilters';
import Results from '../components/Results';
import NoResults from '../components/NoResults';
import Loading from '../components/Loading';
import { SearchResult } from '../store/SearchTypes';

export interface ISearchResultsProps {
  qs:       Record<string, string>;
  qsString: string;

  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
  onOpenRecipe: (rec: RecipeList) => void;
}

const SearchResults: React.FC<ISearchResultsProps> = ({ qs, qsString, buildUrl, onOpenRecipe }: ISearchResultsProps) => {
  const { formatMessage }  = useIntl();
  const messages = defineMessages({
    search_results_heading: {
      id: 'browse.results_heading',
      description: 'Browser search results heading',
      defaultMessage: 'Results',
    },
  });

  const searchState = useSelector((state: RootState) => state.browse.browserSearch);
  const pending = searchState.meta.pending === PendingState.LOADING;

  const [searchResults, setSearchResults] = useState<SearchResult | undefined>(undefined);

  useEffect(() => {
    if (searchState.meta.pending === PendingState.COMPLETED) {
      setSearchResults(searchState.items?.[qsString]);
    }
  }, [searchState.meta.pending, searchState.items]);

  useEffect(() => {
    const res = searchState.items?.[qsString];
    if (res) {
      setSearchResults(res);
    }
  }, [qsString]);

  return (
    <>
      <h2 className='sr-only'>{formatMessage(messages.search_results_heading)}</h2>
      {pending && !searchResults && <Loading />}
      {!pending && (searchResults == null || searchResults.recipes.length === 0) && <NoResults />}
      {searchResults != null && searchResults.recipes.length > 0 && (
        <Results
            pending  = {pending}
            search   = {searchResults}
            qs       = {qs}
            defaults = {DefaultFilters}
            buildUrl = {buildUrl}
            onOpenRecipe = {onOpenRecipe}
        />
      )}
    </>
  );
};

export default SearchResults;
