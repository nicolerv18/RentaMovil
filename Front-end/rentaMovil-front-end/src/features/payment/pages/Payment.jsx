import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ButtonBack from "../../../shared/components/buttonBack";
import ImgMapa from "../../../assets/MapaNeivaPago.png";
import Navbar from "../../../shared/components/layout/Navbar";
import Footer from "../../../shared/components/layout/Footer";
import "./Payment.css";
import { useTranslation } from "react-i18next";
import MapComponent from "../../booking/pages/components/MapComponents";
import { createPayment } from "../pages/services/PaymentServices";

function Payment() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState("credit");
  const [loading, setLoading] = useState(false);
  const [mapLocation, setMapLocation] = useState(null);

  const paymentMethods = [
    {
      id: "credit",
      name: "Tarjeta de crédito",
      logos: ["Mastercard", "Visa", "Amex"],
    },
    {
      id: "debit",
      name: "Tarjeta de débito",
      logos: ["Mastercard", "Visa"],
    },
  ];

  const [cardData, setCardData] = useState({
    credit: { number: "", expiry: "", cvv: "", name: "" },
    debit: { number: "", expiry: "", cvv: "", name: "" },
  });

  const updateCard = (methodId, field, value) =>
    setCardData((prev) => ({
      ...prev,
      [methodId]: { ...prev[methodId], [field]: value },
    }));

  const getCardBrand = (number) => {
    const clean = number.replace(/\s/g, "");

    if (clean.startsWith("4")) return "Visa";
    if (/^5[1-5]/.test(clean) || /^2[2-7]/.test(clean))
      return "Mastercard";
    if (/^3[47]/.test(clean)) return "Amex";

    return null;
  };

  const BrandIcon = ({ brand, active }) => {
    const opacity = active ? 1 : 0.3;

    if (brand === "Visa")
      return (
        <svg
          width="38"
          height="24"
          viewBox="0 0 38 24"
          style={{ opacity }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="38" height="24" rx="4" fill="#1A1F71" />
          <text
            x="6"
            y="17"
            fill="white"
            fontSize="11"
            fontWeight="bold"
            fontFamily="Arial"
          >
            VISA
          </text>
        </svg>
      );

    if (brand === "Mastercard")
      return (
        <svg
          width="38"
          height="24"
          viewBox="0 0 38 24"
          style={{ opacity }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="38" height="24" rx="4" fill="#252525" />
          <circle cx="15" cy="12" r="7" fill="#EB001B" />
          <circle cx="23" cy="12" r="7" fill="#F79E1B" />
          <path
            d="M19 6.8a7 7 0 0 1 0 10.4A7 7 0 0 1 19 6.8z"
            fill="#FF5F00"
          />
        </svg>
      );

    if (brand === "Amex")
      return (
        <svg
          width="38"
          height="24"
          viewBox="0 0 38 24"
          style={{ opacity }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="38" height="24" rx="4" fill="#2E77BC" />
          <text
            x="4"
            y="17"
            fill="white"
            fontSize="9"
            fontWeight="bold"
            fontFamily="Arial"
          >
            AMEX
          </text>
        </svg>
      );

    return null;
  };

  const handlePayment = async () => {
    const card = cardData[selectedMethod];

    try {
      setLoading(true);

      const paymentPayload = {
        method: selectedMethod,
        card,
        reservation: {
          vehicleId: 1,
          pickupDate: "2026-07-12",
          returnDate: "2026-07-13",
        },
        total: 403000,
      };

      const response = await createPayment(paymentPayload);

      console.log(response);

      if (response.success) {
        navigate("/payment");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="pay-page">
        <div className="pay-wrapper">
          <div className="pay-header">
            <ButtonBack onClick={() => navigate(-1)} />

            <div className="pay-header-text">
              <h1 className="pay-title">{t("payment.payTitle")}</h1>
              <p className="pay-subtitle">{t("payment.paySubtitle")}</p>
            </div>
          </div>

          <div className="pay-grid">
            {/* LEFT */}
            <div className="pay-left">
              <div className="pay-map-card">
                <div className="pay-locations">
                  <div className="pay-loc">
                    <span className="pay-loc-dot start"></span>

                    <div>
                      <p className="pay-loc-date">
                        12/07/26 · 10:00 AM
                      </p>

                      <p className="pay-loc-desc">
                        {t("payment.desc-location")}
                      </p>
                    </div>
                  </div>

                  <div className="pay-loc-line"></div>

                  <div className="pay-loc">
                    <span className="pay-loc-dot end"></span>

                    <div>
                      <p className="pay-loc-date">
                        13/07/26 · 07:00 PM
                      </p>

                      <p className="pay-loc-desc">
                        {t("payment.desc-location2")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="pay-right">
              {/* SUMMARY */}
              <div className="pay-card">
                <div className="pay-card-header">
                  <span
                    className="pay-card-dot"
                    style={{ background: "var(--navbar)" }}
                  ></span>

                  <span>{t("payment.summary")}</span>
                </div>

                <div className="pay-card-body">
                  <div className="pay-resumen-row">
                    <p className="pay-resumen-label">
                      3 Días × $403.000
                    </p>

                    <p className="pay-resumen-value">
                      $1.209.000
                    </p>
                  </div>

                  <div className="pay-resumen-row">
                    <p className="pay-resumen-label">
                      {t("payment.sure")}
                    </p>

                    <p className="pay-resumen-value">
                      {t("payment.include")}
                    </p>
                  </div>

                  <div className="pay-total-row">
                    <p className="pay-total-label">
                      {t("payment.total")}
                    </p>

                    <p className="pay-total-value">
                      $403.000
                    </p>
                  </div>
                </div>
              </div>

              {/* PAYMENT METHODS */}
              <div className="pay-method-card">
                <div className="pay-method-header">
                  <h3 className="pay-method-title">
                    Paga ahora
                  </h3>
                </div>

                {paymentMethods.map((method, index) => {
                  const isActive = selectedMethod === method.id;
                  const card = cardData[method.id];
                  const brand = getCardBrand(card.number);

                  return (
                    <div
                      key={method.id}
                      className={`payment-method-wrapper ${
                        isActive ? "expanded" : ""
                      }`}
                    >
                      <button
                        type="button"
                        className={`payment-option ${
                          isActive ? "active" : ""
                        }`}
                        onClick={() =>
                          setSelectedMethod(
                            isActive ? "" : method.id
                          )
                        }
                      >
                        <div className="payment-option-top">
                          <div className="payment-option-left">
                            <div
                              className={`payment-radio ${
                                isActive ? "checked" : ""
                              }`}
                            >
                              <div className="payment-radio-inner"></div>
                            </div>

                            <div>
                              <p className="payment-option-name">
                                {method.name}
                              </p>

                              <div className="payment-logos">
                                {method.logos.map((logo) => (
                                  <BrandIcon
                                    key={logo}
                                    brand={logo}
                                    active={
                                      !brand || brand === logo
                                    }
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="payment-option-price">
                            <strong>US$ 51,31</strong>
                            <span>Aprox. COP 190.854</span>
                          </div>
                        </div>
                      </button>

                      {isActive && (
                        <div className="payment-dropdown open">
                          <div className="pay-form">
                            <div>
                              <label>Número de tarjeta</label>

                              <div className="pay-input-card-wrapper">
                                <input
                                  type="text"
                                  placeholder="1234 5678 9012 3456"
                                  value={card.number}
                                  maxLength={19}
                                  onChange={(e) => {
                                    const value = e.target.value
                                      .replace(/\D/g, "")
                                      .replace(
                                        /(.{4})/g,
                                        "$1 "
                                      )
                                      .trim();

                                    updateCard(
                                      method.id,
                                      "number",
                                      value
                                    );
                                  }}
                                />

                                {brand && (
                                  <span className="pay-input-brand-icon">
                                    <BrandIcon
                                      brand={brand}
                                      active={true}
                                    />
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="pay-form-row">
                              <div>
                                <label>Expiración</label>

                                <input
                                  type="text"
                                  placeholder="MM/AA"
                                  value={card.expiry}
                                  maxLength={5}
                                  onChange={(e) => {
                                    let value =
                                      e.target.value.replace(
                                        /\D/g,
                                        ""
                                      );

                                    if (value.length >= 3) {
                                      value =
                                        value.slice(0, 2) +
                                        "/" +
                                        value.slice(2, 4);
                                    }

                                    updateCard(
                                      method.id,
                                      "expiry",
                                      value
                                    );
                                  }}
                                />
                              </div>

                              <div>
                                <label>CVV</label>

                                <input
                                  type="password"
                                  placeholder="123"
                                  value={card.cvv}
                                  maxLength={4}
                                  onChange={(e) =>
                                    updateCard(
                                      method.id,
                                      "cvv",
                                      e.target.value.replace(
                                        /\D/g,
                                        ""
                                      )
                                    )
                                  }
                                />
                              </div>
                            </div>

                            <div>
                              <label>
                                Nombre en la tarjeta
                              </label>

                              <input
                                type="text"
                                placeholder="Juan Pérez"
                                value={card.name}
                                onChange={(e) =>
                                  updateCard(
                                    method.id,
                                    "name",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {index !== paymentMethods.length - 1 && (
                        <div className="payment-divider"></div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                className="pay-btn"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading
                  ? "Procesando..."
                  : t("payment.confirm")}
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