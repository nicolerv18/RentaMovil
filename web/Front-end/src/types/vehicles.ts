import { Branch } from "../types/branch";

  export type Reservation = {
    startDate: Date;
    endDate: Date;
  };

  export type Vehicle = {
    id: number;

    name: string;
    brand: string;
    model: string;

    category: string;
    transmission: string;
    fuelType: string;

    price: number;

    image: string;

    branch: Branch;

    seats: number;
    bags: number;

    reservations: Reservation[];

    benefits: string[];
  };