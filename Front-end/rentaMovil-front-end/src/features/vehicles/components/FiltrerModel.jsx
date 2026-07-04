import "./Filtrer.css";
import { FaCar, FaArrowAltCircleDown } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function FiltrerModel({ cars = [], onFilter }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const models = [...new Set(cars.map((c) => c.model))].sort();

  const handleSelect = (model) => {
    const newSelected = selected === model ? "" : model;
    setSelected(newSelected);
    onFilter(newSelected ? { min: model, max: model } : null);
  };

  return (
    <aside className="filtrer-container">
      <ul className="nav-container">
        <li className={open ? "active" : ""}>
          <button
            type="button"
            className="btn-filtrar"
            onClick={() => setOpen(!open)}
          >
            <div className="btn-filtrar-content">
              <FaCar className="icon2" />
              <span>{selected || t("filtersHome.model")}</span>
            </div>

            <FaArrowAltCircleDown
              className={`icono-flecha ${open ? "rotade" : ""}`}
            />
          </button>

          <div className="dropdown">
            <div className="dropdown-section">
              <h4 className="dropdown-title">{t("filtersHome.model") || "Modelos"}
              </h4>
              <ul>
                {models.map((model) => (
                  <li key={model}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selected === model}
                        onChange={() => handleSelect(model)}
                      />

                      <span className="item-label">{model}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </aside>
  );
}

export default FiltrerModel;