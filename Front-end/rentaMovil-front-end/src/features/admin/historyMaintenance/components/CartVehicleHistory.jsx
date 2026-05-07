import React from 'react';
import style from './CartVehicleHistory.module.css';

function CartVehicleHistory({ record = {}, onViewMore }){
    const { plate, date, type, status, notes, img, model } = record;

    const statusClass = {
        'Pendiente': style['state--pendiente'],
        'En progreso': style['state--progreso'],
        'Completado': style['state--completado'],
        'Cancelado': style['state--cancelado'],
    }[status] || '';

    const formattedDate = date ? new Date(date).toLocaleString() : 'Sin fecha';

    return (
        <div className={style['card']}> 
            <div className={style['left']}>
                <div className={style['img-wrap']}>
                    <img src={img || 'https://via.placeholder.com/160x100?text=Auto'} alt={model || plate} />
                </div>
            </div>

            <div className={style['center']}>
                <div className={style['meta']}>
                    <strong className={style['plate']}>{plate || 'N/A'}</strong>
                    <span className={style['date']}>{formattedDate}</span>
                </div>
                <div className={style['type']}>{type || 'Mantenimiento'}</div>
                <p className={style['notes']}>{notes ? notes.slice(0,140) : 'Sin observaciones'}</p>
            </div>

            <div className={style['right']}>
                <span className={`${style['badge']} ${statusClass}`}>{status || 'Pendiente'}</span>
                <button className={style['btn']} onClick={() => onViewMore && onViewMore(record)}>Ver más</button>
            </div>
        </div>
    )
}

export default CartVehicleHistory;