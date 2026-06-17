import { Colors, ThemeColors, ThemeName } from '../../theme/Colors';
import { useColorScheme as useColorSchemeRN } from 'react-native';

export function useColorScheme() {
  return useColorSchemeRN();
}

export function useThemeColor(
  props: {
    light?: string;
    dark?: string;
    ocean?: string;
    sunset?: string;
  },

  colorName: keyof ThemeColors
) {
  const theme = (useColorScheme() ?? 'light') as ThemeName;

  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors[theme][colorName];
}