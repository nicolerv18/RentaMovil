import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './Language/es.json';
import en from './Language/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    lng: 'es',           // idioma por defecto
    fallbackLng: 'es',   // si falla, cae a español
    interpolation: {
      escapeValue: false  // React ya protege contra XSS
    }
  });

export default i18n;