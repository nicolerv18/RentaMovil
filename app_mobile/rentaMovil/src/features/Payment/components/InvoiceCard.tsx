import {
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useState } from "react";

import AppCard from "../../../shared/components/appCard/AppCard";

import { useReservation } from "../../Reservation/context/ReservationContext";

import { calculateDays } from "../utils/calculateDays";

import { calculateInvoiceTotal } from "../utils/calculateIvoiceTotal";

import { insurance } from "../../Insurance/data/mocks/insurance";

import { themes } from "../../../theme/themes";

import { useTheme } from "../../../theme/useTheme";

import { createStyles } from "./InvoinceCard.style";


export default function InvoiceCard() {

    const {
        reservation,
    } = useReservation();


    const {
        themeName,
    } = useTheme();


    const colors =
        themes[themeName];


    const styles =
        createStyles(colors);


    const [
        isOpen,
        setIsOpen,
    ] =
        useState(false);


    if (!reservation?.vehicle) {

        return null;

    }


    const vehicle =
        reservation.vehicle;


    const days =
        calculateDays(

            reservation.pickupDate,

            reservation.returnDate

        );


    const selectedInsurance =
        insurance.find(

            item =>
                item.id ===
                reservation.insuranceId

        );


const vehicleTotal =
    days * vehicle.price;


const insuranceTotal =
    selectedInsurance?.price ?? 0;


const total =
    calculateInvoiceTotal(
        days,
        vehicle,
        selectedInsurance
    );


    return (

        <AppCard>

            {/* ENCABEZADO */}

            <TouchableOpacity

                style={styles.header}

                onPress={() =>
                    setIsOpen(!isOpen)
                }

            >

                <View>

                    <Text
                        style={styles.title}
                    >

                        Resumen de factura

                    </Text>


                    <Text
                        style={styles.subtitle}
                    >

                        Detalle de tu reserva

                    </Text>

                </View>


                <Text
                    style={styles.arrow}
                >

                    {
                        isOpen
                            ? "▲"
                            : "▼"
                    }

                </Text>

            </TouchableOpacity>


            {
                isOpen && (

                    <View
                        style={styles.content}
                    >

                        {/* INFORMACIÓN DEL VEHÍCULO */}

                        <View
                            style={styles.vehicleSection}
                        >

                            <Text
                                style={styles.vehicleName}
                            >

                                {vehicle.name}

                            </Text>


                            <Text
                                style={styles.vehicleDescription}
                            >

                                Alquiler del vehículo

                            </Text>

                        </View>


                        {/* DETALLE DEL VEHÍCULO */}

                        <View
                            style={styles.row}
                        >

                            <View>

                                <Text
                                    style={styles.label}
                                >

                                    Alquiler

                                </Text>


                                <Text
                                    style={styles.description}
                                >

                                    {days} día
                                    {days !== 1 ? "s" : ""}

                                </Text>

                            </View>


                            <Text
                                style={styles.value}
                            >

                                ${vehicleTotal}

                            </Text>

                        </View>


                        {/* SEGURO */}

                        <View
                            style={styles.row}
                        >

                            <View>

                                <Text
                                    style={styles.label}
                                >

                                    Seguro

                                </Text>


                                <Text
                                    style={styles.description}
                                >

                                    {
                                        selectedInsurance
                                            ? selectedInsurance.name
                                            : "Sin seguro"
                                    }

                                </Text>

                            </View>


                            <Text
                                style={styles.value}
                            >

                                ${insuranceTotal}

                            </Text>

                        </View>


                        {/* SEPARADOR */}

                        <View
                            style={styles.separator}
                        />


                        {/* TOTAL */}

                        <View
                            style={styles.totalRow}
                        >

                            <Text
                                style={styles.totalLabel}
                            >

                                Total

                            </Text>


                            <Text
                                style={styles.total}
                            >

                                ${total}

                            </Text>

                        </View>

                    </View>

                )
            }

        </AppCard>

    );

}