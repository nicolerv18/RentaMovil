import React, { useState } from 'react';
import CartVehicleHistory from '../components/CartVehicleHistory';
import style from './History.module.css';
import Navbar from '../../../../shared/components/layout/Navbar.jsx';
import Footer from '../../../../shared/components/layout/Footer.jsx';


const MOCK = [
  { id: '1', plate: 'ABC1323', model: 'Toyota Corolla', date: '2024-09-10T10:30:00Z', type: 'Cambio de aceite', status: 'Cancelado', notes: 'Cambio de aceite y filtro. Revisión sin observaciones.', img: '' },
  { id: '2', plate: 'XYZ987', model: 'Kia Picanto', date: '2025-01-12T14:00:00Z', type: 'Revisión de frenos', status: 'En progreso', notes: 'Pastillas delanteras en reemplazo.', img: '' },
  { id: '3', plate: 'QWE4546', model: 'Renault Logan', date: '2025-03-02T09:20:00Z', type: 'Alineación y balanceo', status: 'Pendiente', notes: '', img: '' },
  { id: '4', plate: 'ABC1223', model: 'Toyota Corolla', date: '2024-09-10T10:30:00Z', type: 'Cambio de aceite', status: 'Completado', notes: 'Cambio de aceite y filtro. Revisión sin observaciones.', img: '' },
  { id: '5', plate: 'XYZ9847', model: 'Kia Picanto', date: '2025-01-12T14:00:00Z', type: 'Revisión de frenos', status: 'En progreso', notes: 'Pastillas delanteras en reemplazo.', img: '' },
  { id: '6', plate: 'QWE4536', model: 'Renault Logan', date: '2025-03-02T09:20:00Z', type: 'Alineación y balanceo', status: 'Pendiente', notes: '', img: '' },
  { id: '7', plate: 'ABC1243', model: 'Toyota Corolla', date: '2024-09-10T10:30:00Z', type: 'Cambio de aceite', status: 'Cancelado', notes: 'Cambio de aceite y filtro. Revisión sin observaciones.', img: '' },
  { id: '8', plate: 'XYZ9827', model: 'Kia Picanto', date: '2025-01-12T14:00:00Z', type: 'Revisión de frenos', status: 'En progreso', notes: 'Pastillas delanteras en reemplazo.', img: '' },
  { id: '9', plate: 'QWE45356', model: 'Renault Logan', date: '2025-03-02T09:20:00Z', type: 'Alineación y balanceo', status: 'Pendiente', notes: '', img: '' },
  { id: '10', plate: 'ABC1523', model: 'Toyota Corolla', date: '2024-09-10T10:30:00Z', type: 'Cambio de aceite', status: 'Completado', notes: 'Cambio de aceite y filtro. Revisión sin observaciones.', img: '' },
  { id: '12', plate: 'XYZ9867', model: 'Kia Picanto', date: '2025-01-12T14:00:00Z', type: 'Revisión de frenos', status: 'En progreso', notes: 'Pastillas delanteras en reemplazo.', img: '' },
  { id: '13', plate: 'QWE4566', model: 'Renault Logan', date: '2025-03-02T09:20:00Z', type: 'Alineación y balanceo', status: 'Pendiente', notes: '', img: '' },
  { id: '11', plate: 'ABC12633', model: 'Toyota Corolla', date: '2024-09-10T10:30:00Z', type: 'Cambio de aceite', status: 'Completado', notes: 'Cambio de aceite y filtro. Revisión sin observaciones.', img: '' },
  { id: '14', plate: 'XYZ9857', model: 'Kia Picanto', date: '2025-01-12T14:00:00Z', type: 'Revisión de frenos', status: 'En progreso', notes: 'Pastillas delanteras en reemplazo.', img: '' },
  { id: '15', plate: 'QWE4563', model: 'Renault Logan', date: '2025-03-02T09:20:00Z', type: 'Alineación y balanceo', status: 'Pendiente', notes: '', img: '' },
  { id: '16', plate: 'ABC12223', model: 'Toyota Corolla', date: '2024-09-10T10:30:00Z', type: 'Cambio de aceite', status: 'Completado', notes: 'Cambio de aceite y filtro. Revisión sin observaciones.', img: '' },
  { id: '17', plate: 'XYZ98457', model: 'Kia Picanto', date: '2025-01-12T14:00:00Z', type: 'Revisión de frenos', status: 'En progreso', notes: 'Pastillas delanteras en reemplazo.', img: '' },
  { id: '18', plate: 'QWE456345', model: 'Renault Logan', date: '2025-03-02T09:20:00Z', type: 'Alineación y balanceo', status: 'Pendiente', notes: '', img: '' },
  { id: '19', plate: 'ABC1234', model: 'Toyota Corolla', date: '2024-09-10T10:30:00Z', type: 'Cambio de aceite', status: 'Completado', notes: 'Cambio de aceite y filtro. Revisión sin observaciones.', img: '' },
  { id: '20', plate: 'XYZ9f87', model: 'Kia Picanto', date: '2025-01-12T14:00:00Z', type: 'Revisión de frenos', status: 'En progreso', notes: 'Pastillas delanteras en reemplazo.', img: '' },
  { id: '23', plate: 'QWE4q56', model: 'Renault Logan', date: '2025-03-02T09:20:00Z', type: 'Alineación y balanceo', status: 'Pendiente', notes: '', img: '' },
  { id: '21', plate: 'ABC12343', model: 'Toyota Corolla', date: '2024-09-10T10:30:00Z', type: 'Cambio de aceite', status: 'Completado', notes: 'Cambio de aceite y filtro. Revisión sin observaciones.', img: '' },
  { id: '22', plate: 'XYZ98r7', model: 'Kia Picanto', date: '2025-01-12T14:00:00Z', type: 'Revisión de frenos', status: 'En progreso', notes: 'Pastillas delanteras en reemplazo.', img: '' },
  { id: '24', plate: 'QWE4546', model: 'Renault Logan', date: '2025-03-02T09:20:00Z', type: 'Alineación y balanceo', status: 'Pendiente', notes: '', img: '' },
  { id: '25', plate: 'QWE4536', model: 'Renault Logan', date: '2025-03-02T09:20:00Z', type: 'Alineación y balanceo', status: 'Pendiente', notes: '', img: '' }

];

