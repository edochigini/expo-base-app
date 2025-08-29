import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Paragraph, YStack } from 'tamagui';
import { useScannerStore } from '~/store/store';
import { useTranslation } from 'react-i18next';

export const BarcodeScanner = ({ onScan }: { onScan: (result: BarcodeScanningResult) => void }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const { t } = useTranslation();

  if (!permission) {
    // Camera permissions are still loading.
    return <YStack flex={1} justifyContent="center" alignItems="center" />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <YStack flex={1} justifyContent="center" alignItems="center" space="$4">
        <Paragraph textAlign="center">{t('scanner.permissionRequired')}</Paragraph>
        <Button onPress={requestPermission}>{t('scanner.grantPermission')}</Button>
      </YStack>
    );
  }

  return (
    <CameraView
      style={StyleSheet.absoluteFillObject}
      onBarcodeScanned={onScan}
    />
  );
};