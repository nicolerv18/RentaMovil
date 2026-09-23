import {
    createContext,
    useContext,
    useState,
    useMemo,
} from "react";

/**
 * @typedef {import("../../../types/payment").Payment} Payment
 * @typedef {import("../../../types/payment").PaymentStatus} PaymentStatus
 */

/**
 * Draft temporal del pago mientras el usuario
 * completa el proceso de transferencia.
 *
 * El cliente registra:
 * - cuenta bancaria destino
 * - número de referencia
 * - comprobante de pago
 *
 * El monto NO se almacena aquí porque debe provenir
 * de la reserva.
 *
 * reviewedBy, reviewedAt y rejectionReason pertenecen
 * al proceso administrativo.
 *
 * Flujo:
 *
 * Reservation
 *     ↓
 * PENDING_PAYMENT
 *     ↓
 * Cliente registra transferencia
 *     ↓
 * Cliente adjunta comprobante
 *     ↓
 * Envío del pago
 *     ↓
 * PENDING_REVIEW
 *     ↓
 * Admin revisa
 *     ↓
 * APPROVED / REJECTED
 *
 * @typedef {Object} PaymentDraft
 * @property {string|null} bankAccountId
 * @property {string|null} referenceNumber
 * @property {File|null} receiptFile
 * @property {PaymentStatus|null} status
 */

const PaymentContext = createContext(null);

export function PaymentProvider({ children }) {
    /** @type {[PaymentDraft, Function]} */
    const [payment, setPayment] = useState({
        bankAccountId: null,
        referenceNumber: null,
        receiptFile: null,
        status: null,
    });

    /**
     * Actualiza parcialmente el borrador del pago.
     */
    function updatePayment(data) {
        setPayment((previous) => ({
            ...previous,
            ...data,
        }));
    }

    /**
     * Guarda temporalmente el comprobante seleccionado.
     *
     * IMPORTANTE:
     * Seleccionar un archivo todavía NO significa que
     * el pago haya sido enviado ni que esté PENDING_REVIEW.
     */
    function setReceiptFile(receiptFile) {
        setPayment((previous) => ({
            ...previous,
            receiptFile,
        }));
    }

    /**
     * Registra que el pago fue enviado para revisión.
     *
     * Esta función será utilizada por el flujo de envío,
     * después de pasar las validaciones correspondientes.
     */
    function markAsPendingReview() {
        setPayment((previous) => ({
            ...previous,
            status: "PENDING_REVIEW",
        }));
    }

    /**
     * Limpia el borrador del pago.
     */
    function clearPayment() {
        setPayment({
            bankAccountId: null,
            referenceNumber: null,
            receiptFile: null,
            status: null,
        });
    }

    const contextValue = useMemo(
        () => ({
            payment,
            updatePayment,
            setReceiptFile,
            markAsPendingReview,
            clearPayment,
        }),
        [payment]
    );

    return (
        <PaymentContext.Provider value={contextValue}>
            {children}
        </PaymentContext.Provider>
    );
}

export function usePayment() {
    const context = useContext(PaymentContext);

    if (!context) {
        throw new Error(
            "usePayment debe utilizarse dentro de PaymentProvider"
        );
    }

    return context;
}