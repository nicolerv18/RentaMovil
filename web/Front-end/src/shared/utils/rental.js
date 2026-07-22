export const calculateRentalDays = (pickupDate, returnDate) => {
  if (!pickupDate || !returnDate) return 0;

  const start = new Date(pickupDate);
  const end = new Date(returnDate);

  const difference = end - start;

  return Math.ceil(difference / (1000 * 60 * 60 * 24)) + 1;
};

export const calculateTotal = (pickupDate, returnDate, pricePerDay) => {
  const days = calculateRentalDays(pickupDate, returnDate);

  return days * pricePerDay;
};