import { useState } from 'react';
import { useScannerStore, useSavedItemsStore } from '~/store/store';
import { Button, H2, Input, XStack, YStack, Card, Text, Paragraph } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SavedItemsList } from '~/components/SavedItemsList';
import { useTranslation } from '~/utils/useTranslation';

export default function SavedScansScreen() {
  const { savedItems, clearSavedItems, saveCurrentScans } = useSavedItemsStore();
  const { unsaveScannedItem, updateSavedItemLabel, scannedItems } = useScannerStore();
  const [searchQuery, setSearchQuery] = useState('');
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { t } = useTranslation();

  // Filtra gli elementi in base alla query di ricerca
  const filteredItems = savedItems.filter((item: any) =>
    item.data.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.label && item.label.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <YStack flex={1} gap="$4" padding="$4" style={{ paddingTop: insets.top }} backgroundColor="$background">
      <XStack justifyContent="space-between" alignItems="center">
        <H2>{t('saved.title')}</H2>
        <XStack gap="$2">
          <Button
            onPress={() => router.push('/')}
            size="$4"
            borderWidth={2}
            borderColor="$blue10">
            ← {t('common.back')}
          </Button>
          <Button
            onPress={saveCurrentScans}
            disabled={scannedItems.length === 0}
            size="$4"
            borderWidth={2}
            borderColor="$green10">
            💾 {t('savedScans.saveCurrentScans')}
          </Button>
          <Button
            onPress={clearSavedItems}
            disabled={savedItems.length === 0}
            size="$4"
            borderWidth={2}
            borderColor="$red10">
            ✕ {t('savedScans.clearAll')}
          </Button>
        </XStack>
      </XStack>

      {/* Campo di ricerca */}
      <Input
        placeholder={t('savedScans.searchPlaceholder')}
        value={searchQuery}
        onChangeText={setSearchQuery}
        borderWidth={2}
        borderColor="$gray10"
      />

      {/* Statistiche */}
      <XStack justifyContent="space-between">
        <Text color="$gray10">
          {t('saved.results', { found: filteredItems.length, total: savedItems.length })}
        </Text>
        {searchQuery && (
          <Button
            onPress={() => setSearchQuery('')}
            size="$2"
            borderWidth={1}
            borderColor="$gray10"
            backgroundColor="transparent">
            {t('common.cancel')}
          </Button>
        )}
      </XStack>

      {/* Lista delle scansioni salvate */}
      <SavedItemsList
        items={filteredItems}
        onDelete={unsaveScannedItem}
        onSaveWithLabel={updateSavedItemLabel}
        saveCurrentScans={saveCurrentScans}
      />

      {filteredItems.length === 0 && (
        <YStack alignItems="center" justifyContent="center" flex={1}>
          <Text color="$gray10" fontSize="$6">
            {searchQuery ? t('saved.noScansFound') : t('saved.noSavedScans')}
          </Text>
        </YStack>
      )}
    </YStack>
  );
}