import "./Filtrer.css";
import { FaCar, FaArrowAltCircleDown } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function FiltrerBrand({ cars = [], onFilter }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const brands = [...new Set(cars.map(c => c.brand))];

  const handleSelect = (brand) => {
    const newSelected = selected === brand ? "" : brand;
    setSelected(newSelected);
    onFilter(newSelected);
  };

  return (
    <aside className="filtrer-container">
      <ul className="nav-container">
        <li className={open ? "active" : ""}>
          <button className="btn-filtrar" onClick={() => setOpen(!open)}>
            {t('filtersHome.brand')} <FaCar className="icon2" />
            <FaArrowAltCircleDown className={`icono-flecha ${open ? "rotade" : ""}`} />
          </button>
          <ul className="dropdown">
            {brands.map((brand) => (
              <li key={brand} className={selected === brand ? "selected" : ""} onClick={() => handleSelect(brand)}>
                <a>{brand}</a>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </aside>
  );
}

export default FiltrerBrand;