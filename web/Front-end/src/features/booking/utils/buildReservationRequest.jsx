// @ts-nocheck
export function buildReservationRequest(
    reservation,
    driver,
    paymentMethod,
    amount,
    transactionId
) {
    if (
        !reservation.vehicle ||
        !reservation.pickupBranch ||
        !reservation.returnBranch ||
        !reservation.pickupDate ||
        !reservation.returnDate
    ) {
        throw new Error("La reserva está incompleta");
    }

    return {
        vehicleId: reservation.vehicle.id,
        pickupBranchId: reservation.pickupBranch.id,
        returnBranchId: reservation.returnBranch.id,
        pickupDate: reservation.pickupDate.toISOString(),
        returnDate: reservation.returnDate.toISOString(),
        insuranceId: reservation.insuranceId,
        paymentMethodId: paymentMethod.id,
        amount,
        transactionId,
    };
}
