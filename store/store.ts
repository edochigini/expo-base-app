import { BarcodeScanningResult } from 'expo-camera';
import { create } from 'zustand';

export interface ScannedBarcodeItem extends BarcodeScanningResult {
  timestamp: number;
  count: number;
}

export interface ScannerState {
  scannedItems: ScannedBarcodeItem[];
  addScannedItem: (item: BarcodeScanningResult) => void;
  clearScannedItems: () => void;
}

export const useScannerStore = create<ScannerState>((set) => ({
  scannedItems: [],
  addScannedItem: (newItem) =>
    set((state) => {
      const existingItemIndex = state.scannedItems.findIndex(
        (item) => item.data === newItem.data && item.type === newItem.type
      );

      if (existingItemIndex > -1) {
        // Increment count of existing item
        const updatedItems = [...state.scannedItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          count: updatedItems[existingItemIndex].count + 1,
          timestamp: Date.now(), // Update timestamp on re-scan
        };
        console.log('Updated item timestamp:', updatedItems[existingItemIndex].timestamp);
        return { scannedItems: updatedItems };
      } else {
        // Add new item with timestamp and count
        const newItemWithDetails: ScannedBarcodeItem = {
          ...newItem,
          timestamp: Date.now(),
          count: 1,
        };
        console.log('New item timestamp:', newItemWithDetails.timestamp);
        return { scannedItems: [...state.scannedItems, newItemWithDetails] };
      }
    }),
  clearScannedItems: () => set({ scannedItems: [] }),
}));
