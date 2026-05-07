import React, { useState } from 'react';
import CartVehicleHistory from '../components/CartVehicleHistory';
import style from './History.module.css';
import Navbar from '../../../../shared/components/layout/Navbar.jsx';
import Footer from '../../../../shared/components/layout/Footer.jsx';

const MOCK = [
  { id: '1', plate: 'ABC123', model: 'Toyota Corolla', date: '2024-09-10T10:30:00Z', type: 'Cambio de aceite', status: 'Completado', notes: 'Cambio de aceite y filtro. Revisión sin observaciones.', img: '' },
  { id: '2', plate: 'XYZ987', model: 'Kia Picanto', date: '2025-01-12T14:00:00Z', type: 'Revisión de frenos', status: 'En progreso', notes: 'Pastillas delanteras en reemplazo.', img: '' },
  { id: '3', plate: 'QWE456', model: 'Renault Logan', date: '2025-03-02T09:20:00Z', type: 'Alineación y balanceo', status: 'Pendiente', notes: '', img: '' }
];

function History(){
  const [records] = useState(MOCK);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Navbar />
      <div className={style.container}>
        <h2>Historial de mantenimiento</h2>

        <div className={style.list}>
          {records.map(r => (
            <CartVehicleHistory key={r.id} record={r} onViewMore={(rec) => setSelected(rec)} />
          ))}
        </div>

        {selected && (
          <div className={style.modalBackdrop} onClick={() => setSelected(null)}>
            <div className={style.modal} onClick={(e) => e.stopPropagation()}>
              <h3>Detalle - {selected.plate}</h3>
              <p><strong>Modelo:</strong> {selected.model}</p>
              <p><strong>Tipo:</strong> {selected.type}</p>
              <p><strong>Fecha:</strong> {new Date(selected.date).toLocaleString()}</p>
              <p><strong>Estado:</strong> {selected.status}</p>
              <p><strong>Observaciones:</strong></p>
              <p className={style.fullNotes}>{selected.notes || 'Sin observaciones'}</p>
              <div className={style.modalActions}>
                <button onClick={() => setSelected(null)}>Cerrar</button>
              </div>
            </div>
          </div>
        )}

      </div>
      <Footer />
    </>
  )
}

export default History;
