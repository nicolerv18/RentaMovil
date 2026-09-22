/**
 * Crea un Payment asociado a una Reservation.
 *
 * SIMULACIÓN — todavía no existe backend (POST /api/payments, ver
 * Documentacion/FEATURE_PAYMENT_FLOW.md). Esta función respeta el mismo
 * contrato de entrada/salida que tendrá la llamada real, para que
 * conectarla más adelante sea solo reemplazar el cuerpo por un fetch/axios,
 * sin tocar quien la consume (usePaymentForm.jsx).
 *
 * Entrada (paymentData):
 *   { reservationId, bankAccountId, amount, referenceNumber, receiptFile }
 *
 * Salida — entidad Payment (ver types/payment.ts):
 *   { paymentId, reservationId, bankAccountId, paymentDate, amount,
 *     referenceNumber, receiptFileUrl, status: "PENDING_REVIEW" }
 *
 * El frontend NO aprueba ni rechaza el pago (INV-004: no hay pasarela de
 * pago automática, es transferencia manual + revisión de un Admin). El
 * backend real será quien determine APPROVED/REJECTED más adelante; por
 * ahora se simula devolviendo siempre PENDING_REVIEW, que es el único
 * estado que le corresponde a esta acción del cliente.
 */
export const createPayment = async (paymentData) => {
    console.log("Simulando registro de pago...", paymentData);

    if (!paymentData?.reservationId) {
        throw new Error(
            "Falta el ID de la reserva para registrar el pago."
        );
    }

    if (!paymentData?.bankAccountId) {
        throw new Error(
            "Falta la cuenta bancaria destino del pago."
        );
    }

    if (!paymentData?.receiptFile) {
        throw new Error(
            "Falta el comprobante de pago."
        );
    }

    // TODO backend real:
    // Subir paymentData.receiptFile (multipart/form-data) a
    // almacenamiento (S3/MinIO) y usar la URL que devuelva el servidor
    // como receiptFileUrl. Mientras tanto se simula con un object URL
    // local (solo válido en esta pestaña, no persiste ni es accesible
    // desde otro dispositivo).
    const receiptFileUrl = URL.createObjectURL(
        paymentData.receiptFile
    );

    return Promise.resolve({
        paymentId: crypto.randomUUID(),
        reservationId: paymentData.reservationId,
        bankAccountId: paymentData.bankAccountId,
        paymentDate: new Date().toISOString(),
        amount: paymentData.amount,
        referenceNumber: paymentData.referenceNumber ?? null,
        receiptFileUrl,
        status: "PENDING_REVIEW",
    });
};