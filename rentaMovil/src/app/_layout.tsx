import { ThemeProvider } from '../theme/themeContext';
import { themes } from '../theme/themes';
import { useTheme } from '../theme/useTheme';

import {
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import 'react-native-reanimated';
import { ReservationProvider } from '../features/Reservation/context/ReservationContext';
import '../traslation/i18n';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'auth/login',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider>
        <ReservationProvider>

        <InnerNav />

      </ReservationProvider>
    </ThemeProvider>
  );
}

function InnerNav() {
  const { themeName } = useTheme();

  const currentTheme = themes[themeName];

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: currentTheme.background,
      card: currentTheme.card,
      text: currentTheme.text,
      border: currentTheme.border,
      primary: currentTheme.primary,
    },
  };

  return (
    <NavigationThemeProvider value={navigationTheme}>
      <Stack
        screenOptions={{
          title: 'Renta Móvil',

          headerStyle: {
            backgroundColor: currentTheme.background,
          },

          headerTintColor: currentTheme.text,
        }}
      >
        <Stack.Screen
          name="auth/login"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="modal"
          options={{ presentation: 'modal' }}
        />
      </Stack>
    </NavigationThemeProvider>
  );
}