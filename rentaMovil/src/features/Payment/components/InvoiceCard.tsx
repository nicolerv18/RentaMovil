import { Text, View } from "react-native";

import { useReservation } from "../../Reservation/context/ReservationContext";

import { calculateDays } from "../utils/calculateDays";

import { insurance } from "../../Insurance/data/mocks/insurance";


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


    const subtotal =
        days * vehicle.price;

        const SelectInsurance =insurance.find(
            item => item.id == reservation.insuranceId
        )

        const insurancePrice =
        SelectInsurance?.price ??  0;

        const total =
        subtotal +insurancePrice;

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
                Seguro:
                {SelectInsurance?.name ?? "Sin seguro"}
            </Text>

            <Text>
                Valor Seguro:
                ${insurancePrice}
            </Text>

            <Text>
                Total:
                ${total}
            </Text>

        </View>

    );

}