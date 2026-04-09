import { useNavigate } from "react-router-dom";
import ButtonBack from "../components/buttonBack";
import ImgMapa from "../assets/MapaNeivaPago.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Pago() {
  const navigate = useNavigate();
  
  return (
  <>
    <Navbar />
    <div>
      {/* HEADER */}
      <div className="header-page">
        <ButtonBack onClick={() => navigate(-1)} />
        <h1>Pago</h1>
      </div>
    {/* MAIN CONTENT */}
    <div className="container">
      <div className="left-section">
        <img src={ImgMapa} alt="Mapa" className="map-image" />
      </div>
      <div className="right-section">
        <h1>Pago</h1>
      </div>
    </div>
    </div>
    <Footer />
  </>
  );
}




export default Pago;