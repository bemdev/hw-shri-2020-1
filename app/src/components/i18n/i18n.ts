import i18n from 'i18next';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationRU from '../../locales/ru/translation.json';
import translationEN from '../../locales/en/translation.json';

// the translations
const resources = {
    ru: {
        translation: translationRU,
    },
    en: {
        translation: translationEN,
    },
};

const options = {
    // order and from where user language should be detected
    order: ['querystring', 'localStorage'],

    // keys or params to lookup language from
    lookupQuerystring: 'lng',
    lookupLocalStorage: 'i18nextLng',
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,

    // cache user language on
    caches: ['localStorage'],
    excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

    // optional htmlTag with lang attribute, the default is:
    // htmlTag: document.documentElement,

    // only detect languages that are in the whitelist
    checkWhitelist: true,
};

i18n.use(LanguageDetector).init({
    detection: options,
});

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        // lng: IS_SERVER && 'en',
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false, // react already safes from xss
            format: function(value, format, lng) {
                if (value instanceof Date) return moment(value).format(format);
                return value;
            },
        },
    });

i18n.on('languageChanged', function(lng) {
    moment.locale(lng);
});

export default i18n;
