
import { useTranslation } from "react-i18next";
import style from '../components/CartVehiculeStatus.module.css'

function CardVehiculeStatus({ name, text, state, plate, img, ubication, onVerMas }) {
    const { t } = useTranslation();
/* Eto funciona como un dicionario , perimiteiendo alteral el estilo del estado
segun el estado de este :v es decir, si nuestro estado es alterado, automaticamente cambia el color  */
    const stateClass = {
        'Disponible':      style['state--disponible'],
        'En mantenimiento': style['state--mantenimiento'],
        'En uso':          style['state--en-uso'],
        'Reservado':       style['state--reservado'],
    }[state] || ''

    const stateLabel = {
        'Disponible': t("CheckStatus.modal.stateOptions.available"),
        'En mantenimiento': t("CheckStatus.modal.stateOptions.maintenance"),
        'En uso': t("CheckStatus.modal.stateOptions.inUse"),
        'Reservado': t("CheckStatus.modal.stateOptions.reserved"),
    }[state] || state;

    return (
        <div className={style['card-vehicule']}>

            <div className={style['img-car-vehicule']}>
                <img src={img} alt={name} />
            </div>

            <div className={style['text-vehicule']}>
                <h3 className={style['name-car-vehicule']}>{name}</h3>
                <p className={style['desc-vehicule']}>{text}</p>
                <div className={style['container-info']}>
                    <div className={style['info-item']}>
                        <span className={style['info-label']}>{t("CheckStatus.modal.plate")}</span>
                        <span className={style['plate']}>{plate}</span>
                    </div>
                    <div className={style['info-item']}>
                        <span className={style['info-label']}>{t("CheckStatus.modal.ubication")}</span>
                        <span className={style['price-vehicule']}>{ubication}</span>
                    </div>
                </div>
            </div>

            <div className={style['card-actions']}>
                <span className={`${style['state-badge']} ${stateClass}`}>{stateLabel}</span>
                <button className={style['btn-ver-mas']} onClick={onVerMas}>
                    {t("CheckStatus.modal.seeMore")}
                </button>
            </div>



        </div>
    )
}

export default CardVehiculeStatus