    import { Text, TouchableOpacity, View } from "react-native";

    import AppCard from "../../../shared/components/appCard/AppCard";

    import { useReservation } from "../context/ReservationContext";

    import { createStyles } from "./ReservationInfoCard.style";

    import { themes } from "../../../theme/themes";
    import { useTheme } from "../../../theme/useTheme";


    type Props = {
    readonly title: string;
    readonly subtitle: string;
    readonly onChangePickup: () => void;
    readonly onChangeReturnBranch: () => void;
    };

    export default function ReservationInfoCard({
    title,
    subtitle,
    onChangePickup,
    onChangeReturnBranch,
    }: Props) {

    const { reservation } = useReservation();

    const { themeName } = useTheme();
    const colors = themes[themeName];

    const styles = createStyles(colors);

    return (

        <AppCard>

        <Text style={styles.title}>
            {title}
        </Text>

        <Text style={styles.subtitle}>
            {subtitle}
        </Text>

        <View style={styles.section}>

            <Text style={styles.label}>
            Recogida
            </Text>

            <Text style={styles.value}>
            {reservation?.pickupBranch?.name}
            </Text>

            <TouchableOpacity
            onPress={onChangePickup}
            >
            <Text style={styles.link}>
                Cambiar
            </Text>
            </TouchableOpacity>

        </View>

        <View style={styles.section}>

            <Text style={styles.label}>
            Devolución
            </Text>

            <Text style={styles.value}>
            {reservation?.returnBranch?.name}
            </Text>

            <TouchableOpacity
            onPress={onChangeReturnBranch}
            >
            <Text style={styles.link}>
                Cambiar
            </Text>
            </TouchableOpacity>

        </View>

        </AppCard>

    );
    }