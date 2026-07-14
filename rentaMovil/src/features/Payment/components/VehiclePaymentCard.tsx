import { Image, Text, View } from "react-native";

import AppCard from "../../../shared/components/appCard/AppCard";

import { useReservation } from "../../Reservation/context/ReservationContext";

import { createStyles } from "./VehiclesPaymentCard.style";

import { themes } from "../../../theme/themes";
import { useTheme } from "../../../theme/useTheme";

export default function VehiclePaymentCard() {

    const { reservation } = useReservation();

    const { themeName } = useTheme();
    const colors = themes[themeName];

    const styles = createStyles(colors);

    if (!reservation?.vehicle) {
        return null;
    }

    return (

        <AppCard>

            <Image
                source={reservation.vehicle.image}
                style={styles.image}
                resizeMode="cover"
            />

            <View style={styles.content}>

                <Text style={styles.name}>
                    {reservation.vehicle.name}
                </Text>

                <Text style={styles.price}>
                    ${reservation.vehicle.price} / día
                </Text>

            </View>

        </AppCard>

    );

}