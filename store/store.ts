import { BarcodeScanningResult } from 'expo-camera';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n/config/i18n';

export interface ScannedBarcodeItem extends BarcodeScanningResult {
  timestamp: number;
  count: number;
}

export type Theme = 'light' | 'dark';
export type Language = 'en' | 'it';

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

export interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
  getInitializedLanguage: () => Promise<Language>;
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

// Funzione per inizializzare la lingua all'avvio
const initializeLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem('app_language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'it')) {
      // Aggiorna i18n con la lingua salvata
      i18n.changeLanguage(savedLanguage);
      return savedLanguage as Language;
    }
    return 'it' as Language; // Default italiano
  } catch (error) {
    console.error('Error initializing language:', error);
    return 'it' as Language; // Default italiano in caso di errore
  }
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'it' as Language,
      setLanguage: async (language: Language) => {
        try {
          // Salva la lingua in AsyncStorage
          await AsyncStorage.setItem('app_language', language);
          
          // Aggiorna i18n
          i18n.changeLanguage(language);
          
          // Aggiorna lo stato
          set({ language });
        } catch (error) {
          console.error('Error setting language:', error);
        }
      },
      // Funzione per ottenere la lingua inizializzata
      getInitializedLanguage: async () => {
        const initializedLanguage = await initializeLanguage();
        set({ language: initializedLanguage });
        return initializedLanguage;
      }
    }),
    {
      name: 'language-storage',
      // Funzione per caricare lo stato iniziale con la lingua salvata
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            initializeLanguage().then(lang => {
              if (lang !== state.language) {
                state.setLanguage(lang);
              }
            });
          }
        };
      }
    }
  )
);
