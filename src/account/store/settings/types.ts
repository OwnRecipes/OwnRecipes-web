import { Dispatch as ReduxDispatch } from 'redux';
import { LanguageCode } from '../../../common/language';
import { BasicAction, PayloadAction } from '../../../common/store/redux';

export enum ThemeMode {
  DARK = 'dark',
  LIGHT = 'light',
}

export function parseTheme(theme: string | undefined | null, def: ThemeMode): ThemeMode {
  if (theme == null) return def;
  if (Object.values(ThemeMode).includes(theme as ThemeMode)) {
    return (theme as ThemeMode);
  } else {
    return def;
  }
}

export enum SettingsActionTypes {
  INIT       = 'INIT',
  THEME_MODE = 'THEME_MODE',
  LANGUAGE   = 'LANGUAGE',
}

export type Settings = {
  // CAREFUL: Keys have to match the SETTING_XXX_STORAGE_KEY's value
  themeMode: ThemeMode;
  language:  LanguageCode;
}

export const SETTINGS_STORE = '@@settings';
export const SETTING_THEME_STORAGE_KEY = 'themeMode';
export const SETTING_LANGUAGE_STORAGE_KEY = 'language';

export type ISettingsInitAction = {
  store: typeof SETTINGS_STORE;
  typs:  SettingsActionTypes.INIT;
  tokenId: string | undefined;
} & BasicAction;

export type ISettingsDataAction = {
  store: typeof SETTINGS_STORE;
  typs:  typeof SettingsActionTypes.THEME_MODE | typeof SettingsActionTypes.LANGUAGE;
  tokenId: string | undefined;
} & PayloadAction<string>;

export type SettingsState    = Settings;
export type SettingsAction   = ISettingsInitAction | ISettingsDataAction;
export type SettingsDispatch = ReduxDispatch<SettingsAction>;
