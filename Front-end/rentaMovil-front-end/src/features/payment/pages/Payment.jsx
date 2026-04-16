import { useNavigate } from "react-router-dom";
import ButtonBack from "../../../shared/components/ButtonBack";
import ImgMapa from '../../../assets/MapaNeivaPago.png';
import Navbar from "../../../shared/components/layout/Navbar";
import Footer from '../../../shared/components/layout/Footer';

import "./Payment.css";


function Payment() {
  const navigate = useNavigate();
  return (
  <>
    <Navbar />
    <div>
      {/* HEADER */}
      <div className="header-page">
        <ButtonBack onClick={() => navigate(-1)} />
        <h1>Payment</h1>
      </div>
    {/* MAIN CONTENT */}
    <div className="container">
      <div className="left-section">
        <img src={ImgMapa} alt="Mapa" className="map-image" />
        <div className="Details-ubi-1">
          <p>12/07/26 10:00 AM</p>
          <p>Descripcion de ubicacion</p>
        </div>
        <div className="Details-ubi-2">
          <p>13/07/26 07:00 pm</p>
          <p>Descripcion de ubicacion 2 </p>
        </div>
      </div>
      <div className="right-section">
        <div className="resumen-section">
          <h2>Resumen</h2>
          <div className="resumen-item">
            <p>3 Dias X $403.000</p>
            <p>Seguro todo riesgo</p>
          </div>
          <div className="total-section">
            <h3>TOTAL</h3>
            <p className="total-price">$ 403.000</p>
          </div>
        </div>

        <div className="monto-section">
          <h3>Monto a pagar</h3>
          <p className="monto-desc">recuerde que debe ser mas del 30% del pago total</p>
          <div className="monto-input">
            <select defaultValue="30">
              <option value="30">30%</option>
              <option value="50">50%</option>
              <option value="70">70%</option>
              <option value="100">100%</option>
            </select>
          </div>
        </div>
        <div className="responsable-section">
          <h3>Responsable Reserva</h3>
          <input type="text" placeholder="Nombre" />
          <input type="text" placeholder="Ciudad" />
          <input type="text" placeholder="Direccion" />
        </div>
      </div>
    </div>
    </div>
    <Footer />
  </>
  );
}
export default Payment;