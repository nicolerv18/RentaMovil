import React, { useState } from "react";
import NavBarAdmin from "../../../../shared/components/layout/NavBarAdmin";
import FooterAdmin from "../../../../shared/components/layout/FooterAdmin";
import { useNavigate } from "react-router-dom";
import "./ContractHistory.css";
import Flecha from "../../../../assets/img/flecha.png";
import Lupa from "../../../../assets/img/lupa.png";

export default function ContractHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  // Guarda lo que escribe el usuario en el buscador
  const [activeFilter, setActiveFilter] = useState(null);
  // Guarda qué filtro está desplegado
  const [selectedFilters, setSelectedFilters] = useState({
    fecha: null,
    cliente: null,
    vehiculo: null,
    estado: null,
  });
  // Guarda los valores elegidos en los filtros
  const [selectedContract, setSelectedContract] = useState(null);
  // Guarda el contrato seleccionado para abrir modal detalle
  const navigate = useNavigate();

  const [contracts] = useState([
    {
      id: 1,
      fecha: "08/04/2026",
      cliente: "Thiago Rojas",
      vehiculo: "Toyota Camry",
      estado: "Finalizado",
      descripcion: "Contrato completado con éxito.",
      duracion: "5 días",
      valor: "$350.000",
    },
    {
      id: 2,
      fecha: "10/04/2026",
      cliente: "David Erez",
      vehiculo: "Honda CR-V",
      estado: "Vigente",
      descripcion: "Cliente en ruta. Seguimiento disponible.",
      duracion: "3 días",
      valor: "$210.000",
    },
    {
      id: 3,
      fecha: "15/04/2026",
      cliente: "Nicole Ramirez",
      vehiculo: "Ford Mustang",
      estado: "Cancelado",
      descripcion: "Este contrato fue cancelado por el cliente.",
      duracion: "—",
      valor: "$0",
    },
    {
      id: 4,
      fecha: "18/04/2026",
      cliente: "Valentina P",
      vehiculo: "BMW X5",
      estado: "Vigente",
      descripcion: "Contrato activo. El vehículo está en uso.",
      duracion: "7 días",
      valor: "$630.000",
    },
    {
      id: 5,
      fecha: "20/04/2026",
      cliente: "Sofia M",
      vehiculo: "Audi A4",
      estado: "Finalizado",
      descripcion: "Vehículo devuelto en perfecto estado.",
      duracion: "4 días",
      valor: "$280.000",
    },
    {
      id: 6,
      fecha: "22/04/2026",
      cliente: "Xai Niño",
      vehiculo: "Mercedes C-Class",
      estado: "Cancelado",
      descripcion: "Contrato anulado por disponibilidad.",
      duracion: "—",
      valor: "$0",
    },
  ]);

  const getUniqueValues = (key) => [...new Set(contracts.map((c) => c[key]))];
  // Obtiene valores unicos para filtros

  const filteredContracts = contracts.filter(
    (c) =>
      (searchTerm === "" ||
        c.vehiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.cliente.toLowerCase().includes(searchTerm.toLowerCase())) && // Buscar por cliente o vehículo
      (selectedFilters.fecha === null || c.fecha === selectedFilters.fecha) && // Filtro fecha
      (selectedFilters.cliente === null ||
        c.cliente === selectedFilters.cliente) && // Filtro cliente
      (selectedFilters.vehiculo === null ||
        c.vehiculo === selectedFilters.vehiculo) && // Filtro vehículo
      (selectedFilters.estado === null || c.estado === selectedFilters.estado), // Filtro estado
  );

  const handleFilterClick = (filterType) =>
    setActiveFilter(activeFilter === filterType ? null : filterType);
  // Si el filtro ya está abierto lo cierra si no lo abre

  const handleFilterSelect = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value,
    }));
  };
  // Selecciona o quita un filtro

  const clearAllFilters = () =>
    setSelectedFilters({
      fecha: null,
      cliente: null,
      vehiculo: null,
      estado: null,
    });
  // Limpia todos los filtros
  const hasActiveFilters = Object.values(selectedFilters).some(
    (v) => v !== null,
  );
  // Retorna true si hay filtros activos

  return (
    <div className="ch-page">
      <NavBarAdmin />

      <div className="ch-wrapper">
        <h1 className="ch-title">Historial de contratos</h1>

        {/* Buscador */}
        <div className="ch-search">
          <img src={Lupa} alt="Lupa" className="ch-search-icon" />
          <input
            type="text"
            placeholder="Buscar por cliente o vehículo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ch-search-input"
          />
        </div>

        {/* Filtros */}
        <div className="ch-filters">
          {["fecha", "cliente", "vehiculo", "estado"].map((key) => (
            <div className="ch-filter-wrap" key={key}>
              <button
                className={`ch-filter-btn ${activeFilter === key ? "active" : ""} ${selectedFilters[key] ? "selected" : ""}`}
                onClick={() => handleFilterClick(key)} //Boton de filtro
              >
                <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                <img src={Flecha} alt="Flecha" className="ch-filter-arrow" />
              </button>
              {activeFilter === key && (
                <div className="ch-dropdown">
                  {getUniqueValues(key).map(
                    (
                      val, //Genera opciones del dropdown con valores unicos del contrato para cada filtro ejemplu pues vigente-finalizado solo crea 1 no varios de ese mismo
                    ) => (
                      <button
                        key={val}
                        className={`ch-dropdown-item ${selectedFilters[key] === val ? "chosen" : ""}`} //Esto es para que genera una flecha en el valor seleccionado dentro del dropdown
                        onClick={() => handleFilterSelect(key, val)}
                      >
                        {selectedFilters[key] === val && <span>✓ </span>}
                        {val}
                        {/**La flecha */}
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>
          ))}
          {hasActiveFilters && (
            <button className="ch-clear-btn" onClick={clearAllFilters}>
              {" "}
              {/**El boton limpiar solo se activa si hay filtros seleccionados */}
              ✕ Limpiar
            </button>
          )}
        </div>

        {/* Tarjetas */}
        <div className="ch-grid">
          {filteredContracts.map((contract) => (
            <div
              key={contract.id}
              className={`ch-card estado-${contract.estado.toLowerCase()}`}
            >
              <div className="ch-card-top">
                <span
                  className={`ch-badge estado-${contract.estado.toLowerCase()}`}
                >
                  {contract.estado}
                </span>
                <span className="ch-date">{contract.fecha}</span>
              </div>
              <div className="ch-card-body">
                <p className="ch-card-client">{contract.cliente}</p>
                <p className="ch-card-vehicle">{contract.vehiculo}</p>
                <p className="ch-card-desc">{contract.descripcion}</p>
              </div>
              <div className="ch-card-footer">
                <button
                  className="ch-btn-ver"
                  onClick={() => setSelectedContract(contract)}
                >
                  Ver detalle
                </button>
              </div>
            </div>
          ))}

          {filteredContracts.length === 0 && (
            <div className="ch-empty">No se encontraron contratos.</div>
          )}
        </div>

        {/* Acciones */}
        <div className="ch-actions">
          <button className="ch-btn-action back" onClick={() => navigate(-1)}>
            Regresar
          </button>
          <button
            className="ch-btn-action primary"
            onClick={() => navigate("/Contract")}
          >
            + Nuevo contrato
          </button>
        </div>
      </div>

      <FooterAdmin />

      {/* Modal */}
      {selectedContract && (
        <div
          className="ch-modal-overlay"
          onClick={() => setSelectedContract(null)}
        >
          <div className="ch-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ch-modal-header">
              <div>
                <p className="ch-modal-label">
                  Contrato #{selectedContract.id}
                </p>
                <h2 className="ch-modal-title">{selectedContract.cliente}</h2>
              </div>
              <span
                className={`ch-badge estado-${selectedContract.estado.toLowerCase()}`}
              >
                {selectedContract.estado}
              </span>
            </div>

            <div className="ch-modal-grid">
              <div className="ch-modal-field">
                <span className="ch-modal-field-label">Vehículo</span>
                <span className="ch-modal-field-value">
                  {selectedContract.vehiculo}
                </span>
              </div>
              <div className="ch-modal-field">
                <span className="ch-modal-field-label">Fecha</span>
                <span className="ch-modal-field-value">
                  {selectedContract.fecha}
                </span>
              </div>
              <div className="ch-modal-field">
                <span className="ch-modal-field-label">Duración</span>
                <span className="ch-modal-field-value">
                  {selectedContract.duracion}
                </span>
              </div>
              <div className="ch-modal-field">
                <span className="ch-modal-field-label">Valor</span>
                <span className="ch-modal-field-value valor">
                  {selectedContract.valor}
                </span>
              </div>
            </div>

            <div className="ch-modal-desc">
              <span className="ch-modal-field-label">Descripción</span>
              <p>{selectedContract.descripcion}</p>
            </div>

            <button
              className="ch-modal-close"
              onClick={() => setSelectedContract(null)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
