import './CartVehicule.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

function CartVehicule({ vehicle, rentalSearch, showActions = true }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    if (!vehicle) return null;

    const price = vehicle.dailyPrice.toLocaleString("es-CO");

    const handleContinue = () => {
        if (!showActions) return;
        navigate("/Reservation", {
            state: {
                vehicle,
                img: vehicle.imageUrl,
                name: vehicle.name,
                price,
                branch: vehicle.branchName,
                model: vehicle.modelName,
                type: vehicle.categoryName,
                engineType: vehicle.engineTypeName,
                capacity: vehicle.capacity,
                rentalSearch,
            },
        });
    };
//--/--/--/--/--------------------
//--/--/----------------------
//--/------------------------

    return (
        <div className="card-vehicule">
            <div className="car-img">
                <img src={vehicle.imageUrl} alt={vehicle.name} />
            </div>
            <div className="car-info">
                <h3>{vehicle.name}</h3>
                <p className="car-type">{vehicle.categoryName || "Categoría no disponible"}</p>

                <div className="features">
                    <p><span className='text-box'>Modelo: </span>{vehicle.modelName}</p>
                    <p><span className='text-box'>Capacidad: </span>{vehicle.capacity}</p>
                    <p><span className='text-box'>Motor: </span>{vehicle.engineTypeName || "No disponible"}</p>
                </div>

                <div className="benefits">
                    <span>✓ {vehicle.status}</span>
                    <span>{vehicle.year}</span>
                    <span>{Number(vehicle.mileage || 0).toLocaleString("es-CO")} km</span>
                </div>

                {vehicle.branchName && (
                    <div className='location-container'>
                        <div className='location-box'><p className='location-text'>✈️</p></div>
                        <div className='location-box'><p className='location-text'> {vehicle.branchName} </p></div>
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
    );
}

export default CartVehicule;