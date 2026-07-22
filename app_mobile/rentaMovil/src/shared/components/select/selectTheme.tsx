import { Picker } from "@react-native-picker/picker";

import { useTheme } from "../../../theme/useTheme";
import { themes, Themes } from "../../../theme/themes";

export default function ThemeSelector() {

const {
    themeName,
    setTheme,
} = useTheme();

const labels: Record<Themes, string> = {
    light: "☀️ Claro",
    dark: "🌙 Oscuro",
    ocean: "🌊 Océano",
    gray: "⚪ Gris",
};

return (
    <Picker
    selectedValue={themeName}
    onValueChange={(value) =>
        setTheme(value as Themes)
    }
    >
    {Object.keys(themes).map((theme) => (
        <Picker.Item
    key={theme}
    label={labels[theme as Themes]}
    value={theme}
        />
    ))}
    </Picker>
);
}