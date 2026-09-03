import { useReservation } from "../../booking/context/ReservationContext";
import { insurance } from "../../booking/data/mocks/insurance";
import { calculateRentalDays } from "../../../shared/utils/rental";
import "./InvoiceCard.css";

export default function InvoiceCard({ days: propDays, total: propTotal, vehicle: propVehicle }) {
  const { reservation } = useReservation();

  const vehicle = propVehicle || reservation?.vehicle;
  const days = propDays || calculateRentalDays(reservation?.pickupDate, reservation?.returnDate);
  const selectedInsurance = insurance.find((item) => item.id === reservation?.insuranceId);

  if (!vehicle) {
    return null;
  }

  const vehicleTotal = days * vehicle.price;
  const insuranceTotal = selectedInsurance?.price ?? 0;
  const total = propTotal || (vehicleTotal + insuranceTotal);

  return (
    <div className="pay-card">
      <div className="pay-card-header">
        <span className="pay-card-dot"></span>
        <span>Resumen de factura</span>
      </div>

      <div className="pay-card-body">
        <div className="pay-resumen-row">
          <p className="pay-resumen-label">{days} día{days !== 1 ? "s" : ""} × ${Number(vehicle.price).toLocaleString("es-CO")}</p>
          <p className="pay-resumen-value">${vehicleTotal.toLocaleString("es-CO")}</p>
        </div>

        <div className="pay-resumen-row">
          <p className="pay-resumen-label">Seguro</p>
          <p className="pay-resumen-value">${insuranceTotal.toLocaleString("es-CO")}</p>
        </div>

        <div className="pay-total-row">
          <p className="pay-total-label">Total</p>
          <p className="pay-total-value">${total.toLocaleString("es-CO")}</p>
        </div>
      </div>
    </div>
  );
}
