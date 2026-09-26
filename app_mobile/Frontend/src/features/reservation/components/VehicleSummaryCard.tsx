import { Image, Text, View } from "react-native";

import AppCard from "../../../shared/components/AppCard/AppCard";

import { Vehicle } from "../../../types/vehicle";

import { createStyles } from "./VehicleSummaryCard.styles";

import { themes } from "../../../theme/themes";
import { useTheme } from "../../../theme/useTheme";

import { useTranslation } from "react-i18next";

    type Props = {
    readonly vehicle: Vehicle;
    };

    export default function VehicleSummaryCard({
    vehicle,
    }: Props) {
    const { t } = useTranslation();

    const { themeName } = useTheme();

    const colors = themes[themeName];

    const styles = createStyles(colors);

    return (
<AppCard>

    <Image
        source={{ uri: vehicle.image }}
        style={styles.image}
    />

    <View style={styles.content}>

        <Text style={styles.name}>
            {vehicle.brand} {vehicle.model}
        </Text>

        <Text style={styles.model}>
            {vehicle.brand} • {vehicle.model}
        </Text>

        <View style={styles.infoContainer}>

            <View style={styles.badge}>
                <Text style={styles.badgeText}>
                    🚗 {vehicle.vehicleType}
                </Text>
            </View>

            <View style={styles.badge}>
                <Text style={styles.badgeText}>
                    ⛽ {vehicle.fuelType}
                </Text>
            </View>

            <View style={styles.badge}>
                <Text style={styles.badgeText}>
                    💺 {vehicle.capacity} {t("cartVehicule.capacity")}
                </Text>
            </View>

            <View style={styles.badge}>
                <Text style={styles.badgeText}>
                    📅 {vehicle.year} {t("cartVehicule.year")}
                </Text>
            </View>

        </View>

        <Text style={styles.price}>
            ${vehicle.price.toLocaleString()} COP / día
        </Text>

    </View>

</AppCard>
  );
}