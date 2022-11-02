import { useEffect, useState } from 'react';
import { IntlProvider as ReactIntlProvider } from 'react-intl';

import { useSelector } from '../../common/store/redux';
import { SETTING_LANGUAGE_STORAGE_KEY } from '../../account/store/settings/types';
import { getMessagesFromLang, LanguageCode, toLanguageCode } from '../../common/language';
import LocalStorageHelper from '../../common/LocalStorageHelper';
import { getEnv } from '../../common/utility';

import { CombinedStore } from '../Store';

export interface IIntlProviderProps {
  children: React.ReactNode;
}

const IntlProvider: React.FC<IIntlProviderProps> = ({ children }: IIntlProviderProps) => {
  const DEFAULT_LANGUAGE = toLanguageCode(getEnv('REACT_APP_LOCALE'), LanguageCode.EN);

  const settings = useSelector((state: CombinedStore) => state.settings);

  const [language, setLanguage] = useState<LanguageCode>(DEFAULT_LANGUAGE);

  useEffect(() => {
    let newLanguage: LanguageCode;

    const userLanguageKey = LocalStorageHelper.getItem(SETTING_LANGUAGE_STORAGE_KEY);
    if (userLanguageKey != null) {
      newLanguage = toLanguageCode(userLanguageKey, DEFAULT_LANGUAGE);
    } else {
      const browserLanguage = (navigator.languages && navigator.languages[0]) || navigator.language;
      let browserLanguageWithoutRegionCode: LanguageCode = browserLanguage.toLowerCase().split(/[-_]/)[0] as unknown as LanguageCode;
      if (!Object.values(LanguageCode).includes(browserLanguageWithoutRegionCode as LanguageCode)) {
        browserLanguageWithoutRegionCode = DEFAULT_LANGUAGE;
      }
      newLanguage = browserLanguageWithoutRegionCode;
    }

    if (newLanguage !== language) {
      setLanguage(newLanguage);
    }
  }, []);

  useEffect(() => {
    if (settings.language != null && settings.language !== language) {
      setLanguage(settings.language);
    }
  }, [settings.language]);

  return (
    <ReactIntlProvider locale={language} defaultLocale={DEFAULT_LANGUAGE} messages={getMessagesFromLang(language)}>
      {children}
    </ReactIntlProvider>
  );
};

export default IntlProvider;
