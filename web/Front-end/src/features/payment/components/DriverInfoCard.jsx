import { useEffect, useMemo, useState } from "react";
import { usePayment } from "../context/PaymentContext";
import "./DriverInfoCard.css";

export default function DriverInfoCard() {
  const { driver, setDriver } = usePayment();

  const fallbackUser = useMemo(
    () => ({
      nombre: "Sharik Rojas",
      telefono: "3145556789",
      email: "sha@example.com",
    }),
    []
  );

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");

    if (!saved) {
      return fallbackUser;
    }

    try {
      return JSON.parse(saved);
    } catch {
      return fallbackUser;
    }
  });

  useEffect(() => {
    if (!driver) {
      const fullName = [user?.nombre, user?.apellido].filter(Boolean).join(" ") || user?.nombre || fallbackUser.nombre;
      const phone = user?.telefono || fallbackUser.telefono;
      const email = user?.email || fallbackUser.email;

      setDriver({
        email,
        name: fullName,
        phone,
      });
    }
  }, [driver, setDriver, user, fallbackUser]);

  const handlePhoneChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, "");

    setUser((previous) => ({
      ...previous,
      telefono: value,
    }));

    if (!driver) return;

    setDriver({
      ...driver,
      phone: value,
    });
  };

  return (
    <div className="pay-card">
      <div className="pay-card-header">
        <span className="pay-card-dot"></span>
        <span>Datos del conductor</span>
      </div>

      <div className="pay-card-body">
        <div className="pay-form-row">
          <div>
            <label>Correo</label>
            <input
              type="email"
              value={driver?.email ?? user?.email ?? ""}
              readOnly
            />
          </div>

          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={driver?.name ?? user?.nombre ?? ""}
              readOnly
            />
          </div>

          <div>
            <label>Teléfono</label>
            <input
              type="tel"
              value={driver?.phone ?? user?.telefono ?? ""}
              onChange={handlePhoneChange}
              placeholder="Ej. 3001234567"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
