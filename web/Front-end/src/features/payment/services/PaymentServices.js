export const createPayment = async (paymentData) => {
  console.log("Datos del pago:", paymentData);

  // Temporalmente simulamos la respuesta del backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        paymentId: 25,
        reservationId: paymentData.reservationId,
        status: "APPROVED",
        transactionId: "TXN-928372",
      });
    }, 2000);
  });
};

//el frontend envia:reservationId: 123,paymentMethodId: 1
//y el backend responde: paymentId: 25, reservationId: 123, status: "APPROVED", transactionId: "TXN-928372"