import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { defineMessages, useIntl } from 'react-intl';
import { Accordion, Button, Card } from 'react-bootstrap';

import '../css/filter.css';

import Icon from '../../common/components/Icon';
import P from '../../common/components/P';
import Chip from '../../common/components/Chip';
import Tooltip from '../../common/components/Tooltip';
import { CategoryCount, RatingCount } from '../store/FilterTypes';
import Filter from './Filter';

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
  filter_season: {
    id: 'filter.filter_season',
    description: 'Filter field season',
    defaultMessage: 'Seasons',
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
  tips_advanced: {
    id: 'filter.tips_advanced',
    description: 'Advanced tips for filtering',
    defaultMessage: 'Looking for more filters? Enter "author:your-username" in the search to find only your recipes.',
  },
});

export interface ISearchMenuProps {
  qs: Record<string, string>;
  courses:  Array<CategoryCount> | undefined;
  cuisines: Array<CategoryCount> | undefined;
  ratings:  Array<RatingCount>   | undefined;
  seasons:  Array<CategoryCount> | undefined;
  tags:     Array<CategoryCount> | undefined;

  activeFilters: Record<string, string>;
  resetFilterUrl: string;
  openFilters: Array<string>;
  setOpenFilters: (filters: Array<string>) => void;

  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
}

const SearchMenu: React.FC<ISearchMenuProps> = ({
    qs, courses, cuisines, ratings, seasons, tags,
    activeFilters, resetFilterUrl, openFilters, setOpenFilters,
    buildUrl }: ISearchMenuProps) => {
  const { formatMessage } = useIntl();

  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleMenu = useCallback(() => {
    setShowMenu(prev => !prev);
  }, []);

  const activeFiltersCount = useMemo(() => Object.values(activeFilters).flatMap(f => f.split(',')).length, [activeFilters]);

  const mobileHeader = (
    <div className='sidebar-header'>
      <h2>
        <Button type='button' variant='transparent' className='filter-header' onClick={toggleMenu}>
          {showMenu ? formatMessage(messages.hide_filters) : formatMessage(messages.show_filters)}
          {activeFiltersCount > 0 && <Chip color='primary'>{activeFiltersCount}</Chip>}
          <Icon icon={showMenu ? 'chevron-up' : 'chevron-down'} variant='light' className={classNames({ 'reset-margin': Boolean(activeFiltersCount) })} />
        </Button>
      </h2>
      {activeFiltersCount > 0 && (
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
        <h2>{formatMessage(messages.filters)}</h2>
        {activeFiltersCount > 0 && (
          <>
            <Chip color='primary'>{activeFiltersCount}</Chip>
            <Tooltip id='clear-filter-desktop-btn-tooltip' tooltip={formatMessage(messages.reset_filters)}>
              <Link className='clear-filter-desktop btn btn-transparent' to={resetFilterUrl} aria-label={formatMessage(messages.reset_filters)}>
                <Icon icon='arrow-counterclockwise' variant='light' />
              </Link>
            </Tooltip>
          </>
        )}
      </Card.Header>
      <Card.Text as='div' className={classNames('sidebar', { 'hidden-xs': !showMenu })}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
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
              title    = {formatMessage(messages.filter_season)}
              qsTitle  = 'season'
              data     = {seasons}
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
                  slug:   r.rating.toString(),
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
        {activeFiltersCount > 0 && (
          <div className='row reset-search-row print-hidden hidden-xs'>
            <Link className='btn btn-outline-danger reset-search hidden-xs' to={resetFilterUrl}>
              {formatMessage(messages.reset)}
            </Link>
          </div>
        )}

        <P variant='body2' className='filters-tip'>
          <Icon icon='lightbulb' style={{ color: 'var(--secondaryMain)' }} />
          {formatMessage(messages.tips_advanced)}
        </P>
      </Card.Text>
    </Card>
  );
};

export default SearchMenu;
