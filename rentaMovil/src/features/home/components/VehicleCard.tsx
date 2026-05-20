    import React from "react";
    import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    } from "react-native";

    import { Vehicle } from "../../../types/vehicles";

    type Props = {
    vehicle: Vehicle;
    };

    export default function VehicleCard({
    vehicle,
    }: Props) {

    return (
        <View style={styles.card}>

        <Image
            source={{ uri: vehicle.image }}
            style={styles.image}
        />

        <View style={styles.info}>

            <Text style={styles.name}>
            {vehicle.name}
            </Text>

            <Text style={styles.type}>
            {vehicle.type}
            </Text>

            <View style={styles.features}>

            <Text>
                👤 {vehicle.seats}
            </Text>

            <Text>
                🧳 {vehicle.bags}
            </Text>

            <Text>
                {vehicle.transmission}
            </Text>

            </View>

            <Text style={styles.location}>
            📍 {vehicle.branch}
            </Text>

        </View>

        <View style={styles.footer}>

            <Text style={styles.price}>
            ${vehicle.price}
            </Text>

            <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
                Continuar
            </Text>
            </TouchableOpacity>

        </View>

        </View>
    );
    }

    const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 16,
    },

    image: {
        width: "100%",
        height: 180,
        borderRadius: 14,
    },

    info: {
        marginTop: 15,
    },

    name: {
        fontSize: 24,
        fontWeight: "700",
    },

    type: {
        color: "#777",
        marginTop: 4,
    },

    features: {
        flexDirection: "row",
        gap: 10,
        marginTop: 10,
    },

    location: {
        marginTop: 10,
    },

    footer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    price: {
        fontSize: 24,
        fontWeight: "700",
    },

    button: {
        backgroundColor: "#1a2e4a",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 12,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "700",
    },
    });