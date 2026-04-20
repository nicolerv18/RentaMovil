import "./AdminPanel.css";
import flecha from "../../../../assets/img/flecha.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const [open, setOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="admin-panel-container">
      <button className={`btn-admin ${open ? 'hidden' : ''}`} onClick={() => setOpen(!open)}>
        <span className="hamburger-lines">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

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
              <a href="#" className="admin-subitem">• Agregar Vehiculo</a>
              <a href="#" className="admin-subitem">• Consultar Estado</a>
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
              <a href="#" className="admin-subitem">• Mapa</a>
              <a href="#" className="admin-subitem">• Historial Rutas</a>
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
              <a href="#" className="admin-subitem">• Nuevo Mantenimiento</a>
              <a href="#" className="admin-subitem">• Historial Mantenimiento</a>
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
              <a href="#" className="admin-subitem">• Nuevo Contrato</a>
              <a href="#" className="admin-subitem">• Historial Contratos</a>
            </div>
          )}
        </div>
      </aside>

      {open && <div className="admin-overlay" onClick={() => setOpen(false)}></div>}
    </div>
  );
}

export default AdminPanel;
