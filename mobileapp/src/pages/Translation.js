// i18n.js
//import i18n from 'i18next';
import { Translation ,initReactI18next } from 'react-i18next';

// src/pages/Translation.js
import enTranslation from '../components/locales/enTranslation.json';
import esTranslation from '../components/locales/esTranslation.json';

const resources = {
    en: {
        translation: enTranslation,
    },
    es: {
        translation: esTranslation,
    },
};

Translation.use(initReactI18next).init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default Translation;
