
export function calculateInvoiceTotal(days, vehicle, selectedInsurance) {
    const vehicleTotal = days * vehicle.price;

    const insuranceTotal = selectedInsurance?.price ?? 0;

    return vehicleTotal + insuranceTotal;
}
