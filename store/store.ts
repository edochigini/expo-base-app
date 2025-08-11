import { BarcodeScanningResult } from 'expo-camera';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ScannedBarcodeItem extends BarcodeScanningResult {
  timestamp: number;
  count: number;
  label?: string; // Etichetta personalizzata opzionale
  isSaved?: boolean; // Flag per indicare se la scansione è stata salvata
  id?: string; // ID opzionale per gli elementi salvati
}

export interface SavedBarcodeItem extends ScannedBarcodeItem {
  id: string; // ID univoco per le scansioni salvate
  label: string; // Etichetta obbligatoria per le scansioni salvate
  createdAt: number; // Data di creazione
}

export type Theme = 'light' | 'dark';

export interface ScannerState {
  scannedItems: ScannedBarcodeItem[];
  addScannedItem: (item: BarcodeScanningResult) => void;
  clearScannedItems: () => void;
  saveScannedItem: (item: ScannedBarcodeItem, label: string) => void;
  unsaveScannedItem: (id: string) => void;
  updateSavedItemLabel: (id: string, label: string) => void;
}

export interface SavedItemsState {
  savedItems: SavedBarcodeItem[];
  searchQuery: string;
  filterType: 'all' | 'qr' | 'barcode' | 'saved';
  setSearchQuery: (query: string) => void;
  setFilterType: (type: 'all' | 'qr' | 'barcode' | 'saved') => void;
  getFilteredItems: () => SavedBarcodeItem[];
  clearSavedItems: () => void;
  saveCurrentScans: () => void;
}

export interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useScannerStore = create<ScannerState>()(
  persist(
    (set) => ({
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
      saveScannedItem: (item, label) =>
        set((state) => {
          const savedItem: SavedBarcodeItem = {
            ...item,
            id: `${item.data}-${item.type}-${Date.now()}`,
            label,
            createdAt: Date.now(),
          };
          
          // Aggiorna l'elemento originale come salvato
          const updatedItems = state.scannedItems.map(scannedItem =>
            scannedItem.data === item.data && scannedItem.type === item.type
              ? { ...scannedItem, isSaved: true, label }
              : scannedItem
          );
          
          return { scannedItems: updatedItems };
        }),
      unsaveScannedItem: (id) =>
        set((state) => {
          const updatedItems = state.scannedItems.map(item =>
            item.isSaved && item.id === id
              ? { ...item, isSaved: false, label: undefined }
              : item
          );
          return { scannedItems: updatedItems };
        }),
      updateSavedItemLabel: (id, label) =>
        set((state) => {
          const updatedItems = state.scannedItems.map(item =>
            item.id === id
              ? { ...item, label }
              : item
          );
          return { scannedItems: updatedItems };
        }),
    }),
    {
      name: 'scanner-storage',
    }
  )
);

export const useSavedItemsStore = create<SavedItemsState>()(
  persist(
    (set, get) => ({
      savedItems: [],
      searchQuery: '',
      filterType: 'all',
      setSearchQuery: (query) => set({ searchQuery: query }),
      setFilterType: (type) => set({ filterType: type }),
      getFilteredItems: () => {
        const { savedItems, searchQuery, filterType } = get();
        
        let filtered = [...savedItems];
        
        // Filtra per tipo
        if (filterType === 'qr') {
          filtered = filtered.filter((item: SavedBarcodeItem) => item.type === 'qr');
        } else if (filterType === 'barcode') {
          filtered = filtered.filter((item: SavedBarcodeItem) => item.type !== 'qr');
        } else if (filterType === 'saved') {
          filtered = filtered.filter((item: SavedBarcodeItem) => item.isSaved);
        }
        
        // Filtra per query di ricerca
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter((item: SavedBarcodeItem) =>
            item.data.toLowerCase().includes(query) ||
            item.label?.toLowerCase().includes(query) ||
            item.type.toLowerCase().includes(query)
          );
        }
        
        return filtered;
      },
      clearSavedItems: () => set({ savedItems: [] }),
      saveCurrentScans: () => {
        // Importiamo dinamicamente per evitare l'importazione circolare
        const { useScannerStore } = require('./store');
        const { scannedItems } = useScannerStore.getState();
        const newSavedItems = scannedItems
          .filter((item: ScannedBarcodeItem) => !item.isSaved) // Prendi solo gli elementi non salvati
          .map((item: ScannedBarcodeItem) => ({
            ...item,
            id: `${item.data}-${item.type}-${Date.now()}`,
            label: `Scansione ${item.type === 'qr' ? 'QR' : 'Barcode'} ${item.data.substring(0, 8)}`,
            createdAt: Date.now(),
            isSaved: true
          }));
        
        set((state) => ({
          savedItems: [...state.savedItems, ...newSavedItems]
        }));
      },
    }),
    {
      name: 'saved-items-storage',
    }
  )
);

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
