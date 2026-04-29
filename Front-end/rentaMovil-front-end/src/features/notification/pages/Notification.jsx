import "./Notification.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ButtonBack from "../../../shared/components/buttonBack.jsx";
import Navbar from "../../../shared/components/layout/Navbar.jsx";
import Footer from "../../../shared/components/layout/Footer.jsx";
import { FaBell, FaEnvelopeOpen } from "react-icons/fa";

function Notification() {
  const navigate = useNavigate();

  const [showModalReservation, setshowModalReservation] = useState(false);

  const [selectedNotification, setSelectedNotification] = useState(null);

  const [filtro, setFiltro] = useState("todos");

  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const data = [
      {
        notification_id: 1,
        type: "reserva_confirmada",
        message: "Tu reserva fue confirmada",
        sent_date: "2026-04-28T10:00:00Z",
        is_read: false,
        reservation_id: 5
      },
      {
        notification_id: 2,
        type: "pago_confirmado",
        message: "Tu pago fue exitoso",
        sent_date: "2026-04-28T11:00:00Z",
        is_read: false,
        payment_id: 10
      },
      {
        notification_id: 3,
        type: "reserva_cancelada",
        message: "Tu reserva fue cancelada",
        sent_date: "2026-04-28T12:00:00Z",
        is_read: true,
        reservation_id: 5
      },
      {
        notification_id: 4,
        type: "recordatorio",
        message: "Tu reserva vence en 2 días",
        sent_date: "2026-04-29T08:00:00Z",
        is_read: false,
        reservation_id: 8
      },
        {
        notification_id: 5,
        type: "reserva_confirmada",
        message: "Tu reserva fue confirmada",
        sent_date: "2026-04-28T10:00:00Z",
        is_read: false,
        reservation_id: 5
      },
      {
        notification_id: 6,
        type: "pago_confirmado",
        message: "Tu pago fue exitoso",
        sent_date: "2026-04-28T11:00:00Z",
        is_read: false,
        payment_id: 10
      },
      {
        notification_id: 7,
        type: "reserva_cancelada",
        message: "Tu reserva fue cancelada",
        sent_date: "2026-04-28T12:00:00Z",
        is_read: true,
        reservation_id: 5
      },
      {
        notification_id: 8,
        type: "recordatorio",
        message: "Tu reserva vence en 2 días",
        sent_date: "2026-04-29T08:00:00Z",
        is_read: false,
        reservation_id: 8
      }
    ];

    setNotificaciones(data);

    /**
     * fetch("http://localhost:3000/api/notificaciones")
     *   .then(res => res.json())
     *   .then(data => setNotificaciones(data))
     *   .catch(err => console.error(err));
     *
     * ENDPOINT:
     * GET /api/notificaciones
     */
  }, []);

  const reservation = [
  {
    id: 5,
    vehicle: {
      brand: "Toyota",
      model: "Corolla"
    }
  },
  {
    id: 8,
    vehicle: {
      brand: "Mazda",
      model: "CX-5"
    }
  }
];
const getReservationById = (id) => {
  return reservation.find((r) => r.id === id);
};

const notificationConfig = {
    reserva_confirmada: { icon: "" },
    pago_confirmado: { icon: "" },
    reserva_cancelada: { icon: "" },
    recordatorio: { icon: "" }
  };
const notificacionesFiltradas =
    filtro === "todos"
      ? notificaciones
      : notificaciones.filter((n) => n.type === filtro);

      const noLeidas = notificaciones.filter((n) => !n.is_read).length;

      const marcarComoLeida = (id) => {
    setNotificaciones((prev) =>
      prev.map((n) =>
        n.notification_id === id ? { ...n, is_read: true } : n
      )
    );
  };
  

  return (
    <>
      <Navbar />

      <div className="notification-page">
        <div className="main-layout">
          <div className="filter-section">
            <div className="header-page">
              <ButtonBack onClick={() => navigate(-1)} />
            </div>
            <div className="Bell">
              <h4> <FaBell className="iconBell"/> {noLeidas} sin leer</h4>
            </div>
            <div
              className={`filter-item ${filtro === "todos" ? "active" : ""}`}
              onClick={() => setFiltro("todos")}
            >
              Todas
            </div>

            <div
              className={`filter-item ${
                filtro === "reserva_confirmada" ? "active" : ""
              }`}
              onClick={() => setFiltro("reserva_confirmada")}
            >
              Reservas confirmadas
            </div>

            <div
              className={`filter-item ${
                filtro === "pago_confirmado" ? "active" : ""
              }`}
              onClick={() => setFiltro("pago_confirmado")}
            >
              Pagos
            </div>

            <div
              className={`filter-item ${
                filtro === "reserva_cancelada" ? "active" : ""
              }`}
              onClick={() => setFiltro("reserva_cancelada")}
            >
              Canceladas
            </div>

            <div
              className={`filter-item ${
                filtro === "recordatorio" ? "active" : ""
              }`}
              onClick={() => setFiltro("recordatorio")}
            >
              Recordatorios
            </div>
          </div>
          <div className="line-vertical"></div>
          <div className="content">
            <div className="notifications-container">
              <h3>Recibidas</h3>
              {notificacionesFiltradas.map((n) => {
                const config = notificationConfig[n.type];
                return (
                  <div
                    key={n.notification_id}
                    className={`notification ${
                      !n.is_read ? "unread" : ""
                    }`}
                    onClick={() => {
                      setSelectedNotification(n);
                      setshowModalReservation(true);
                      marcarComoLeida(n.notification_id);
                    }}
                  >
                    <span className="icon-btn">
                      {config.icon} <FaEnvelopeOpen />
                    </span>
                    <div>
                      <p className="text">{n.message}</p>
                      <small>
                        {new Date(n.sent_date).toLocaleString()}
                      </small>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {showModalReservation && selectedNotification && (
        <div
          className="modal-overlay"
          onClick={() => setshowModalReservation(false)}
        >
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="modal-title">Detalles de notificación</h3>

          <div className="invoice">
            <div className="invoice-row">
              <span className="label">Mensaje</span>
              <span className="value">{selectedNotification.message}</span>
            </div>
            <div className="invoice-row">
              <span className="label">Fecha</span>
              <span className="value">
                {new Date(selectedNotification.sent_date).toLocaleString()}
              </span>
            </div>
            <div className="invoice-row">
              <span className="label">Estado</span>
              <span className="value">
                {selectedNotification.type === "reserva_confirmada" && "Activa"}
                {selectedNotification.type === "pago_confirmado" && "Pago confirmado"}
                {selectedNotification.type === "reserva_cancelada" && "Cancelada"}
                {selectedNotification.type === "recordatorio" && "Pendiente"}
              </span>
            </div>
            {selectedNotification.reservation_id && (() => {
              const reserva = getReservationById(selectedNotification.reservation_id);
              if (!reserva) return null;
              return (
                <div className="invoice-row">
                  <span className="label">Vehículo</span>
                  <span className="value">
                    {reserva.vehicle.brand} {reserva.vehicle.model}
                  </span>
                </div>
              );
            })()}
          </div>
          <div className="modal-actions">
            <button
              className="btn-modal"
              onClick={() => setshowModalReservation(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Notification;