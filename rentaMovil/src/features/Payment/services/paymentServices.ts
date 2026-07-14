import { PaymentRequest } from "../types/payment";


export async function createPayment(
    data: PaymentRequest
){

    console.log(
        "Procesando pago",
        data
    );


    // futuro:
    // return api.post("/payments", data);


    return {
        success:true
    };

}