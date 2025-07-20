import { BarcodeScanningResult } from 'expo-camera';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ScannedBarcodeItem extends BarcodeScanningResult {
  timestamp: number;
  count: number;
}

export type Theme = 'light' | 'dark';

export interface ScannerState {
  scannedItems: ScannedBarcodeItem[];
  addScannedItem: (item: BarcodeScanningResult) => void;
  clearScannedItems: () => void;
}

export interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
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

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light' as Theme,
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);
