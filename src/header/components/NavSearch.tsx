import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';
import classNames from 'classnames';
import { Form as ReduxForm } from 'react-final-form';

import Icon from '../../common/components/Icon';
import { getResourcePath } from '../../common/utility';
import ReInput from '../../common/components/ReduxForm/ReInput';
import FieldSpyValues from '../../common/components/ReduxForm/FieldSpyValues';
import NavLink from './NavLink';

export interface INavSearchProps {
  onExpandSearch?: (expanded: boolean) => void;
}

const NavSearch: React.FC<INavSearchProps> = ({ onExpandSearch }: INavSearchProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    search_placeholder: {
      id: 'nav.search.placeholder',
      description: 'Placeholder for the search input',
      defaultMessage: 'Search',
    },
  });

  const urlRef = useRef(null);
  const searchRef = useRef(null);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [islgUp, setIsLgUp] = useState<boolean>(false);
  const handleSetExpanded = (expanded: boolean) => {
    if (onExpandSearch) {
      onExpandSearch(expanded);
    }
    setIsExpanded(expanded);
  };
  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => {
      setIsLgUp(e.matches);
      handleSetExpanded(e.matches);
    };
    window.matchMedia('(min-width: 64rem)').addEventListener('change', handler);
    handleSetExpanded(window.matchMedia('(min-width: 64rem)').matches);
    setIsLgUp(window.matchMedia('(min-width: 64rem)').matches);
  }, []);
  const handleExpandClick = () => {
    if (searchRef != null && searchRef.current != null) {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (searchRef.current as any).focus();
      }, 1);
    }
    handleSetExpanded(true);
  };
  const handleSearchClick = () => {
    if (!islgUp) {
      handleSetExpanded(false);
    }
  };
  const handleBlur = (event: React.FocusEvent<HTMLFormElement>) => {
    const { relatedTarget } = event;
    if (relatedTarget instanceof Element && relatedTarget.id === 'search-button') {
      return;
    }
    if (!islgUp) {
      handleSetExpanded(false);
    }
  };
  const handleSubmit = () => {
    if (!islgUp) {
      handleSetExpanded(false);
    }
    if (urlRef != null && urlRef.current != null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (urlRef.current as any).click();
    }
  };

  return (
    <ReduxForm
        onSubmit = {handleSubmit}
        subscription = {{}}
        render = {({ handleSubmit: renderSubmit }) => (
          <Form onBlur={handleBlur} onSubmit={renderSubmit}>
            <ReInput
                name = 'search'
                placeholder = {formatMessage(messages.search_placeholder)}
                className = {classNames('search', { expanded: isExpanded })}
                aria-label = {formatMessage(messages.search_placeholder)}
                inputAdornmentEnd = {(
                  <FieldSpyValues fieldNames={['search']}>
                    {values => (
                      <SearchButton isExpanded={isExpanded} searchValue={values.search} onSearchClick={handleSearchClick} onExpandClick={handleExpandClick} ref={urlRef} />
                    )}
                  </FieldSpyValues>
                )}
                ref = {searchRef}
                />
          </Form>
    )} />
  );
};

interface ISearchButtonProps {
  isExpanded: boolean;
  searchValue: string | undefined;
  onSearchClick: () => void;
  onExpandClick: () => void;
}

const SearchButton = forwardRef<HTMLAnchorElement, ISearchButtonProps>(({
    isExpanded, searchValue, onSearchClick, onExpandClick }: ISearchButtonProps, ref) => {
  const buildUrl: string = useMemo(() => getResourcePath(searchValue ? `/browser?search=${searchValue}` : '/browser'), [searchValue]);

  return (
    <NavLink id='search-button' as={isExpanded ? undefined : 'button'} to={isExpanded ? buildUrl : undefined} onClick={isExpanded ? onSearchClick : onExpandClick} accessKey='b' ref={ref}>
      <Icon icon='search' variant='light' size='2x' />
    </NavLink>
  );
});

export default NavSearch;
