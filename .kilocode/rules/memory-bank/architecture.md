# Architettura del Software

Questo documento descrive l'architettura di alto livello dell'applicazione, l'organizzazione del codice e i pattern di progettazione utilizzati.

## Struttura del Progetto

Il progetto segue la struttura standard di un'applicazione Expo con `expo-router`.

-   `app/`: Contiene tutte le rotte e i layout dell'applicazione, seguendo una convenzione basata su file.
    -   `_layout.tsx`: Il layout principale (root) che wrappa l'intera applicazione.
    -   `index.tsx`: La schermata principale per la scansione di codici a barre.
    -   `settings.tsx`: La schermata delle impostazioni.
-   `components/`: Contiene componenti React riutilizzabili utilizzati in tutta l'applicazione.
    -   `BarcodeScanner.tsx`: Componente dedicato alla gestione della logica della fotocamera e della scansione.
    -   `LanguageSelector.tsx`: Componente per la selezione della lingua.
-   `store/`: Contiene la configurazione per la gestione dello stato (Zustand).
    -   `store.ts`: Gestione degli elementi scansionati e del tema.
-   `assets/`: Contiene risorse statiche come immagini e font.
-   `tamagui.config.ts`: File di configurazione centrale per la libreria UI Tamagui.
-   `i18n/`: Directory per l'internazionalizzazione.
    -   `config/i18n.ts`: Configurazione di react-i18next.
    -   `locales/`: Contiene i file di traduzione per diverse lingue.
        -   `en.json`: Traduzioni in inglese.
        -   `it.json`: Traduzioni in italiano.

## Architettura di Navigazione

La navigazione è gestita da **Expo Router**, che permette una navigazione file-based.

-   **Root Layout (`app/_layout.tsx`)**:
    -   Inizializza il `TamaguiProvider`.
    -   Carica i font richiesti.
    -   Gestisce la visualizzazione dello splash screen.
    -   Definisce uno `Stack` navigator che contiene le rotte principali: `index` e `settings`.
    -   Integra il provider i18n per l'internazionalizzazione.

## Gestione dello Stato

-   **Zustand**: È configurato per la gestione dello stato globale. Lo store è definito in `store/store.ts`.
    -   Gestisce gli elementi scansionati (`scannedItems`).
    -   Gestisce il tema dell'applicazione (`theme`).
    -   Gestisce la lingua corrente (`language`).

## Internazionalizzazione (i18n)

-   **react-i18next**: Libreria utilizzata per la gestione delle traduzioni.
    -   Configurata in `i18n/config/i18n.ts`.
    -   Supporta più lingue (inglese e italiano).
    -   Utilizza hook `useTranslation` per l'accesso alle traduzioni.
    -   Memorizza la lingua corrente nello store Zustand.

-   **Struttura delle traduzioni**:
    -   `i18n/locales/en.json`: Traduzioni in inglese.
    -   `i18n/locales/it.json`: Traduzioni in italiano.
    -   Organizzate per categorie (common, app, scanner, settings, barcode).

-   **Componenti internazionalizzati**:
    -   `app/index.tsx`: Testi della schermata principale.
    -   `app/settings.tsx`: Testi della schermata delle impostazioni.
    -   `components/BarcodeScanner.tsx`: Messaggi del scanner.
    -   `components/LanguageSelector.tsx`: Selezione lingua.

## Componenti Principali

-   **`Button`**: Un componente bottone riutilizzabile.
-   **`Container`**: Un wrapper per i layout delle schermate.
-   **`ScreenContent`**: Un componente per visualizzare il contenuto principale di una schermata.
-   **`HeaderButton`**: Un bottone per l'header, utilizzato per aprire la modale.
-   **`TabBarIcon`**: Un'icona per la barra di navigazione.