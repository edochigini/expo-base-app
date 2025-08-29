import React from 'react';
import { Button, XStack, YStack, Paragraph, Label, Select } from 'tamagui';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const languages = [
  { code: 'it', name: 'Italiano', nativeName: 'Italiano' },
  { code: 'en', name: 'English', nativeName: 'English' },
];

export const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <YStack space="$2">
      <Label fontSize="$3" fontWeight="600">{t('settings.language')}</Label>
      <XStack alignItems="center">
        <Select
          value={currentLanguage.code}
          onValueChange={handleLanguageChange}
          onOpenChange={setIsOpen}
          disablePreventBodyScroll
        >
          <Select.Trigger>
            <XStack alignItems="center" space="$2">
              <Paragraph>{currentLanguage.nativeName}</Paragraph>
              <Select.Icon />
            </XStack>
          </Select.Trigger>
          <Select.Content zIndex={200}>
            {languages.map((language, index) => (
              <Select.Item
                key={language.code}
                value={language.code}
                index={index}
              >
                <XStack alignItems="center" space="$2">
                  <Paragraph>{language.nativeName}</Paragraph>
                </XStack>
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </XStack>
    </YStack>
  );
};