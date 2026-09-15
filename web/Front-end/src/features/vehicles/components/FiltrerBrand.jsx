import "./Filtrer.css";
import { FaCar, FaArrowAltCircleDown } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function FiltrerBrand({ cars = [], onFilter }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const brands = [...new Set(cars.map((c) => c.brand))];

  const handleSelect = (brand) => {
    const newSelected = selected === brand ? "" : brand;
    setSelected(newSelected);
    onFilter(newSelected);
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
              <span>{selected || t("filtersHome.brand")}</span>
            </div>

            <FaArrowAltCircleDown
              className={`icono-flecha ${open ? "rotade" : ""}`}
            />
          </button>

          <div className="dropdown">
            <div className="dropdown-section">
              <h4 className="dropdown-title">
                {t("filtersHome.brand") || "Marcas"}
              </h4>

              <ul>
                {brands.map((brand) => (
                  <li key={brand}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selected === brand}
                        onChange={() => handleSelect(brand)}
                      />

                      <span className="item-label">{brand}</span>
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

export default FiltrerBrand;