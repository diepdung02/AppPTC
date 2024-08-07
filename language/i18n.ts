// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from "../locales/en.json";
import vi from "../locales/vn.json";


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      vi: { translation: vi }
    },
    lng: 'vi', // default language
    fallbackLng: 'vi',
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
