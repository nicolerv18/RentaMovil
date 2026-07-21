import {
    PaymentRequest,
    PaymentResponse,
} from "../types/payment";


export async function createPayment(
    data: PaymentRequest
): Promise<PaymentResponse> {

    console.log(
        "Procesando pago",
        data
    );


    // Futuro:

    // return api.post(
    //     "/payments",
    //     data
    // );


    return {

        transactionId:
            "mock-transaction-123",

        status:
            "APPROVED",

    };

}