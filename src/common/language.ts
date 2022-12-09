import { createIntl, createIntlCache, defineMessages, IntlShape } from 'react-intl';

import localeDe from '../locale/de.json';
import localeEn from '../locale/en.json';
import localeEs from '../locale/es.json';
import localeFr from '../locale/fr.json';

export enum LanguageCode {
  DE = 'de',
  EN = 'en',
  ES = 'es',
  FR = 'fr',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getMessagesFromLang(lang: LanguageCode): any {
  switch (lang) {
    case LanguageCode.DE: return localeDe;
    case LanguageCode.EN: return localeEn;
    case LanguageCode.ES: return localeEs;
    case LanguageCode.FR: return localeFr;
    default: return localeEn;
  }
}

export function toLanguageCode(lang: string | undefined | null, def: LanguageCode): LanguageCode {
  if (lang == null) return def;
  if (Object.values(LanguageCode).includes(lang as LanguageCode)) {
    return (lang as LanguageCode);
  } else {
    return def;
  }
}

export function createIntlInstance(languageCode: LanguageCode): IntlShape {
  const cache = createIntlCache();
  const intl = createIntl(
    {
      locale: languageCode,
      messages: getMessagesFromLang(languageCode),
    },
    cache
  );

  return intl;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createIntlMessages() {
  defineMessages({
    display_name: {
      id: '1.display_name',
      defaultMessage: 'English',
    },
  });
}
