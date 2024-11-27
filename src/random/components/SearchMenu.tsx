import { useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Dropdown, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { SearchResult } from '../../browse/store/SearchTypes';
import { optionallyFormatMessage } from '../../common/utility';
import { Course, Cuisine, Season } from '../../recipe/store/RecipeTypes';

const messages = defineMessages({
  filter_by_course: {
    id: 'random.search.menu.filter_by_course_dropdown',
    description: 'Filter by main/...',
    defaultMessage: 'Course: {course}',
  },
  filter_by_cuisine: {
    id: 'random.search.menu.filter_by_cuisine_dropdown',
    description: 'Filter by indian/...',
    defaultMessage: 'Cuisine: {cuisine}',
  },
  filter_by_season: {
    id: 'random.search.menu.filter_by_season_dropdown',
    description: 'Filter by spring/...',
    defaultMessage: 'Season: {season}',
  },
  filter_all: {
    id: 'random.search.menu.filter_all',
    description: 'Item to not filter at all',
    defaultMessage: '(All)',
  },
});

export interface ISearchMenuProps {
  search:   SearchResult | undefined;
  qs:       Record<string, string>;
  courses:  Array<Course> | undefined;
  cuisines: Array<Cuisine> | undefined;
  seasons:  Array<Season> | undefined;
  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
}

const SearchMenu: React.FC<ISearchMenuProps> = ({ search, qs, courses, cuisines, seasons, buildUrl }: ISearchMenuProps) => {
  const intl = useIntl();
  const { formatMessage } = intl;

  const filterAllText = formatMessage(messages.filter_all);

  const currentCourse = qs.course__slug ?? '';
  const handleFilterCourseClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>, filterCourse: string) => {
    if (currentCourse === filterCourse) {
      event.preventDefault();
    }
  }, [currentCourse]);
  const courseDropdownItems = courses?.map(course => ({ key: course.title, value: optionallyFormatMessage(intl, 'course.', course.title) })).sort((a, b) => a.value.localeCompare(b.value));
  courseDropdownItems?.unshift({ key: '', value: filterAllText });
  const courseDropdownItemsJsx = courseDropdownItems?.map(item => (
    <Dropdown.Item key={item.key} as={Link} to={buildUrl('course__slug', item.key)} active={currentCourse === item.key} onClick={(event: React.MouseEvent<HTMLAnchorElement>) => handleFilterCourseClick(event, item.key)}>
      {item.value}
    </Dropdown.Item>
  ));

  const currentCuisine = qs.cuisine__slug ?? '';
  const handleFilterCuisineClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>, filterCuisine: string) => {
    if (currentCuisine === filterCuisine) {
      event.preventDefault();
    }
  }, [currentCuisine]);
  const cuisineDropdownItems = cuisines?.map(cuisine => ({ key: cuisine.title, value: optionallyFormatMessage(intl, 'cuisine.', cuisine.title) })).sort((a, b) => a.value.localeCompare(b.value));
  cuisineDropdownItems?.unshift({ key: '', value: filterAllText });
  const cuisineDropdownItemsJsx = cuisineDropdownItems?.map(item => (
    <Dropdown.Item key={item.key} as={Link} to={buildUrl('cuisine__slug', item.key)} active={currentCuisine === item.key} onClick={(event: React.MouseEvent<HTMLAnchorElement>) => handleFilterCuisineClick(event, item.key)}>
      {item.value}
    </Dropdown.Item>
  ));

  const currentSeason = qs.season__slug ?? '';
  const handleFilterSeasonClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>, filterSeason: string) => {
    if (currentSeason === filterSeason) {
      event.preventDefault();
    }
  }, [currentSeason]);
  const seasonDropdownItems = seasons?.map(season => ({ key: season.title, value: optionallyFormatMessage(intl, 'season.', season.title) }));
  seasonDropdownItems?.unshift({ key: '', value: filterAllText });
  const seasonDropdownItemsJsx = seasonDropdownItems?.map(item => (
    <Dropdown.Item key={item.key} as={Link} to={buildUrl('season__slug', item.key)} active={currentSeason === item.key} onClick={(event: React.MouseEvent<HTMLAnchorElement>) => handleFilterSeasonClick(event, item.key)}>
      {item.value}
    </Dropdown.Item>
  ));

  return (
    <Row xs={1} xl='auto' className='search-menu'>
      <Dropdown className='filter-course-dropdown'>
        <Dropdown.Toggle variant='outline-primary' id='filter-course-button' disabled={search == null}>
          {formatMessage(messages.filter_by_course, { course: currentCourse ? optionallyFormatMessage(intl, 'course.', currentCourse) : filterAllText })}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {courseDropdownItemsJsx}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown className='filter-cuisine-dropdown'>
        <Dropdown.Toggle variant='outline-primary' id='filter-cuisine-button' disabled={search == null}>
          {formatMessage(messages.filter_by_cuisine, { cuisine: currentCuisine ? optionallyFormatMessage(intl, 'cuisine.', currentCuisine) : filterAllText })}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {cuisineDropdownItemsJsx}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown className='filter-season-dropdown'>
        <Dropdown.Toggle variant='outline-primary' id='filter-season-button' disabled={search == null}>
          {formatMessage(messages.filter_by_season, { season: currentSeason ? optionallyFormatMessage(intl, 'season.', currentSeason) : filterAllText })}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {seasonDropdownItemsJsx}
        </Dropdown.Menu>
      </Dropdown>
    </Row>
  );
};

export default SearchMenu;
