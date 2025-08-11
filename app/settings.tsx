import { useState } from 'react';
import { YStack, XStack, H2, Switch, Separator, Paragraph, Button, Card, Input, ScrollView } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useScannerStore, useThemeStore } from '~/store/store';

export default function SettingsScreen() {
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
        <H2>Settings</H2>
        <Button onPress={() => router.back()} size="$4" borderWidth={2} borderColor="$gray10">
          Back
        </Button>
      </XStack>

      <Card bordered padding="$4" space="$4">
        <Paragraph size="$6" fontWeight="bold">Scanning Preferences</Paragraph>
        
        <XStack justifyContent="space-between" alignItems="center">
          <Paragraph>Sound on scan</Paragraph>
          <Switch
            size="$3"
            checked={settings.soundEnabled}
            onCheckedChange={() => toggleSetting('soundEnabled')}
          />
        </XStack>

        <Separator />

        <XStack justifyContent="space-between" alignItems="center">
          <Paragraph>Vibration on scan</Paragraph>
          <Switch
            size="$3"
            checked={settings.vibrationEnabled}
            onCheckedChange={() => toggleSetting('vibrationEnabled')}
          />
        </XStack>

        <Separator />

        <XStack justifyContent="space-between" alignItems="center">
          <Paragraph>Auto-save results</Paragraph>
          <Switch
            size="$3"
            checked={settings.autoSaveEnabled}
            onCheckedChange={() => toggleSetting('autoSaveEnabled')}
          />
        </XStack>
      </Card>

      <Card bordered padding="$4" space="$4">
        <Paragraph size="$6" fontWeight="bold">Display Options</Paragraph>
        
        <XStack justifyContent="space-between" alignItems="center">
          <Paragraph>Dark Mode</Paragraph>
          <Switch
            size="$3"
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
          />
        </XStack>

        <Separator />

        <XStack justifyContent="space-between" alignItems="center">
          <Paragraph>Show timestamp</Paragraph>
          <Switch
            size="$3"
            checked={settings.showTimestamp}
            onCheckedChange={() => toggleSetting('showTimestamp')}
          />
        </XStack>

        <Separator />

        <XStack justifyContent="space-between" alignItems="center">
          <Paragraph>Show barcode type</Paragraph>
          <Switch
            size="$3"
            checked={settings.showBarcodeType}
            onCheckedChange={() => toggleSetting('showBarcodeType')}
          />
        </XStack>
      </Card>

      <Card bordered padding="$4" space="$4">
        <Paragraph size="$6" fontWeight="bold">API Configuration</Paragraph>
        <Paragraph size="$2" color="$gray11" marginBottom="$2">
          Configure your API endpoint for barcode lookup
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
        <Paragraph size="$6" fontWeight="bold">Data Management</Paragraph>
        
        <Button
          onPress={clearScannedItems}
          backgroundColor="$red10"
          color="white"
          size="$4"
        >
          Clear All Scanned Items
        </Button>
        
        <Paragraph size="$2" color="$gray11">
          This will permanently delete all scanned items from your current session.
        </Paragraph>
      </Card>

      <Card bordered padding="$4" space="$4">
        <Paragraph size="$6" fontWeight="bold">About</Paragraph>
        <Paragraph size="$3">
          Barcode Scanner v1.0.0
        </Paragraph>
        <Paragraph size="$2" color="$gray11">
          Built with React Native, Expo, and Tamagui
        </Paragraph>
      </Card>
    </ScrollView>
  );
}