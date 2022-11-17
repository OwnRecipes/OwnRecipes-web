import { Col, Row } from 'react-bootstrap';

import { RecipeList } from '../../recipe/store/RecipeTypes';
import { SearchResult } from '../store/SearchTypes';
import SearchResults from '../containers/SearchResults';
import SearchMenuContainer from '../containers/SearchMenuContainer';
import SearchBar from './SearchBar';
import Loading from './Loading';
import SearchSummary from './SearchSummary';

export interface ISearchProps {
  search:   Record<string, SearchResult> | undefined;
  qs:       Record<string, string>;
  qsString: string;

  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
  doSearch: (value: string) => void;
  onOpenRecipe: (rec: RecipeList) => void;
}

const Search: React.FC<ISearchProps> = ({
    search, qs, qsString,
    buildUrl, doSearch, onOpenRecipe }: ISearchProps) => {
  const isInit  = search != null && Object.keys(search).length > 0;
  const qsSearchResult = search?.[qsString];

  return (
    <>
      <SearchBar
          value    = {qs.search ?? ''}
          doSearch = {doSearch} />
      <SearchSummary
          qs       = {qs}
          search   = {qsSearchResult}
          buildUrl = {buildUrl}
          />
      {!isInit && (
        <Loading />
      )}
      {isInit && (
        <Row>
          <Col xs={12} className='filter-panel'>
            <SearchMenuContainer
                qs       = {qs}
                qsString = {qsString}
                buildUrl = {buildUrl}
            />
          </Col>
          <Col xs={12} className='results-panel'>
            <SearchResults
                qs       = {qs}
                qsString = {qsString}
                buildUrl = {buildUrl}
                onOpenRecipe = {onOpenRecipe}
            />
          </Col>
        </Row>
      )}
    </>
  );
};

export default Search;
