import { useTranslation as useReactTranslation } from 'react-i18next';
import i18n from '../i18n';

export const useTranslation = () => {
  const { t } = useReactTranslation();

  const changeLanguage = (language: 'it' | 'en') => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language as 'it' | 'en';

  return { t, currentLanguage, changeLanguage };
};