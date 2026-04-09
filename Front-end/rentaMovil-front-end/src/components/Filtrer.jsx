import "./Filtrer.css";
import flecha from "../assets/img/flecha.png";
import { FaCar } from "react-icons/fa";
import { useState } from "react";

function Filtrer() {
  const [open, setOPen] = useState(false);

  return (
    <aside className="filtrer-container">
      <ul className="nav-container">
        <li className={open ? "active" : ""}>
          <button className="btn-filtrar" onClick={() => setOPen(!open)}>
            RentaMovil <FaCar className="icon2" />
            Filtrar{" "}
            <img
              src={flecha}
              alt=""
              className={`icono-flecha ${open ? "rotade" : ""}`}
            />
          </button>
          <ul className="dropdown">
            <li><a>Categoria</a></li>
            <li><a>Año</a></li>
            <li><a>Precio</a></li>
            <li><a>Combustible</a></li>
          </ul>
        </li>
      </ul>
    </aside>
  );
}

export default Filtrer;