import NavBarAdmin from "../../../../shared/components/layout/NavBarAdmin";
import FooterAdmin from "../../../../shared/components/layout/FooterAdmin";
import "./Contract.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Contract() {
  const navigate = useNavigate();

  return (
    <div className="contract">
      <NavBarAdmin />

      <div className="contract-wrapper">
        <h1 className="contract-title">Nuevo contrato</h1>
        <p className="contract-subtitle">Completa los datos del cliente y el vehículo</p>

        {/* Cliente */}
        <div className="contract-card">
          <div className="contract-card-header">
            <span className="card-dot-cliente"></span>
            <span>Cliente</span>
          </div>
          <div className="contract-card-body">
            <div className="field full-width">
              <label>Seleccionar cliente</label>
              <select>
                <option value="">— Elige un cliente —</option>
              </select>
              <Link to="/RegisterClient" className="field-hint">+ Registrar nuevo cliente</Link>
            </div>

            <div className="field">
              <label>Fecha de inicio</label>
              <input type="date" />
            </div>

            <div className="field">
              <label>Valor del contrato</label>
              <input type="text" placeholder="$ 0.00" />
            </div>

            <div className="field full-width">
              <label>Observaciones</label>
              <textarea placeholder="Notas adicionales..."></textarea>
            </div>
          </div>
        </div>

        {/* Vehículo */}
        <div className="contract-card">
          <div className="contract-card-header">
            <span className="card-dot-vehiculo" style={{ background: 'var(--button)' }}></span>
            <span>Vehículo</span>
          </div>
          <div className="contract-card-body">
            <div className="field full-width">
              <label>Seleccionar vehículo</label>
              <select>
                <option value="">— Elige un vehículo —</option>
              </select>
              <Link to="/RegisterVehicle" className="field-hint">+ Registrar nuevo vehículo</Link>
            </div>

            <div className="field">
              <label>Fecha de fin</label>
              <input type="date" />
            </div>

            <div className="field">
              <label>Placa</label>
              <input type="text" placeholder="Ej: ABC-123" />
            </div>

            <div className="field full-width">
              <label>Observaciones</label>
              <textarea placeholder="Notas adicionales..."></textarea>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="contract-actions">
          <button className="btn-contract btn-back" onClick={() => navigate(-1)}>
            Regresar
          </button>
          <button className="btn-contract btn-history" onClick={() => navigate('/ContractHistory')}>
            Historial de contratos
          </button>
          <button className="btn-contract btn-create">
            Crear contrato
          </button>
        </div>
      </div>

      <FooterAdmin />
    </div>
  );
}

export default Contract;
