import "./Filtrer.css";
import { FaCar, FaArrowAltCircleDown } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function FiltrerType({ cars = [], onFilter }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const types = [...new Set(cars.map(c => c.type))];

  const handleSelect = (type) => {
    const newSelected = selected === type ? "" : type;
    setSelected(newSelected);
    onFilter(newSelected);
  };

  return (
    <aside className="filtrer-container">
      <ul className="nav-container">
        <li className={open ? "active" : ""}>
          <button className="btn-filtrar" onClick={() => setOpen(!open)}>
            {t('filtersHome.type')} <FaCar className="icon2" />
            <FaArrowAltCircleDown className={`icono-flecha ${open ? "rotade" : ""}`} />
          </button>
          <ul className="dropdown">
            {types.map((type) => (
              <li key={type} className={selected === type ? "selected" : ""} onClick={() => handleSelect(type)}>
                <a>{type}</a>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </aside>
  );
}

export default FiltrerType;