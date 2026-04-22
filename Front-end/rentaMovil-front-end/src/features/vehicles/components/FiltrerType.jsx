import "./Filtrer.css";
import flecha from "../../../assets/img/flecha.png";
import { FaCar, FaArrowAltCircleDown } from "react-icons/fa";
import { useState } from "react";

function Filtrer() {
  const [open, setOPen] = useState(false);

  return (
    <aside className="filtrer-container">
      <ul className="nav-container">
        <li className={open ? "active" : ""}>
          <button className="btn-filtrar" onClick={() => setOPen(!open)}>
            Tipo Vehiculo <FaCar className="icon2" />{" "}
            <FaArrowAltCircleDown
              src={flecha}
              alt=""
              className={`icono-flecha ${open ? "rotade" : ""}`}
            />
          </button>
          <ul className="dropdown">
            <li><a>Eléctrico</a></li>
            <li><a>Gasolina</a></li>
            <li><a>Diesel</a></li>
            <li><a>Hybrido</a></li>
          </ul>
        </li>
      </ul>
    </aside>
  );
}

export default Filtrer;