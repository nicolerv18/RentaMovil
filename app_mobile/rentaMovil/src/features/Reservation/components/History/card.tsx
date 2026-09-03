import {
    Text,
    View,
} from "react-native";

import {
    Reservation,
} from "../../types/reservastion"

import {
    themes,
} from "../../../../theme/themes";

import {
    useTheme,
} from "../../../../theme/useTheme";

import {
    createStyles,
} from "./ReservationCard.style";


type Props = {

    reservation: Reservation;

};


export default function ReservationCard({

    reservation,

}: Props) {


    const {
        themeName,
    } = useTheme();


    const colors =
        themes[themeName];


    const styles =
        createStyles(colors);


    return (

        <View
            style={styles.card}
        >

            <View
                style={styles.header}
            >

                <Text
                    style={styles.vehicleName}
                >

                    {
                        reservation
                            .vehicle
                            .name
                    }

                </Text>


                <Text style={[styles.status, reservation.status === "CANCELLED" && styles.cancelledStatus, reservation.status === "COMPLETED" && styles.completedStatus]}>

                    {
                        reservation
                            .status
                    }

                </Text>

            </View>


            <View
                style={styles.divider}
            />


            <View
                style={styles.row}
            >

                <Text
                    style={styles.label}
                >

                    Recogida

                </Text>


                <Text
                    style={styles.value}
                >

                    {
                        reservation
                            .pickupBranch
                            .name
                    }

                </Text>

            </View>


            <View
                style={styles.row}
            >

                <Text
                    style={styles.label}
                >

                    Devolución

                </Text>


                <Text
                    style={styles.value}
                >

                    {
                        reservation
                            .returnBranch
                            .name
                    }

                </Text>

            </View>


            <View
                style={styles.totalContainer}
            >

                <Text
                    style={styles.totalLabel}
                >

                    Total

                </Text>


                <Text
                    style={styles.total}
                >

                    ${reservation.amount}

                </Text>

            </View>

        </View>

    );

}
