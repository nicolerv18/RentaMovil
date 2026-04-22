import "./AdminPanel.css";
import flecha from "../../../../assets/img/flecha.png";
import { useState } from "react";
import { Link } from "react-router-dom";

function AdminPanel({ open, onClose }) {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div>
      <aside className={`admin-panel ${open ? "active" : ""}`}>
        <h2>Panel Administrativo</h2>
        
        <div className="admin-section">
          <div className="admin-item" onClick={() => toggleSection('vehiculo')}>
            <span className="admin-icon">*</span>
            <p>Vehiculo</p>
            <img
              src={flecha}
              className={`icono-flecha ${expandedSection === 'vehiculo' ? 'rotated' : ''}`}
            />
          </div>
          {expandedSection === 'vehiculo' && (
            <div className="admin-subsection">
              <Link to="/RegisterVehicle" className="admin-subitem" onClick={onClose}>• Agregar Vehiculo</Link>
              <Link to="/CheckStatus" className="admin-subitem" onClick={onClose}>• Consultar Estado</Link>
            </div>
          )}
        </div>

        <div className="admin-section">
          <div className="admin-item" onClick={() => toggleSection('localizacion')}>
            <span className="admin-icon">*</span>
            <p>Localizacion</p>
            <img
              src={flecha}
              className={`icono-flecha ${expandedSection === 'localizacion' ? 'rotated' : ''}`}
            />
          </div>
          {expandedSection === 'localizacion' && (
            <div className="admin-subsection">
              <Link to="/Mapa" className="admin-subitem" onClick={onClose}>• Mapa</Link>
              <Link to="/HistorialRutas" className="admin-subitem" onClick={onClose}>• Historial Rutas</Link>
            </div>
          )}
        </div>

        <div className="admin-section">
          <div className="admin-item" onClick={() => toggleSection('mantenimiento')}>
            <span className="admin-icon">*</span>
            <p>Mantenimiento</p>
            <img
              src={flecha}
              className={`icono-flecha ${expandedSection === 'mantenimiento' ? 'rotated' : ''}`}
            />
          </div>
          {expandedSection === 'mantenimiento' && (
            <div className="admin-subsection">
              <Link to="/Maintenance" className="admin-subitem" onClick={onClose}>• Nuevo Mantenimiento</Link>
              <Link to="/Maintenance" className="admin-subitem" onClick={onClose}>• Historial Mantenimiento</Link>
            </div>
          )}
        </div>

        <div className="admin-section">
          <div className="admin-item" onClick={() => toggleSection('contratos')}>
            <span className="admin-icon">*</span>
            <p>Contratos</p>
            <img
              src={flecha}
              className={`icono-flecha ${expandedSection === 'contratos' ? 'rotated' : ''}`}
            />
          </div>
          {expandedSection === 'contratos' && (
            <div className="admin-subsection">
              <Link to="/Contract" className="admin-subitem" onClick={onClose}>• Nuevo Contrato</Link>
              <Link to="/ContractHistory" className="admin-subitem" onClick={onClose}>• Historial Contratos</Link>
            </div>
          )}
        </div>
      </aside>

      {open && <div className="admin-overlay" onClick={onClose}></div>}
    </div>
  );
}

export default AdminPanel;
