import "./Filtrer.css";
import { FaCar, FaArrowAltCircleDown } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function FiltrerType({ cars = [], onFilter }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const types = [...new Set(cars.map((c) => c.type))];

  const handleSelect = (type) => {
    const newSelected = selected === type ? "" : type;
    setSelected(newSelected);
    onFilter(newSelected);
    setOpen(false);
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
              <span>{selected || t("filtersHome.type")}</span>
            </div>

            <FaArrowAltCircleDown
              className={`icono-flecha ${open ? "rotade" : ""}`}
            />
          </button>

          <div className="dropdown">
            <div className="dropdown-section">
              <h4 className="dropdown-title">
                {t("filtersHome.type") || "Categorías"}
              </h4>

              <ul>
                {types.map((type) => (
                  <li key={type}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selected === type}
                        onChange={() => handleSelect(type)}
                      />

                      <span className="item-label">{type}</span>
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

export default FiltrerType;