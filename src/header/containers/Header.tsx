import { useCallback, useContext } from 'react';
import { useLocation } from 'react-router';

import NavBar from '../components/NavBar';
import * as SettingsActions from '../../account/store/settings/actions';
import { useDispatch, useSelector } from '../../common/store/redux';
import { RootState } from '../../app/Store';
import { ThemeMode } from '../../account/store/settings/types';
import { LanguageCode } from '../../common/language';
import ErrorBoundary from '../../common/components/ErrorBoundary';
import AuthContext from '../../account/context/AuthContext';

const Header: React.FC = () => (
  <ErrorBoundary verbose printStack={false}>
    <HeaderContent />
  </ErrorBoundary>
);

const HeaderContent: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const accountState = useSelector((state: RootState) => state.account);
  const settings = useSelector((state: RootState) => state.settings);

  const authContext = useContext(AuthContext);

  const handleChangeLanguage = useCallback((language: LanguageCode) => {
    dispatch(SettingsActions.changeLanguage(language));
  }, []);

  const handleChangeTheme = useCallback((mode: ThemeMode) => {
    dispatch(SettingsActions.changeThemeMode(mode));
  }, []);

  const handleLogoutClick = useCallback(() => {
    authContext.forceLogout();
  }, [authContext]);

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
