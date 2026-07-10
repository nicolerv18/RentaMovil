    import { useTranslation } from "react-i18next";
import { createStyles } from "./card";

    import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

    import { Vehicle } from "../../../types/vehicles";

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

    const colors = themes[themeName];

    const styles = createStyles(colors);

    return (
        <View style={styles.card}>
        <View style={styles.badge}>
            <Text style={styles.badgeText}>
            {vehicle.price} COP/día
            </Text>
        </View>

        <Text style={styles.name}>
            {vehicle.name}
        </Text>

        <View style={styles.featuresContainer}>
            <View style={styles.feature}>
            <Text style={styles.featureText}>
                {t("cartVehicule.doors")}: {vehicle.seats}
            </Text>
            </View>

            <View style={styles.feature}>
            <Text style={styles.featureText}>
                {t("cartVehicule.bags")}: {vehicle.bags}
            </Text>
            </View>

            <View style={styles.feature}>
            <Text style={styles.featureText}>
                {t("cartVehicule.type")}: {vehicle.transmission}
            </Text>
            </View>
        </View>

        <View style={styles.content}>
            <View style={styles.benefits}>
            {vehicle.benefits.map((benefit, index) => (
                <View
                key={index}
                style={styles.benefitRow}
                >
                <Text style={styles.check}>✔</Text>

                <Text style={styles.benefitText}>
                    {benefit}
                </Text>
                </View>
            ))}
            </View>

            <Image
            source={vehicle.image}
            style={styles.image}
            />
        </View>

        <View style={styles.locationContainer}>
            <View style={styles.locationIcon}>
            <Text>✈️</Text>
            </View>

            <View style={styles.locationInfo}>
            <Text style={styles.location}>
                {t("cartVehicule.location")}, {vehicle.branch.name}
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