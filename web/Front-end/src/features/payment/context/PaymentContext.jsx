    import { createContext, useContext, useState } from "react";
    import { createPayment } from "../services/PaymentServices";

    const PaymentContext = createContext(null);

    export function PaymentProvider({ children }) {
    const [driver, setDriver] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState("IDLE");
    const [transactionId, setTransactionId] = useState(null);

    const clearPayment = () => {
        setDriver(null);
        setSelectedPaymentMethod(null);
        setPaymentStatus("IDLE");
        setTransactionId(null);
    };

    const processPayment = async (paymentData) => {
        setPaymentStatus("PENDING");

        try {
        const response = await createPayment(paymentData);

        setPaymentStatus(response.status);
        setTransactionId(response.transactionId ?? response.paymentId ?? null);

        return response;
        } catch (error) {
        setPaymentStatus("DECLINED");
        throw error;
        }
    };

    return (
        <PaymentContext.Provider
        value={{
            driver,
            setDriver,
            selectedPaymentMethod,
            setSelectedPaymentMethod,
            paymentStatus,
            transactionId,
            processPayment,
            clearPayment,
        }}
        >
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