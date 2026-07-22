import {
Reservation,  ReservationResponse, ReservationRequest
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

Promise<Reservation[]>{
    return reservationsMock;
    
}