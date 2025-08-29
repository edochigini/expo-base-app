import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageDetectorAsyncModule } from 'i18next';
import { Platform, NativeModules } from 'react-native';

// Configurazione del rilevatore della lingua
const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: async function () {
    try {
      // Prova a ottenere la lingua salvata in AsyncStorage
      const savedLanguage = await AsyncStorage.getItem('app_language');
      if (savedLanguage) {
        return savedLanguage;
      }
      
      // Se non c'è una lingua salvata, usa quella del dispositivo
      return Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;
    } catch (error) {
      console.error('Error detecting language:', error);
      return 'it'; // Default italiano
    }
  },
  cacheUserLanguage: async function (language) {
    // La lingua viene gestita completamente dallo store Zustand
    // Questo metodo viene mantenuto per compatibilità con i18next
    // ma la persistenza avviene tramite lo store
  }
};

// Import diretto delle risorse di traduzione
import enResources from '../locales/en.json';
import itResources from '../locales/it.json';

// Configurazione i18n con risorse caricate sincrono
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enResources
      },
      it: {
        translation: itResources
      }
    },
    fallbackLng: 'it', // Lingua di default (italiano)
    lng: 'it', // Lingua iniziale
    debug: __DEV__, // Abilita debug solo in sviluppo
    ns: ['translation'], // Namespace di default
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false, // React già esegue l'escape
      format: function(value, format, lng) {
        if (format === 'uppercase') return value.toUpperCase();
        if (format === 'lowercase') return value.toLowerCase();
        return value;
      }
    },
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged',
      nsMode: 'default'
    }
  });

export default i18n;