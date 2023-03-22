import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import translation_ua from './locales/ua/translation_ua.json'
import translation_ru from './locales/ru/translation_ru.json'

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: localStorage.getItem('i18nextLng') || 'ru',
        debug: false,
        detection: {
            order: ['queryString', 'cookie'],
            cache: ['cookie'],
        },
        interpolation: {
            escapeValue: false,
        },
        resources: {
            ua: {
                common: translation_ua             // 'common' is our custom namespace
            },
            ru: {
                common: translation_ru
            },
        },
    });

export default i18n;
