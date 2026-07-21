import { Branch } from "../../../types/branch";
import { Vehicle } from "../../../types/vehicles";


export type ReservationDraft = {

    vehicle: Vehicle | null;

    pickupBranch: Branch | null;

    returnBranch: Branch | null;

    pickupDate: Date | null;

    returnDate: Date | null;

    insuranceId: number | null;

};


export type ReservationRequest = {

    vehicleId: number;

    pickupBranchId: number;

    returnBranchId: number;

    pickupDate: string;

    returnDate: string;

    insuranceId: number | null;

    paymentMethodId: number;

    amount: number;

    transactionId: string;

};


export type ReservationResponse = {

    reservationId: string;
    status : ReservationStatus;

};


export type ReservationStatus =
          | "PENDING"
          | "CONFIRMED"
          |"COMPLETED"
          | "CANCELLED";


export type Reservation = {

    id: string;

    vehicle: Vehicle;

    pickupBranch: Branch;

    returnBranch: Branch;

    pickupDate: string;

    returnDate: string;

    insuranceId: number | null;

    paymentMethodId: number;

    amount: number;

    status: ReservationStatus;

};