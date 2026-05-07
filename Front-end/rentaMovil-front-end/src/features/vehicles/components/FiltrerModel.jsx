import "./Filtrer.css";
import { FaCar, FaArrowAltCircleDown } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function FiltrerModel({ cars = [], onFilter }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  // Genera los modelos dinámicamente desde los datos
  const models = [...new Set(cars.map(c => c.model))].sort();

  const handleSelect = (model) => {
    const newSelected = selected === model ? "" : model;
    setSelected(newSelected);
    onFilter(newSelected ? { min: model, max: model } : null);
  };

  return (
    <aside className="filtrer-container">
      <ul className="nav-container">
        <li className={open ? "active" : ""}>
          <button className="btn-filtrar" onClick={() => setOpen(!open)}>
            {t('filtersHome.model')} <FaCar className="icon2" />
            <FaArrowAltCircleDown className={`icono-flecha ${open ? "rotade" : ""}`} />
          </button>
          <ul className="dropdown">
            {models.map((model) => (
              <li key={model} className={selected === model ? "selected" : ""} onClick={() => handleSelect(model)}>
                <a>{model}</a>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </aside>
  );
}

export default FiltrerModel;