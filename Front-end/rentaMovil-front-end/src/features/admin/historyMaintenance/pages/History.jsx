import React, { useState } from 'react';
import CartVehicleHistory from '../components/CartVehicleHistory';
import style from './History.module.css';
import Navbar from '../../../../shared/components/layout/Navbar.jsx';
import Footer from '../../../../shared/components/layout/Footer.jsx';
import { useForm } from 'react-hook-form';
import { AiOutlineDashboard } from 'react-icons/ai';
import ValidateDate from '../../maintenance/components/ValidateDate.jsx';
import img from "../../../../assets/carro.png";
import FiltrerStatus from "../components/FiltrerHistory.jsx";
import { useTranslation } from "react-i18next";
import NavbarAdmin from '../../../../shared/components/layout/NavBarAdmin.jsx';
const MOCK = [
  { id: '1', plate: 'ABC1323', model: 'Toyota Corolla', date: '2024-09-10T10:30:00Z', type: 'Cambio de aceite', status: 'Cancelado', notes: 'Cambio de aceite y filtro. Revisión sin observaciones.', img },
  { id: '2', plate: 'XYZ987', model: 'Kia Picanto', date: '2025-01-12T14:00:00Z', type: 'Revisión de frenos', status: 'En progreso', notes: 'Pastillas delanteras en reemplazo.', img },
  { id: '3', plate: 'QWE4546', model: 'Renault Logan', date: '2025-03-02T09:20:00Z', type: 'Alineación y balanceo', status: 'Pendiente', notes: '', img },
  { id: '4', plate: 'ABC1223', model: 'Toyota Corolla', date: '2024-09-10T10:30:00Z', type: 'Cambio de aceite', status: 'Completado', notes: 'Cambio de aceite y filtro. Revisión sin observaciones.', img },
  { id: '5', plate: 'XYZ9847', model: 'Kia Picanto', date: '2025-01-12T14:00:00Z', type: 'Revisión de frenos', status: 'En progreso', notes: 'Pastillas delanteras en reemplazo.', img },
  { id: '6', plate: 'QWE4536', model: 'Renault Logan', date: '2025-03-02T09:20:00Z', type: 'Alineación y balanceo', status: 'Pendiente', notes: '', img },
  { id: '7', plate: 'ABC1243', model: 'Toyota Corolla', date: '2024-09-10T10:30:00Z', type: 'Cambio de aceite', status: 'Cancelado', notes: 'Cambio de aceite y filtro. Revisión sin observaciones.', img },
  { id: '8', plate: 'XYZ9827', model: 'Kia Picanto', date: '2025-01-12T14:00:00Z', type: 'Revisión de frenos', status: 'En progreso', notes: 'Pastillas delanteras en reemplazo.', img },
  { id: '9', plate: 'QWE45356', model: 'Renault Logan', date: '2025-03-02T09:20:00Z', type: 'Alineación y balanceo', status: 'Pendiente', notes: '', img },
  { id: '10', plate: 'ABC1523', model: 'Toyota Corolla', date: '2024-09-10T10:30:00Z', type: 'Cambio de aceite', status: 'Completado', notes: 'Cambio de aceite y filtro. Revisión sin observaciones.', img },
  { id: '12', plate: 'XYZ9867', model: 'Kia Picanto', date: '2025-01-12T14:00:00Z', type: 'Revisión de frenos', status: 'En progreso', notes: 'Pastillas delanteras en reemplazo.', img },
  { id: '13', plate: 'QWE4566', model: 'Renault Logan', date: '2025-03-02T09:20:00Z', type: 'Alineación y balanceo', status: 'Pendiente', notes: '', img },
  { id: '11', plate: 'ABC12633', model: 'Toyota Corolla', date: '2024-09-10T10:30:00Z', type: 'Cambio de aceite', status: 'Completado', notes: 'Cambio de aceite y filtro. Revisión sin observaciones.', img },
  { id: '14', plate: 'XYZ9857', model: 'Kia Picanto', date: '2025-01-12T14:00:00Z', type: 'Revisión de frenos', status: 'En progreso', notes: 'Pastillas delanteras en reemplazo.', img },
  { id: '15', plate: 'QWE4563', model: 'Renault Logan', date: '2025-03-02T09:20:00Z', type: 'Alineación y balanceo', status: 'Pendiente', notes: '', img },
  { id: '16', plate: 'ABC12223', model: 'Toyota Corolla', date: '2024-09-10T10:30:00Z', type: 'Cambio de aceite', status: 'Completado', notes: 'Cambio de aceite y filtro. Revisión sin observaciones.', img },
  { id: '17', plate: 'XYZ98457', model: 'Kia Picanto', date: '2025-01-12T14:00:00Z', type: 'Revisión de frenos', status: 'En progreso', notes: 'Pastillas delanteras en reemplazo.', img },
  { id: '18', plate: 'QWE456345', model: 'Renault Logan', date: '2025-03-02T09:20:00Z', type: 'Alineación y balanceo', status: 'Pendiente', notes: '', img },
  { id: '19', plate: 'ABC1234', model: 'Toyota Corolla', date: '2024-09-10T10:30:00Z', type: 'Cambio de aceite', status: 'Completado', notes: 'Cambio de aceite y filtro. Revisión sin observaciones.', img },
  { id: '20', plate: 'XYZ9f87', model: 'Kia Picanto', date: '2025-01-12T14:00:00Z', type: 'Revisión de frenos', status: 'En progreso', notes: 'Pastillas delanteras en reemplazo.', img },
  { id: '23', plate: 'QWE4q56', model: 'Renault Logan', date: '2025-03-02T09:20:00Z', type: 'Alineación y balanceo', status: 'Pendiente', notes: '', img },
  { id: '21', plate: 'ABC12343', model: 'Toyota Corolla', date: '2024-09-10T10:30:00Z', type: 'Cambio de aceite', status: 'Completado', notes: 'Cambio de aceite y filtro. Revisión sin observaciones.', img },
  { id: '22', plate: 'XYZ98r7', model: 'Kia Picanto', date: '2025-01-12T14:00:00Z', type: 'Revisión de frenos', status: 'En progreso', notes: 'Pastillas delanteras en reemplazo.', img },
  { id: '24', plate: 'QWE4546', model: 'Renault Logan', date: '2025-03-02T09:20:00Z', type: 'Alineación y balanceo', status: 'Pendiente', notes: '', img },
  { id: '25', plate: 'QWE4536', model: 'Renault Logan', date: '2025-03-02T09:20:00Z', type: 'Alineación y balanceo', status: 'Pendiente', notes: '', img }

];

