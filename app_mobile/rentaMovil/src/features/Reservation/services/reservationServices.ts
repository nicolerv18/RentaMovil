import {
    Reservation,
    ReservationResponse,
    ReservationRequest,
} from "../types/reservastion";

import {
    reservationsMock,
} from "../data/mocks/reservationMock";


export async function createReservation(
    data: ReservationRequest
): Promise<ReservationResponse> {

    console.log(
        "Creando reserva:",
        data
    );

    // Futuro:
    // return api.post(
    //     "/reservations",
    //     data
    // );

    return {

        reservationId:
            "mock-reservation-123",

        status:
            "CONFIRMED",

    };

}


export async function getMyReservations():
    Promise<Reservation[]> {

    return reservationsMock;

}


export async function getReservationById(
    id: string
): Promise<Reservation | undefined> {

    console.log(
        "Buscando reserva:",
        id
    );

    // Futuro:
    // return api.get(
    //     `/reservations/${id}`
    // );

    return reservationsMock.find(
        reservation =>
            reservation.id === id
    );

}


export async function cancelReservation(
    id: string
): Promise<Reservation | undefined> {

    console.log(
        "Cancelando reserva:",
        id
    );

    // Futuro:
    // return api.patch(
    //     `/reservations/${id}/cancel`
    // );

    const reservation =
        reservationsMock.find(
            reservation =>
                reservation.id === id
        );

    if (!reservation) {

        return undefined;

    }

    reservation.status = "CANCELLED";

    return reservation;

}