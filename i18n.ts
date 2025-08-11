import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

const resources = {
  en: {
    translation: {
      common: {
        back: "Back",
        save: "Save",
        cancel: "Cancel",
        clear: "Clear",
        search: "Search",
        found: "Found",
        of: "of",
        startScanning: "Start Scanning",
        clearScans: "Clear Scans",
        savedScans: "Saved Scans",
        barcodeScanner: "Barcode Scanner",
        quantity: "Quantity"
      },
      scanner: {
        title: "Barcode Scanner",
        startScanning: "Start Scanning",
        clearScans: "Clear Scans",
        saveWithLabel: "Save code with label",
        enterLabel: "Enter label...",
        success: "Success",
        saved: "Code saved with label",
        permission: "We need your permission to show the camera",
        grantPermission: "Grant Permission"
      },
      saved: {
        title: "Saved Scans",
        searchPlaceholder: "Search scans...",
        saveCurrentScans: "Save current scans",
        noSavedItems: "No saved scans",
        delete: "Delete",
        editLabel: "Edit Label",
        save: "Save",
        cancel: "Cancel",
        enterLabel: "Enter Label",
        savedSuccessfully: "Label saved successfully",
        deletedSuccessfully: "Scan deleted successfully",
        clearAll: "Clear All",
        noScansFound: "No scans found",
        filterAll: "All",
        filterSaved: "Saved",
        filterUnsaved: "Unsaved",
        noLabel: "No label",
        editLabelPlaceholder: "Enter label...",
        type: "Type",
        scans: "Scans",
        results: "{{found}} of {{total}} results"
      },
      settings: {
        title: "Settings",
        scanningPreferences: "Scanning Preferences",
        soundOnScan: "Sound on Scan",
        vibrationOnScan: "Vibration on Scan",
        autoSaveResults: "Auto Save Results",
        displayOptions: "Display Options",
        darkMode: "Dark Mode",
        showTimestamp: "Show Timestamp",
        showBarcodeType: "Show Barcode Type",
        language: "Language",
        about: "About",
        appVersion: "Barcode Scanner v1.0.0",
        appDescription: "Built with React Native, Expo, and Tamagui",
        apiConfiguration: "API Configuration",
        apiConfigurationDescription: "Configure your API endpoint for barcode lookup",
        apiPlaceholder: "https://api.example.com",
        dataManagement: "Data Management",
        clearAllScans: "Clear All Scanned Items",
        clearAllScansDescription: "This will permanently delete all scanned items from your current session.",
        savedScans: {
          saveCurrentScans: "Save Current Scans",
          clearAll: "Clear All",
          searchPlaceholder: "Search scans..."
        },
        savedScansTitle: "Saved Scans"
      }
    },
  },
  it: {
    translation: {
      common: {
        back: "Indietro",
        save: "Salva",
        cancel: "Annulla",
        clear: "Svuota",
        search: "Cerca",
        found: "Trovati",
        of: "di",
        startScanning: "Inizia Scansione",
        clearScans: "Svuota Scansioni",
        savedScans: "Scansioni Salvate",
        barcodeScanner: "Barcode Scanner",
        quantity: "Quantità"
      },
      scanner: {
        title: "Barcode Scanner",
        startScanning: "Inizia Scansione",
        clearScans: "Svuota Scansioni",
        saveWithLabel: "Salva codice con etichetta",
        enterLabel: "Inserisci etichetta...",
        success: "Successo",
        saved: "Codice salvato con etichetta",
        permission: "Abbiamo bisogno del tuo permesso per mostrare la telecamera",
        grantPermission: "Concedi Permesso"
      },
      saved: {
        title: "Scansioni Salvate",
        searchPlaceholder: "Cerca scansioni...",
        saveCurrentScans: "Salva scansioni correnti",
        noSavedItems: "Nessuna scansione salvata",
        delete: "Elimina",
        editLabel: "Modifica etichetta",
        save: "Salva",
        cancel: "Annulla",
        enterLabel: "Inserisci etichetta",
        savedSuccessfully: "Etichetta salvata con successo",
        deletedSuccessfully: "Scansione eliminata con successo",
        clearAll: "Svuota Tutto",
        noScansFound: "Nessuna scansione trovata",
        filterAll: "Tutti",
        filterSaved: "Salvati",
        filterUnsaved: "Non salvati",
        noLabel: "Senza etichetta",
        editLabelPlaceholder: "Inserisci etichetta...",
        type: "Tipo",
        scans: "Scansioni",
        results: "{{found}} di {{total}} risultati"
      },
      settings: {
        title: "Impostazioni",
        scanningPreferences: "Preferenze di Scansione",
        soundOnScan: "Suono alla Scansione",
        vibrationOnScan: "Vibrazione alla Scansione",
        autoSaveResults: "Salva Automaticamente i Risultati",
        displayOptions: "Opzioni di Visualizzazione",
        darkMode: "Modalità Scura",
        showTimestamp: "Mostra Timestamp",
        showBarcodeType: "Mostra Tipo Codice a Barre",
        language: "Lingua",
        about: "Informazioni",
        appVersion: "Barcode Scanner v1.0.0",
        appDescription: "Creato con React Native, Expo e Tamagui",
        apiConfiguration: "Configurazione API",
        apiConfigurationDescription: "Configura il tuo endpoint API per la ricerca di codici a barre",
        apiPlaceholder: "https://api.example.com",
        dataManagement: "Gestione Dati",
        clearAllScans: "Cancella Tutti gli Elementi Scansionati",
        clearAllScansDescription: "Questo eliminerà permanentemente tutti gli elementi scansionati dalla sessione corrente.",
        savedScans: {
          saveCurrentScans: "Salva Scansioni Correnti",
          clearAll: "Svuota Tutto",
          searchPlaceholder: "Cerca scansioni..."
        },
        savedScansTitle: "Scansioni Salvate"
      }
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // es: "it" da "it-IT"
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;