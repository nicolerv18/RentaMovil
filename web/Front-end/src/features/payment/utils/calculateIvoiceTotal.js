
export function calculateInvoiceTotal(
    days,
    vehicle,
    selectedInsurance
) {
    const vehicleSubtotal =
        days * Number(vehicle?.price ?? 0);

    const insuranceSubtotal =
        Number(selectedInsurance?.price ?? 0);

    const totalAmount =
        vehicleSubtotal + insuranceSubtotal;

    return {
        vehicleSubtotal,
        insuranceSubtotal,
        totalAmount,
    };
}

