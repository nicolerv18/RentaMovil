import React from 'react';
import style from './CartVehicleHistory.module.css';
import carImg from "../../../../assets/carro.png";
import { useTranslation } from "react-i18next";

import { useState } from 'react';
function CartVehicleHistory({ record = {}, onViewMore }) {
    const { t } = useTranslation();
    
    const { plate, date, type, state, notes, img: recordImg, model } = record;
    const statusClass = {
        'Pendiente': style['state--pendiente'],
        'En progreso': style['state--progreso'],
        'Completado': style['state--completado'],
        'Cancelado': style['state--cancelado'],
    }[state] || ''
    const stateLabel = {
        'Pendiente': t("CartVehiculeMaintenance.pending"),
        'En progreso': t("CartVehiculeMaintenance.inProgress"),
        'Completado': t("CartVehiculeMaintenance.completed"),
        'Cancelado': t("CartVehiculeMaintenance.cancel")
    }[state] || state;


    const formattedDate = date ? new Date(date).toLocaleString() : 'Sin fecha';

    return (
       
            <div className={style['history-card-container']}>
                <div className={style['card-left']}>
                    <div className={style['card-img-wrap']}>
                        <img src={recordImg || carImg || 'https://via.placeholder.com/160x100?text=Auto'} alt={model || plate} />
                    </div>
                </div>

                <div className={style['card-center']}>
                    <div className={style['card-meta']}>
                        <strong className={style['card-plate']}>{plate || 'N/A'}</strong>
                        <span className={style['card-date']}>{formattedDate}</span>
                    </div>
                    <div className={style['card-type']}>{type || 'Mantenimiento'}</div>
                    <p className={style['card-notes']}>{notes ? notes.slice(0, 140) : t("CartVehiculeMaintenance.offObservations")}</p>
                </div>

                <div className={style['card-right']}>
                    <span className={`${style['badge']} ${statusClass}`}>{stateLabel || 'Pendiente'}</span>
                    <button className={style['card-btn']} onClick={() => onViewMore && onViewMore(record)}>{t("CartVehiculeMaintenance.seeMore")}</button>
                </div>
            </div>
    
    )
}

export default CartVehicleHistory;