import "./HistorialReservation.css";
import { useState, useEffect } from "react";
import Navbar from "../../shared/components/layout/Navbar.jsx";
import Footer from "../../shared/components/layout/Footer.jsx";
import img from "../../assets/carts/car1.jpg";
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
        vehicle: {
          brand: "Toyota",
          model: "Corolla",
          img,
        },
      },
      {
        id: 2,
        status: "cancelada",
        start_date: "2026-04-20",
        end_date: "2026-04-22",
        days: 2,
        total_price: 200000,
        vehicle: {
          brand: "Mazda",
          model: "CX-5",
          img,
        },
      },
      {
        id: 3,
        status: "pagada",
        start_date: "2026-04-10",
        end_date: "2026-04-15",
        days: 5,
        total_price: 500000,
        vehicle: {
          brand: "Kia",
          model: "Rio",
          img,
        },
      },
    ];

    setReservas(data);
  }, []);

  const cancelarReserva = (id) => {
    setReservas((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: "cancelada" }
          : r
      )
    );

    setShowCancelModal(false);
  };

  return (
    <>
      <Navbar />

      <div className="historial-page">
        <div className="cards-container">

          <h2 className="title">
            {t("historyReservation.myReservations")}
          </h2>

          {reservas.map((r) => (
            <div
              key={r.id}
              className="card-reserva"
            >
              <div className="card-content">
                
                  <span
                    className={`status ${r.status}`}
                  >
                    {r.status}
                  </span>
                <img
                  src={r.vehicle.img}
                  alt={`${r.vehicle.brand} ${r.vehicle.model}`}
                  className="img-historial"
                />

                <div className="card-body">

                  <h4 className="car-name">
                    {r.vehicle.brand}{" "}
                    {r.vehicle.model}
                  </h4>

                  <div className="info-grid">

                    <p>
                      <strong>
                        {t(
                          "historyReservation.date"
                        )}
                      </strong>
                      <br />
                      {r.start_date} →{" "}
                      {r.end_date}
                    </p>

                    <p>
                      <strong>
                        {t(
                          "historyReservation.days"
                        )}
                      </strong>
                      <br />
                      {r.days}
                    </p>

                    <p>
                      <strong>
                        {t(
                          "historyReservation.total"
                        )}
                      </strong>
                      <br />$
                      {r.total_price.toLocaleString()}
                    </p>

                  </div>

                  {r.status === "activa" && (
                    <div className="btn-container">
                      <button
                        className="btn-cancel"
                        onClick={() => {
                          setSelectedReserva(r);
                          setShowCancelModal(
                            true
                          );
                        }}
                      >
                        {t(
                          "historyReservation.cancel"
                        )}
                      </button>
                    </div>
                  )}

                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {showCancelModal &&
        selectedReserva && (
          <div
            className="modal-overlay"
            onClick={() =>
              setShowCancelModal(false)
            }
          >
            <div
              className="modal-content"
              onClick={(e) =>
                e.stopPropagation()
              }
            >
              <p>
                {t(
                  "historyReservation.sure"
                )}{" "}
                <strong>
                  {
                    selectedReserva.vehicle
                      .brand
                  }{" "}
                  {
                    selectedReserva.vehicle
                      .model
                  }
                </strong>
                ?
              </p>

              <div className="modal-actions">

                <button
                  className="btn-negative"
                  onClick={() =>
                    setShowCancelModal(
                      false
                    )
                  }
                >
                  {t(
                    "historyReservation.no"
                  )}
                </button>

                <button
                  className="btn-danger"
                  onClick={() =>
                    cancelarReserva(
                      selectedReserva.id
                    )
                  }
                >
                  {t(
                    "historyReservation.yes"
                  )}
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