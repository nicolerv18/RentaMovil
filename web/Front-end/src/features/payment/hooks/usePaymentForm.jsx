import { useState, useMemo } from "react";
// 🟢 CAMBIO WEB: Eliminamos la importación de 'Alert' de react-native

import { usePayment } from "../context/PaymentContext";
import { useReservation } from "../../booking/context/ReservationContext";
import { insurance } from "../../Insurance/data/mocks/insurance";
import { calculateDays } from "../utils/calculateDays";
import { calculateInvoiceTotal } from "../utils/calculateIvoiceTotal";
import { buildReservationRequest } from "../../booking/utils/buildReservationRequest";
import { createReservation } from "../../booking/services/reservationServices";

export function usePaymentForm() {
    const { driver, selectedPaymentMethod, setSelectedPaymentMethod, processPayment } = usePayment();
    const { reservation } = useReservation();
    const [isProcessing, setIsProcessing] = useState(false);

    const canReserve = useMemo(() => {
        return !!(
            driver?.email &&
            driver?.name?.trim() &&
            driver?.phone?.trim() &&
            reservation?.vehicle?.id &&
            reservation?.pickupBranch?.id &&
            reservation?.returnBranch?.id &&
            reservation?.pickupDate &&
            reservation?.returnDate &&
            selectedPaymentMethod
        );
    }, [driver, selectedPaymentMethod]);

    const days = useMemo(() => {
        return reservation?.pickupDate && reservation?.returnDate
            ? calculateDays(reservation.pickupDate, reservation.returnDate)
            : 0;
    }, [reservation?.pickupDate, reservation?.returnDate]);


    const selectedInsurance = useMemo(() => {
        return insurance.find(item => item.id === reservation?.insuranceId);
    }, [reservation?.insuranceId]);


    const total = useMemo(() => {
        const vehicle = reservation?.vehicle;
        return vehicle && days > 0
            ? calculateInvoiceTotal(days, vehicle, selectedInsurance)
            : 0;
    }, [days, reservation?.vehicle, selectedInsurance]);

    async function handlePayment() {
        if (!canReserve || isProcessing) return;

        try {
            setIsProcessing(true);
            
            const response = await processPayment({
                amount: total,
                paymentMethodId: selectedPaymentMethod.id,
            });

            if (response.status !== "APPROVED") {
                alert("Transacción Rechazada: El pago no fue aprobado por el banco.");
                return;
            }

            if (!reservation || !driver || !selectedPaymentMethod) return;

            const reservationRequest = buildReservationRequest(
                reservation,
                driver,
                selectedPaymentMethod,
                total,
                response.transactionId
            );

            const reservationResponse = await createReservation(reservationRequest);
            alert("¡Éxito! Tu vehículo ha sido reservado correctamente.");
            console.log("Reserva creada:", reservationResponse);

        } catch (error) {
            console.error("Error en el proceso:", error);
            alert("Error de Conexión: No pudimos procesar la solicitud con el servidor.");
        } finally {
            setIsProcessing(false);
        }
    }

    return {
        days,
        total,
        canReserve,
        isProcessing,
        handlePayment,
        selectedPaymentMethod,
        setSelectedPaymentMethod
    };
}
