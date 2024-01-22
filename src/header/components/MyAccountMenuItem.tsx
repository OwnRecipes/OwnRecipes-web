import { lazy, Suspense, useCallback, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { NavDropdown } from 'react-bootstrap';

import GroceryListMenuItem from './GroceryListMenuItem';
import { Settings, ThemeMode } from '../../account/store/settings/types';
import { getEnv, getRoutePath, isDemoMode } from '../../common/utility';
import { UserAccount } from '../../account/store/types';
import Icon from '../../common/components/Icon';
import { LanguageCode } from '../../common/language';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import NavButton from '../../common/components/NavButton';

const LanguageDialog = lazy(() => import('./LanguageDialog'));
const ThemeDialog = lazy(() => import('./ThemeDialog'));

const messages = defineMessages({
  navLoginTitle: {
    id: 'nav.login.title',
    description: 'Login title',
    defaultMessage: 'Login',
  },
  hello: {
    id: 'nav.accountmenu.hello',
    description: 'Account menu greeting',
    defaultMessage: 'Hello, {name}',
  },
  title: {
    id: 'nav.accountmenu.title',
    description: 'Account menu title',
    defaultMessage: 'Account',
  },
  language: {
    id: 'nav.accountmenu.language',
    description: 'Item to open the language change dialog',
    defaultMessage: 'Language',
  },
  theme: {
    id: 'nav.accountmenu.theme',
    description: 'Item to open the theme change dialog',
    defaultMessage: 'Theme',
  },
  admin: {
    id: 'nav.accountmenu.admin',
    description: 'Djanog Admin Page',
    defaultMessage: 'Administration',
  },
  logout: {
    id: 'nav.accountmenu.logout',
    description: 'Logout title',
    defaultMessage: 'Logout',
  },
});

export const AccountLoginMenuItem: React.FC = () => {
  const { formatMessage } = useIntl();

  return (
    <NavButton id='login-button' variant='primary' to={getRoutePath('/login')} className='nav-link'>
      <Icon icon='box-arrow-in-right' variant='light' size='2x' className='visible-xs' />
      <span className='hidden-xs'>{formatMessage(messages.navLoginTitle)}</span>
    </NavButton>
  );
};

export interface IAccountMenuMenuItemProps {
  account:  UserAccount;
  settings: Settings;

  onChangeLanguage: (language: LanguageCode) => void;
  onChangeTheme: (theme: ThemeMode) => void;
  onLogoutClick: () => void;
}

export const AccountMenuMenuItem: React.FC<IAccountMenuMenuItemProps> = ({
    account, settings, onChangeLanguage, onChangeTheme, onLogoutClick }: IAccountMenuMenuItemProps) => {
  const { formatMessage } = useIntl();

  const [showLanguageDialog, setShowLanguageDialog] = useState<boolean>(false);
  const [showThemeDialog, setShowThemeDialog] = useState<boolean>(false);

  const handleChangeLanguageClick = useCallback(() => { setShowLanguageDialog(true); }, []);
  const handleLanguageDialogClose = useCallback(() => { setShowLanguageDialog(false); }, []);
  const handleChangeThemeClick    = useCallback(() => { setShowThemeDialog(true); }, []);
  const handleThemeDialogClose    = useCallback(() => { setShowThemeDialog(false); }, []);

  const handleChangeLanguage = useCallback((lang: LanguageCode) => {
    handleLanguageDialogClose();
    onChangeLanguage(lang);
  }, [handleLanguageDialogClose, onChangeLanguage]);

  const handleChangeTheme = useCallback((theme: ThemeMode) => {
    handleThemeDialogClose();
    onChangeTheme(theme);
  }, [handleThemeDialogClose, onChangeTheme]);

  return (
    <>
      <NavDropdown
          title={(
            <>
              <Icon icon='person-circle' variant='light' size='2x' className='visible-xs' />
              <div  className='hidden-xs subtitle'>{formatMessage(messages.hello, { name: account.username })}</div>
              <span className='hidden-xs'>{formatMessage(messages.title)}</span>
            </>
          )}
          align = 'end'
          className = 'header-dropdown my-account-dropdown'
          id='my-account-dropdown'>
        {!isDemoMode() && <GroceryListMenuItem />}
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={handleChangeLanguageClick}>{`${formatMessage(messages.language)} …`}</NavDropdown.Item>
        <NavDropdown.Item onClick={handleChangeThemeClick}>{`${formatMessage(messages.theme)} …`}</NavDropdown.Item>
        <NavDropdown.Divider />
        {account.role === 'admin' && (
          <>
            <NavDropdown.Item href={`${getEnv('REACT_APP_ADMIN_URL', '/admin')}/`}>{`➝ ${formatMessage(messages.admin)}`}</NavDropdown.Item>
            <NavDropdown.Divider />
          </>
        )}
        <NavDropdown.Item onClick={onLogoutClick}>{formatMessage(messages.logout)}</NavDropdown.Item>
      </NavDropdown>

      {showLanguageDialog && (
        <Suspense fallback={<LoadingSpinner position='screen-center' />}>
          <LanguageDialog
              show     = {showLanguageDialog}
              settings = {settings}
              onChangeLanguage = {handleChangeLanguage}
              onClose = {handleLanguageDialogClose} />
        </Suspense>
      )}

      {showThemeDialog && (
        <Suspense fallback={<LoadingSpinner position='screen-center' />}>
          <ThemeDialog
              show     = {showThemeDialog}
              settings = {settings}
              onChangeTheme = {handleChangeTheme}
              onClose = {handleThemeDialogClose} />
        </Suspense>
      )}
    </>
  );
};
