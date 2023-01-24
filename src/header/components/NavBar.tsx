import { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Image, Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import '../css/header.css';

import { LanguageCode } from '../../common/language';
import DynamicHeightContext from '../../common/context/DynamicHeightContext';
import useWindowSize from '../../common/hooks/useWindowSize';
import Icon from '../../common/components/Icon';
import CreateRecipeMenuItem from './CreateRecipeMenuItem';
import { AccountMenuMenuItem, AccountLoginMenuItem } from './MyAccountMenuItem';
import { getEnvAsBoolean, getResourcePath, getRoutePath } from '../../common/utility';
import { UserAccount } from '../../account/store/types';
import { Settings, ThemeMode } from '../../account/store/settings/types';
import LoginSettings from './LoginSettings';
// import MenuMenuItem from './MenuMenuItem';
import NavSearch from './NavSearch';
import NavLink from './NavLink';

export interface INavBarProps {
  account:  UserAccount | undefined;
  settings: Settings;

  locationPath: string;

  onChangeLanguage: (language: LanguageCode) => void;
  onChangeTheme: (theme: ThemeMode) => void;
  onLogoutClick: () => void;
}

const NavBar: React.FC<INavBarProps> = ({
    account, settings, locationPath,
    onChangeLanguage,  onChangeTheme, onLogoutClick }: INavBarProps) => {
  const { formatMessage } = useIntl();
  const messages = defineMessages({
    home: {
      id: 'nav.home',
      description: 'Home',
      defaultMessage: 'Home',
    },
    recipes: {
      id: 'nav.recipes',
      description: 'Navbar Recipes',
      defaultMessage: 'Browse',
    },
    randomRecipe: {
      id: 'nav.randomRecipe',
      description: 'Random Recipe',
      defaultMessage: 'Random',
    },
    groceryLists: {
      id: 'nav.groceryLists',
      description: 'Grocery Lists',
      defaultMessage: 'Groceries',
    },
  });

  const navbarRef = useRef<HTMLDivElement>(null);
  const dynamicHeightContext = useContext(DynamicHeightContext);

  const [width] = useWindowSize();
  useLayoutEffect(() => {
    dynamicHeightContext.setToolbarHeight(navbarRef.current?.clientHeight ?? 0);
  }, [dynamicHeightContext, width]);

  // componentWillUnmount
  useEffect(() => () => {
    dynamicHeightContext.setToolbarHeight(0);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [isScreenMdUp, setIsScreenMdUp] = useState<boolean>(false);
  useEffect(() => {
    /* OPT This would make a good hoc. */
    const handler = (e: MediaQueryListEvent) => setIsScreenMdUp(e.matches);
    window.matchMedia('(min-width: 768px)').addEventListener('change', handler);
    setIsScreenMdUp(window.matchMedia('(min-width: 768px)').matches);
  }, []);
  const [isSearchExpanded, setIsSearchExpanded] = useState<boolean>(false);
  const handleExpandSearch = useCallback((expanded: boolean) => { setIsSearchExpanded(expanded); }, []);

  const isAuthenticated = account != null && account.id !== 0;
  const isPrivilegedUser = account != null && ['user', 'staff', 'admin'].includes(account.role);
  const isLoginRequired = getEnvAsBoolean('REACT_APP_REQUIRE_LOGIN');
  const isLoginPage = locationPath.endsWith('login');
  const isBrowserPage = locationPath.endsWith('browser');

  const myAccountBtn = isAuthenticated && (
    <AccountMenuMenuItem
        account  = {account}
        settings = {settings}
        onChangeLanguage = {onChangeLanguage}
        onChangeTheme = {onChangeTheme}
        onLogoutClick = {onLogoutClick} />
  );
  const settingsBnt = (
    <LoginSettings
        settings = {settings}
        onChangeLanguage = {onChangeLanguage}
        onChangeTheme = {onChangeTheme} />
  );
  const loginBtn = (
    <AccountLoginMenuItem />
  );
  const navSearch = !isBrowserPage && (
    <NavSearch onExpandSearch={handleExpandSearch} />
  );

  return (
    <Navbar id='header-navbar' collapseOnSelect className='header' expand='md' fixed='top' ref={navbarRef}>
      <Container className={classNames({ 'search-expanded': isSearchExpanded })}>
        <Navbar.Toggle className='print-hidden'><Icon icon='list' variant='light' size='2x' /></Navbar.Toggle>
        <Navbar.Brand>
          <Link to={getRoutePath('/home')} title={formatMessage(messages.home)}>
            <Image alt='Brand' src={getResourcePath('/images/chef.png')} width='30' height='30' className='d-inline-block align-top' />
          </Link>
        </Navbar.Brand>
        {!isScreenMdUp && (
          <div className='my-account-nav'>
            {navSearch}
            {isAuthenticated && (
              myAccountBtn
            )}
            {!isAuthenticated && (
              settingsBnt
            )}
            {!isAuthenticated && !isLoginPage && (
              loginBtn
            )}
          </div>
        )}
        <Navbar.Collapse>
          <Nav className={classNames('header-nav', { 'collapse-d-lg': isSearchExpanded })}>
            {(!isLoginRequired || isAuthenticated) && (!isScreenMdUp || locationPath.endsWith('/browser')) && (
              <NavLink to={getRoutePath('/browser')} active={locationPath.endsWith('/browser')}>
                <Icon icon='search' variant='light' className='d-md-inline-block d-none' />
                <span className='d-inline-block d-md-none'>{formatMessage(messages.recipes)}</span>
              </NavLink>
            )}
            {(!isLoginRequired || isAuthenticated) && <NavLink to={`${getRoutePath('/random')}?course__slug=Main`} active={locationPath.endsWith('/random')} accessKey='r'>{formatMessage(messages.randomRecipe)}</NavLink>}
            {/* isAuthenticated && <MenuMenuItem /> */}
            {isAuthenticated && isPrivilegedUser && <CreateRecipeMenuItem />}
          </Nav>
          {isScreenMdUp && (
            <div className='header-nav my-account-nav'>
              {(!isLoginRequired || isAuthenticated) && navSearch}
              {isAuthenticated && (
                myAccountBtn
              )}
              {!isAuthenticated && (
                settingsBnt
              )}
              {!isAuthenticated && !isLoginPage && (
                loginBtn
              )}
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
