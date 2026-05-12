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
      <Navbar />
      <div className={style["history-container"]}>
        <div className={style["card-container-setSearch"]}>
        <h2 className={style["history-h2"]}>Gestión de mantenimiento</h2>
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
              <h3>Detalle - {selected.plate}</h3>

              {isEditing ? (
                <form onSubmit={handleSubmit(handleSaveEdit)}>

                  <label htmlFor="model">Modelo:</label>
                  <input
                    type="text"
                    placeholder="Ej: Volkswagen Gol, Crolla, Tesla Model 3... "

                    {...register("model", {
                      required: "El modeolo es obligatorio",
                      minLength: { value: 2, message: "El modelo debe tener al menos 2 caracteres." },
                      maxLength: { value: 30, message: "El modelo no debe superar 30 caracteres." },
                      pattern: {
                        value: /^[A-Za-z0-9\s\-]{2,30}$/,
                        message: "El modelo solo puede contener letras, números y guiones."
                      }
                    })}
                  />
                  {errors.model && (
                    <p className={style['error-message']}>
                      <AiOutlineDashboard /> {errors.model.message}
                    </p>
                  )}
                  <label htmlFor="maintenanceType">Tipo de mantenimiento:</label>
                  <input
                    type="text"
                    placeholder="Ej: Cambio de aceite, Revisión de frenos..."
                    list="maintenance-options"
                    {...register("maintenanceType", {
                      required: "El tipo de mantenimiento es obligatorio.",
                      minLength: { value: 3, message: "Mínimo 3 caracteres." },
                      maxLength: { value: 60, message: "Máximo 60 caracteres." },
                      pattern: {
                        value: /^[A-Za-zÀ-ÿ0-9\s\-\,\.]{3,60}$/,
                        message: "Solo se permiten letras, números, guiones y comas."
                      }
                    })}
                  />
                  <datalist id="maintenance-options">
                    <option value="Cambio de aceite" />
                    <option value="Cambio de filtros" />
                    <option value="Revisión de frenos" />
                    <option value="Cambio de llantas" />
                    <option value="Alineación y balanceo" />
                    <option value="Revisión general" />
                    <option value="Reparación de motor" />
                    <option value="Reparación de frenos" />
                    <option value="Reparación eléctrica" />
                    <option value="Reparación de suspensión" />
                    <option value="Reparación de transmisión" />
                    <option value="Lavado" />
                    <option value="Pintura" />
                    <option value="Latonería" />
                  </datalist>

                  {errors.maintenanceType && (
                    <p className={style['error-message']}>
                      <AiOutlineDashboard /> {errors.maintenanceType.message}
                    </p>
                  )}
                  <label htmlFor="date">Fecha:</label>
                  <input type="date" placeholder="Fecha"
                    {...register("date", {
                      required: "la fecha es obligatoria",
                      validate: ValidateDate
                    })}
                  />
                  {errors.date && (
                    <p className={style['error-message']}>
                      <AiOutlineDashboard /> {errors.date.message}
                    </p>
                  )}
                  <label htmlFor="maintenance-notes">Observaciones</label>
                  {/* aca se registra las validaciones de el campo como observaciones, se requiere que el campo sea obligatorio con una longitud minima de 5 caracteres y maxima de 30 */}
                  <div className={style['history-form-observations']}>
                    <textarea
                      placeholder="Observaciones"
                      className={style["maintenance-observatios"]}
                      rows={2}
                      {...register("observations", {
                        minLength: { value: 5, message: "Mínimo 5 caracteres." },
                        maxLength: { value: 200, message: "Máximo 200 caracteres." }
                      })}
                      onInput={(e) => {
                        e.target.style.height = 'auto';         /* // resetea la altura */
                        e.target.style.height = e.target.scrollHeight + 'px'; // crece según el contenido
                      }} />
                  </div>
                  {/* manejo de errores ], aca se senala el tipo de error y se le especifica el mensaje */}
                  {errors.observations?.type === "minLength" && <p className={style['error-message']}><AiOutlineDashboard /> La observacion debe tener al menos 5 caracteres</p>}
                  {errors.observations?.type === "maxLength" && <p className={style['error-message']}><AiOutlineDashboard /> La observacion no debe tener mas de 200 caracteres</p>}


                  <label>Estado:</label>
                  <select defaultValue={selected.status} {...register("status")}>
                    <option value="Completado">Completado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En progreso">En progreso</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>

                  <button type="submit">Guardar</button>
                  <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>


                </form>

              ) : (
                <>
                  <p><strong>Modelo:</strong> {selected.model}</p>
                  <p><strong>Tipo:</strong> {selected.type}</p>
                  <p><strong>Fecha:</strong> {new Date(selected.date).toLocaleString()}</p>
                  <p><strong>Estado:</strong> {selected.status}</p>
                  <p><strong>Observaciones:</strong> {selected.notes || 'Sin observaciones'}</p>


                  <div className={style['modal-actions-btn']} >
                    <button className={style['modal-button']} onClick={() => openEdit(selected)}>Editar</button>

                    {!confirmDelete && (
                      <button className={style['modal-button']} onClick={() => setConfirmDelete(true)}>Eliminar</button>
                    )}

                    {confirmDelete && (
                      <div className={style["modal-confirm"]}>
                        <p>¿Seguro que quieres eliminar este registro?</p>
                        <button className={style['modal-button']} onClick={() => deleteRecord(selected.id)}>Confirmar</button>
                        <button className={style['modal-button']} onClick={() => setConfirmDelete(false)}>Cancelar</button>
                      </div>
                    )}

                    <button className={style['modal-button']} onClick={closeModal}>Cerrar</button>
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