import { useState, useEffect, useRef } from "react"; // CORREGIDO: Se importaron useEffect y useRef
import NavBarAdmin from "../../../../shared/components/layout/NavBarAdmin";
import Footer from "../../../../shared/components/layout/Footer";
import { useNavigate } from "react-router-dom";
import "./VehicleInventary.css";
import { useTranslation } from "react-i18next";
import carro from "../../../../assets/carro.png";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { TfiMenu } from "react-icons/tfi";



const vehiculosData = [
  { id: 1, placa: "ABC-123", marca: "Toyota", modelo: "Camry", año: 2022, tipo: "Sedán",      sucursal: "Neiva Centro",    estado: "Disponible",    km: 12400, imagen: null },
  { id: 2, placa: "DEF-456", marca: "Honda",  modelo: "CR-V",  año: 2021, tipo: "SUV",        sucursal: "Neiva Norte",     estado: "En uso",       km: 34200, imagen: null },
  { id: 3, placa: "GHI-789", marca: "Ford",   modelo: "Mustang",año: 2023,tipo: "Deportivo",sucursal: "Bogotá Centro",   estado: "Disponible",   km: 5800,  imagen: null },
  { id: 4, placa: "JKL-012", marca: "BMW",    modelo: "X5",    año: 2022, tipo: "SUV",        sucursal: "Bogotá Norte",    estado: "Mantenimiento",km: 48900, imagen: null },
  { id: 5, placa: "MNO-345", marca: "Audi",   modelo: "A4",    año: 2021, tipo: "Sedán",      sucursal: "Neiva Centro",    estado: "Disponible",   km: 22100, imagen: null },
  { id: 6, placa: "PQR-678", marca: "Mercedes",modelo:"C-Class",año: 2023,tipo: "Sedán",    sucursal: "Medellín Sur",    estado: "En uso",       km: 9300,  imagen: null },
  { id: 7, placa: "STU-901", marca: "Chevrolet",modelo:"Spark", año: 2020,tipo: "Compacto", sucursal: "Neiva Norte",     estado: "Disponible",   km: 61200, imagen: null },
  { id: 8, placa: "VWX-234", marca: "Kia",    modelo: "Sportage",año: 2022,tipo: "SUV",       sucursal: "Medellín Centro", estado: "Mantenimiento",km: 31700, imagen: null },
  { id: 9, placa: "YZA-567", marca: "Mazda",  modelo: "CX-5",  año: 2023, tipo: "SUV",        sucursal: "Bogotá Centro",   estado: "Disponible",   km: 7600,  imagen: null },
];

