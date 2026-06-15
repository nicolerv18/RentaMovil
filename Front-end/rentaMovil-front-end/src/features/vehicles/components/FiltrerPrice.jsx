import "./Filtrer.css";
import { FaDollarSign, FaArrowAltCircleDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function FiltrerPrice({ cars = [], onFilter }) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const prices = cars.map((c) => c.price);

  const minPriceData = prices.length ? Math.min(...prices) : 0;
  const maxPriceData = prices.length ? Math.max(...prices) : 0;

  const [range, setRange] = useState([
    minPriceData,
    maxPriceData,
  ]);

  useEffect(() => {
    setRange([minPriceData, maxPriceData]);
  }, [minPriceData, maxPriceData]);

  const handleApply = () => {
    const filter = {
      min: range[0],
      max: range[1],
    };

    setSelected(
      `$${range[0].toLocaleString()} - $${range[1].toLocaleString()}`
    );

    onFilter(filter);
    setOpen(false);
  };

  const handleClear = () => {
    setRange([minPriceData, maxPriceData]);
    setSelected("");

    onFilter(null);
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
              <FaDollarSign className="icon2" />

              <span>
                {selected || t("filtersHome.price")}
              </span>
            </div>

            <FaArrowAltCircleDown
              className={`icono-flecha ${open ? "rotade" : ""}`}
            />
          </button>

          <div className="dropdown dropdown-price-slider">
            <h4 className="price-title">
              {t("filtersHome.price") || "Precio Total"}
            </h4>

            <div className="slider-container">
              <Slider
                range
                min={minPriceData}
                max={maxPriceData}
                value={range}
                onChange={setRange}
              />
            </div>

            <div className="price-values">
              <div className="price-box">
                <span>
                  {t("filtersHome.min") || "Mínimo"}
                </span>

                <strong>
                  ${range[0].toLocaleString()}
                </strong>
              </div>

              <div className="price-box">
                <span>
                  {t("filtersHome.max") || "Máximo"}
                </span>

                <strong>
                  ${range[1].toLocaleString()}
                </strong>
              </div>
            </div>

            <div className="price-actions">
              <button
                type="button"
                className="btn-price"
                onClick={handleApply}
              >
                {t("filtersHome.apply") || "Aplicar"}
              </button>

              <button
                type="button"
                className="btn-price btn-clear"
                onClick={handleClear}
              >
                {t("filtersHome.clear") || "Limpiar"}
              </button>
            </div>
          </div>
        </li>
      </ul>
    </aside>
  );
}

export default FiltrerPrice;