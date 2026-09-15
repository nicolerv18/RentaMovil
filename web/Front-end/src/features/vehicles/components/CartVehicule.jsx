import './CartVehicule.css'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { brandsMock } from "../data/mocks/brand.js";
import { categoriesMock } from "../data/mocks/category.js";
import { engineTypesMock } from "../data/mocks/engine_type.js";
import { vehicleModelsMock } from "../data/mocks/vehicle_model.js";
import { branches } from "../../../shared/mocks/branches.js";


function CartVehicule({
    vehicle,
    rentalSearch,
    showActions = true,
}){
    const {t} = useTranslation();
    const navigate = useNavigate();

    if (!vehicle) return null;

    const model = vehicleModelsMock.find(({ model_id }) => model_id === vehicle.model_id);
    const brand = brandsMock.find(({ brand_id }) => brand_id === model?.brand_id);
    const category = categoriesMock.find(({ category_id }) => category_id === vehicle.category_id);
    const engineType = engineTypesMock.find(({ engine_type_id }) => engine_type_id === vehicle.engine_type_id);
    const branch = branches.find(({ id }) => id === vehicle.branch_id);
    const name = [brand?.name, model?.name].filter(Boolean).join(" ") || `Vehículo ${vehicle.vehicle_id}`;
    const type = category?.name || "Categoría no disponible";
    const price = Number(vehicle.daily_price || 0).toLocaleString("es-CO");
    const image = vehicle.image_url;

    const handleContinue = () => {
        if (!showActions) return;
        navigate("/Reservation", {
            state: {
                vehicle,
                img: image,
                name,
                price,
                branch,
                model: model?.name || `Modelo ${vehicle.model_id}`,
                type,
                engineType: engineType?.name,
                capacity: vehicle.capacity,
                rentalSearch,
            },
        });
    };

    return(
<div className="card-vehicule">
    <div className="car-img">
        <img src={image} alt={name} />
    </div>
    <div className="car-info">
        <h3>{name}</h3>
        <p className="car-type">{type}</p>

        <div className="features">
            <p><span className='text-box'>Modelo: </span>{model?.name || `Modelo ${vehicle.model_id}`}</p>
            <p><span className='text-box'>Capacidad: </span>{vehicle.capacity}</p>
            <p><span className='text-box'>Motor: </span>{engineType?.name || "No disponible"}</p>
        </div>

        <div className="benefits">
            <span>✓ {vehicle.status}</span>
            <span>{vehicle.year}</span>
            <span>{vehicle.mileage.toLocaleString("es-CO")} km</span>
        </div>

        {branch?.name && (
            <div className='location-container'>
                <div className='location-box'>
                    <p className='location-text'>✈️</p>
                </div>
                <div className='location-box'>
                    <p className='location-text'> {branch.name} </p>
                </div>
            </div>
        )}
    </div>
    <div className="car-price">
        <p className="price">${price}</p>
        <span className="free">{t('cartVehicule.cancellation')}</span>

        {showActions && (
            <button type="button" onClick={handleContinue}>{t('cartVehicule.continue')}</button>
        )}
    </div>

</div>
    )
}
export default CartVehicule;