function History() {
  const {t} = useTranslation();
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [records, setRecords] = useState(MOCK);
  const [selected, setSelected] = useState(null);
  //agrega cambio de estado
  const [confirmDelete, setConfirmDelete] = useState(false);
  //agraga 
  // estados para facilitar la edicion de los apartados
  const [isEditing, setIsEditing] = useState(false);
  const [query, setSearch] = useState("");
  const [filterState, setFilterState] = useState("Todos");// Estado para almacenar el estado de filtro seleccionado

const filteredRecords = records
      .filter((c) => {
        const fs = String(filterState || '').toLowerCase();
        if (fs === 'todos' || fs === '') return true;
        return String(c.status || '').toLowerCase() === fs;
      })
      .filter((c) => {
        const q = String(query || '').trim().toLowerCase();
        if (!q) return true;
        return (
          String(c.model || '').toLowerCase().includes(q) ||
          String(c.plate || '').toLowerCase().includes(q) ||
          String(c.type || '').toLowerCase().includes(q)
        );
      });

  const closeModal = () => {
    setSelected(null)
    setConfirmDelete(false)
    setIsEditing(false)
  }

  const handleStatusChange = (este) => {
    const newState = este.target.value;
    //Actualizamos la lista completa de registros
    const newRegisters = records.map(r => String(r.id) === String(selected.id) ? { ...r, status: newState } : r)
    setRecords(newRegisters);

    setSelected({ ...selected, status: newState });
  }

  const deleteRecord = (id) => {
    //se filtra la lista para obtener el id recibido.
    setRecords(records.filter(r => r.id !== id));
    closeModal()
  }


  const handleSaveEdit = (data) => {
    const updated = records.map(r => r.id === selected.id ? { ...r, model: data.model, type: data.maintenanceType, date: data.date + 'T00:00:00Z', notes: data.observations, status: data.status, } : r);
    setRecords(updated);
    setSelected({ ...selected, model: data.model, type: data.maintenanceType, date: data.date, notes: data.observations, status: data.status, });// de estama manera se estaria sobre escribiendo los valores viejos por los nuevos
    setIsEditing(false);
  }

  const openEdit = (rec) => {
    setIsEditing(true);
    reset({
      model: rec.model,
      maintenanceType: rec.type,
      date: rec.date.slice(0, 10),
      observations: rec.notes,
    })
  }
  return (

    <>

      <NavbarAdmin/>
      <div className={style["history-container"]}>
        <div className={style["card-container-setSearch"]}>
        <h2 className={style["history-h2"]}>{t("History.title")}</h2>
          <FiltrerStatus query={query} setSearch={setSearch} filterState={filterState} setFilterState={setFilterState} />
        </div>
        <div className={style.list}>
          {records.map(r => (
            <CartVehicleHistory
              key={r.id}
              record={r}
              onViewMore={(rec) => {
                setSelected(rec);
              }}
            />
          ))}
        </div>

        {selected && (
          <div className={style.modalBackdrop} onClick={closeModal}>
            <div className={style["history-modal"]} onClick={(e) => e.stopPropagation()}>
              <h3>{t("History.detail")} - {selected.plate}</h3>

              {isEditing ? (
                <form onSubmit={handleSubmit(handleSaveEdit)}>

                  <label htmlFor="model">{t("MaintenanceForm.model")}</label>
                  <input
                    type="text"
                    placeholder={t("MaintenanceForm.modelPlaceholder")}

                    {...register("model", {
                      required: t("MaintenanceForm.requiredModel"),
                      minLength: { value: 2, message: t("MaintenanceForm.ModelMinLength") },
                      maxLength: { value: 30, message: t("MaintenanceForm.ModelMaxLength") },
                      pattern: {
                        value: /^[A-Za-z0-9\s\-]{2,30}$/,
                        message: t("MaintenanceForm.formatInvalidModel")
                      }
                    })}
                  />
                  {errors.model && (
                    <p className={style['error-message']}>
                      <AiOutlineDashboard /> {errors.model.message}
                    </p>
                  )}
                  <label htmlFor="maintenanceType">{t("MaintenanceForm.Type")}:</label>
                  <input
                    type="text"
                    placeholder={t("MaintenanceForm.placeholderType")}
                    list="maintenance-options"
                    {...register("maintenanceType", {
                      required: t("MaintenanceForm.requiredType"),
                      minLength: { value: 3, message: t("MaintenanceForm.minLengthType") },
                      maxLength: { value: 60, message: t("MaintenanceForm.maxLengthType") },
                      pattern: {
                        value: /^[A-Za-zÀ-ÿ0-9\s\-\,\.]{3,60}$/,
                        message: t("MaintenanceForm.invalidType")
                      }
                    })}
                  />
                  <datalist id="maintenance-options">
                    <option value={t("MaintenanceForm.options.option1")} />
                    <option value={t("MaintenanceForm.options.option2")} />
                    <option value={t("MaintenanceForm.options.option3")} />
                    <option value={t("MaintenanceForm.options.option4")} />
                    <option value={t("MaintenanceForm.options.option5")} />
                    <option value={t("MaintenanceForm.options.option6")} />
                    <option value={t("MaintenanceForm.options.option7")} />
                    <option value={t("MaintenanceForm.options.option8")} />
                    <option value={t("MaintenanceForm.options.option9")} />
                    <option value={t("MaintenanceForm.options.option10")} />
                    <option value={t("MaintenanceForm.options.option11")} />
                    <option value={t("MaintenanceForm.options.option12")} />
                    <option value={t("MaintenanceForm.options.option13")} />
                    <option value={t("MaintenanceForm.options.option14")} />
 
                  </datalist>

                  {errors.maintenanceType && (
                    <p className={style['error-message']}>
                      <AiOutlineDashboard /> {errors.maintenanceType.message}
                    </p>
                  )}
                  <label htmlFor="date">{t("MaintenanceForm.date")}</label>
                  <input type="date" placeholder={t("MaintenanceForm.datePlaceholder")}
                    {...register("date", {
                      required: t("MaintenanceForm.requiredDate"),
                      validate: ValidateDate
                    })}
                  />
                  {errors.date && (
                    <p className={style['error-message']}>
                      <AiOutlineDashboard /> {errors.date.message}
                    </p>
                  )}
                  <label htmlFor="maintenance-notes">{t("MaintenanceForm.observations")}</label>
                  {/* aca se registra las validaciones de el campo como observaciones, se requiere que el campo sea obligatorio con una longitud minima de 5 caracteres y maxima de 30 */}
                  <div className={style['history-form-observations']}>
                    <textarea
                      placeholder={t("MaintenanceForm.placeholderObservations")}
                      className={style["maintenance-observatios"]}
                      rows={2}
                      {...register("observations", {
                        minLength: { value: 5, message: t("MaintenanceForm.minLengthObservations") },
                        maxLength: { value: 200, message: t("MaintenanceForm.maxLengthObservations") }
                      })}
                      onInput={(e) => {
                        e.target.style.height = 'auto';         /* // resetea la altura */
                        e.target.style.height = e.target.scrollHeight + 'px'; // crece según el contenido
                      }} />
                  </div>
                  {/* manejo de errores ], aca se senala el tipo de error y se le especifica el mensaje */}
                  {errors.observations?.type === "minLength" && <p className={style['error-message']}><AiOutlineDashboard /> {errors.observations.message}</p>}
                  {errors.observations?.type === "maxLength" && <p className={style['error-message']}><AiOutlineDashboard /> {errors.observations.message}</p>}


                  <label>{t("FiltrerHistory.state")}</label>
                  <select defaultValue={selected.status} {...register("status")}>
                    <option value="Completado">{t("FiltrerHistory.completed")}</option>
                    <option value="Pendiente">{t("FiltrerHistory.pending")}</option>
                    <option value="En progreso">{t("FiltrerHistory.inProgress")}</option>
                    <option value="Cancelado">{t("CartVehiculeMaintenance.cancel")}</option>
                  </select>

                  <button type="submit">{t("History.save")}</button>
                  <button type="button" onClick={() => setIsEditing(false)}>{t("History.cancel")}</button>


                </form>

              ) : (
                <>
                  <p><strong>{t("History.model")}</strong> {selected.model}</p>
                  <p><strong>{t("MaintenanceForm.Type")}</strong> {selected.type}</p>
                  <p><strong>{t("MaintenanceForm.date")}</strong> {new Date(selected.date).toLocaleString()}</p>
                  <p><strong>{t("History.status")}</strong> {selected.status}</p>
                  <p><strong>{t("MaintenanceForm.observations")}</strong> {selected.notes || 'Sin observaciones'}</p>


                  <div className={style['modal-actions-btn']} >
                    <button className={style['modal-button']} onClick={() => openEdit(selected)}>{t("History.edit")}</button>

                    {!confirmDelete && (
                      <button className={style['modal-button']} onClick={() => setConfirmDelete(true)}>{t("History.delete")}</button>
                    )}

                    {confirmDelete && (
                      <div className={style["modal-confirm"]}>
                        <p>{t("History.isDelete")}</p>
                        <button className={style['modal-button']} onClick={() => deleteRecord(selected.id)}>{t("History.confirm")}</button>
                        <button className={style['modal-button']} onClick={() => setConfirmDelete(false)}>{t("History.cancel")}</button>
                      </div>
                    )}

                    <button className={style['modal-button']} onClick={closeModal}>{t("History.close")}</button>
                  </div>

                </>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
export default History;