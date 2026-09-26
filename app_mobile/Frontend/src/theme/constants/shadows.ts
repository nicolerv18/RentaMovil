import { ViewStyle } from "react-native";

export const createCardShadow = (colors: any): ViewStyle => ({
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
});
