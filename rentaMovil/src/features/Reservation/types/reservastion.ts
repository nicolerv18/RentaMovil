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