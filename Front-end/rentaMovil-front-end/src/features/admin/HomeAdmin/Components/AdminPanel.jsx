import "./AdminPanel.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";
import { FaCar } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { LiaFileContractSolid } from "react-icons/lia";
import { useTranslation } from "react-i18next";
function AdminPanel({ open, onClose }) {
  const { t } = useTranslation();
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div>
      <aside className={`admin-panel ${open ? "active" : ""}`}>
        <h2>{t('adminPanel.title')}</h2>
        
        <div className="admin-section">
          <div className="admin-item" onClick={() => toggleSection('vehiculo')}>
            <span className="admin-icon"><FaCar /></span>
            <p>{t('adminPanel.vehicle')}</p>
            <TiArrowSortedDown
              className={`icono-flecha ${expandedSection === 'vehiculo' ? 'rotated' : ''}`}
            />
          </div>
          {expandedSection === 'vehiculo' && (
            <div className="admin-subsection">
              <Link to="/RegisterVehicle" className="admin-subitem" onClick={onClose}>• {t('adminPanel.ve-agg')}</Link>
              <Link to="/CheckStatus" className="admin-subitem" onClick={onClose}>• {t('adminPanel.ve-state')}</Link>
            </div>
          )}
        </div>

        <div className="admin-section">
          <div className="admin-item" onClick={() => toggleSection('localizacion')}>
            <span className="admin-icon"><FaMapMarkedAlt /></span>
            <p>{t('adminPanel.location')}</p>
            <TiArrowSortedDown
              className={`icono-flecha ${expandedSection === 'localizacion' ? 'rotated' : ''}`}
            />
          </div>
          {expandedSection === 'localizacion' && (
            <div className="admin-subsection">
              <Link to="/Mapa" className="admin-subitem" onClick={onClose}>• {t('adminPanel.loc-map')}</Link>
              <Link to="/HistorialRutas" className="admin-subitem" onClick={onClose}>• {t('adminPanel.loc-routes')}</Link>
            </div>
          )}
        </div>

        <div className="admin-section">
          <div className="admin-item" onClick={() => toggleSection('mantenimiento')}>
            <span className="admin-icon"><FaTools /></span>
            <p>{t('adminPanel.maintenance')}</p>
            <TiArrowSortedDown
              className={`icono-flecha ${expandedSection === 'mantenimiento' ? 'rotated' : ''}`}
            />
          </div>
          {expandedSection === 'mantenimiento' && (
            <div className="admin-subsection">
              <Link to="/Maintenance" className="admin-subitem" onClick={onClose}>• {t('adminPanel.man-new')}</Link>
              <Link to="/History" className="admin-subitem" onClick={onClose}>• {t('adminPanel.man-history')}</Link>
            </div>
          )}
        </div>

        <div className="admin-section">
          <div className="admin-item" onClick={() => toggleSection('contratos')}>
            <span className="admin-icon"><LiaFileContractSolid /></span>
            <p>{t('adminPanel.contracts')}</p>
            <TiArrowSortedDown
              className={`icono-flecha ${expandedSection === 'contratos' ? 'rotated' : ''}`}
            />
          </div>
          {expandedSection === 'contratos' && (
            <div className="admin-subsection">
              <Link to="/Contract" className="admin-subitem" onClick={onClose}>• {t('adminPanel.con-new')}</Link>
              <Link to="/ContractHistory" className="admin-subitem" onClick={onClose}>• {t('adminPanel.con-history')}</Link>
            </div>
          )}
        </div>
      </aside>

      {open && <div className="admin-overlay" onClick={onClose}></div>}
    </div>
  );
}

export default AdminPanel;
