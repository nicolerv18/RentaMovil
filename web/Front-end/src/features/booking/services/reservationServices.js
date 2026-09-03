import { reservationsMock } from "../data/mocks/reservationsMocks.js";

// 🟢 Mantiene tus funciones existentes
export const getReservations = async () => {
    return Promise.resolve(reservationsMock);
};

export const cancelReservation = async (id) => {
    return Promise.resolve({
        success: true,
        id,
    });
};

// 🟢 SOLUCIÓN: Agregamos la función que le falta a tu formulario de pago
export const createReservation = async (reservationRequest) => {
    console.log("Simulando guardado en el servidor...", reservationRequest);
    
    // Retornamos una respuesta simulada exitosa idéntica a la que espera tu backend
    return Promise.resolve({
        success: true,
        message: "Reserva creada con éxito",
        data: reservationRequest
    });
};
