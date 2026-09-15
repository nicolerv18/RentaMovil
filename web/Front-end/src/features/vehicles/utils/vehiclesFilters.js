import { brandsMock } from "../data/mocks/brand.js";
import { vehicleModelsMock } from "../data/mocks/vehicle_model.js";
import { categoriesMock } from "../data/mocks/category.js";
import { engineTypesMock } from "../data/mocks/engine_type.js";

export const filterVehicles = (
    cars,
    {
        brand,
        type,
        category,
        model,
        price,
    }
) => {
    return cars
        .filter((car) => {
            if (!brand) return true;

            const vehicleModel = vehicleModelsMock.find(
                (item) => item.model_id === car.model_id
            );

            const vehicleBrand = brandsMock.find(
                (item) => item.brand_id === vehicleModel?.brand_id
            );

            return vehicleBrand?.name === brand;
        })

        .filter((car) => {
            if (!type) return true;

            const engineType = engineTypesMock.find(
                (item) => String(item.engine_type_id) === String(car.engine_type_id)
            );

            return engineType?.name === type;
        })

        .filter((car) => {
            if (!category) return true;

            const vehicleCategory = categoriesMock.find(
                (item) => String(item.category_id) === String(car.category_id)
            );

            return vehicleCategory?.name === category;
        })

        .filter((car) => {
            if (!model) return true;

            const vehicleModel = vehicleModelsMock.find(
                (item) => item.model_id === car.model_id
            );

            return vehicleModel?.name === model;
        })

        .filter((car) =>
            price
                ? Number(car.daily_price) >= Number(price.min) &&
                    Number(car.daily_price) <= Number(price.max)
                : true
        );
};
