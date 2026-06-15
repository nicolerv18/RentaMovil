export type Reservation = {
    startDate: string;
    endDate: string;
    };

    export type Vehicle = {
    id: number;

    name: string;
    brand: string;
    model: string;
    type: string;

    price: number;

    image: any;

    branch: string;

    seats: number;
    bags: number;

    transmission: string;

    reservas: Reservation[];

    benefits: string[];
    };