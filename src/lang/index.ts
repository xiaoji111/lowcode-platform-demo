import { getParameterByName } from '@/utils/utils';

import enLocale from './modules/en.json';
import idLocale from './modules/id.json';
import zhLocale from './modules/zh.json';

const localLang: { [key: string]: any } = {
  zh: { ...zhLocale },
  id: { ...idLocale },
  en: { ...enLocale },
};

export function getLanguageId() {
  const lang = getParameterByName('languageCode');
  if (lang == 'ms' || lang == 'vi' || lang == 'in') {
    return 'id';
  }
  if (lang == 'en') {
    return 'en';
  }
  if (lang == 'zh') {
    return 'zh';
  }
  return 'id';
}

export function lang(key: string) {
  const languageId = getLanguageId() || 'id';
  return localLang[languageId][key] || key;
}
