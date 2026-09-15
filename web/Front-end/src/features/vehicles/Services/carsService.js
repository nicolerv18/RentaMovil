import { cars } from "../data/mocks/carsMock.js";
import { brandsMock } from "../data/mocks/brand.js";
import { vehicleModelsMock } from "../data/mocks/vehicle_model.js";
import { categoriesMock } from "../data/mocks/category.js";
import { engineTypesMock } from "../data/mocks/engine_type.js";

// Obtener todos los vehículos
export const getCars = () => Promise.resolve(cars);


// Obtener marcas disponibles
export const getBrands = () =>
    Promise.resolve(
        [
            ...new Set(
                cars
                    .map((car) => {
                        const model = vehicleModelsMock.find(
                            (m) => m.model_id === car.model_id
                        );

                        const brand = brandsMock.find(
                            (b) => b.brand_id === model?.brand_id
                        );

                        return brand?.name;
                    })
                    .filter(Boolean)
            ),
        ]
    );


// Obtener categorías disponibles
export const getTypes = () =>
    Promise.resolve(
        [
            ...new Set(
                cars
                    .map((car) => {
                        const category = categoriesMock.find(
                            (c) => c.category_id === car.category_id
                        );

                        return category?.name;
                    })
                    .filter(Boolean)
            ),
        ]
    );


// Obtener capacidades disponibles
export const getcapacity = () =>
    Promise.resolve(
        [...new Set(cars.map((car) => car.capacity))]
            .filter((capacity) => capacity !== undefined)
            .sort((a, b) => a - b)
    );


// Obtener tipos de motor disponibles
export const getEngineTypes = () =>
    Promise.resolve(
        [
            ...new Set(
                cars
                    .map((car) => {
                        const engineType = engineTypesMock.find(
                            (e) =>
                                e.engine_type_id === car.engine_type_id
                        );

                        return engineType?.name;
                    })
                    .filter(Boolean)
            ),
        ]
    );


// Obtener modelos disponibles
export const getModels = () =>
    Promise.resolve(
        [
            ...new Set(
                cars
                    .map((car) => {
                        const model = vehicleModelsMock.find(
                            (m) => m.model_id === car.model_id
                        );

                        return model?.name;
                    })
                    .filter(Boolean)
            ),
        ].sort()
    );


// Obtener precios
export const getPrices = () =>
    Promise.resolve({
        min: Math.min(
            ...cars.map((car) => Number(car.daily_price))
        ),
        max: Math.max(
            ...cars.map((car) => Number(car.daily_price))
        ),
    });