function History() {
  const [records, setRecords] = useState(MOCK);
  const [selected, setSelected] = useState(null);
  //agrega cambio de estado
  const [confirmDelete, setConfirmDelete] = useState(false);
  //agraga 
  // estados para facilitar la edicion de los apartados
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

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


  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  }

  const handleSaveEdit = () => {
    const updated = records.map(r => r.id === selected.id ? { ...r, ...editForm } : r);
    setRecords(updated);
    setSelected({ ...selected, ...editForm });// de estama manera se estaria sobre escribiendo los valores viejos por los nuevos
    setIsEditing(false);
  }
  return (

    <>
      <Navbar />
      <div className={style.container}>
        <h2>Gestión de mantenimiento</h2>

        <div className={style.list}>
          {records.map(r => (
            <CartVehicleHistory
              key={r.id}
              record={r}
              onViewMore={(rec) => {
                setSelected(rec);
                setEditForm(rec); 
              }}
            />
          ))}
        </div>

  {selected && (
          <div className={style.modalBackdrop} onClick={closeModal}>
            <div className={style.modal} onClick={(e) => e.stopPropagation()}>

              <h3>Detalle - {selected.plate}</h3>

              {isEditing ? (
                <>
                  <label>Modelo:
                    <input name="model" value={editForm.model} onChange={handleEditChange} />
                  </label>
                  <label>Tipo:
                    <input name="type" value={editForm.type} onChange={handleEditChange} />
                  </label>
                  <label>Fecha:
                    <input name="date" type="datetime-local"
                      value={editForm.date.slice(0, 16)} onChange={handleEditChange} />
                  </label>
                  <label>Observaciones:
                    <textarea name="notes" value={editForm.notes} onChange={handleEditChange} />
                  </label>
                                    <label>Cambiar estado:</label>
                  <select value={selected.status} onChange={handleStatusChange}>
                    <option value="Completado">Completado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="En progreso">En progreso</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                  <button onClick={handleSaveEdit}>Guardar</button>
                  <button onClick={() => setIsEditing(false)}>Cancelar</button>
                </>
              ) : (
                <>
                  <p><strong>Modelo:</strong> {selected.model}</p>
                  <p><strong>Tipo:</strong> {selected.type}</p>
                  <p><strong>Fecha:</strong> {new Date(selected.date).toLocaleString()}</p>
                  <p><strong>Estado:</strong> {selected.status}</p>
                  <p><strong>Observaciones:</strong> {selected.notes || 'Sin observaciones'}</p>



                  <button onClick={() => setIsEditing(true)}>Editar</button>

                  {!confirmDelete && (
                    <button onClick={() => setConfirmDelete(true)}>Eliminar</button>
                  )}

                  {confirmDelete && (
                    <div className={style.confirmBox}>
                      <p>¿Seguro que quieres eliminar este registro?</p>
                      <button onClick={() => deleteRecord(selected.id)}>Confirmar</button>
                      <button onClick={() => setConfirmDelete(false)}>Cancelar</button>
                    </div>
                  )}

                  <button onClick={closeModal}>Cerrar</button>
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
