import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importa i file di traduzione
import translationEN from '../assets/locales/en/translation.json';
import translationIT from '../assets/locales/it/translation.json';

// Definisci le risorse
const resources = {
  en: {
    translation: translationEN,
  },
  it: {
    translation: translationIT,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Lingua di default
    fallbackLng: 'en', // Lingua di fallback
    interpolation: {
      escapeValue: false, // React già fa escaping
    },
  });

export default i18n;
