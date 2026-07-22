import { ScrollView } from "react-native";

import VehiclePaymentCard from "../components/VehiclePaymentCard";
import DriverInfoCard from "../components/DriverInfoCard";
import InvoiceCard from "../components/InvoiceCard";

import { useReservation } from "../../Reservation/context/ReservationContext";

import { calculateInvoiceTotal } from "../utils/calculateIvoiceTotal";

import PaymentMethodSelector from "../components/PaymentMethodSelector";

import { calculateDays } from "../utils/calculateDays";

import ContinueButton from "../../../shared/components/button/ContinueButton";

import { insurance } from "../../Insurance/data/mocks/insurance";

import { usePayment } from "../context/PaymentContext";

import { buildReservationRequest } from "../../Reservation/utils/buildReservationRequest";

import { createReservation } from "../../Reservation/services/reservationServices";


export default function PaymentPage() {


    const {

        driver,

        selectedPaymentMethod,

        processPayment,

    } = usePayment();


    const {

        reservation

    } = useReservation();


    const canReserve =

        !!driver?.email &&

        !!driver?.name.trim() &&

        !!driver?.phone.trim() &&

        !!selectedPaymentMethod;


    const vehicle =

        reservation?.vehicle;


    const days =

        reservation?.pickupDate &&

        reservation?.returnDate

            ? calculateDays(

                reservation.pickupDate,

                reservation.returnDate

            )

            : 0;


    const selectedInsurance =

        insurance.find(

            item =>

                item.id ===

                reservation?.insuranceId

        );


    const total =

        vehicle && days > 0

            ? calculateInvoiceTotal(

                days,

                vehicle,

                selectedInsurance

            )

            : 0;


    async function handlePayment() {


        if (!canReserve) return;


        try {


            const response =

                await processPayment({


                    amount: total,


                    paymentMethodId:

                        selectedPaymentMethod.id,


                });


            if (

                response.status !==

                "APPROVED"

            ) {


                console.log(

                    "El pago no fue aprobado"

                );


                return;


            }


            if (

                !reservation ||

                !driver ||

                !selectedPaymentMethod

            ) {


                return;


            }


            const reservationRequest =

                buildReservationRequest(


                    reservation,


                    driver,


                    selectedPaymentMethod,


                    total,


                    response.transactionId


                );


            const reservationResponse =

                await createReservation(

                    reservationRequest

                );


            console.log(

                "Reserva creada:",

                reservationResponse

            );


        } catch (error) {


            console.log(

                "Error en el proceso:",

                error

            );


        }


    }


    return (


        <ScrollView>


            <VehiclePaymentCard />


            <DriverInfoCard />


            <InvoiceCard />


            <PaymentMethodSelector />


            <ContinueButton


                title="Reservar"


                onPress={

                    handlePayment

                }


            />


        </ScrollView>


    );


}