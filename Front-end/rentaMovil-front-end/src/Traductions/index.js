import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './Language/es.json';
import en from './Language/en.json';
import fr from './Language/fr.json';
import pt from './Language/pt.json';


const savedLang =
  localStorage.getItem("lang") ||
  navigator.language.split("-")[0] ||
  "es";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
      fr: { translation: fr },
      pt: { translation: pt },
    },
    lng: savedLang,
    fallbackLng: "es",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;