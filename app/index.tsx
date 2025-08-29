import { BarcodeScanner } from '~/components/BarcodeScanner';
import { useScannerStore, useThemeStore } from '~/store/store';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { Button, H2, Paragraph, YStack, Card, XStack, Text } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function App() {
  const [isScanning, setIsScanning] = useState(false);
  const { scannedItems, addScannedItem, clearScannedItems } = useScannerStore();
  const { theme, toggleTheme } = useThemeStore();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useTranslation();

  if (isScanning) {
    return <BarcodeScanner onScan={(result) => {
      addScannedItem(result);
      setIsScanning(false);
    }} />;
  }

  return (
    <YStack flex={1} gap="$4" padding="$4" style={{ paddingTop: insets.top }} backgroundColor="$background">
      <XStack justifyContent="space-between" alignItems="center">
        <H2>{t('common.title')}</H2>
        <XStack gap="$2">
          <Button
            onPress={() => router.push('/settings')}
            size="$4"
            borderWidth={2}
            borderColor="$gray10">
            ⚙️
          </Button>
        </XStack>
      </XStack>
      <Button
        onPress={() => setIsScanning(true)}
        size="$5"
        borderWidth={2}
        borderColor="$blue10">
        {t('scanner.startScanning')}
      </Button>
      <Button
        onPress={clearScannedItems}
        disabled={scannedItems.length === 0}
        size="$5"
        borderWidth={2}
        borderColor="$red10">
        {t('scanner.clearScans')}
      </Button>
      <YStack width="100%" space="$2">
        {scannedItems.map((item, index) => (
          <Card key={`${item.data}-${index}`} bordered size="$4" width="100%">
            <Card.Header padded>
              <XStack flex={1} justifyContent="space-between" alignItems="center">
                <XStack alignItems="center" gap="$2">
                  {/* Icona rappresentativa del tipo di codice a barre. Usiamo un Text con emoji per semplicità. */}
                  <Text fontSize="$5">{item.type.includes('QR') ? '🔳' : '📊'}</Text>
                  <Paragraph fontWeight="700">{t(`barcode.${item.type.toLowerCase().includes('qr') ? 'qrCode' : 'barcode'}`)}</Paragraph>
                </XStack>
              </XStack>
              <Paragraph fontSize="$6" color="red">{formatTimestamp(item.timestamp)}</Paragraph>
              {console.log('Timestamp:', item.timestamp, 'Formatted:', formatTimestamp(item.timestamp))}
            </Card.Header>
            <Card.Footer padded>
              <YStack flex={1}>
                <Paragraph fontSize="$5" fontWeight="bold" color="$blue10">{item.data}</Paragraph>
                {item.count && item.count > 1 && (
                  <Paragraph fontSize="$2" color="$gray10">({`x${item.count}`})</Paragraph>
                )}
              </YStack>
            </Card.Footer>
          </Card>
        ))}
      </YStack>
    </YStack>
  );
}

// Funzione di utilità per formattare il tipo di codice a barre
const formatBarcodeType = (type: string) => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

// Funzione di utilità per formattare il timestamp
const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};