import { useEffect, useState } from 'react';

import '../css/theme.css';

import { ThemeMode } from '../../account/store/settings/types';
import * as SettingsActions from '../../account/store/settings/actions';
import { useDispatch, useSelector } from '../../common/store/redux';
import { RootState } from '../Store';

const ThemeProvider: React.FC = () => {
  const dispatch = useDispatch();

  const token    = useSelector((state: RootState) => state.account.item);
  const settings = useSelector((state: RootState) => state.settings);
  const tokenId = token?.username;

  const [theme, setTheme] = useState<ThemeMode>();

  useEffect(() => {
    if (settings.themeMode !== theme) {
      setTheme(settings.themeMode);

      const doc = document;
      if (doc == null) return;
      const docElement = doc.documentElement;
      if (docElement == null) return;

      docElement.classList.add('color-theme-in-transition');

      docElement.setAttribute('data-theme', settings.themeMode);
      window.setTimeout(() => {
        docElement.classList.remove('color-theme-in-transition');
      }, 1000);
    }
  }, [settings.themeMode]);

  useEffect(() => {
    dispatch(SettingsActions.init(tokenId));
  }, [dispatch, tokenId]);

  return null;
};

export default ThemeProvider;
