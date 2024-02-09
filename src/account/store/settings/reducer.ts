import { LanguageCode, toLanguageCode } from '../../../common/language';
import LocalStorageHelper from '../../../common/LocalStorageHelper';
import { getEnvAsBoolean } from '../../../common/utility';
import { ISettingsBooleanAction, ISettingsInitAction, ISettingsStringAction, parseTheme, SettingsAction, SettingsActionTypes, SettingsState, SETTINGS_STORE, SETTING_DISABLE_NEWS, SETTING_DISABLE_RECIPE_DISCOVERY_KEY, SETTING_LANGUAGE_STORAGE_KEY, SETTING_THEME_STORAGE_KEY, ThemeMode } from './types';

const defaultState: SettingsState = {
  disableNews:            Boolean(LocalStorageHelper.getItem(SETTING_DISABLE_NEWS)) || getEnvAsBoolean('REACT_APP_DISABLE_NEWS'),
  disableRecipeDiscovery: Boolean(LocalStorageHelper.getItem(SETTING_DISABLE_RECIPE_DISCOVERY_KEY)) || getEnvAsBoolean('REACT_APP_DISABLE_RECIPE_DISCOVERY'),
  language:               toLanguageCode(LocalStorageHelper.getItem(SETTING_LANGUAGE_STORAGE_KEY), LanguageCode.EN),
  themeMode:              parseTheme(LocalStorageHelper.getItem(SETTING_THEME_STORAGE_KEY), ThemeMode.LIGHT),
};

function init(state: SettingsState, action: ISettingsInitAction): SettingsState {
  const upd = { ...state };

  const keys = LocalStorageHelper.getKeys(action.tokenId);
  keys.forEach(key => {
    const val = LocalStorageHelper.getItem(key, action.tokenId);
    if (val != null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (upd as any)[key] = val;
    }
  });

  return upd;
}

function setDisableNews(state: SettingsState, action: ISettingsBooleanAction): SettingsState {
  const upd = { ...state };

  if (action.payload) {
    LocalStorageHelper.setItem(SETTING_DISABLE_NEWS, 'true', action.tokenId);
    LocalStorageHelper.setItem(SETTING_DISABLE_NEWS, 'true');
    upd.disableNews = true;
  } else {
    LocalStorageHelper.removeItem(SETTING_DISABLE_NEWS, action.tokenId);
    upd.disableNews = false;
  }

  return upd;
}

function setDisableRecipeDiscoveryKey(state: SettingsState, action: ISettingsBooleanAction): SettingsState {
  const upd = { ...state };

  if (action.payload) {
    LocalStorageHelper.setItem(SETTING_DISABLE_RECIPE_DISCOVERY_KEY, 'true', action.tokenId);
    LocalStorageHelper.setItem(SETTING_DISABLE_RECIPE_DISCOVERY_KEY, 'true');
    upd.disableRecipeDiscovery = true;
  } else {
    LocalStorageHelper.removeItem(SETTING_DISABLE_RECIPE_DISCOVERY_KEY, action.tokenId);
    upd.disableRecipeDiscovery = false;
  }

  return upd;
}

function setLanguage(state: SettingsState, action: ISettingsStringAction): SettingsState {
  const upd = { ...state };

  LocalStorageHelper.setItem(SETTING_LANGUAGE_STORAGE_KEY, action.payload, action.tokenId);
  LocalStorageHelper.setItem(SETTING_LANGUAGE_STORAGE_KEY, action.payload);
  upd.language = (action.payload as LanguageCode);

  return upd;
}

function setTheme(state: SettingsState, action: ISettingsStringAction): SettingsState {
  const upd = { ...state };

  LocalStorageHelper.setItem(SETTING_THEME_STORAGE_KEY, action.payload, action.tokenId);
  LocalStorageHelper.setItem(SETTING_THEME_STORAGE_KEY, action.payload);
  upd.themeMode = (action.payload as ThemeMode);

  return upd;
}

const reducer = (state = defaultState, action: SettingsAction): SettingsState => {
  if (action.store === SETTINGS_STORE) {
    switch (action.typs) {
      case SettingsActionTypes.INIT:         return init(state, action);
      case SettingsActionTypes.DISABLE_NEWS: return setDisableNews(state, action);
      case SettingsActionTypes.DISABLE_RECIPE_DISCOVERY: return setDisableRecipeDiscoveryKey(state, action);
      case SettingsActionTypes.LANGUAGE:     return setLanguage(state, action);
      case SettingsActionTypes.THEME_MODE:   return setTheme(state, action);
      default: break;
    }
  }

  return state;
};

export default reducer;