export default function VehicleInventory() {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Listo por si usas traducciones
  
  // Estados de búsqueda y filtros
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    estado: null,
    sucursal: null,
    tipo: null,
  });

  // CORREGIDO: Se agregaron los estados que faltaban en tu código
  const [vista, setVista] = useState("grid"); // Controla si se ve en 'grid' o 'tabla'
  const [selected, setSelected] = useState(null); // Controla el vehículo seleccionado para el modal

  const filtersRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target)) {
        setActiveFilter(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilterClick = (filterType) =>
    setActiveFilter(activeFilter === filterType ? null : filterType);

  const handleFilterSelect = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value,
    }));
  };

  const clearAllFilters = () =>
    setSelectedFilters({ estado: null, sucursal: null, tipo: null });

  const hasActiveFilters = Object.values(selectedFilters).some((v) => v !== null);

  // Arrays de opciones dinámicas
  const ESTADOS = ["Todos", "Disponible", "En uso", "Mantenimiento"];
  const SUCURSALES = ["Todas", ...new Set(vehiculosData.map(v => v.sucursal))];
  const TIPOS = ["Todos", ...new Set(vehiculosData.map(v => v.tipo))];

  // Filtrado lógico
  const filtered = vehiculosData.filter(v =>
    (search === "" ||
      v.placa.toLowerCase().includes(search.toLowerCase()) ||
      v.marca.toLowerCase().includes(search.toLowerCase()) ||
      v.modelo.toLowerCase().includes(search.toLowerCase())) &&
    (selectedFilters.estado === null || selectedFilters.estado === "Todos" || v.estado === selectedFilters.estado) &&
    (selectedFilters.sucursal === null || selectedFilters.sucursal === "Todas" || v.sucursal === selectedFilters.sucursal) &&
    (selectedFilters.tipo === null || selectedFilters.tipo === "Todos" || v.tipo === selectedFilters.tipo)
  );

  // Estadísticas calculadas
  const stats = {
    total: vehiculosData.length,
    disponible: vehiculosData.filter(v => v.estado === "Disponible").length,
    enUso: vehiculosData.filter(v => v.estado === "En uso").length,
    mantenimiento: vehiculosData.filter(v => v.estado === "Mantenimiento").length,
  };

  return (
    <div className="vi-page">
      <NavBarAdmin />

      <div className="vi-wrapper">

        {/* Header */}
        <div className="vi-header">
          <div>
            <h1 className="vi-title">{t('VehicleInventary.title')}</h1>
            <p className="vi-subtitle">{t('VehicleInventary.subtitle')}</p>
          </div>
          <button className="vi-btn-add" onClick={() => navigate('/RegisterVehicle')}>
            {t('VehicleInventary.btnAddVehicle')}
          </button>
        </div>

        {/* Stats */}
        <div className="vi-stats">
          <div className="vi-stat">
            <span className="vi-stat-num">{stats.total}</span>
            <span className="vi-stat-label">{t('VehicleInventary.total')}</span>
          </div>
          <div className="vi-stat disponible">
            <span className="vi-stat-num">{stats.disponible}</span>
            <span className="vi-stat-label">{t('VehicleInventary.available')}</span>
          </div>
          <div className="vi-stat en-uso">
            <span className="vi-stat-num">{stats.enUso}</span>
            <span className="vi-stat-label">{t('VehicleInventary.inUse')}</span>
          </div>
          <div className="vi-stat mantenimiento">
            <span className="vi-stat-num">{stats.mantenimiento}</span>
            <span className="vi-stat-label">{t('VehicleInventary.maintenance')}</span>
          </div>
        </div>

        {/* Controles de Búsqueda, Filtros y Cambio de Vista */}
        <div className="vi-controls">
          <div className="vi-search-wrap">
            <input
              className="vi-search"
              type="text"
              placeholder={t('VehicleInventary.searchPlaceholder')}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Selector de vistas añadido para dar soporte visual a tu código */}
         <div className="vi-view-toggle">
  <button 
    className={`vi-view-btn ${vista === 'grid' ? 'active' : ''}`} 
    onClick={() => setVista('grid')}
    title={t('VehicleInventary.cuadTitle')}
  >
    <TfiLayoutGrid2Alt size={18} />
  </button>
  
  <button 
    className={`vi-view-btn ${vista === 'tabla' ? 'active' : ''}`} 
    onClick={() => setVista('tabla')}
    title={t('VehicleInventary.cuadTitle2')}
  >
    <TfiMenu size={18} />
  </button>
