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
  INIT         = 'INIT',

  DISABLE_NEWS = 'DISABLE_NEWS',
  DISABLE_RECIPE_DISCOVERY = 'DISABLE_RECIPE_DISCOVERY',
  LANGUAGE     = 'LANGUAGE',
  THEME_MODE   = 'THEME_MODE',
}

export interface Settings {
  // CAREFUL: Keys have to match the SETTING_XXX_STORAGE_KEY's value
  disableRecipeDiscovery: boolean;
  disableNews:    boolean;
  language:       LanguageCode;
  themeMode:      ThemeMode;
}

export const SETTINGS_STORE = 'settings';
export const SETTING_DISABLE_NEWS                = 'disableNews';
export const SETTING_DISABLE_RECIPE_DISCOVERY_KEY = 'disableRecipeDiscovery';
export const SETTING_LANGUAGE_STORAGE_KEY        = 'language';
export const SETTING_THEME_STORAGE_KEY           = 'themeMode';

export type ISettingsInitAction = {
  store:   typeof SETTINGS_STORE;
  typs:    SettingsActionTypes.INIT;
  tokenId: string | undefined;
} & BasicAction;

export type ISettingsBooleanAction = {
  store:   typeof SETTINGS_STORE;
  typs:    typeof SettingsActionTypes.DISABLE_NEWS | typeof SettingsActionTypes.DISABLE_RECIPE_DISCOVERY;
  tokenId: string | undefined;
} & PayloadAction<boolean>;

export type ISettingsStringAction = {
  store:   typeof SETTINGS_STORE;
  typs:    typeof SettingsActionTypes.THEME_MODE | typeof SettingsActionTypes.LANGUAGE;
  tokenId: string | undefined;
} & PayloadAction<string>;

export type SettingsState    = Settings;
export type SettingsAction   = ISettingsInitAction | ISettingsBooleanAction | ISettingsStringAction;
export type SettingsDispatch = ReduxDispatch<SettingsAction>;
