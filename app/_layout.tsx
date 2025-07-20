import React, { useEffect } from 'react';
import { TamaguiProvider, Theme, useTheme, View } from 'tamagui';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { Platform, StatusBar } from 'react-native';

import config from '../tamagui.config';
import { useThemeStore } from '../store/store';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Componente wrapper globale per gestire il background fisso
function GlobalBackgroundWrapper({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const backgroundColor = theme.background.val;
  const { theme: themeMode } = useThemeStore();
  
  return (
    <>
      <StatusBar
        barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
      />
      <View
        style={{
          flex: 1,
          backgroundColor,
          // Imposta il background a livello nativo per eliminare completamente i flash
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {children}
      </View>
    </>
  );
}

// Componente interno per utilizzare useTheme hook all'interno del TamaguiProvider
function StackNavigator() {
  const theme = useTheme();
  const backgroundColor = theme.background.val;
  
  return (
    <GlobalBackgroundWrapper>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: 'transparent', // Usa transparent per permettere al wrapper di gestire il background
            flex: 1,
          },
          headerStyle: {
            backgroundColor,
          },
          cardStyle: {
            backgroundColor: 'transparent', // Usa transparent per permettere al wrapper di gestire il background
          },
          // Riabilita le animazioni con transizione fade per fluidità senza flash bianchi
          animationEnabled: true,
          animation: 'fade',
          // Mantieni gesture disabilitate per stabilità
          gestureEnabled: false,
          // Configura timing ottimizzato per transizioni fluide
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 200,
                useNativeDriver: true,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 150,
                useNativeDriver: true,
              },
            },
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' },
          }}
        />
      </Stack>
    </GlobalBackgroundWrapper>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  const { theme } = useThemeStore();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider
      config={config}
      defaultTheme={isDarkMode ? 'dark' : 'light'}
      // Aggiunge un background globale per evitare flash bianchi
      themeClassNameOnRoot
    >
      <Theme name={isDarkMode ? 'dark' : 'light'}>
        <StackNavigator />
      </Theme>
    </TamaguiProvider>
  );
}

