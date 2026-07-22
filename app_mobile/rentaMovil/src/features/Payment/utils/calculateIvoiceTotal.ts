import { Insurance } from "../../Insurance/type/insurance";
import { Vehicle } from "../../../types/vehicles";

export function calculateInvoiceTotal(
    days: number,
    vehicle: Vehicle,
    selectedInsurance: Insurance | undefined
): number {

    const vehicleTotal =
        days * vehicle.price;


    const insuranceTotal =
        selectedInsurance?.price ?? 0;


    return vehicleTotal + insuranceTotal;

}