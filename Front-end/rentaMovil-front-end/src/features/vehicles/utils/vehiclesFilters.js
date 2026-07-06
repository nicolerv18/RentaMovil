export const filterVehicles = (
        cars,{
            brand,
            type,
            model,
            price,
        }
    ) => {
        return cars
        .filter((car) =>
        brand
            ? car.brand === brand
            : true
        )
        .filter((car) =>
        type
            ? car.type === type
            : true
        )
        .filter((car) =>
        model
            ? car.model >= model.min &&
            car.model <= model.max
            : true
        )
        .filter((car) =>
        price
            ? car.price >= price.min &&
            car.price <= price.max
            : true
        );
    };