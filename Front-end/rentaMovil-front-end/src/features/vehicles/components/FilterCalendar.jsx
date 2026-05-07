import { useState, useEffect, useRef } from "react";
import "./FilterCalendar.css";
import { useTranslation } from "react-i18next";
import { branches } from "../data/branches";

function FilterCalendar({ onSearch, variant = "overlay", setPickupDate, setReturnDate }) {
  const { t } = useTranslation();

  const today = new Date().toISOString().split("T")[0];
  const getCurrentTime = () => new Date().toTimeString().slice(0, 5);
  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const [query, setQuery]               = useState("");
  const [sugerencias, setSugerencias]   = useState([]);
  const [seleccionado, setSeleccionado] = useState("");
  const [hora, setHora]                 = useState(getCurrentTime());
  const [returnhora, setReturnHora]     = useState(getCurrentTime());
  const [date, setDate]                 = useState(today);
  const [dateReturn, setDateReturn]     = useState(getTomorrow());
  const [success, setSuccess]           = useState("");
  const [errorSucursal, setErrorSucursal] = useState("");
  const [errorFecha, setErrorFecha]       = useState("");
  const [errorHora, setErrorHora]         = useState("");
  const [errorReturnHora, setErrorReturnHora] = useState("");

  const wrapperRef = useRef(null);

  useEffect(() => {
    if (date && dateReturn) {
      setErrorFecha(dateReturn < date ? t("filterCalendar.errorDate") : "");
    }
  }, [date, dateReturn]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target))
        setSugerencias([]);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => { setPickupDate && setPickupDate(date); }, [date]);
  useEffect(() => { setReturnDate && setReturnDate(dateReturn); }, [dateReturn]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSeleccionado("");
    setErrorSucursal("");
    if (!value.trim()) { setSugerencias([]); return; }
    setSugerencias(branches.filter(s => s.toLowerCase().includes(value.toLowerCase())));
  };

  const handleSelect = (sucursal) => {
    setQuery(sucursal);
    setSeleccionado(sucursal);
    setSugerencias([]);
  };

  const validarHora = (h) => {
    if (!h) return false;
    const [hh] = h.split(":").map(Number);
    return hh >= 8 && hh <= 18;
  };

  const handleSubmit = () => {
    setErrorSucursal("");
    setErrorHora("");
    setErrorReturnHora("");
    setSuccess("");

    if (!seleccionado) {
      setErrorSucursal(t("filterCalendar.errorBranch"));
      return;
    }
    if (!validarHora(hora)) {
      setErrorHora(t("filterCalendar.errorHour"));
      return;
    }
    if (!validarHora(returnhora)) {
      setErrorReturnHora(t("filterCalendar.errorHour"));
      return;
    }

    onSearch({ branch: seleccionado, startDate: date, endDate: dateReturn });
    setSuccess(t("filterCalendar.success"));
  };

  return (
    <form
      className={`filter ${variant}`}
      onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
    >
      <div className="field" ref={wrapperRef}>
        <label className="label-filter1">{t("filterCalendar.deliveryLocation")}</label>
        <input
          className={`input-container ${errorSucursal ? "inputInvalid" : ""}`}
          value={query}
          onChange={handleChange}
          placeholder="Ej: Bogotá..."
          autoComplete="off"
          required
        />
        {errorSucursal && <div className="message-error">{errorSucursal}</div>}
        {sugerencias.length > 0 && (
          <ul className="sucursal-dropdown">
            {sugerencias.map((s, i) => (
              <li key={i} onMouseDown={(e) => e.preventDefault()} onClick={() => handleSelect(s)}>
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="field">
        <label className="label-filter1">{t("filterCalendar.deliveryDate")}</label>
        <input
          type="date"
          className={`input-container ${errorFecha ? "inputInvalid" : ""}`}
          min={today}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {errorFecha && <div className="message-error">{errorFecha}</div>}
      </div>

      <div className="field">
        <label className="label-filter1">{t("filterCalendar.deliveryHour")}</label>
        <input
          type="time"
          className={`input-container ${errorHora ? "inputInvalid" : ""}`}
          value={hora}
          onChange={(e) => { setHora(e.target.value); setErrorHora(""); }}
        />
        {errorHora && <div className="message-error">{errorHora}</div>}
      </div>

      <div className="field">
        <label className="label-filter1">{t("filterCalendar.returnDate")}</label>
        <input
          type="date"
          className="input-container"
          min={date}
          value={dateReturn}
          onChange={(e) => setDateReturn(e.target.value)}
        />
      </div>

      <div className="field">
        <label className="label-filter1">{t("filterCalendar.returnHour")}</label>
        <input
          type="time"
          className={`input-container ${errorReturnHora ? "inputInvalid" : ""}`}
          value={returnhora}
          onChange={(e) => { setReturnHora(e.target.value); setErrorReturnHora(""); }}
        />
        {errorReturnHora && <div className="message-error">{errorReturnHora}</div>}
      </div>

      <button type="submit" className="btn-search">
        {t("filterCalendar.search")}
      </button>

      {success && <p className="success">{success}</p>}
    </form>
  );
}

export default FilterCalendar;