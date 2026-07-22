export const createPayment = async (paymentData) => {

  console.log("Enviando al backend:", paymentData);

  return new Promise((resolve) => {

    setTimeout(() => {

      resolve({
        success: true,
        reservationId: "RES-2026-001",
        paymentId: "PAY-99123",
        status: "approved",
      });

    }, 2000);

  });

};