import React from "react";
import { createStyles } from "./card";
import { useTranslation } from "react-i18next";

import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";

import { Vehicle } from "../../../types/vehicles";

import { useTheme } from "../../../theme/useTheme";
import { themes } from "../../../theme/themes";

type Props = {
vehicle: Vehicle;
};

export default function VehicleCard({
    vehicle,
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
                {t("cartVehicule.location")}, {vehicle.branch}
            </Text>
            </View>

        </View>

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
            {t("cartVehicule.continue")}
            </Text>
        </TouchableOpacity>

        </View>
    );
}