import style from '../components/CartVehiculeStatus.module.css'

function CardVehiculeStatus({ name, text, state, plate, img, ubication, onVerMas }) {
/* Eto funciona como un dicionario , perimiteiendo alteral el estilo del estado
segun el estado de este :v es decir, si nuestro estado es alterado, automaticamente cambia el color  */
    const stateClass = {
        'Disponible':      style['state--disponible'],
        'En mantenimiento': style['state--mantenimiento'],
        'En uso':          style['state--en-uso'],
        'Reservado':       style['state--reservado'],
    }[state] || ''

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
                        <span className={style['info-label']}>Placa</span>
                        <span className={style['plate']}>{plate}</span>
                    </div>
                    <div className={style['info-item']}>
                        <span className={style['info-label']}>Ubicación</span>
                        <span className={style['price-vehicule']}>{ubication}</span>
                    </div>
                </div>
            </div>

            <div className={style['card-actions']}>
                <span className={`${style['state-badge']} ${stateClass}`}>{state}</span>
                <button className={style['btn-ver-mas']} onClick={onVerMas}>
                    Ver más
                </button>
            </div>

        </div>
    )
}

export default CardVehiculeStatus