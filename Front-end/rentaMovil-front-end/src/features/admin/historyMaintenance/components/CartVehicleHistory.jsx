import carImg from "../../../../assets/carro.png";
import { useTranslation } from "react-i18next";
import statusStyle from '../../historyMaintenance/components/CartVehicleHistory.module.css';

function CartVehicleHistory({ record = {}, onViewMore }) {
    const { t } = useTranslation();
    const { location,plate, date, typeMaintenance, status, description, imageUrl: recordImg, modelName } = record;

    const stateClass = {
        'Pendiente': statusStyle['state--mantenimiento'],
        'En progreso': statusStyle['state--en-uso'],
        'Completado': statusStyle['state--disponible'],
        'Cancelado': statusStyle['state--reservado'],
    }[status] || '';

    const stateLabel = {
        'Pendiente': t("CartVehiculeMaintenance.pending"),
        'En progreso': t("CartVehiculeMaintenance.inProgress"),
        'Completado': t("CartVehiculeMaintenance.completed"),
        'Cancelado': t("CartVehiculeMaintenance.cancel"),
    }[status] || status;

    const formattedDate = date ? new Date(date).toLocaleString() : 'Sin fecha';
    const imgSrc = recordImg || carImg;

    return (
        <div className={statusStyle['card-vehicule']}>
            <div className={statusStyle['img-car-vehicule']}>
                <img src={imgSrc} alt={`${modelName || 'Vehículo'}`} />
            </div>

            <div className={statusStyle['text-vehicule']}>
                <h3 className={statusStyle['name-car-vehicule']}>
                    {modelName || 'Vehículo'}
                    {<span className={statusStyle['model-vehicule']}>{plate}</span>}
                </h3>

                {description && <p className={statusStyle['desc-vehicule']}>{description}</p>}

                <div className={statusStyle['container-info']}>
                    <div className={statusStyle['info-item']}>
                        <span className={statusStyle['info-label']}>{t("CheckStatus.modal.plate")}</span>
                        <span className={statusStyle['plate']}>{plate}</span>
                    </div>

                    {typeMaintenance && (
                        <div className={statusStyle['info-item']}>
                            <span className={statusStyle['info-label']}>{t("CartVehiculeStatus.Maintenance")}</span>
                            <span className={statusStyle['info-value']}>{typeMaintenance}</span>
                        </div>
                    )}

                    {formattedDate && (
                        <div className={statusStyle['info-item']}>
                            <span className={statusStyle['info-label']}>{t("maintenanceForm.date") || 'Fecha'}</span>
                            <span className={statusStyle['info-value']}>{formattedDate}</span>
                        </div>
                    )}

                    {location && (
                        <div className={statusStyle['info-item']}>
                            <span className={statusStyle['info-label']}>{t("CheckStatus.modal.ubication")}</span>
                            <span className={statusStyle['info-value']}>{location}</span>
                        </div>
                    )}
                </div>
            </div>

            <diclassNv ame={statusStyle['card-actions']}>
                <span className={`${statusStyle['state-badge']} ${stateClass}`}>{stateLabel}</span>
                <button className={statusStyle['btn-ver-mas']} onClick={() => onViewMore && onViewMore(record)}>
                    {t("CartVehiculeMaintenance.seeMore")}
                </button>
            </diclassNv>
        </div>
    );
}

export default CartVehicleHistory;