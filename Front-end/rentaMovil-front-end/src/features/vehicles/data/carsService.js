import { cars } from "./carsMock.js";

export const getCars = () => Promise.resolve(cars);

export const getBrands = () =>
    Promise.resolve([...new Set(cars.map(c => c.brand))]);

export const getTypes = () =>
    Promise.resolve([...new Set(cars.map(c => c.type))]);

export const getdoor = () =>
    Promise.resolve([...new Set(cars.map(c => c.door))]);

export const getcapacity = () =>
    Promise.resolve([...new Set(cars.map(c => c.capacity))]);

export const getBeneficios = () =>
    Promise.resolve(
        [...new Set(cars.flatMap(c => c.beneficios))]
    );

export const getModels = () =>
    Promise.resolve(
        [...new Set(cars.map(c => c.model))].sort()
    );

export const getPrices = () =>
    Promise.resolve({
        min: Math.min(...cars.map(c => c.price)),
        max: Math.max(...cars.map(c => c.price))
    });