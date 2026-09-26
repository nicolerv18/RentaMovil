    import { useTranslation } from "react-i18next";
import { createStyles } from "./Card.styles";

    import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

    import { Vehicle } from "../../../types/vehicle";

    import { themes } from "../../../theme/themes";
import { useTheme } from "../../../theme/useTheme";

    type Props = {
    vehicle: Vehicle;
    onContinue: (vehicle: Vehicle) => void;
    };

    export default function VehicleCard({
    vehicle,
    onContinue,
    }: Props) {
    const { t } = useTranslation();

    const { themeName } = useTheme();

    const colors = themes[themeName as keyof typeof themes];

    const styles = createStyles(colors);

    return (
        <View style={styles.card}>
        <View style={styles.badge}>
            <Text style={styles.badgeText}>
            {vehicle.price} COP/día
            </Text>
        </View>

        <Text style={styles.name}>
            {vehicle.brand} {vehicle.model}
        </Text>

        <View style={styles.featuresContainer}>
            <View style={styles.feature}>
            <Text style={styles.featureText}>
                {t("cartVehicule.capacity")}: {vehicle.capacity}
            </Text>
            </View>

            <View style={styles.feature}>
            <Text style={styles.featureText}>
                {t("cartVehicule.year")}: {vehicle.year}
            </Text>
            </View>

            <View style={styles.feature}>
            <Text style={styles.featureText}>
                {t("cartVehicule.type")}: {vehicle.vehicleType}
            </Text>
            </View>
        </View>

        <View style={styles.content}>

            <Image
            source={{ uri: vehicle.image }}
            style={styles.image}
            />
        </View>

        <View style={styles.locationContainer}>
            <View style={styles.locationIcon}>
            <Text>✈️</Text>
            </View>

            <View style={styles.locationInfo}>
            <Text style={styles.location}>
                {t("cartVehicule.location")}, {vehicle.location}
            </Text>
            </View>
        </View>

            <TouchableOpacity
            style={styles.button}
            onPress={() => {
                console.log("Botón presionado");
                console.log("onContinue =", onContinue);

                if (onContinue) {
                onContinue(vehicle);
                } else {
                console.log("onContinue es undefined");
                }
            }}
            >
            <Text style={styles.buttonText}>
                {t("cartVehicule.continue")}
            </Text>
            </TouchableOpacity>
        </View>
    );
    }