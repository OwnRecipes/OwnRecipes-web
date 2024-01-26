import { useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Card, Col, Row } from 'react-bootstrap';

import '../css/settings.css';

import { RootState } from '../../app/Store';
import { Settings, ThemeMode } from '../../account/store/settings/types';
import * as SettingsActions from '../../account/store/settings/actions';
import Modal from '../../common/components/Modal';
import { useDispatch, useSelector } from '../../common/store/redux';
import { getMessagesFromLang, LanguageCode } from '../../common/language';
import { Select } from '../../common/components/Input/Select';
import classNames from 'classnames';
import Button from '../../common/components/Button';
import Checkbox from '../../common/components/Input/Checkbox';
import { getEnv, getEnvAsBoolean } from '../../common/utility';

const languageMessages = defineMessages({
  language_settings: {
    id: 'settings.language.heading',
    description: 'Group heading for language settings',
    defaultMessage: 'Language',
  },
  display_language: {
    id: 'settings.language.display',
    description: 'Display language setting',
    defaultMessage: 'Display language',
  },
});

const miscMessages = defineMessages({
  misc_settings: {
    id: 'settings.miscellaneous.heading',
    description: 'Group heading for miscellaneous settings',
    defaultMessage: 'Miscellaneous',
  },
  recipe_discovery: {
    id: 'settings.miscellaneous.recipe_discovery',
    description: 'Disable recipe discovery checkbox',
    defaultMessage: 'Recipe discovery',
  },
  recipe_discovery_tooltip: {
    id: 'settings.miscellaneous.recipe_discovery_tooltip',
    description: 'Disable recipe discovery checkbox tooltip',
    defaultMessage: 'If unchecked, the homepage and recipe page won\'t display recipe suggestions.',
  },
});

const themeMessages = defineMessages({
  theme_settings: {
    id: 'settings.theme.heading',
    description: 'Group heading for theme settings',
    defaultMessage: 'Theme mode',
  },
  theme_mode_dark: {
    id: 'theme.mode.dark',
    description: 'Dark mode',
    defaultMessage: 'Dark',
  },
  theme_mode_light: {
    id: 'theme.mode.light',
    description: 'Light mode',
    defaultMessage: 'Light',
  },
});

export interface ISettingsDialogProps {
  show:  boolean;
  onClose: () => void;
}

export const SettingsDialog: React.FC<ISettingsDialogProps> = ({
    show, onClose }: ISettingsDialogProps) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const settings = useSelector((state: RootState) => state.settings);

  const handleChangeDisableRecipeRecovery = useCallback((b: boolean) => {
    dispatch(SettingsActions.changeDisableRecipeDiscovery(b));
  }, []);

  const handleChangeLanguage = useCallback((language: LanguageCode) => {
    dispatch(SettingsActions.changeLanguage(language));
  }, []);

  const handleChangeTheme = useCallback((mode: ThemeMode) => {
    dispatch(SettingsActions.changeThemeMode(mode));
  }, []);

  return (
    <Modal
        show = {show}
        title = {intl.messages['nav.accountmenu.settings'] as string}
        onClose = {onClose}
        size = 'sm'
        className = 'settings'
        noCloseButton>
      <ThemeSettings
          settings = {settings}
          onChangeTheme = {handleChangeTheme} />
      <LanguageSettings
          settings = {settings}
          onChangeLanguage = {handleChangeLanguage} />
      <MiscSettings
          settings = {settings}
          onChangeDisableRecipeDiscovery = {handleChangeDisableRecipeRecovery} />
    </Modal>
  );
};

interface ILanguageSettingsProps {
  settings: Settings;
  onChangeLanguage: (lang: LanguageCode) => void;
}

const LanguageSettings: React.FC<ILanguageSettingsProps> = ({
    settings, onChangeLanguage }: ILanguageSettingsProps) => {
  const { formatMessage } = useIntl();

  const handleChangeLanguage = useCallback((lang: LanguageCode) => {
    if (settings.language !== lang) {
      onChangeLanguage(lang);
    }
  }, [onChangeLanguage, settings.language]);

  const data = Object.values(LanguageCode).map(l => ({ value: l, label: getMessagesFromLang(l)['1.display_name'] }));

  return (
    <fieldset>
      <legend>{formatMessage(languageMessages.language_settings)}</legend>
      <Select
          name     = 'language'
          label    = {formatMessage(languageMessages.display_language)}
          value    = {settings.language}
          data     = {data}
          onChange = {(_namee: string, value: string | undefined) => { handleChangeLanguage(value as LanguageCode); }} />
    </fieldset>
  );
};

function getThemeImage(theme: ThemeMode) {
  return theme === ThemeMode.DARK ? '/images/DarkMode.png' : '/images/LightMode.png';
}

interface IThemeSettingsProps {
  settings: Settings;
  onChangeTheme: (theme: ThemeMode) => void;
}

const ThemeSettings: React.FC<IThemeSettingsProps> = ({
    settings, onChangeTheme }: IThemeSettingsProps) => {
  const { formatMessage } = useIntl();

  const handleChangeTheme = useCallback((theme: ThemeMode) => {
    if (settings.themeMode !== theme) {
      onChangeTheme(theme);
    }
  }, [onChangeTheme, settings.themeMode]);

  const themeButtons = [ThemeMode.LIGHT, ThemeMode.DARK].map(t => (
    <Col key={t}>
      <Card className={classNames({ active: settings.themeMode === t })}>
        <Button id={`settings-theme-button-${t}`} type='button' variant='transparent' aria-current={settings.themeMode === t} onClick={() => handleChangeTheme(t)}>
          <Card.Img variant='top' src={getThemeImage(t)} />
          <Card.Title>
            {formatMessage(themeMessages[`theme_mode_${t}`])}
          </Card.Title>
        </Button>
      </Card>
    </Col>
  ));

  return (
    <fieldset>
      <legend>{formatMessage(themeMessages.theme_settings)}</legend>
      <Row xs={2}>
        {themeButtons}
      </Row>
    </fieldset>
  );
};

interface IMiscSettingsProps {
  settings: Settings;
  onChangeDisableRecipeDiscovery: (b: boolean) => void;
}

const MiscSettings: React.FC<IMiscSettingsProps> = ({
    settings, onChangeDisableRecipeDiscovery }: IMiscSettingsProps) => {
  const { formatMessage } = useIntl();

  const handleChange = useCallback((b: boolean) => {
    if (settings.disableRecipeDiscovery !== b) {
      onChangeDisableRecipeDiscovery(b);
    }
  }, [onChangeDisableRecipeDiscovery, settings.disableRecipeDiscovery]);

  const hasEnvDisableRecipeDiscovery = getEnv('REACT_APP_DISABLE_RECIPE_DISCOVERY');
  const envDisableRecipeDiscovery = getEnvAsBoolean('REACT_APP_DISABLE_RECIPE_DISCOVERY', false);

  return (
    <fieldset>
      <legend>{formatMessage(miscMessages.misc_settings)}</legend>
      <Checkbox
          name     = 'recipe_discovery'
          label    = {formatMessage(miscMessages.recipe_discovery)}
          tooltip  = {formatMessage(miscMessages.recipe_discovery_tooltip)}
          value    = {(hasEnvDisableRecipeDiscovery != null && envDisableRecipeDiscovery === false) ? false : !settings.disableRecipeDiscovery}
          readOnly = {hasEnvDisableRecipeDiscovery != null && envDisableRecipeDiscovery === false}
          onChange = {(_namee: string, value: boolean) => { handleChange(!value); }} />
    </fieldset>
  );
};

export default SettingsDialog;
