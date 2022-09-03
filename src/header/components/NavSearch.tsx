import { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { defineMessages, useIntl } from 'react-intl';
import * as _ from 'lodash-es';
import classNames from 'classnames';

import Icon from '../../common/components/Icon';
import Input from '../../common/components/Input/Input';
import { getResourcePath } from '../../common/utility';
import NavLink from './NavLink';

export interface INavSearchProps {
  onExpandSearch?: (expanded: boolean) => void;
}

interface INavSearchData {
  search: string;
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
  const [formData, setFormData] = useState<INavSearchData>({ search: '' });
  const handleChange = (attr: string, value: string) => {
    setFormData(prev => {
      const newState = _.cloneDeep(prev);
      _.set(newState, attr, value);
      return newState;
    });
  };

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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!islgUp) {
      handleSetExpanded(false);
    }
    if (urlRef != null && urlRef.current != null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (urlRef.current as any).click();
    }
  };

  const buildUrl = (): string => (getResourcePath(formData.search ? `/browser?search=${formData.search}` : '/browser'));

  const searchButton = (
    <NavLink id='search-button' as={isExpanded ? undefined : 'button'} to={isExpanded ? buildUrl() : undefined} onClick={isExpanded ? handleSearchClick : handleExpandClick} accessKey='b' ref={urlRef}>
      <Icon icon='search' variant='light' size='2x' />
    </NavLink>
  );

  return (
    <Form onBlur={handleBlur} onSubmit={handleSubmit}>
      <Input
          name = 'search'
          type = 'text'
          placeholder = {formatMessage(messages.search_placeholder)}
          className = {classNames('search', { expanded: isExpanded })}
          aria-label = {formatMessage(messages.search_placeholder)}
          inputAdornmentEnd = {searchButton}
          onChange = {handleChange}
          ref = {searchRef}
      />
    </Form>
  );
};

export default NavSearch;
