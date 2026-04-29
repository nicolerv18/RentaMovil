import { useState, useEffect, useRef } from "react";
import "./FilterCalendar.css";

function FilterCalendar({ variant = "overlay", setPickupDate, setReturnDate }) {
  
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
    "Bogotá - Centro",
    "Bogotá - Norte",
    "Medellín - Poblado",
    "Cali - Sur",
    "Barranquilla - Centro",
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
                setErrorFecha("La fecha de entrega no puede ser anterior a la de recogida");
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
    setErrorSucursal("Sucursal no válida");
    return;
  }

  if (!validarHora(hora)) {
    setError("Hora inválida (8:00 - 18:00)");
    return;
  }

  setSuccess("Búsqueda realizada");
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
        <label className="label-filter">Lugar de Entrega</label>
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
        <label className="label-filter">Fecha de entrega</label>
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
        <label className="label-filter">Hora de entrega</label>
        <input
          type="time"
          className="input-container"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />
      </div>
      <div className="field">
        <label className="label-filter">Fecha de devolución</label>
        <input
          type="date"
          className="input-container"
          min={date}
          value={dateReturn}
          onChange={(e) => setDateReturn(e.target.value)}
        />
      </div>
      <div className="field">
        <label className="label-filter">Hora de devolución</label>
        <input
          type="time"
          className="input-container"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />
      </div>
      <button type="submit" className="btn-search">
        Buscar
      </button>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </form>
  );
}

export default FilterCalendar;