</div>

          <div className="vi-filters" ref={filtersRef}>
            {[
              { key: "estado", label: t('VehicleInventary.keyState'), options: ESTADOS },
              { key: "sucursal", label: t('VehicleInventary.keyBranch'), options: SUCURSALES },
              { key: "tipo", label: t('VehicleInventary.keyType'), options: TIPOS },
            ].map(({ key, label, options }) => (
              <div className="vi-filter-wrap" key={key}>
                <button
                  className={`vi-filter-btn ${activeFilter === key ? "active" : ""} ${selectedFilters[key] ? "selected" : ""}`}
                  onClick={() => handleFilterClick(key)}
                >
                  <span>{selectedFilters[key] || label}</span>
                  <span className="vi-filter-arrow">▼</span>
                </button>
                {activeFilter === key && (
                  <div className="vi-dropdown">
                    {options.map((val) => (
                      <button
                        key={val}
                        className={`vi-dropdown-item ${selectedFilters[key] === val ? "chosen" : ""}`}
                        onClick={() => handleFilterSelect(key, val)}
                      >
                        {selectedFilters[key] === val && <span>✓ </span>}
                        {val}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {hasActiveFilters && (
              <button className="vi-clear-btn" onClick={clearAllFilters}>
                {t('VehicleInventary.CleanFilters')}
              </button>
            )}
          </div>
        </div>

        {/* Resultados */}
        <p className="vi-results-count">
          {filtered.length} vehículo{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Vista Grid */}
        {vista === 'grid' && (
          <div className="vi-grid">
            {filtered.map(v => (
              <div key={v.id} className={`vi-card estado-${v.estado.replace(' ', '-').toLowerCase()}`} onClick={() => setSelected(v)}>
                <div className="vi-card-img">
                  <span className="vi-card-tipo">{v.tipo}</span>
                  <img src={v.imagen || carro} alt={`${v.marca} ${v.modelo}`} />
                </div>
                <div className="vi-card-body">
                  <div className="vi-card-top">
                    <span className={`vi-badge ${v.estado.replace(' ', '-').toLowerCase()}`}>{v.estado}</span>
                    <span className="vi-placa">{v.placa}</span>
                  </div>
                  <p className="vi-card-nombre">{v.marca} {v.modelo}</p>
                  <p className="vi-card-año">{v.año}</p>
                  <div className="vi-card-footer">
                    <span className="vi-sucursal-tag">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {v.sucursal}
                    </span>
                    <span className="vi-km">{v.km.toLocaleString()} km</span>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <div className="vi-empty">No se encontraron vehículos.</div>}
          </div>
        )}

        {/* Vista Tabla */}
        {vista === 'tabla' && (
          <div className="vi-table-wrap">
            <table className="vi-table">
              <thead>
                <tr>
                  <th>Placa</th>
                  <th>Vehículo</th>
                  <th>Año</th>
                  <th>Tipo</th>
                  <th>Sucursal</th>
                  <th>Kilometraje</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(v => (
                  <tr key={v.id}>
                    <td className="vi-td-placa">{v.placa}</td>
                    <td className="vi-td-nombre">{v.marca} {v.modelo}</td>
                    <td>{v.año}</td>
                    <td>{v.tipo}</td>
                    <td>{v.sucursal}</td>
                    <td>{v.km.toLocaleString()} km</td>
                    <td><span className={`vi-badge ${v.estado.replace(' ', '-').toLowerCase()}`}>{v.estado}</span></td>
                    <td>
                      <button className="vi-btn-detail" onClick={() => setSelected(v)}>Ver</button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan="8" className="vi-empty">No se encontraron vehículos.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Acciones */}
        <div className="vi-actions">
          <button className="vi-btn-back" onClick={() => navigate(-1)}>Regresar</button>
        </div>
      </div>

      <Footer />

      {/* Modal detalle */}
      {selected && (
        <div className="vi-modal-overlay" onClick={() => setSelected(null)}>
          <div className="vi-modal" onClick={e => e.stopPropagation()}>
            <div className="vi-modal-header">
              <div>
                <p className="vi-modal-label">Ficha del vehículo</p>
                <h2 className="vi-modal-title">{selected.marca} {selected.modelo}</h2>
              </div>
              <span className={`vi-badge ${selected.estado.replace(' ', '-').toLowerCase()}`}>{selected.estado}</span>
            </div>

            <div className="vi-modal-grid">
              <div className="vi-modal-field">
                <span className="vi-modal-field-label">Placa</span>
                <span className="vi-modal-field-value">{selected.placa}</span>
              </div>
              <div className="vi-modal-field">
                <span className="vi-modal-field-label">Año</span>
                <span className="vi-modal-field-value">{selected.año}</span>
              </div>
              <div className="vi-modal-field">
                <span className="vi-modal-field-label">Tipo</span>
                <span className="vi-modal-field-value">{selected.tipo}</span>
              </div>
              <div className="vi-modal-field">
                <span className="vi-modal-field-label">Kilometraje</span>
                <span className="vi-modal-field-value">{selected.km.toLocaleString()} km</span>
              </div>
              <div className="vi-modal-field" style={{ gridColumn: '1 / -1' }}>
                <span className="vi-modal-field-label">Sucursal</span>
                <span className="vi-modal-field-value">{selected.sucursal}</span>
              </div>
            </div>

            <div className="vi-modal-footer">
              <button className="vi-modal-btn-secondary" onClick={() => setSelected(null)}>Cerrar</button>
              <button className="vi-modal-btn-primary" onClick={() => navigate('/CheckStatus')}>Ver estado</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}