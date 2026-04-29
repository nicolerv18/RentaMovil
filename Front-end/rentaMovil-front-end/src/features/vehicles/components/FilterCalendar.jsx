import { useState, useEffect, useRef } from "react";
import "./FilterCalendar.css";
import { useTranslation } from "react-i18next";

function FilterCalendar({ variant = "overlay", setPickupDate, setReturnDate }) {
  const { t } = useTranslation();

  const today = new Date().toISOString().split("T")[0];

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };
  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const branches = [
    t("filterCalendar.branch1"),
    t("filterCalendar.branch2"),
    t("filterCalendar.branch3"),
    t("filterCalendar.branch4"),
    t("filterCalendar.branch5"),
  ];

  const [query, setQuery] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [seleccionado, setSeleccionado] = useState("");

  const [hora, setHora] = useState(getCurrentTime());
  const [date, setDate] = useState(today);
  const [dateReturn, setDateReturn] = useState(getTomorrow());

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [errorSucursal, setErrorSucursal] = useState("");

  const wrapperRef = useRef(null);
    const [errorFecha, setErrorFecha] = useState("");
      useEffect(() => {
        if (date && dateReturn) {
            if (dateReturn < date) {
                setErrorFecha(t("filterCalendar.errorDate"));
            } else {
                setErrorFecha("");
            }
        }
    }, [date, dateReturn]);

  

  // cerrar dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSugerencias([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // enviar fechas al padre (Reservation)
  useEffect(() => {
    setPickupDate && setPickupDate(date);
  }, [date]);

  useEffect(() => {
    setReturnDate && setReturnDate(dateReturn);
  }, [dateReturn]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSeleccionado("");
    setErrorSucursal("");
    setError("");
    setSuccess("");

    if (!value.trim()) {
      setSugerencias([]);
      return;
    }

    const filtradas = branches.filter((s) =>
      s.toLowerCase().includes(value.toLowerCase())
    );
    setSugerencias(filtradas);
  };

  const handleSelect = (sucursal) => {
    setQuery(sucursal);
    setSeleccionado(sucursal);
    setSugerencias([]);
  };

  const validarHora = (hora) => {
    if (!hora) return false;
    const [h] = hora.split(":").map(Number);
    return h >= 8 && h <= 18;
  };

const handleSubmit = () => {
  setErrorSucursal("");
  setError("");
  setSuccess("");

  if (!seleccionado) {
    setErrorSucursal(t("filterCalendar.errorBranch"));
    return;
  }

  if (!validarHora(hora)) {
    setError(t("filterCalendar.errorHour"));
    return;
  }

  setSuccess(t("filterCalendar.success"));
};
  return (
    <form
      className={`filter ${variant}`}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >

      <div className="field" ref={wrapperRef}>
        <label className="label-filter">{t("filterCalendar.deliveryLocation")}</label>
        <input
          className={`input-container ${errorSucursal ? "inputInvalid" : ""}`}
          value={query}
          onChange={handleChange}
          placeholder="Ej: Bogotá..."
          autoComplete="off"
          required
        />
              {errorSucursal && <p className="error">{errorSucursal}</p>}
        {sugerencias.length > 0 && (
          <ul className="sucursal-dropdown">
            {sugerencias.map((s, i) => (
              <li
                key={i}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(s)}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="field">
        <label className="label-filter">{t("filterCalendar.deliveryDate")}</label>
        <input
          type="date"
          className={`input-container ${errorFecha ? "inputInvalid" : ""}`}
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {errorFecha && (<div className="message-error"> {errorFecha}</div>)}

      </div>
      <div className="field">
        <label className="label-filter">{t("filterCalendar.deliveryHour")}</label>
        <input
          type="time"
          className="input-container"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />
      </div>
      <div className="field">
        <label className="label-filter">{t("filterCalendar.returnDate")}</label>
        <input
          type="date"
          className="input-container"
          min={date}
          value={dateReturn}
          onChange={(e) => setDateReturn(e.target.value)}
        />
      </div>
      <div className="field">
        <label className="label-filter">{t("filterCalendar.returnHour")}</label>
        <input
          type="time"
          className="input-container"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />
      </div>
      <button type="submit" className="btn-search">
        {t("filterCalendar.search")}
      </button>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </form>
  );
}

export default FilterCalendar;