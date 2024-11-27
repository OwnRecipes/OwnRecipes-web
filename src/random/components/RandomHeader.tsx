import { Row } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';

import P from '../../common/components/P';
import { SearchResult } from '../../browse/store/SearchTypes';
import SearchMenu from './SearchMenu';
import { Course, Cuisine, Season } from '../../recipe/store/RecipeTypes';

const messages = defineMessages({
  random_heading: {
    id: 'random.heading',
    description: 'Heading of the random page.',
    defaultMessage: 'Random recipe',
  },
  random_text: {
    id: 'random.heading.text',
    description: 'Some nice text above the random search results.',
    defaultMessage: 'Looking for an awesome meal? There are plenty waiting for you!',
  },
});

export interface IRandomHeaderProps {
  search:   Record<string, SearchResult> | undefined;
  courses:  Array<Course> | undefined;
  cuisines: Array<Cuisine> | undefined;
  seasons:  Array<Season> | undefined;
  qs:       Record<string, string>;
  qsString: string;

  buildUrl: (qsTitle: string, recipeSlug: string, multiSelect?: boolean) => string;
}

const RandomHeader: React.FC<IRandomHeaderProps> = ({
    search, courses, cuisines, seasons, qs, qsString,
    buildUrl }: IRandomHeaderProps) => {
  const { formatMessage } = useIntl();

  const qsSearchResult = search?.[qsString];

  return (
    <Row xs={1} sm={2} className='random-header-container'>
      <div>
        <h1>{formatMessage(messages.random_heading)}</h1>
        <P>{formatMessage(messages.random_text)}</P>
      </div>
      <SearchMenu
          qs       = {qs}
          search   = {qsSearchResult}
          courses  = {courses}
          cuisines = {cuisines}
          seasons  = {seasons}
          buildUrl = {buildUrl}
          />
    </Row>
  );
};

export default RandomHeader;
