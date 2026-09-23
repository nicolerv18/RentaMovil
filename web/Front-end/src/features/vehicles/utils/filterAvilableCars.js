import { isAvailable } from "./isAvailable.js";
import { filterAvailableByBranch } from "./vehiclesFilters.js";



export function filterAvailableVehicles(cars, branch, startDate, endDate) {
    return filterAvailableByBranch(cars, branch);
}