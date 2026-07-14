import { Image, Text, View } from "react-native";

import AppCard from "../../../shared/components/appCard/AppCard";

import { Vehicle } from "../../../types/vehicles";

import { createStyles } from "./VehicleSummaryCard.style";

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
        source={vehicle.image}
        style={styles.image}
    />

    <View style={styles.content}>

        <Text style={styles.name}>
            {vehicle.name}
        </Text>

        <Text style={styles.model}>
            {vehicle.brand} • {vehicle.model}
        </Text>

        <View style={styles.infoContainer}>

            <View style={styles.badge}>
                <Text style={styles.badgeText}>
                    🚗 {vehicle.category}
                </Text>
            </View>

            <View style={styles.badge}>
                <Text style={styles.badgeText}>
                    ⚙️ {vehicle.transmission}
                </Text>
            </View>

            <View style={styles.badge}>
                <Text style={styles.badgeText}>
                    💺 {vehicle.seats} {t("cartVehicule.doors")}
                </Text>
            </View>

            <View style={styles.badge}>
                <Text style={styles.badgeText}>
                    🧳 {vehicle.bags} {t("cartVehicule.bags")}
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