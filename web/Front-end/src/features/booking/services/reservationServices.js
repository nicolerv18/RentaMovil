import { reservationsMock } from "../data/mocks/reservationsMocks.js";

export const getReservations = async () => {
    return Promise.resolve(reservationsMock);
};

export const cancelReservation = async (id) => {
    return Promise.resolve({
        success: true,
        id,
    });
};

export const createReservation = async (reservationRequest) => {
    console.log(
        "Simulando guardado en el servidor...",
        reservationRequest
    );

    // Devuelve la Reservation "plana" (ver types/reservation.ts:
    // reservationId a nivel raíz de la entidad), tal como la consume
    // usePaymentForm.jsx (reservationResponse.reservationId). Antes iba
    // envuelto en { success, message, data: { reservationId, ... } } y
    // reservationResponse.reservationId siempre llegaba undefined, lo que
    // hacía fallar submitPayment con "No se recibió el ID de la reserva."
    // reservationRequest ya trae status: "PENDING_PAYMENT" (ver
    // buildReservationRequest.jsx); aquí solo se agregan los campos que
    // le corresponden al backend/simulación: reservationId y reservationDate.
    return Promise.resolve({
        reservationId: crypto.randomUUID(),
        reservationDate: new Date().toISOString(),
        ...reservationRequest,
    });
};
