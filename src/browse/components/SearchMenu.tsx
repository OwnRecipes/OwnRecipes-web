import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { defineMessages, useIntl } from 'react-intl';
import { Accordion, Button, Card } from 'react-bootstrap';

import '../css/filter.css';

import Filter from './Filter';
import Icon from '../../common/components/Icon';
import { CategoryCount, RatingCount } from '../store/FilterTypes';
import Tooltip from '../../common/components/Tooltip';

export interface ISearchMenuProps {
  qs: Record<string, string>;
  courses:  Array<CategoryCount> | undefined;
  cuisines: Array<CategoryCount> | undefined;
  ratings:  Array<RatingCount>   | undefined;
  tags:     Array<CategoryCount> | undefined;

  hasActiveFilter: boolean;
  resetFilterUrl: string;
  openFilters: Array<string>;
  setOpenFilters: (filters: Array<string>) => void;

  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
}

const SearchMenu: React.FC<ISearchMenuProps> = ({
    qs, courses, cuisines, ratings, tags,
    hasActiveFilter, resetFilterUrl, openFilters, setOpenFilters,
    buildUrl }: ISearchMenuProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    reset: {
      id: 'filter.reset',
      description: 'Filter reset',
      defaultMessage: 'Reset',
    },
    filter_course: {
      id: 'filter.filter_course',
      description: 'Filter field course',
      defaultMessage: 'Courses',
    },
    filter_cuisine: {
      id: 'filter.filter_cuisine',
      description: 'Filter field cuisine',
      defaultMessage: 'Cuisines',
    },
    filter_rating: {
      id: 'filter.filter_rating',
      description: 'Filter field rating',
      defaultMessage: 'Ratings',
    },
    filter_tag: {
      id: 'filter.filter_tag',
      description: 'Filter field tag',
      defaultMessage: 'Tags',
    },
    title: {
      id: 'filter.title',
      description: 'Title',
      defaultMessage: 'Title',
    },
    rating: {
      id: 'filter.rating',
      description: 'rating',
      defaultMessage: 'Rating',
    },
    pub_date: {
      id: 'filter.pub_date',
      description: 'pub_date',
      defaultMessage: 'Created Date',
    },
    filters: {
      id: 'filter.filters',
      description: 'Filters',
      defaultMessage: 'Filters',
    },
    show_filters: {
      id: 'filter.show_filters',
      description: 'Show Filters',
      defaultMessage: 'Show Filters',
    },
    hide_filters: {
      id: 'filter.hide_filters',
      description: 'Hide Filters',
      defaultMessage: 'Hide Filters',
    },
    reset_filters: {
      id: 'filter.reset_filters',
      description: 'Reset Filters',
      defaultMessage: 'Reset Filters',
    },
    filter_ordering: {
      id: 'filter.filter_ordering',
      description: 'Filter field ordering',
      defaultMessage: 'Ordering',
    },
    x_stars: {
      id: 'filter.x_stars',
      description: 'X Stars',
      defaultMessage: '{rating, number} stars',
    },
  });

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleMenu = useCallback(() => {
    setShowMenu(prev => !prev);
  }, []);

  const mobileHeader = (
    <div className='sidebar-header'>
      <Button type='button' variant='transparent' className='filter-header' onClick={toggleMenu}>
        {showMenu ? formatMessage(messages.hide_filters) : formatMessage(messages.show_filters)}
        <Icon icon={showMenu ? 'chevron-up' : 'chevron-down'} variant='light' className={classNames({ 'reset-margin': hasActiveFilter })} />
      </Button>
      {hasActiveFilter && (
        <div className='filter-header-clear'>
          <Link className='clear-filter-mobile btn btn-transparent' to={resetFilterUrl}>
            {formatMessage(messages.reset)}
          </Link>
        </div>
      )}
    </div>
  );

  const handleSelect = useCallback((eventKey: string | string[] | null) => {
    const newOpenFilters: Array<string> = Array.isArray(eventKey) ? eventKey : [(eventKey ?? '')];
    setOpenFilters(newOpenFilters);
  }, []);

  return (
    <Card>
      <Card.Header className='visible-xs'>
        {mobileHeader}
      </Card.Header>
      <Card.Header className='hidden-xs filter-title'>
        {formatMessage(messages.filters)}
        {hasActiveFilter && (
          <Tooltip id='clear-tooltip' tooltip={formatMessage(messages.reset_filters)} placement='bottom'>
            <Link className='clear-filter-desktop btn btn-transparent' to={resetFilterUrl}>
              <Icon icon='arrow-counterclockwise' variant='light' />
            </Link>
          </Tooltip>
        )}
      </Card.Header>
      <Card.Text as='div' className={classNames('sidebar', { 'hidden-xs': !showMenu })}>
        <Accordion activeKey={openFilters} flush alwaysOpen className='filter-group-list' onSelect={handleSelect as any}>
          <Filter
              title    = {formatMessage(messages.filter_course)}
              qsTitle  = 'course'
              data     = {courses}
              qs       = {qs}
              multiSelect
              buildUrl = {buildUrl} />
          <Filter
              title    = {formatMessage(messages.filter_cuisine)}
              qsTitle  = 'cuisine'
              data     = {cuisines}
              qs       = {qs}
              multiSelect
              buildUrl = {buildUrl} />
          <Filter
              title    = {formatMessage(messages.filter_rating)}
              qsTitle  = 'rating'
              data     = {ratings?.map(r => ({
                  id:     r.rating,
                  rating: r.rating,
                  total:  r.total,
                  slug:   String(r.rating),
                  title:  formatMessage(messages.x_stars, { rating: r.rating }),
              }))}
              qs       = {qs}
              multiSelect
              buildUrl = {buildUrl}
              sort = 'off' />
          <Filter
              title    = {formatMessage(messages.filter_tag)}
              qsTitle  = 'tag'
              data     = {tags}
              qs       = {qs}
              multiSelect
              buildUrl = {buildUrl} />
        </Accordion>
        {hasActiveFilter && (
          <div className='row reset-search-row print-hidden hidden-xs'>
            <Link className='btn btn-outline-danger reset-search hidden-xs' to={resetFilterUrl}>
              {formatMessage(messages.reset)}
            </Link>
          </div>
        )}
      </Card.Text>
    </Card>
  );
};

export default SearchMenu;
