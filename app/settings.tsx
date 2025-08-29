import { useState } from 'react';
import { YStack, XStack, H2, Switch, Separator, Paragraph, Button, Card, Input, ScrollView } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useScannerStore, useThemeStore } from '~/store/store';
import { LanguageSelector } from '~/components/LanguageSelector';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { clearScannedItems } = useScannerStore();
  const { theme, toggleTheme } = useThemeStore();
  
  const [settings, setSettings] = useState({
    soundEnabled: true,
    vibrationEnabled: true,
    autoSaveEnabled: false,
    showTimestamp: true,
    showBarcodeType: true,
  });

  const [apiEndpoint, setApiEndpoint] = useState('https://api.example.com');

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 16,
        paddingHorizontal: 16,
        backgroundColor: '$background'
      }}
      showsVerticalScrollIndicator={true}
    >
      
      <XStack justifyContent="space-between" alignItems="center">
        <H2>{t('settings.title')}</H2>
        <Button onPress={() => router.back()} size="$4" borderWidth={2} borderColor="$gray10">
          {t('common.back')}
        </Button>
      </XStack>

      <Card bordered padding="$4" space="$4">
        <Paragraph size="$6" fontWeight="bold">{t('settings.scanningPreferences')}</Paragraph>
        
        <XStack justifyContent="space-between" alignItems="center">
          <Paragraph>{t('settings.soundOnScan')}</Paragraph>
          <Switch
            size="$3"
            checked={settings.soundEnabled}
            onCheckedChange={() => toggleSetting('soundEnabled')}
          />
        </XStack>

        <Separator />

        <XStack justifyContent="space-between" alignItems="center">
          <Paragraph>{t('settings.vibrationOnScan')}</Paragraph>
          <Switch
            size="$3"
            checked={settings.vibrationEnabled}
            onCheckedChange={() => toggleSetting('vibrationEnabled')}
          />
        </XStack>

        <Separator />

        <XStack justifyContent="space-between" alignItems="center">
          <Paragraph>{t('settings.autoSaveResults')}</Paragraph>
          <Switch
            size="$3"
            checked={settings.autoSaveEnabled}
            onCheckedChange={() => toggleSetting('autoSaveEnabled')}
          />
        </XStack>
      </Card>

      <Card bordered padding="$4" space="$4">
        <Paragraph size="$6" fontWeight="bold">{t('settings.displayOptions')}</Paragraph>
        
        <XStack justifyContent="space-between" alignItems="center">
          <Paragraph>{t('settings.darkMode')}</Paragraph>
          <Switch
            size="$3"
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
          />
        </XStack>

        <Separator />

        <XStack justifyContent="space-between" alignItems="center">
          <Paragraph>{t('settings.language')}</Paragraph>
          <LanguageSelector />
        </XStack>

        <Separator />

        <XStack justifyContent="space-between" alignItems="center">
          <Paragraph>{t('settings.showTimestamp')}</Paragraph>
          <Switch
            size="$3"
            checked={settings.showTimestamp}
            onCheckedChange={() => toggleSetting('showTimestamp')}
          />
        </XStack>

        <Separator />

        <XStack justifyContent="space-between" alignItems="center">
          <Paragraph>{t('settings.showBarcodeType')}</Paragraph>
          <Switch
            size="$3"
            checked={settings.showBarcodeType}
            onCheckedChange={() => toggleSetting('showBarcodeType')}
          />
        </XStack>
      </Card>

      <Card bordered padding="$4" space="$4">
        <Paragraph size="$6" fontWeight="bold">{t('settings.apiConfiguration')}</Paragraph>
        <Paragraph size="$2" color="$gray11" marginBottom="$2">
          {t('settings.apiConfigurationDescription')}
        </Paragraph>
        <Input
          value={apiEndpoint}
          onChangeText={setApiEndpoint}
          placeholder="https://api.example.com"
          borderWidth={1}
          borderColor="$borderColor"
        />
      </Card>

      <Card bordered padding="$4" space="$4">
        <Paragraph size="$6" fontWeight="bold">{t('settings.dataManagement')}</Paragraph>
        
        <Button
          onPress={clearScannedItems}
          backgroundColor="$red10"
          color="white"
          size="$4"
        >
          {t('settings.clearAllScannedItems')}
        </Button>
        
        <Paragraph size="$2" color="$gray11">
          {t('settings.clearAllScannedItemsDescription')}
        </Paragraph>
      </Card>

      <Card bordered padding="$4" space="$4">
        <Paragraph size="$6" fontWeight="bold">{t('settings.about')}</Paragraph>
        <Paragraph size="$3">
          {t('settings.appVersion')}
        </Paragraph>
        <Paragraph size="$2" color="$gray11">
          {t('settings.builtWith')}
        </Paragraph>
      </Card>
    </ScrollView>
  );
}