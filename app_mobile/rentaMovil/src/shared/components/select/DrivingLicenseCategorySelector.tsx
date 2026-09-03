import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";

import { themes } from "../../../theme/themes";
import { useTheme } from "../../../theme/useTheme";

export const DRIVING_LICENSE_CATEGORIES = [
  "A1",
  "A2",
  "B1",
  "B2",
  "B3",
  "C1",
  "C2",
  "C3",
] as const;

export type DrivingLicenseCategory =
  (typeof DRIVING_LICENSE_CATEGORIES)[number];

type Props = {
  value?: DrivingLicenseCategory;
  onChange: (category: DrivingLicenseCategory | undefined) => void;
  enabled?: boolean;
};

export default function DrivingLicenseCategorySelector({
  value,
  onChange,
  enabled = true,
}: Props) {
  const { themeName } = useTheme();
  const colors = themes[themeName];
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Categoría de licencia de conducción</Text>

      <View style={[styles.selectContainer, !enabled && styles.disabled]}>
        <Picker
          enabled={enabled}
          selectedValue={value ?? ""}
          onValueChange={(selectedValue: string) =>
            onChange(
              selectedValue === ""
                ? undefined
                : (selectedValue as DrivingLicenseCategory)
            )
          }
          style={styles.picker}
        >
          <Picker.Item label="Selecciona una categoría" value="" />
          {DRIVING_LICENSE_CATEGORIES.map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const createStyles = (colors: (typeof themes)[keyof typeof themes]) =>
  StyleSheet.create({
    container: { width: "100%", marginBottom: 16 },
    label: {
      marginBottom: 7,
      fontSize: 13,
      fontWeight: "700",
      color: colors.secondaryText,
    },
    selectContainer: {
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      backgroundColor: colors.input,
    },
    picker: { width: "100%", height: 52, color: colors.text },
    disabled: { opacity: 0.65 },
  });
