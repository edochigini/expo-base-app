import React from 'react';
import { Button, XStack, Text } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { ActionSheetIOS, Alert, Platform } from 'react-native';

const languages = [
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  const getCurrentLanguageDisplay = () => {
    const lang = languages.find(l => l.code === currentLanguage);
    return lang ? `${lang.flag} ${lang.name}` : 'Select language';
  };

  const showLanguageSelector = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', ...languages.map(lang => `${lang.flag} ${lang.name}`)],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex > 0) {
            const selectedLanguage = languages[buttonIndex - 1];
            handleLanguageChange(selectedLanguage.code);
          }
        }
      );
    } else {
      // Android fallback con Alert
      Alert.alert(
        'Select Language',
        'Choose your preferred language',
        [
          { text: 'Cancel', style: 'cancel' },
          ...languages.map(lang => ({
            text: `${lang.flag} ${lang.name}`,
            onPress: () => handleLanguageChange(lang.code)
          }))
        ]
      );
    }
  };

  return (
    <Button
      onPress={showLanguageSelector}
      size="$3"
      borderWidth={1}
      borderColor="$borderColor"
      backgroundColor="$background"
      pressStyle={{ backgroundColor: '$gray3' }}
    >
      <XStack alignItems="center" space="$2">
        <Text>{getCurrentLanguageDisplay()}</Text>
        <Text>▼</Text>
      </XStack>
    </Button>
  );
}