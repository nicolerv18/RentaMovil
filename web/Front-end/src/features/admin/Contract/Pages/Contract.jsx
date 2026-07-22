import NavBarAdmin from "../../../../shared/components/layout/NavBarAdmin";
import FooterAdmin from "../../../../shared/components/layout/FooterAdmin";
import "./Contract.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Contract() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="contract">
      <NavBarAdmin />

      <div className="contract-wrapper">
        <h1 className="contract-title">{t("contract.title")}</h1>
        <p className="contract-subtitle">{t("contract.subtitle")}</p>

        {/* Cliente */}
        <div className="contract-card">
          <div className="contract-card-header">
            <span className="card-dot-cliente"></span>
            <span>{t("contract.client.sectionTitle")}</span>
          </div>
          <div className="contract-card-body">
            <div className="field full-width">
              <label>{t("contract.client.selectLabel")}</label>
              <select>
                <option value="">{t("contract.client.selectPlaceholder")}</option>
              </select>
              <Link to="/RegisterClient" className="field-hint">
                {t("contract.client.registerLink")}
              </Link>
            </div>

            <div className="field">
              <label>{t("contract.client.startDate")}</label>
              <input type="date" />
            </div>

            <div className="field">
              <label>{t("contract.client.contractValue")}</label>
              <input type="text" placeholder={t("contract.client.contractValuePlaceholder")} />
            </div>

            <div className="field full-width">
              <label>{t("contract.client.observations")}</label>
              <textarea placeholder={t("contract.client.observationsPlaceholder")}></textarea>
            </div>
          </div>
        </div>

        {/* Vehículo */}
        <div className="contract-card">
          <div className="contract-card-header">
            <span className="card-dot-vehiculo" style={{ background: 'var(--button)' }}></span>
            <span>{t("contract.vehicle.sectionTitle")}</span>
          </div>
          <div className="contract-card-body">
            <div className="field full-width">
              <label>{t("contract.vehicle.selectLabel")}</label>
              <select>
                <option value="">{t("contract.vehicle.selectPlaceholder")}</option>
              </select>
              <Link to="/RegisterVehicle" className="field-hint">
                {t("contract.vehicle.registerLink")}
              </Link>
            </div>

            <div className="field">
              <label>{t("contract.vehicle.endDate")}</label>
              <input type="date" />
            </div>

            <div className="field">
              <label>{t("contract.vehicle.plate")}</label>
              <input type="text" placeholder={t("contract.vehicle.platePlaceholder")} />
            </div>

            <div className="field full-width">
              <label>{t("contract.vehicle.observations")}</label>
              <textarea placeholder={t("contract.vehicle.observationsPlaceholder")}></textarea>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="contract-actions">
          <button className="btn-contract btn-back" onClick={() => navigate(-1)}>
            {t("contract.actions.back")}
          </button>
          <button className="btn-contract btn-history" onClick={() => navigate('/ContractHistory')}>
            {t("contract.actions.history")}
          </button>
          <button className="btn-contract btn-create">
            {t("contract.actions.create")}
          </button>
        </div>
      </div>

      <FooterAdmin />
    </div>
  );
}

export default Contract;
