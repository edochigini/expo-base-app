import { useState } from 'react';
import { Button, Card, H4, Text, XStack, YStack, Input, Square, H3 } from 'tamagui';
import { SavedBarcodeItem } from '~/store/store';
import { useSavedItemsStore } from '~/store/store';
import { useTranslation } from 'react-i18next';

interface SavedItemsListProps {
  items: SavedBarcodeItem[];
  onDelete: (id: string) => void;
  onSaveWithLabel: (id: string, label: string) => void;
  saveCurrentScans: () => void;
}

export function SavedItemsList({ items, onDelete, onSaveWithLabel }: SavedItemsListProps) {
  const { t } = useTranslation();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState('');
  const [editTempLabel, setEditTempLabel] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'saved' | 'unsaved'>('all');
  const { saveCurrentScans } = useSavedItemsStore();

  // Filtra gli elementi in base alla query di ricerca e al tipo di filtro
  const filteredItems = items.filter(item => {
    // Filtra per tipo
    if (filterType === 'saved' && !item.isSaved) return false;
    if (filterType === 'unsaved' && item.isSaved) return false;
    
    // Filtra per query di ricerca
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        item.data.toLowerCase().includes(query) ||
        (item.label && item.label.toLowerCase().includes(query)) ||
        item.type.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const handleEdit = (item: SavedBarcodeItem) => {
    setEditingId(item.id);
    setEditLabel(item.label);
    setEditTempLabel(item.label);
  };

  const handleSave = (id: string) => {
    if (editTempLabel.trim()) {
      onSaveWithLabel(id, editTempLabel.trim());
      setEditingId(null);
      setEditLabel('');
      setEditTempLabel('');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditLabel('');
    setEditTempLabel('');
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (filteredItems.length === 0) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text color="$gray10">{t('saved.noScansFound')}</Text>
      </YStack>
    );
  }

  return (
    <YStack gap="$2" flex={1}>
      {/* Barra di ricerca e filtri */}
      <YStack gap="$2" padding="$2">
        <Input
          placeholder={t('saved.searchPlaceholder')}
          value={searchQuery}
          onChangeText={setSearchQuery}
          borderWidth={1}
          borderColor="$gray10"
        />
        <XStack gap="$2">
          <Button
            flex={1}
            onPress={() => setFilterType('all')}
            backgroundColor={filterType === 'all' ? '$blue10' : 'transparent'}
            color={filterType === 'all' ? 'white' : '$gray10'}
            borderWidth={1}
            borderColor="$gray10"
          >
            {t('saved.filterAll')}
          </Button>
          <Button
            flex={1}
            onPress={() => setFilterType('saved')}
            backgroundColor={filterType === 'saved' ? '$green10' : 'transparent'}
            color={filterType === 'saved' ? 'white' : '$gray10'}
            borderWidth={1}
            borderColor="$gray10"
          >
            {t('saved.filterSaved')}
          </Button>
          <Button
            flex={1}
            onPress={() => setFilterType('unsaved')}
            backgroundColor={filterType === 'unsaved' ? '$orange10' : 'transparent'}
            color={filterType === 'unsaved' ? 'white' : '$gray10'}
            borderWidth={1}
            borderColor="$gray10"
          >
            {t('saved.filterUnsaved')}
          </Button>
        </XStack>
      </YStack>

      {/* Lista delle scansioni filtrate */}
      <YStack gap="$2" flex={1}>
        {filteredItems.map((item) => (
          <Card key={item.id} elevate={true} padding="$4" borderRadius="$6">
            <YStack gap="$2">
              <XStack justifyContent="space-between" alignItems="center">
                <H4>{item.label || t('saved.noLabel')}</H4>
                <XStack gap="$2">
                  {editingId === item.id ? (
                    <>
                      <Button
                        onPress={() => handleSave(item.id)}
                        size="$2"
                        backgroundColor="$green10"
                        color="white"
                      >
                        ✓
                      </Button>
                      <Button
                        onPress={handleCancel}
                        size="$2"
                        borderWidth={1}
                        borderColor="$gray10"
                      >
                        ✕
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onPress={() => handleEdit(item)}
                        size="$2"
                        borderWidth={1}
                        borderColor="$blue10"
                      >
                        ✎
                      </Button>
                      <Button
                        onPress={() => onDelete(item.id)}
                        size="$2"
                        borderWidth={1}
                        borderColor="$red10"
                      >
                        🗑️
                      </Button>
                    </>
                  )}
                </XStack>
              </XStack>

              {editingId === item.id ? (
                <Input
                  value={editTempLabel}
                  onChangeText={setEditTempLabel}
                  placeholder={t('saved.editLabelPlaceholder')}
                  autoFocus
                />
              ) : (
                <>
                  <Text fontSize="$2" color="$gray10">
                    {item.data}
                  </Text>
                  <XStack justifyContent="space-between">
                    <Text fontSize="$2" color="$gray10">
                      {t('saved.type')}: {item.type}
                    </Text>
                    <Text fontSize="$2" color="$gray10">
                      {formatDate(item.createdAt)}
                    </Text>
                  </XStack>
                  {item.count > 1 && (
                    <Text fontSize="$2" color="$gray10">
                      {t('saved.scans')}: {item.count}
                    </Text>
                  )}
                </>
              )}
            </YStack>
          </Card>
        ))}
      </YStack>
    </YStack>
  );
}