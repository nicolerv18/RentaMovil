export type PaymentMethod = {
    id: number;
    name: string;
    description: string;
    enabled: boolean;
};


export type PaymentRequest = {

    reservationId?: string;

    amount: number;

    paymentMethodId: number;

};
