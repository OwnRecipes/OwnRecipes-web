// import { useEffect } from 'react';
import { useLocation } from 'react-router';

import NavBar from '../components/NavBar';
import * as AuthActions from '../../account/store/actions';
// import * as ListActions from '../../list/store/actions';
import * as SettingsActions from '../../account/store/settings/actions';
import { useDispatch, useSelector } from '../../common/store/redux';
import { CombinedStore } from '../../app/Store';
// import { ListItemType } from '../components/GroceryListMenuItem';
import { ThemeMode } from '../../account/store/settings/types';
import { LanguageCode } from '../../common/language';
import ErrorBoundary from '../../common/components/ErrorBoundary';

const Header: React.FC = () => (
  <ErrorBoundary verbose printStack={false}>
    <HeaderContent />
  </ErrorBoundary>
);

const HeaderContent: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const accountState = useSelector((state: CombinedStore) => state.account);
  const settings = useSelector((state: CombinedStore) => state.settings);

  const handleChangeLanguage = (language: LanguageCode) => {
    dispatch(SettingsActions.changeLanguage(language));
  };

  const handleChangeTheme = (mode: ThemeMode) => {
    dispatch(SettingsActions.changeThemeMode(mode));
  };

  const handleLogoutClick = () => {
    dispatch(AuthActions.logUserOut());
  };

  return (
    <NavBar
        account  = {accountState.item}
        settings = {settings}

        locationPath = {location.pathname}

        onChangeLanguage={handleChangeLanguage}
        onChangeTheme={handleChangeTheme}
        onLogoutClick={handleLogoutClick} />
  );
};

export default Header;
