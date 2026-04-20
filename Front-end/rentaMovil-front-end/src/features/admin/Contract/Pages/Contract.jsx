import Navbar from "../../../shared/components/layout/Navbar";
import Footer from "../../../shared/components/layout/Footer";
import "./Contract.css";
import { useNavigate } from "react-router-dom";

function Contract() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="contract-container">
        <h1 className="contract-title">Crear nuevo contrato</h1>
        
        <div className="contract-form">
          {/* Sección Izquierda - Cliente */}
          <div className="form-section left-section">
            <div className="form-group">
              <select className="form-select">
                <option>Ingrese o seleccione un cliente</option>
              </select>
              <a href="#" className="register-link">Registre un nuevo cliente aqui.</a>
            </div>

            <div className="form-group">
              <input type="date" placeholder="Fecha inicio del contrato" className="form-input" />
            </div>

            <div className="form-group">
              <input type="text" placeholder="" className="form-input" />
            </div>

            <div className="form-group">
              <label>Observaciones:</label>
              <textarea placeholder="" className="form-textarea"></textarea>
            </div>
          </div>

          {/* Sección Derecha - Vehículo */}
          <div className="form-section right-section">
            <div className="form-group">
              <select className="form-select">
                <option>Ingrese o seleccione un vehiculo</option>
              </select>
              <a href="#" className="register-link">Registre un nuevo vehiculo aqui.</a>
            </div>

            <div className="form-group">
              <input type="date" placeholder="Fecha fin del contrato" className="form-input" />
            </div>

            <div className="form-group">
              <input type="text" placeholder="" className="form-input" />
            </div>

            <div className="form-group">
              <label>Observaciones:</label>
              <textarea placeholder="" className="form-textarea"></textarea>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="contract-actions">
          <button className="btn btn-secondary">Historial de contratos</button>
          <button className="btn btn-primary">Crear contrato</button>
          <button className="btn btn-tertiary" onClick={() => navigate(-1)}>regresar</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contract;
