# Architettura del Software

Questo documento descrive l'architettura di alto livello dell'applicazione, l'organizzazione del codice e i pattern di progettazione utilizzati.

## Struttura del Progetto

Il progetto segue la struttura standard di un'applicazione Expo con `expo-router`.

-   `app/`: Contiene tutte le rotte e i layout dell'applicazione, seguendo una convenzione basata su file.
    -   `_layout.tsx`: Il layout principale (root) che wrappa l'intera applicazione.
    -   `(tabs)/`: Un gruppo di rotte per la navigazione a schede.
        -   `_layout.tsx`: Definisce il layout della `TabsNavigator`.
        -   `index.tsx`: La prima schermata della navigazione a schede.
        -   `two.tsx`: La seconda schermata.
    -   `modal.tsx`: Una rotta per una schermata modale.
-   `components/`: Contiene componenti React riutilizzabili utilizzati in tutta l'applicazione.
-   `store/`: Contiene la configurazione per la gestione dello stato (Zustand).
-   `assets/`: Contiene risorse statiche come immagini e font.
-   `tamagui.config.ts`: File di configurazione centrale per la libreria UI Tamagui.

## Architettura di Navigazione

La navigazione è gestita da **Expo Router**, che permette una navigazione file-based.

-   **Root Layout (`app/_layout.tsx`)**:
    -   Inizializza il `TamaguiProvider`.
    -   Carica i font richiesti.
    -   Gestisce la visualizzazione dello splash screen.
    -   Definisce uno `Stack` navigator che contiene le rotte principali: `(tabs)` e `modal`.

-   **Tab Layout (`app/(tabs)/_layout.tsx`)**:
    -   Definisce una `Tabs` navigator con due schede.
    -   Utilizza i componenti `TabBarIcon` e `HeaderButton` per personalizzare l'interfaccia.

## Gestione dello Stato

-   **Zustand**: È configurato per la gestione dello stato globale. Lo store è definito in `store/store.ts`.

## Componenti Principali

-   **`Button`**: Un componente bottone riutilizzabile.
-   **`Container`**: Un wrapper per i layout delle schermate.
-   **`ScreenContent`**: Un componente per visualizzare il contenuto principale di una schermata.
-   **`HeaderButton`**: Un bottone per l'header, utilizzato per aprire la modale.
-   **`TabBarIcon`**: Un'icona per la barra di navigazione.