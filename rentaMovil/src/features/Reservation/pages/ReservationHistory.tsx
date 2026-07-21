import {
    ScrollView,
    Text,
    View,
} from "react-native";

import {
    useEffect,
    useState,
} from "react";

import {
    getMyReservations,
} from "../services/reservationServices";

import {
    Reservation,
} from "../types/reservastion";

import ReservationCard from "../components/History/card";


export default function ReservationHistoryScreen() {


    const [

        reservations,

        setReservations,

    ] = useState<Reservation[]>([]);


    const [

        loading,

        setLoading,

    ] = useState(true);


    useEffect(() => {


        async function loadReservations() {


            try {


                const data =

                    await getMyReservations();


                setReservations(data);


            } catch (error) {


                console.log(

                    "Error cargando reservas:",

                    error

                );


            } finally {


                setLoading(false);


            }


        }


        loadReservations();


    }, []);


    if (loading) {


        return (


            <View>


                <Text>

                    Cargando reservas...

                </Text>


            </View>


        );


    }


    return (


        <ScrollView>


            <Text>

                Mis reservas

            </Text>


            {

                reservations.length === 0 ? (


                    <Text>

                        No tienes reservas todavía.

                    </Text>


                ) : (


reservations.map(

    reservation => (

        <ReservationCard

            key={reservation.id}

            reservation={reservation}

        />

    )

)

                )

            }


        </ScrollView>

    );

}