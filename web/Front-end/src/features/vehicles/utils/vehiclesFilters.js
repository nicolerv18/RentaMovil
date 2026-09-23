export const filterVehicles = (cars, { brand, type, category, model, price }) => {
    return cars
        .filter((car) => (!brand ? true : car.brandName === brand))
        .filter((car) => (!type ? true : car.engineTypeName === type))
        .filter((car) => (!category ? true : car.categoryName === category))
        .filter((car) => (!model ? true : car.modelName === model))
        .filter((car) =>
            price ? car.dailyPrice >= price.min && car.dailyPrice <= price.max : true
        );
};