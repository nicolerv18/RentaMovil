import "./Notification.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ButtonBack from "../../../shared/components/buttonBack.jsx";
import Navbar from "../../../shared/components/layout/Navbar.jsx";
import Footer from "../../../shared/components/layout/Footer.jsx";

function Notification() {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState("todos");

  const todasNotificaciones = [
    { id: 1, tipo: "reserva", texto: "Tu reserva fue confirmada" },
    { id: 2, tipo: "cancelada", texto: "Tu reserva fue cancelada" },
    {
      id: 3,
      tipo: "recordatorio",
      texto: "Recordatorio: Tu reserva vence en 2 días",
    },
    { id: 4, tipo: "reserva", texto: "Tu reserva fue confirmada" },
    { id: 5, tipo: "cancelada", texto: "Tu reserva fue cancelada" },
    {
      id: 6,
      tipo: "recordatorio",
      texto: "Recordatorio: Tu reserva vence en 2 días",
    },
    { id: 7, tipo: "reserva", texto: "Tu reserva fue confirmada" },
    { id: 8, tipo: "cancelada", texto: "Tu reserva fue cancelada" },
    {
      id: 9,
      tipo: "recordatorio",
      texto: "Recordatorio: Tu reserva vence en 2 días",
    },
    { id: 10, tipo: "reserva", texto: "Tu reserva fue confirmada" },
    { id: 11, tipo: "cancelada", texto: "Tu reserva fue cancelada" },
    {
      id: 12,
      tipo: "recordatorio",
      texto: "Recordatorio: Tu reserva vence en 2 días",
    },
  ];

  const notificacionesFiltradas =
    filtro === "todos"
      ? todasNotificaciones
      : todasNotificaciones.filter((n) => n.tipo === filtro);

  return (
    <>
    <Navbar />
    <div className="notification-page">
      {/* HEADER */}
      <div className="header-page">
        <ButtonBack onClick={() => navigate(-1)} />
      </div>

      {/* MAIN LAYOUT */}
      <div className="main-layout">
        {/* FILTROS */}
        <div className="filter-section">
          <div
            className={`filter-item ${filtro === "todos" ? "active" : ""}`}
            onClick={() => setFiltro("todos")}
          >
            Todas
          </div>
          <div
            className={`filter-item ${filtro === "reserva" ? "active" : ""}`}
            onClick={() => setFiltro("reserva")}
          >
            Reservasssss
          </div>
          <div
            className={`filter-item ${filtro === "cancelada" ? "active" : ""}`}
            onClick={() => setFiltro("cancelada")}
          >
            Reservas canceladas
          </div>
          <div
            className={`filter-item ${filtro === "recordatorio" ? "active" : ""}`}
            onClick={() => setFiltro("recordatorio")}
          >
            Recordatorio de reservas
          </div>
        </div>

        {/* LÍNEA VERTICAL */}
        <div className="line-vertical"></div>

        {/* CONTENIDO */}
        <div className="content">
          <div className="notifications-container">
            <h3>Recibidas</h3>
            {notificacionesFiltradas.map((notification) => (
              <div key={notification.id} className="notification">
                <span className="icon-notification">👤</span>
                <p className="text">{notification.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Notification;
