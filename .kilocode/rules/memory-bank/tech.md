# Tecnologie Utilizzate

Questo documento descrive lo stack tecnologico e le dipendenze principali di questo progetto.

## Framework e Librerie Principali

- **React Native**: Framework principale per lo sviluppo di applicazioni mobili multipiattaforma.
- **Expo**: Piattaforma e set di strumenti costruiti attorno a React Native per semplificare lo sviluppo, la compilazione e la distribuzione di app.
- **Expo Router**: Libreria di routing file-based per applicazioni React Native e web.
- **Tamagui**: UI kit per React Native e web che offre componenti stilizzati e ottimizzati per le prestazioni.
- **TypeScript**: Superset di JavaScript che aggiunge la tipizzazione statica.
- **Zustand**: Soluzione di state management leggera e semplice per React.

## Configurazione e Build

- **Babel**: Utilizzato per traspilare il codice JavaScript/TypeScript moderno in una versione compatibile con i diversi ambienti. È configurato con `babel-preset-expo` e il plugin di Tamagui.
- **Metro**: Bundler JavaScript per React Native.
- **ESLint & Prettier**: Utilizzati per il linting e la formattazione del codice, garantendo uno stile di codice consistente.

## Dipendenze Chiave

- `@react-navigation/native`: Core della navigazione in React Native.
- `@supabase/supabase-js`: Client JavaScript per interagire con Supabase (sebbene presente, non sembra essere utilizzato attivamente nei file di configurazione iniziali).
- `expo-font`: Per il caricamento di font personalizzati.
- `react-native-gesture-handler`, `react-native-reanimated`, `react-native-safe-area-context`, `react-native-screens`: Dipendenze fondamentali per la navigazione e le animazioni.