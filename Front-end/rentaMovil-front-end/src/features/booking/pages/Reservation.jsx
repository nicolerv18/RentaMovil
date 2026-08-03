import "./Reservation.css";
import { useState } from "react"; // 👈 Importamos useState
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Navbar from "../../../shared/components/layout/Navbar";
import Footer from "../../../shared/components/layout/Footer";
import { branches } from "../../../shared/mocks/branches";
import { useIsMobile } from "../../../shared/hooks/useIsMobile";
import FilterCalendar from "../../vehicles/components/FilterCalendar";
import MapComponent from "../components/MapComponents";
import { useReservationForm } from "../hooks/useReservationForm";
import AuthCheckout from "../components/AuthCheckout"; // 👈 Importamos el nuevo componente

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function Reservation() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { img, name, price, branch } = location.state || {};
  const isMobile = useIsMobile(768);

  // Estado para saber si la sección de pagos debe estar habilitada
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  const {
    opcion,
    setOpcion,
    selectedBranch,
    setSelectedBranch,
    days,
    total,
    showFilters,
    toggleShowFilters,
    handlePayment,
    setPickupDate,
    setReturnDate,
  } = useReservationForm(price, navigate, t, branch);

  if (!name) {
    return <p>No hay vehículo seleccionado</p>;
  }

  // Se ejecuta cuando el usuario se autentica o se valida en AuthCheckout
  const handleAuthSuccess = (user) => {
    if (user) {
      setIsAuthenticated(true);
      setUserData(user);
    } else {
      setIsAuthenticated(false);
      setUserData(null);
    }
  };

  return (
    <>
      <Navbar />

      <div className="containerR">
        <div className="calendar-top">
          {isMobile && (
            <button
              type="button"
              className="filter-toggle"
              onClick={() => toggleShowFilters()}
            >
              {showFilters ? "Ocultar filtros ▲" : "Mostrar filtros ▼"}
            </button>
          )}

          {(!isMobile || showFilters) && (
            <FilterCalendar
              variant="normal"
              setPickupDate={setPickupDate}
              setReturnDate={setReturnDate}
            />
          )}
        </div>

        <div className="contentR">
          <div className="leftR">
            {/* Tarjeta 1: Carro */}
            <div className="card-car">
              <img className="img-car" src={img} alt={name} />
              <h2>{name}</h2>
              <p className="price">${price}</p>
            </div>

            {/* Tarjeta 2: Ubicación y Mapa */}
            <div className="card-location">
              <p>
                Lugar de recogida: <strong> {branch?.name}</strong>
              </p>
              <p>Seleccione el lugar de entrega:</p>
              {selectedBranch && (
                <div>
                  <strong>Sucursal de entrega:</strong> {selectedBranch.name}
                </div>
              )}
              <MapComponent
                mode="select"
                branches={branches}
                selectedBranch={selectedBranch}
                setSelectedBranch={setSelectedBranch}
              />
            </div>


          </div>

          <div className="rightR">
            <AuthCheckout onAuthSuccess={handleAuthSuccess} />
            
            {/* Tarjeta de Resumen / Pago - Se inhabilita si NO está autenticado */}
            <div className={`card-summary ${!isAuthenticated ? "disabled-section" : ""}`}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!isAuthenticated) {
                    alert("Debes iniciar sesión o registrarte primero.");
                    return;
                  }
                  handlePayment(userData);
                }}
              >
                <h3>{t("reservation.summary")}</h3>

                <p>
                  {days} {t("reservation.days")} × ${price}
                </p>

                <p>{t("reservation.sure")}</p>

                <h4>
                  {t("reservation.total")} ${total}
                </h4>

                <div>
                  <label className="labelR">{t("reservation.amountToPay")}</label>

                  <select
                    value={opcion}
                    onChange={(e) => setOpcion(e.target.value)}
                    disabled={!isAuthenticated}
                  >
                    <option value="1">30%</option>
                    <option value="2">50%</option>
                    <option value="3">70%</option>
                    <option value="4">80%</option>
                    <option value="5">100%</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn-pay"
                  disabled={!isAuthenticated}
                  style={{ opacity: isAuthenticated ? 1 : 0.5 }}
                >
                  {isAuthenticated ? "Proceder al Pago" : "Inicie sesión para pagar"}
                </button>
              </form>
              
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Reservation;