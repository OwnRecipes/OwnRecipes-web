import { defineMessages, useIntl } from 'react-intl';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { SearchResult } from '../store/SearchTypes';
import P from '../../common/components/P';
import DefaultFilters from '../constants/DefaultFilters';
import { optionallyFormatMessage, toNumberDefault } from '../../common/utility';

export interface ISearchSummaryProps {
  search:   SearchResult | undefined;
  qs:       Record<string, string>;
  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
}

const SearchSummary: React.FC<ISearchSummaryProps> = ({ search, qs, buildUrl }: ISearchSummaryProps) => {
  const intl = useIntl();

  const { formatMessage } = intl;
  const messages = defineMessages({
    search_summary_results: {
      id: 'searchsummary.results',
      description: 'Number of results, if there is no pagination.',
      defaultMessage: '{resultsCount, plural, one {# result} other {# results}}',
    },
    search_summary_results_pagination: {
      id: 'searchsummary.results_pagination',
      description: 'Number of results, with pagination from - to.',
      defaultMessage: '{offset}-{offsetLast} of {resultsCount} results',
    },
    search_summary_sort_by: {
      id: 'searchsummary.sort_by',
      description: 'Sort by title/...',
      defaultMessage: 'Sort by: {sort}',
    },

    sort_by_pub_date: {
      id: 'sort_by.pub_date',
      defaultMessage: 'Create date',
    },
    sort_by_rating: {
      id: 'sort_by.rating',
      defaultMessage: 'Rating',
    },
    sort_by_title: {
      id: 'sort_by.title',
      defaultMessage: 'Title',
    },
  });

  const toSortSlug = (sort: string): string => (
    sort.startsWith('-') ? sort.substring(1) : sort
  );

  const resultsCountD: number | undefined = search?.totalRecipes ?? 0;
  const offset: number = toNumberDefault(qs.offset, 0);
  const limit: number  = toNumberDefault(qs.limit, DefaultFilters.limit ?? 12);
  const withPagination = search != null && search.totalRecipes > limit;
  const currentSort    = qs.ordering != null ? toSortSlug(qs.ordering) : toSortSlug('-pub_date');

  const handleSortByClick = (event: React.MouseEvent<HTMLAnchorElement>, sortSlug: string) => {
    if (currentSort === sortSlug) {
      event.preventDefault();
    }
  };

  const dropdownItems = ['title', '-pub_date', '-rating'].map(sort => {
    const sortSlug = toSortSlug(sort);
    return (
      <Dropdown.Item key={sort} as={Link} to={buildUrl('ordering', sort)} active={currentSort === sortSlug} onClick={(event: React.MouseEvent<HTMLAnchorElement>) => handleSortByClick(event, sortSlug)}>
        {optionallyFormatMessage(intl, 'sort_by.', sortSlug)}
      </Dropdown.Item>
    );
  });

  return (
    <div className='search-summary'>
      <P className='results'>
        {withPagination  && formatMessage(messages.search_summary_results_pagination, { offset: offset + 1, offsetLast: Math.min(offset + limit, resultsCountD), resultsCount: resultsCountD })}
        {!withPagination && formatMessage(messages.search_summary_results, { resultsCount: resultsCountD })}
      </P>
      <Dropdown className='sort-by-dropdown'>
        <Dropdown.Toggle variant='outline-primary' id='sort-by-button' disabled={search == null}>
          {formatMessage(messages.search_summary_sort_by, { sort: optionallyFormatMessage(intl, 'sort_by.', currentSort) })}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {dropdownItems}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default SearchSummary;
