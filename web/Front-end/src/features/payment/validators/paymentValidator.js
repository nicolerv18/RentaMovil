const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
    "image/png",
    "image/jpeg",
    "application/pdf",
];

/**
 * Valida los datos necesarios para registrar
 * un comprobante de pago.
 *
 * @param {Object} data
 * @param {string|null} data.bankAccountId
 * @param {string|null} data.referenceNumber
 * @param {File|null} data.receiptFile
 * @param {number} data.reservationTotal
 *
 * @returns {{
 *     isValid: boolean,
 *     errors: Object
 * }}
 */
export function validatePayment({
    bankAccountId,
    referenceNumber,
    receiptFile,
    reservationTotal,
}) {
    const errors = {};

    /*
     * Cuenta bancaria destino
     */
    if (!bankAccountId) {
        errors.bankAccountId =
            "Debes seleccionar una cuenta bancaria destino.";
    }

    /*
     * Referencia de transferencia
     */
    if (!referenceNumber?.trim()) {
        errors.referenceNumber =
            "Debes ingresar el número de referencia de la transferencia.";
    }

    /*
     * Comprobante obligatorio
     */
    if (!receiptFile) {
        errors.receiptFile =
            "Debes adjuntar el comprobante de pago.";
    } else {
        /*
         * Formato del archivo
         */
        if (!ALLOWED_FILE_TYPES.includes(receiptFile.type)) {
            errors.receiptFile =
                "El comprobante debe estar en formato PNG, JPG, JPEG o PDF.";
        }

        /*
         * Tamaño máximo
         */
        if (receiptFile.size > MAX_FILE_SIZE) {
            errors.receiptFile =
                "El comprobante no puede superar los 10 MB.";
        }
    }

    /*
     * INV-001
     *
     * El monto del pago debe corresponder exactamente
     * al total de la reserva.
     *
     * El monto no se toma de un campo editable del usuario.
     * Se utiliza el total calculado por la reserva.
     */
    if (
        reservationTotal === null ||
        reservationTotal === undefined ||
        Number(reservationTotal) <= 0
    ) {
        errors.amount =
            "No fue posible determinar el total de la reserva.";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
}