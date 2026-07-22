import { Reservation } from "../../../Reservation/types/reservastion";

import { Vehicle } from "../../../../types/vehicles";


const vehicle: Vehicle = {

    id: 1,

    name:
        "Toyota Corolla",

    brand:
        "Toyota",

    model:
        "Corolla",

    category:
        "Sedán",

    transmission:
        "Automática",

    fuelType:
        "Gasolina",

    price:
        150000,

    image:
        require("../../../../assets/img/car1.jpg"),

    branch: {

        id: 1,

        name:
            "Sucursal Principal",

    },

    seats:
        5,

    bags:
        2,

    reservations:
        [],

    benefits: [

        "Aire acondicionado",

        "Bluetooth",

    ],

};


export const reservationsMock: Reservation[] = [

    {

        id:
            "mock-reservation-123",

        vehicle,

        pickupBranch: {

            id: 1,

            name:
                "Sucursal Principal",

        },

        returnBranch: {

            id: 1,

            name:
                "Sucursal Principal",

        },

        pickupDate:
            "2026-07-19T18:22:30.663Z",

        returnDate:
            "2026-07-20T18:22:30.663Z",

        insuranceId:
            1,

        paymentMethodId:
            1,

        amount:
            150000,

        status:
            "CONFIRMED",

    },

];