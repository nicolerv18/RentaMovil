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
            Precio <FaCar className="icon2" />{" "}
            <FaArrowAltCircleDown
              src={flecha}
              alt=""
              className={`icono-flecha ${open ? "rotade" : ""}`}
            />
          </button>
          <ul className="dropdown">
            <li><a>0 - $50</a></li>
            <li><a>$51 - $100</a></li>
            <li><a>$101 - $200</a></li>
            <li><a>$201 - $500</a></li>
            <li><a>$501 - $1000</a></li>
            <li><a>$1000+</a></li>
          </ul>
        </li>
      </ul>
    </aside>
  );
}

export default Filtrer;