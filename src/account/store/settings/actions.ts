import { RootState } from '../../../app/Store';
import { LanguageCode } from '../../../common/language';
import { toBasicAction } from '../../../common/store/redux';
import { ThemeMode, SettingsDispatch, SETTINGS_STORE, SettingsActionTypes, SettingsAction } from './types';

export const init = (tokenId: string | undefined): SettingsAction => ({
  ...toBasicAction(
    SETTINGS_STORE,
    SettingsActionTypes.INIT
  ),
  tokenId: tokenId,
});

export const changeDisableRecipeDiscovery = (newValue: boolean) => (dispatch: SettingsDispatch, getState: () => RootState) => {
  dispatch({ ...toBasicAction(SETTINGS_STORE, SettingsActionTypes.DISABLE_RECIPE_DISCOVERY), payload: newValue, tokenId: getState().account.item?.username });
};

export const changeDisableNews = (newValue: boolean) => (dispatch: SettingsDispatch, getState: () => RootState) => {
  dispatch({ ...toBasicAction(SETTINGS_STORE, SettingsActionTypes.DISABLE_NEWS), payload: newValue, tokenId: getState().account.item?.username });
};

export const changeLanguage = (newValue: LanguageCode) => (dispatch: SettingsDispatch, getState: () => RootState) => {
  dispatch({ ...toBasicAction(SETTINGS_STORE, SettingsActionTypes.LANGUAGE), payload: newValue, tokenId: getState().account.item?.username });
};

export const changeThemeMode = (newValue: ThemeMode) => (dispatch: SettingsDispatch, getState: () => RootState) => {
  dispatch({ ...toBasicAction(SETTINGS_STORE, SettingsActionTypes.THEME_MODE), payload: newValue, tokenId: getState().account.item?.username });
};
