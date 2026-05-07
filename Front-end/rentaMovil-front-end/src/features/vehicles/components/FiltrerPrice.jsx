import "./Filtrer.css";
import { FaCar, FaArrowAltCircleDown } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function FiltrerPrice({ cars = [], onFilter }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const prices = cars.map(c => c.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const mid1 = Math.round((maxPrice - minPrice) / 3 + minPrice);
  const mid2 = Math.round((maxPrice - minPrice) / 3 * 2 + minPrice);

  const priceRanges = prices.length ? [
    { label: `$${minPrice.toLocaleString()} - $${mid1.toLocaleString()}`,  min: minPrice, max: mid1  },
    { label: `$${mid1.toLocaleString()} - $${mid2.toLocaleString()}`,      min: mid1,     max: mid2  },
    { label: `$${mid2.toLocaleString()} - $${maxPrice.toLocaleString()}`,  min: mid2,     max: maxPrice },
  ] : [];

  const handleSelect = (range) => {
    const newSelected = selected === range.label ? "" : range.label;
    setSelected(newSelected);
    onFilter(newSelected ? range : null);
  };

  return (
    <aside className="filtrer-container">
      <ul className="nav-container">
        <li className={open ? "active" : ""}>
          <button className="btn-filtrar" onClick={() => setOpen(!open)}>
            {t('filtersHome.price')} <FaCar className="icon2" />
            <FaArrowAltCircleDown className={`icono-flecha ${open ? "rotade" : ""}`} />
          </button>
          <ul className="dropdown">
            {priceRanges.map((range) => (
              <li key={range.label} className={selected === range.label ? "selected" : ""} onClick={() => handleSelect(range)}>
                <a>{range.label}</a>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </aside>
  );
}

export default FiltrerPrice;