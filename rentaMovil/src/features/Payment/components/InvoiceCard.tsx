import { Text, View } from "react-native";

import { useReservation } from "../../Reservation/context/ReservationContext";

import { calculateDays } from "../utils/calculateDays";


export default function InvoiceCard(){

    const { reservation } =
        useReservation();


    if(!reservation?.vehicle){
        return null;
    }


    const vehicle =
        reservation.vehicle;


    const days =
        calculateDays(
            reservation.pickupDate,
            reservation.returnDate
        );


    const total =
        days * vehicle.price;



    return (

        <View>

            <Text>
                Factura
            </Text>


            <Text>
                Vehículo:
                {vehicle.name}
            </Text>


            <Text>
                Precio por día:
                ${vehicle.price}
            </Text>


            <Text>
                Días:
                {days}
            </Text>


            <Text>
                Total:
                ${total}
            </Text>

        </View>

    );

}