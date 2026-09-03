import React, { useState } from "react";
import { usePayment } from "../context/PaymentContext";
import "./PaymentMethodSelector.css";

export default function PaymentMethodSelector() {
    const { selectedPaymentMethod, setSelectedPaymentMethod } = usePayment();
    const [cardData, setCardData] = useState({
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: ""
    });

    const availableMethods = [
        { id: "credit_card", name: "Tarjeta de Crédito / Débito", type: "CARD" },
        { id: "pse", name: "PSE (Tarjeta de Débito / Cuenta de Ahorros)", type: "PSE" }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        let formattedValue = value;
        if (name === "cardNumber") {
            formattedValue = value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().substring(0, 19);
        }

        if (name === "expiryDate") {
            formattedValue = value.replace(/\D/g, "").replace(/^(\d{2})(\d)/, "$1/$2").substring(0, 5);
        }

        if (name === "cvv") {
            formattedValue = value.replace(/\D/g, "").substring(0, 4);
        }

        const updatedCardData = { ...cardData, [name]: formattedValue };
        setCardData(updatedCardData);


        if (selectedPaymentMethod?.id === "credit_card") {
            setSelectedPaymentMethod({
                id: "credit_card",
                type: "CARD",
                name: `Visa terminada en •••• ${updatedCardData.cardNumber.slice(-4) || "AAAA"}`,
                details: updatedCardData
            });
        }
    };
    const handleMethodSelect = (method) => {
        if (method.id === "credit_card") {
            setSelectedPaymentMethod({
                id: "credit_card",
                type: "CARD",
                name: `Visa terminada en •••• ${cardData.cardNumber.slice(-4) || "AAAA"}`,
                details: cardData
            });
        } else {
            setSelectedPaymentMethod(method);
        }
    };

    return (
        <div className="payment-container">
            <h3 className="payment-title">Selecciona tu Método de Pago</h3>
            
            <div className="payment-options-grid">
                {availableMethods.map((method) => {
                    const isSelected = selectedPaymentMethod?.id === method.id;
                    return (
                        <button
                            key={method.id}
                            className={`payment-method-card ${isSelected ? "payment-selected-card" : ""}`}
                            onClick={() => handleMethodSelect(method)}
                            type="button"
                        >
                            <span className="payment-method-text" style={{color: "#000"}}>{method.name}</span>
                            <div className={`payment-radio-circle ${isSelected ? "active" : ""}`}>
                                {isSelected && <div className="payment-radio-dot" />}
                            </div>
                        </button>
                    );
                })}
            </div>
            {selectedPaymentMethod?.id === "credit_card" && (
                <div className="card-form-container">
                    <h4 className="form-subtitle">Datos de la Tarjeta</h4>
                    
                    <div className="form-group">
                        <label className="form-label">Número de Tarjeta</label>
                        <input
                            type="text"
                            name="cardNumber"
                            className="form-input"
                            placeholder="0000 0000 0000 0000"
                            value={cardData.cardNumber}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Nombre del Titular</label>
                        <input
                            type="text"
                            name="cardName"
                            className="form-input"
                            placeholder="Como aparece en la tarjeta"
                            value={cardData.cardName}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-row-double">
                        <div className="form-group">
                            <label className="form-label">Fecha de Vence (MM/AA)</label>
                            <input
                                type="text"
                                name="expiryDate"
                                className="form-input"
                                placeholder="MM/AA"
                                value={cardData.expiryDate}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Código CVV</label>
                            <input
                                type="password"
                                name="cvv"
                                className="form-input"
                                placeholder="123"
                                value={cardData.cvv}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
