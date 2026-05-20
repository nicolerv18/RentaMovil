import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export default {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#7ED957',
      background: '#101234',
      card: '#D9D9D9',
      text: '#333333',
      border: 'transparent',
      notification: '#7ED957',
    },
    tint: "#e4e4e4",
    icon: "#656570",
    tabIconDefault: '#5dca61',
    background: '#101234',
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#7ED957',
      background: "#16213E",
      card: "#16213E",
      text: '#FFFFFF',
      border: 'transparent',
      notification: '#7ED957',
    },
    tint: "#16213E",
    icon: "#656570",
    tabIconDefault: '#5dca61',
    background: "#16213E",
  },
};
