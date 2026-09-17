import style from "./VehicleCard.module.css";

function VehicleCard({ vehicles, selectedVehicle, onSelect, emptyMessage }) {

    return (
        <>
            
            <div className={style['vehicle-list']}>
                {vehicles.length > 0 ? (
                    vehicles.map((vehicle, index) => (
                        <button
                            key={`${vehicle.id}-${vehicle.plate}-${index}`}
                            type="button"
                            className={`${style['vehicle-card']} ${selectedVehicle?.id === vehicle.id ? style['vehicle-card--active'] : ''}`}
                            onClick={() => onSelect(vehicle)}
                        >
                            <div className={style['vehicle-card-top']}>
                                <strong>{vehicle.plate}</strong>
                                <span className={`${style['vehicle-state']} ${style[vehicle.status.replace(' ', '-').toLowerCase()]}`}>
                                    <span className={style['state-dot']} />
                                    {vehicle.status}
                                </span>
                            </div>
                            <img src={vehicle.image} alt={vehicle.modelName} />
                            <p>{vehicle.modelName}</p>
                            <small>{vehicle.brandName} • {vehicle.year}</small>
                        </button>
                    ))
                ) : (
                    <p className={style['vehicle-empty']}>{emptyMessage}</p>
                )}
            </div>
        </>
    )
}
export default VehicleCard;