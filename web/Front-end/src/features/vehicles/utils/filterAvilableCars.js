    import { isAvailable } from "./isAvailable";

    export const filterAvailableVehicles = (
    cars,
    branch,
    startDate,
    endDate
    ) => {
    return cars.filter(
        (car) =>
        car.branch.id === branch.id &&
        isAvailable(car, startDate, endDate)
    );
    };