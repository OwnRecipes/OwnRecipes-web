import { CombinedStore } from '../../../app/Store';
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

export const changeThemeMode = (newThemeMode: ThemeMode) => (dispatch: SettingsDispatch, getState: () => CombinedStore) => {
  dispatch({ ...toBasicAction(SETTINGS_STORE, SettingsActionTypes.THEME_MODE), payload: newThemeMode, tokenId: getState().account.item?.username });
};

export const changeLanguage = (newLanguage: LanguageCode) => (dispatch: SettingsDispatch, getState: () => CombinedStore) => {
  dispatch({ ...toBasicAction(SETTINGS_STORE, SettingsActionTypes.LANGUAGE), payload: newLanguage, tokenId: getState().account.item?.username });
};
