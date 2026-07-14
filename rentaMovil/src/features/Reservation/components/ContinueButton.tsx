    import { TouchableOpacity, Text } from "react-native";

    import { themes } from "../../../theme/themes";
    import { useTheme } from "../../../theme/useTheme";

    import { createStyles } from "./ContinueButton.Style";

    type Props = {
    readonly title: string;
    readonly onPress: () => void;
    };

    export default function ContinueButton({
    title,
    onPress,
    }: Props) {
    const { themeName } = useTheme();
    const colors = themes[themeName];
    const styles = createStyles(colors);

    return (
        <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        >
        <Text style={styles.text}>
            {title}
        </Text>
        </TouchableOpacity>
    );
    }