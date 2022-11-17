import { lazy, Suspense, useState } from 'react';
import { useIntl } from 'react-intl';
import { NavDropdown } from 'react-bootstrap';

import { Settings, ThemeMode } from '../../account/store/settings/types';
import Icon from '../../common/components/Icon';
import { LanguageCode } from '../../common/language';
import LoadingSpinner from '../../common/components/LoadingSpinner';

const LanguageDialog = lazy(() => import('./LanguageDialog'));
const ThemeDialog = lazy(() => import('./ThemeDialog'));

export interface ILoginSettingsProps {
  settings: Settings;

  onChangeLanguage: (language: LanguageCode) => void;
  onChangeTheme: (theme: ThemeMode) => void;
}

const LoginSettings: React.FC<ILoginSettingsProps> = ({ settings, onChangeLanguage, onChangeTheme }: ILoginSettingsProps) => {
  const intl = useIntl();

  const [showLanguageDialog, setShowLanguageDialog] = useState<boolean>(false);
  const [showThemeDialog, setShowThemeDialog] = useState<boolean>(false);

  const handleChangeLanguageClick = () => { setShowLanguageDialog(true); };
  const handleLanguageDialogClose = () => { setShowLanguageDialog(false); };
  const handleChangeThemeClick    = () => { setShowThemeDialog(true); };
  const handleThemeDialogClose    = () => { setShowThemeDialog(false); };

  const handleChangeLanguage = (lang: LanguageCode) => {
    handleLanguageDialogClose();
    onChangeLanguage(lang);
  };

  const handleChangeTheme = (theme: ThemeMode) => {
    handleThemeDialogClose();
    onChangeTheme(theme);
  };

  return (
    <>
      <NavDropdown
          title={<Icon icon='gear' variant='light' size='2x' />}
          align = 'end'
          id='settings-dropdown'>
        <NavDropdown.Item onClick={handleChangeLanguageClick}>{`${intl.messages['nav.accountmenu.language']} …`}</NavDropdown.Item>
        <NavDropdown.Item onClick={handleChangeThemeClick}>{`${intl.messages['nav.accountmenu.theme']} …`}</NavDropdown.Item>
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

export default LoginSettings;
