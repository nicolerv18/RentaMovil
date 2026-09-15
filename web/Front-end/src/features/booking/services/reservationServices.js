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