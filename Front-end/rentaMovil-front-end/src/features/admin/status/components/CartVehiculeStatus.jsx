
import { useTranslation } from "react-i18next";
import style from '../components/CartVehiculeStatus.module.css'
function CardVehiculeStatus({ brandName, modelName,age, plate, dailyPrice, mileage, engineTypeName, branchName,status, imageUrl, description,onVerMas }) {
    const { t, i18n } = useTranslation();
    const fuelTypeKey = {
        gasolina: 'gasoline',
        diesel: 'diesel',
        diésel: 'diesel',
        híbrido: 'hybrid',
        hibrido: 'hybrid',
        eléctrico: 'electric',
        electrico: 'electric',
        'gas natural': 'naturalGas',
        'gas propano': 'propaneGas',
    }[String(engineTypeName || '').toLowerCase()];
    const fuelTypeLabel = fuelTypeKey
        ? t(`CheckStatus.modal.fuelOptions.${fuelTypeKey}`)
        : engineTypeName;
    const numberLocale = i18n.resolvedLanguage || i18n.language || 'es';

    // Mapeo de estilos CSS según el estado guardado en la BD
    const stateClass = {
        'Disponible':       style['state--disponible'],
        'En mantenimiento': style['state--mantenimiento'],
        'En uso':           style['state--en-uso'],
        'Reservado':        style['state--reservado'],
    }[status] || '';

    // Mapeo de internacionalización para las etiquetas de estado
    const stateLabel = {
        'Disponible':       t("CheckStatus.modal.stateOptions.available"),
        'En mantenimiento': t("CheckStatus.modal.stateOptions.maintenance"),
        'En uso':           t("CheckStatus.modal.stateOptions.inUse"),
        'Reservado':        t("CheckStatus.modal.stateOptions.reserved"),
    }[status] || status;

    return (
        <div className={style['card-vehicule']}>
            <div className={style['img-car-vehicule']}>
                <img src={imageUrl} alt={`${brandName} ${modelName || ''}`} />
            </div>

            <div className={style['text-vehicule']}>
                <h3 className={style['name-car-vehicule']}>
                    {brandName} {modelName && <span className={style['model-vehicule']}>{modelName}</span>}
                </h3>
                
                {description && <p className={style['desc-vehicule']}>{description}</p>}

                <div className={style['container-info']}>
                    <div className={style['info-item']}>
                        <span className={style['info-label']}>{t("CheckStatus.modal.plate")}</span>
                        <span className={style['plate']}>{plate}</span>
                    </div>

                    {branchName && (
                        <div className={style['info-item']}>
                            <span className={style['info-label']}>{t("CheckStatus.modal.ubication")}</span>
                            <span className={style['info-value']}>{branchName}</span>
                        </div>
                    )}

                    {age != null && (
                        <div className={style['info-item']}>
                            <span className={style['info-label']}>{t("CheckStatus.modal.age")}</span>
                            <span className={style['info-value']}>{age}</span>
                        </div>
                    )}

                    {mileage != null && (
                        <div className={style['info-item']}>
                            <span className={style['info-label']}>{t("CheckStatus.modal.mileage")}</span>
                            <span className={style['info-value']}>
                                {Number(mileage).toLocaleString(numberLocale)} {t("CheckStatus.modal.distanceUnit")}
                            </span>
                        </div>
                    )}

                    {engineTypeName && (
                        <div className={style['info-item']}>
                            <span className={style['info-label']}>{t("CheckStatus.modal.fuelType")}</span>
                            <span className={style['info-value']}>{fuelTypeLabel}</span>
                        </div>
                    )}

                    {dailyPrice != null && (
                        <div className={style['info-item']}>
                            <span className={style['info-label']}>{t("CheckStatus.modal.price")}</span>
                            <span className={style['price-vehicule']}>
                                {Number(dailyPrice).toLocaleString(numberLocale, { 
                                    style: 'currency', 
                                    currency: 'COP', 
                                    maximumFractionDigits: 0 
                                })} / {t("CheckStatus.modal.perDay")}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className={style['card-actions']}>
                <span className={`${style['state-badge']} ${stateClass}`}>{stateLabel}</span>
                <button className={style['btn-ver-mas']} onClick={onVerMas}>
                    {t("CheckStatus.modal.edit")}
                </button>
            </div>
        </div>
    );
}

export default CardVehiculeStatus;