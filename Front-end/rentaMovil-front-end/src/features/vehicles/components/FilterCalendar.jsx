import { useState, useEffect, useRef } from "react";
import "./FilterCalendar.css";

function FilterCalendar() {
  const today = new Date().toISOString().split("T")[0];

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
  const [hora, setHora] = useState("");
  const [fecha, setFecha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setSugerencias([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSeleccionado("");
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
    setError("");
  };

  const validarHora = (hora) => {
    if (!hora) return false;
    const [h] = hora.split(":").map(Number);
    return h >= 8 && h <= 18;
  };

  const handleSubmit =  async () => {
    /*
    const results = await fetch(`/api/cars?sucursal=${seleccionado}&fecha=${fecha}&hora=${hora}`);
    const data = await results.json();*/
    setError("");
    setSuccess("");

    if (!seleccionado) {
      setError("Selecciona una sucursal válida de la lista");
      return;
    }
    if (!fecha) {
      setError("Selecciona una fecha");
      return;
    }
    if (!validarHora(hora)) {
      setError("Hora inválida — selecciona entre 8:00 y 18:00");
      return;
    }
    console.log({ sucursal: seleccionado, fecha, hora });
  };

  return (
  <form className="filter-overlay" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>

    <div className="field" ref={wrapperRef}>
      <label className="label-filter">Lugar de recogida</label>
      <input
        className="input-container"
        value={query}
        onChange={handleChange}
        placeholder="Ej: Bogotá..."
        autoComplete="off"
        required
      />
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
      <label className="label-filter">Fecha</label>
      <input
        type="date"
        className="input-container"
        min={today}
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        required
      />
    </div>

    <div className="field">
      <label className="label-filter">Hora</label>
      <input
        type="time"
        className="input-container"
        value={hora}
        onChange={(e) => setHora(e.target.value)}
        required
      />
    </div>

    <button type="submit" className="btn-search">Buscar</button>

  </form>
);
}

export default FilterCalendar;