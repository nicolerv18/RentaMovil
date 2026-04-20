import "./Footer.css";
import { FaCar } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
return (
    <footer>
    <div className="footer-container">
        <div className="footer-links">
        <h3>Enlaces</h3>
        <div className="links">
        <Link to="/home">Inicio</Link>
        <Link to="/notification">Notificaciones</Link>
        <Link to="/count">Cuenta</Link>

    </div>
        </div>
        <div className="footer-brand">
            <h2>
                <FaCar className="icon2" />
                RentaMovil
            </h2>
            <p>Tu plataforma de alquiler de vehículos</p>
            </div>
        <div className="footer-contact">
        <h3>Contáctanos</h3>
        <p>📞 3164763160</p>
        <p> 📍Calle 25 #36-60</p>
        </div>
    </div>

    <div className="footer-bottom">
        <p>© 2026 RentaMovil - Todos los derechos reservados</p>
    </div>
    </footer>
);
}

export default Footer;