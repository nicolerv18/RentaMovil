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
              <h1 className="pay-title">{t("payment.payTitle")}</h1>
              <p className="pay-subtitle">{t("payment.paySubtitle")}</p>
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
                      <p className="pay-loc-desc">{t("payment.desc-location")}</p>
                    </div>
                  </div>
                  <div className="pay-loc-line"></div>
                  <div className="pay-loc">
                    <span className="pay-loc-dot end"></span>
                    <div>
                      <p className="pay-loc-date">13/07/26 · 07:00 PM</p>
                      <p className="pay-loc-desc">{t("payment.desc-location2")}</p>
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
                  <span>{t("payment.summary")}</span>
                </div>
                <div className="pay-card-body">
                  <div className="pay-resumen-row">
                    <p className="pay-resumen-label">3 Días × $403.000</p>
                    <p className="pay-resumen-value">$1.209.000</p>
                  </div>
                  <div className="pay-resumen-row">
                    <p className="pay-resumen-label">{t("payment.sure")}</p>
                    <p className="pay-resumen-value">{t("payment.include")}</p>
                  </div>
                  <div className="pay-total-row">
                    <p className="pay-total-label">{t("payment.total")}</p>
                    <p className="pay-total-value">$403.000</p>
                  </div>
                </div>
              </div>


              {/* Responsable */}
              <div className="pay-card">
                <div className="pay-card-header">
                  <span className="pay-card-dot" style={{ background: 'var(--accent)' }}></span>
                  <span>{t("payment.responsible")}</span>
                </div>
                <div className="pay-card-body pay-fields">
                  <div className="pay-field">
                    <label className="pay-field-label">{t("payment.name")}</label>
                    <input type="text" className="pay-input" placeholder={t("payment.placeholderName")} />
                  </div>
                  <div className="pay-field">
                    <label className="pay-field-label">{t("payment.city")}</label>
                    <input type="text" className="pay-input" placeholder={t("payment.placeholderCity")} />
                  </div>
                  <div className="pay-field">
                    <label className="pay-field-label">{t("payment.adrress")}</label>
                    <input type="text" className="pay-input" placeholder={t("payment.placeholderAddress")} />
                  </div>
                </div>
              </div>

              {/* Botón pagar */}
              <button className="pay-btn">
                {t("payment.confirm")}
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
