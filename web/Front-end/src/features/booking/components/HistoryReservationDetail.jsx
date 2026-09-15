    import { useTranslation } from "react-i18next";
    import "./HistoryReservationDetail.css";

    function ReservationDetailModal({ isOpen, reserva, onClose }) {
    const { t } = useTranslation();

    if (!isOpen || !reserva) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content modal-detalles" onClick={(e) => e.stopPropagation()}>
            
            <header className="modal-details-header">
            <div>
                <h3>{t("historyReservation.billingDetail") || "Detalle de Reserva"}</h3>
                <span className="reserva-id">{reserva.id}</span>
            </div>
            <button className="btn-close-x" onClick={onClose}>&times;</button>
            </header>

            <div className="modal-details-body">
            {/* Resumen Mini del Vehículo */}
            <div className="modal-vehiculo-resumen">
                <img src={reserva.vehicle.img} alt={reserva.vehicle.model} />
                <div>
                <h4>{reserva.vehicle.brand} {reserva.vehicle.model}</h4>
                <p>{reserva.vehicle.category} • {reserva.vehicle.plate}</p>
                </div>
            </div>

            {/* Tabla de Desglose Limpia */}
            <div className="desglose-tabla">
                <div className="detail-row">
                <div className="detail-concept">
                    <span>{t("historyReservation.carRental") || "Alquiler de vehículo"}</span>
                    <small>${reserva.billing.price_per_day.toLocaleString()} x {reserva.tiempos.days} {t("historyReservation.days") || "días"}</small>
                </div>
                <span className="detail-value">${reserva.billing.subtotal_vehicle.toLocaleString()}</span>
                </div>

                <div className="detail-row">
                <div className="detail-concept">
                    <span>{t("historyReservation.insurance") || "Seguro y Cobertura"}</span>
                    <small>${reserva.billing.insurance_per_day.toLocaleString()} x {reserva.tiempos.days} {t("historyReservation.days") || "días"}</small>
                </div>
                <span className="detail-value">${reserva.billing.subtotal_insurance.toLocaleString()}</span>
                </div>

                {/* Fila Totalizadora */}
                <div className="detail-row total-row">
                <span className="total-label">{t("historyReservation.total") || "Total facturado"}</span>
                <span className="total-value">
                    ${reserva.billing.total_price.toLocaleString()} <small>{reserva.currency}</small>
                </span>
                </div>
            </div>
            </div>

            <div className="modal-details">
            <button className="btn btn-primario" onClick={onClose}>
                {t("historyReservation.close") || "Entendido"}
            </button>
            </div>

        </div>
        </div>
    );
    }

    export default ReservationDetailModal;
