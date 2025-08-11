import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, Modal, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { Button, Paragraph, YStack, XStack, Input } from 'tamagui';
import { useScannerStore } from '~/store/store';

interface BarcodeScannerProps {
  onScan: (result: BarcodeScanningResult) => void;
  onSaveWithLabel?: (result: BarcodeScanningResult, label: string) => void;
  showSaveOption?: boolean;
}

export const BarcodeScanner = ({ onScan, onSaveWithLabel, showSaveOption = true }: BarcodeScannerProps) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [showLabelModal, setShowLabelModal] = useState(false);
  const [label, setLabel] = useState('');
  const [tempScanResult, setTempScanResult] = useState<BarcodeScanningResult | null>(null);
  const { saveScannedItem } = useScannerStore();

  const handleBarcodeScanned = (result: BarcodeScanningResult) => {
    if (showSaveOption && onSaveWithLabel) {
      setTempScanResult(result);
      setShowLabelModal(true);
    } else {
      onScan(result);
    }
  };

  const handleSaveWithLabel = () => {
    if (tempScanResult && label.trim()) {
      const scannedItem: import('~/store/store').ScannedBarcodeItem = {
        ...tempScanResult,
        timestamp: Date.now(),
        count: 1,
        label: label.trim(),
        isSaved: true,
      };
      saveScannedItem(scannedItem, label.trim());
      setShowLabelModal(false);
      setLabel('');
      setTempScanResult(null);
      Alert.alert('Successo', 'Codice salvato con etichetta');
    }
  };

  const handleCancelSave = () => {
    setShowLabelModal(false);
    setLabel('');
    setTempScanResult(null);
    if (tempScanResult && onScan) {
      onScan(tempScanResult);
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <YStack flex={1} justifyContent="center" alignItems="center" />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" space="$4">
        <Paragraph textAlign="center">We need your permission to show the camera</Paragraph>
        <Button onPress={requestPermission}>Grant Permission</Button>
      </YStack>
    );
  }

  return (
    <>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={handleBarcodeScanned}
      />
      
      <Modal
        visible={showLabelModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCancelSave}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <YStack space="$4" padding="$4">
              <Paragraph fontSize="$6" fontWeight="bold">Salva codice con etichetta</Paragraph>
              <Input
                value={label}
                onChangeText={setLabel}
                placeholder="Inserisci etichetta..."
                autoFocus={true}
              />
              <XStack space="$2">
                <Button
                  onPress={handleCancelSave}
                  flex={1}
                  borderWidth={2}
                  borderColor="$gray10"
                >
                  Annulla
                </Button>
                <Button
                  onPress={handleSaveWithLabel}
                  flex={1}
                  borderWidth={2}
                  borderColor="$blue10"
                  disabled={!label.trim()}
                >
                  Salva
                </Button>
              </XStack>
            </YStack>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
    padding: 20,
  },
});