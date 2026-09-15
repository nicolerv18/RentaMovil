import { isAvailable } from "./isAvailable.js";

export const filterAvailableVehicles = (
    cars,
    branch,
    startDate,
    endDate
) => {
    return cars.filter(
        (car) =>
            car.branch_id === branch.id &&
            isAvailable(car, startDate, endDate)
    );
};