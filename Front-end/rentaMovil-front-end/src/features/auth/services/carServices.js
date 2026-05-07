import { carsMock } from "../data/carsMock";

export const searchCars = async ({ branch, startDate, endDate }) => {
return new Promise((resolve) => {

    const disponibles = carsMock.filter(car =>
    car.branch.name === branch
    );

    setTimeout(() => resolve(disponibles), 500);
});
};

