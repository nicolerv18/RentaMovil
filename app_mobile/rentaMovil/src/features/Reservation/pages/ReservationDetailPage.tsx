import {
    ScrollView,
    Text,
    View,
} from "react-native";

import {
    useLocalSearchParams,
} from "expo-router";

export default function ReservationDetailPage() {

    const {
        id,
    } = useLocalSearchParams();

    return (

        <ScrollView
            contentContainerStyle={{
                padding: 20,
            }}
        >

            <Text
                style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    marginBottom: 20,
                }}
            >
                Detalle de la reserva
            </Text>

            <Text>

                Reservation ID:

                {" "}

                {id}

            </Text>

        </ScrollView>

    );

}