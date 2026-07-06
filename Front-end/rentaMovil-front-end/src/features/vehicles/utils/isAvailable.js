    export const isAvailable = (car, start, end) => {
    return !car.reservas.some(
        (reservation) =>
        start <= reservation.end &&
        end >= reservation.start
    );
    };