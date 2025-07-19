import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Paragraph, YStack } from 'tamagui';
import { useScannerStore } from '~/store/store';

export const BarcodeScanner = ({ onScan }: { onScan: (result: BarcodeScanningResult) => void }) => {
  const [permission, requestPermission] = useCameraPermissions();

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
    <CameraView
      style={StyleSheet.absoluteFillObject}
      onBarcodeScanned={onScan}
    />
  );
};