import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FiShield,
  FiDollarSign,
  FiStar,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiInfo,
  FiAlertCircle,
} from "react-icons/fi";
import NavBarAdmin from "../../../../shared/components/layout/NavBarAdmin";
import FooterAdmin from "../../../../shared/components/layout/FooterAdmin";
import { InsuranceTypesMock } from "../services/InsuranceTypesMock";
import "./InsuranceTypes.css";

export default function InsuranceTypes() {
  const { t } = useTranslation();

  const [types, setTypes] = useState(InsuranceTypesMock);
  const [editingItem, setEditingItem] = useState(undefined);
  const [costError, setCostError] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);

  const isModalOpen = editingItem !== undefined;
  const isDeleteModalOpen = deletingItem !== null;

  useEffect(() => {
    document.body.style.overflow = isModalOpen || isDeleteModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen, isDeleteModalOpen]);

  const avgCost = types.length
    ? Math.round(types.reduce((sum, i) => sum + i.price, 0) / types.length)
    : 0;
  const recommended =
    types.find((i) => i.tag === "premium") || types[0] || null;

  const openCreateModal = () => {
    setCostError(false);
    setEditingItem(null);
  };

  const openEditModal = (item) => {
    setCostError(false);
    setEditingItem(item);
  };

  const closeModal = () => setEditingItem(undefined);

  const openDeleteModal = (item) => setDeletingItem(item);
  const closeDeleteModal = () => setDeletingItem(null);

  const handleConfirmDelete = () => {
    setTypes((prev) => prev.filter((i) => i.id !== deletingItem.id));
    closeDeleteModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const price = Number(data.get("price"));

    if (!price || price <= 0) {
      setCostError(true);
      return;
    }

    const name = data.get("name");
    const description = data.get("description");

    if (editingItem) {
      setTypes((prev) =>
        prev.map((i) =>
          i.id === editingItem.id ? { ...i, name, description, price } : i
        )
      );
    } else {
      setTypes((prev) => [
        ...prev,
        { id: Date.now(), name, description, price, tag: null },
      ]);
    }
    closeModal();
  };

  return (
    <div className="it-page">
      <NavBarAdmin />

      <div className="it-wrapper">
        <div className="it-header">
          <div>
            <h1 className="it-title">{t("insuranceTypes.title")}</h1>
            <p className="it-subtitle">{t("insuranceTypes.subtitle")}</p>
          </div>
          <button className="it-btn-add" onClick={openCreateModal}>
            <FiPlus /> {t("insuranceTypes.btnAdd")}
          </button>
        </div>

        <div className="it-metrics">
          <div className="it-metric">
            <span className="it-metric-icon blue">
              <FiShield />
            </span>
            <div>
              <p className="it-metric-label">{t("insuranceTypes.metricPlans")}</p>
              <p className="it-metric-value">
                {t("insuranceTypes.metricPlansValue", { count: types.length })}
              </p>
            </div>
          </div>
          <div className="it-metric">
            <span className="it-metric-icon amber">
              <FiDollarSign />
            </span>
            <div>
              <p className="it-metric-label">{t("insuranceTypes.metricAvg")}</p>
              <p className="it-metric-value">
                $ {avgCost.toLocaleString("es-CO")}{" "}
                <span className="it-metric-unit">{t("insuranceTypes.perDay")}</span>
              </p>
            </div>
          </div>
          <div className="it-metric">
            <span className="it-metric-icon emerald">
              <FiStar />
            </span>
            <div>
              <p className="it-metric-label">{t("insuranceTypes.metricRecommended")}</p>
              <p className="it-metric-value">{recommended ? recommended.name : "—"}</p>
            </div>
          </div>
        </div>

        <div className="it-card">
          <div className="it-table-wrap">
            <table className="it-table">
              <thead>
                <tr>
                  <th>{t("insuranceTypes.colName")}</th>
                  <th>{t("insuranceTypes.colDetail")}</th>
                  <th>{t("insuranceTypes.colCost")}</th>
                  <th className="right">{t("insuranceTypes.colActions")}</th>
                </tr>
              </thead>
              <tbody>
                {types.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="it-name">{item.name}</div>
                    </td>
                    <td className="it-desc">{item.description}</td>
                    <td className="it-cost">
                      $ {item.price.toLocaleString("es-CO")}
                      <span className="it-cost-unit">{t("insuranceTypes.perDay")}</span>
                    </td>
                    <td className="right">
                      <div className="it-actions">
                        <button
                          className="it-btn-edit"
                          aria-label={t("insuranceTypes.editAria", { name: item.name })}
                          onClick={() => openEditModal(item)}
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="it-btn-delete"
                          aria-label={t("insuranceTypes.deleteAria", { name: item.name })}
                          onClick={() => openDeleteModal(item)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {types.length === 0 && (
            <div className="it-empty">{t("insuranceTypes.emptyState")}</div>
          )}

          <div className="it-notice">
            <FiInfo />
            <span>
              <strong>{t("insuranceTypes.noticeTitle")}</strong>{" "}
              {t("insuranceTypes.noticeText")}
            </span>
          </div>
        </div>
      </div>

      <FooterAdmin />

      {isModalOpen && (
        <div className="it-modal-overlay" onClick={closeModal}>
          <div className="it-modal" onClick={(e) => e.stopPropagation()}>
            <div className="it-modal-header">
              <h3>
                <FiShield />
                {editingItem
                  ? t("insuranceTypes.modal.editTitle")
                  : t("insuranceTypes.modal.createTitle")}
              </h3>
              <button
                type="button"
                className="it-modal-close"
                onClick={closeModal}
                aria-label={t("insuranceTypes.modal.close")}
              >
                <FiX />
              </button>
            </div>

            <form id="insuranceForm" className="it-modal-form" onSubmit={handleSubmit}>
              <label className="it-field">
                {t("insuranceTypes.modal.name")}
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={editingItem?.name ?? ""}
                  placeholder={t("insuranceTypes.modal.namePlaceholder")}
                />
              </label>

              <label className="it-field">
                {t("insuranceTypes.modal.description")}
                <textarea
                  name="description"
                  rows={3}
                  required
                  defaultValue={editingItem?.description ?? ""}
                  placeholder={t("insuranceTypes.modal.descriptionPlaceholder")}
                />
              </label>

              <div className="it-field">
                {t("insuranceTypes.modal.cost")}
                <div className="it-cost-input">
                  <span>COP $</span>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="1000"
                    defaultValue={editingItem?.price ?? ""}
                    placeholder="0"
                    onChange={() => costError && setCostError(false)}
                  />
                </div>
                {costError && (
                  <p className="it-error-message">
                    <FiAlertCircle /> {t("insuranceTypes.modal.costError")}
                  </p>
                )}
                <p className="it-cost-hint">
                  <FiInfo /> {t("insuranceTypes.modal.costHint")}
                </p>
              </div>
            </form>

            <div className="it-modal-footer">
              <button type="button" className="it-btn-secondary" onClick={closeModal}>
                {t("insuranceTypes.modal.cancel")}
              </button>
              <button type="submit" form="insuranceForm" className="it-btn-primary">
                {t("insuranceTypes.modal.save")}
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="it-modal-overlay" onClick={closeDeleteModal}>
          <div className="it-modal it-modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="it-modal-header">
              <h3>
                <FiAlertCircle className="it-icon-danger" />
                {t("insuranceTypes.deleteModal.title")}
              </h3>
              <button
                type="button"
                className="it-modal-close"
                onClick={closeDeleteModal}
                aria-label={t("insuranceTypes.modal.close")}
              >
                <FiX />
              </button>
            </div>

            <div className="it-modal-form">
              <p className="it-delete-text">
                {t("insuranceTypes.deleteModal.text", { name: deletingItem?.name })}
              </p>
            </div>

            <div className="it-modal-footer">
              <button type="button" className="it-btn-secondary" onClick={closeDeleteModal}>
                {t("insuranceTypes.modal.cancel")}
              </button>
              <button type="button" className="it-btn-danger" onClick={handleConfirmDelete}>
                {t("insuranceTypes.deleteModal.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
