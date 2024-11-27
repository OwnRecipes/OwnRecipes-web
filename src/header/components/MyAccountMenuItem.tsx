import { lazy, Suspense, useCallback, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { NavDropdown } from 'react-bootstrap';

import { getEnv, getRoutePath, isDemoMode } from '../../common/utility';
import { UserAccount } from '../../account/store/types';
import Icon from '../../common/components/Icon';
import LoadingSpinner from '../../common/components/LoadingSpinner';
import NavButton from '../../common/components/NavButton';
import GroceryListMenuItem from './GroceryListMenuItem';
import NavLink from './NavLink';

const SettingsDialog = lazy(() => import('./SettingsDialog'));

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
  menuPlan: {
    id: 'nav.menuPlan',
    description: 'Menu / Eating Plan',
    defaultMessage: 'Menu',
  },
  settings: {
    id: 'nav.accountmenu.settings',
    description: 'Item to open the settings dialog',
    defaultMessage: 'Settings',
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
  onLogoutClick: () => void;
}

export const AccountMenuMenuItem: React.FC<IAccountMenuMenuItemProps> = ({
    account, onLogoutClick }: IAccountMenuMenuItemProps) => {
  const { formatMessage } = useIntl();

  const [showSettingsDialog, setShowSettingsDialog] = useState<boolean>(false);

  const handleSettingsClick       = useCallback(() => { setShowSettingsDialog(true); }, []);
  const handleSettingsDialogClose = useCallback(() => { setShowSettingsDialog(false); }, []);

  return (
    <>
      <NavDropdown
          title = {(
            <>
              <Icon icon='person-circle' variant='light' size='2x' className='visible-xs' />
              <div  className='hidden-xs subtitle'>{formatMessage(messages.hello, { name: account.username })}</div>
              <span className='hidden-xs'>{formatMessage(messages.title)}</span>
            </>
          )}
          align = 'end'
          className = 'header-dropdown my-account-dropdown'
          id = 'my-account-dropdown'>
        {!isDemoMode() && <NavLink to={getRoutePath('/menu')}>{formatMessage(messages.menuPlan)}</NavLink>}
        {!isDemoMode() && <GroceryListMenuItem />}
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={handleSettingsClick}>{`${formatMessage(messages.settings)} …`}</NavDropdown.Item>
        <NavDropdown.Divider />
        {account.role === 'admin' && (
          <>
            <NavDropdown.Item href={`${getEnv('REACT_APP_ADMIN_URL', '/admin')}/`}>{`➝ ${formatMessage(messages.admin)}`}</NavDropdown.Item>
            <NavDropdown.Divider />
          </>
        )}
        <NavDropdown.Item onClick={onLogoutClick}>{formatMessage(messages.logout)}</NavDropdown.Item>
      </NavDropdown>

      {showSettingsDialog && (
        <Suspense fallback={<LoadingSpinner position='screen-center' />}>
          <SettingsDialog
              show     = {showSettingsDialog}
              onClose = {handleSettingsDialogClose} />
        </Suspense>
      )}
    </>
  );
};
