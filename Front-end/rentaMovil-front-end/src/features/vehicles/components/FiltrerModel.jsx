import "./Filtrer.css";
import flecha from "../../../assets/img/flecha.png";
import { FaCar, FaArrowAltCircleDown } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function Filtrer() {
  const {t} = useTranslation();
  const [open, setOPen] = useState(false);

  return (
    <aside className="filtrer-container">
      <ul className="nav-container">
        <li className={open ? "active" : ""}>
          <button className="btn-filtrar" onClick={() => setOPen(!open)}>
            {t('filtersHome.model')} <FaCar className="icon2" />{" "}
            <FaArrowAltCircleDown
              src={flecha}
              alt=""
              className={`icono-flecha ${open ? "rotade" : ""}`}
            />
          </button>
          <ul className="dropdown">
            <li><a>2000</a></li>
            <li><a>2010 - 2015</a></li>
            <li><a>2015 - 2020</a></li>
            <li><a>2020+</a></li>
          </ul>
        </li>
      </ul>
    </aside>
  );
}


export default Filtrer;