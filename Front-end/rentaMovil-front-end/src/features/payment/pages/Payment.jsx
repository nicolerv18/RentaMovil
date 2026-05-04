import { useNavigate } from "react-router-dom";
import ButtonBack from "../../../shared/components/buttonBack";
import ImgMapa from '../../../assets/MapaNeivaPago.png';
import Navbar from "../../../shared/components/layout/Navbar";
import Footer from '../../../shared/components/layout/Footer';
import "./Payment.css";
import { useTranslation } from "react-i18next";

function Payment() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="pay-page">
        <div className="pay-wrapper">

          {/* Header */}
          <div className="pay-header">
            <ButtonBack onClick={() => navigate(-1)} />
            <div className="pay-header-text">
              <h1 className="pay-title">Confirmar pago</h1>
              <p className="pay-subtitle">Revisa los detalles antes de continuar</p>
            </div>
          </div>

          <div className="pay-grid">

            {/* ── Columna izquierda: mapa + ubicaciones ── */}
            <div className="pay-left">
              <div className="pay-map-card">
                <img src={ImgMapa} alt="Mapa" className="pay-map-img" />
                <div className="pay-locations">
                  <div className="pay-loc">
                    <span className="pay-loc-dot start"></span>
                    <div>
                      <p className="pay-loc-date">12/07/26 · 10:00 AM</p>
                      <p className="pay-loc-desc">Descripción de ubicación</p>
                    </div>
                  </div>
                  <div className="pay-loc-line"></div>
                  <div className="pay-loc">
                    <span className="pay-loc-dot end"></span>
                    <div>
                      <p className="pay-loc-date">13/07/26 · 07:00 PM</p>
                      <p className="pay-loc-desc">Descripción de ubicación 2</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Columna derecha: detalles ── */}
            <div className="pay-right">

              {/* Resumen */}
              <div className="pay-card">
                <div className="pay-card-header">
                  <span className="pay-card-dot" style={{ background: 'var(--navbar)' }}></span>
                  <span>Resumen</span>
                </div>
                <div className="pay-card-body">
                  <div className="pay-resumen-row">
                    <p className="pay-resumen-label">3 Días × $403.000</p>
                    <p className="pay-resumen-value">$1.209.000</p>
                  </div>
                  <div className="pay-resumen-row">
                    <p className="pay-resumen-label">Seguro todo riesgo</p>
                    <p className="pay-resumen-value">Incluido</p>
                  </div>
                  <div className="pay-total-row">
                    <p className="pay-total-label">TOTAL</p>
                    <p className="pay-total-value">$403.000</p>
                  </div>
                </div>
              </div>


              {/* Responsable */}
              <div className="pay-card">
                <div className="pay-card-header">
                  <span className="pay-card-dot" style={{ background: 'var(--accent)' }}></span>
                  <span>Responsable de la reserva</span>
                </div>
                <div className="pay-card-body pay-fields">
                  <div className="pay-field">
                    <label className="pay-field-label">Nombre</label>
                    <input type="text" className="pay-input" placeholder="Tu nombre completo" />
                  </div>
                  <div className="pay-field">
                    <label className="pay-field-label">Ciudad</label>
                    <input type="text" className="pay-input" placeholder="Ciudad de residencia" />
                  </div>
                  <div className="pay-field">
                    <label className="pay-field-label">Dirección</label>
                    <input type="text" className="pay-input" placeholder="Dirección de entrega" />
                  </div>
                </div>
              </div>

              {/* Botón pagar */}
              <button className="pay-btn">
                Confirmar y pagar
              </button>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Payment;
