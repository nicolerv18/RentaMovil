import "./HistorialReservation.css";
import { useState, useEffect } from "react";
import Navbar from "../../shared/components/layout/Navbar.jsx";
import Footer from "../../shared/components/layout/Footer.jsx";
import img from "../../assets/carts/car1.jpg"
import { FaBell, FaCar, FaHotel } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function HistorialReservation() {
  const { t } = useTranslation();
    
  const [reservas, setReservas] = useState([]);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    const data = [
      {
        id: 1,
        status: "activa",
        start_date: "2026-05-01",
        end_date: "2026-05-05",
        days: 4,
        total_price: 400000,
        vehicle: { brand: "Toyota", model: "Corolla", img}
      },
      {
        id: 2,
        status: "cancelada",
        start_date: "2026-04-20",
        end_date: "2026-04-22",
        days: 2,
        total_price: 200000,
        vehicle: { brand: "Toyota", model: "CX-5", img }
      },
      {
        id: 3,
        status: "pagada",
        start_date: "2026-04-10",
        end_date: "2026-04-15",
        days: 5,
        total_price: 500000,
        vehicle: { brand: "Kia", model: "Rio", img }
      }
    ];

    setReservas(data);

    /**
     * 🔌 BACKEND FUTURO
     * GET /api/reservas/usuario
     *
     * fetch("/api/reservas/usuario")
     *  .then(res => res.json())
     *  .then(data => setReservas(data))
     */
  }, []);

  const cancelarReserva = (id) => {
    setReservas((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "cancelada" } : r
      )
    );

    setShowCancelModal(false);

    /**
     * BACKEND FUTURO
     * PUT /api/reservas/:id/cancelar
     *
     * fetch(`/api/reservas/${id}/cancelar`, { method: "PUT" })
     */
  };

  return (
    <>
      <Navbar />

      <div className="historial-page">
        <div className="cards-container">
          <h2 className="title">{t("historyReservation.myReservations")}</h2>
          {reservas.map((r) => (
          <div key={r.id} className="card-reserva">
            <div className="card-header">
              <h4><FaBell/></h4>
              <span className={`status ${r.status}`}>
                {r.status}
              </span>
            </div>
            <div className="card-content">
              <img
                src={r.vehicle.img}
                alt="car"
                className="img-historial"
              />
              <div className="card-body">
                <h4 className="car-name">{r.vehicle.brand} {r.vehicle.model}</h4>
                <p><strong>{t("historyReservation.date")}</strong> {r.start_date} → {r.end_date}</p>
                <p><strong>{t("historyReservation.days")}</strong> {r.days}</p>
                <p><strong>{t("historyReservation.total")}</strong> ${r.total_price.toLocaleString()}</p>
                {r.status === "activa" && (
                <div className="btn-container">
                  <button
                  className="btn-cancel"
                  onClick={() => {
                    setSelectedReserva(r);
                    setShowCancelModal(true);
                  }}
                >
                  {t("historyReservation.cancel")}
                </button>
                </div>
              )}
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
      {showCancelModal && selectedReserva && (
        <div
          className="modal-overlay"
          onClick={() => setShowCancelModal(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <p>
              {t("historyReservation.sure")}{" "}
              <strong>
                {selectedReserva.vehicle.brand}{" "}
                {selectedReserva.vehicle.model}
              </strong>?
            </p>

            <div className="modal-actions">
              <button
              className="btn-negative"
                onClick={() => setShowCancelModal(false)}
              >
                {t("historyReservation.no")}
              </button>

              <button
                className="btn-danger"
                onClick={() => cancelarReserva(selectedReserva.id)}
              >
                {t("historyReservation.yes")}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default HistorialReservation;