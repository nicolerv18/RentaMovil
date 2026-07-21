import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";

import { DriverData } from "../types/driver";
import { PaymentMethod, PaymentRequest, PaymentResponse } from "../types/payment";
import { createPayment } from "../services/paymentServices";


type PaymentStatus =
| "IDLE"
    | "PENDING"
    | "APPROVED"
    | "DECLINED"
    | "CANCELLED";



type PaymentContextType = {

    driver: DriverData | null;

    setDriver: (
        driver: DriverData
    ) => void;


    selectedPaymentMethod: PaymentMethod | null;

    setSelectedPaymentMethod: (
        method: PaymentMethod | null
    ) => void;

    paymentStatus: PaymentStatus;

setPaymentStatus: (
    status: PaymentStatus
) => void;

    transactionId: string | null;

setTransactionId: (
    id: string | null
) => void;

processPayment: (
    data: PaymentRequest
) => Promise<PaymentResponse>;

    clearPayment: () => void;

};


const PaymentContext =
createContext<PaymentContextType | null>(null);



type Props = {
    children: ReactNode;
};



export function PaymentProvider({
children,
}: Props){


const [driver,setDriver] =
useState<DriverData | null>(null);




const [
    selectedPaymentMethod,
    setSelectedPaymentMethod
] =
useState<PaymentMethod | null>(null);



function clearPayment() {

    setDriver(null);

    setSelectedPaymentMethod(null);

    setTransactionId(null);

}


const [
    paymentStatus,
    setPaymentStatus
] =
    useState<PaymentStatus>("IDLE");

const [
    transactionId,
    setTransactionId
] =
    useState<string | null>(null);


async function processPayment(
    data: PaymentRequest
): Promise<PaymentResponse> {

    setPaymentStatus("PENDING");


    try {

        const response =
            await createPayment(data);


        setTransactionId(
            response.transactionId
        );


        setPaymentStatus(
            response.status
        );


        return response;


    } catch (error) {

        setPaymentStatus(
            "DECLINED"
        );


        throw error;

    }

}

return(

<PaymentContext.Provider


value={{

    driver,

    setDriver,

    selectedPaymentMethod,

    setSelectedPaymentMethod,

    paymentStatus,

setPaymentStatus,

transactionId,
 setTransactionId,

 processPayment,

    clearPayment,

}}

>

{children}

</PaymentContext.Provider>

);

}



export function usePayment(){

const context =
useContext(PaymentContext);


if(!context){

throw new Error(
"usePayment debe utilizarse dentro de PaymentProvider"
);

}


return context;

}