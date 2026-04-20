import React, { useState } from 'react';
import Navbar from '../../../shared/components/layout/Navbar';
import Footer from '../../../shared/components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import './ContractHistory.css';

export default function ContractHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    fecha: null,
    cliente: null,
    vehiculo: null,
    estado: null
  });
  const navigate = useNavigate();

  const [contracts] = useState([
    {
      id: 1,
      fecha: '08/04/2026',
      cliente: 'Juan Pérez',
      vehiculo: 'Toyota Camry',
      estado: 'Finalizado',
      descripcion: 'Contrato completado con éxito.',
      imagen: ''
    },
    {
      id: 2,
      fecha: '10/04/2026',
      cliente: 'María García',
      vehiculo: 'Honda CR-V',
      estado: 'Vigente',
      descripcion: 'Cliente en ruta. Seguimiento disponible.',
      imagen: ''
    },
    {
      id: 3,
      fecha: '15/04/2026',
      cliente: 'Luis Martínez',
      vehiculo: 'Ford Mustang',
      estado: 'Cancelado',
      descripcion: 'Este contrato fue cancelado por el cliente.',
      imagen: ''
    },
    {
      id: 4,
      fecha: '18/04/2026',
      cliente: 'Ana López',
      vehiculo: 'BMW X5',
      estado: 'Vigente',
      descripcion: 'Contrato activo. El vehículo está en uso.',
      imagen: ''
    },
    {
      id: 5,
      fecha: '20/04/2026',
      cliente: 'José Rodríguez',
      vehiculo: 'Audi A4',
      estado: 'Finalizado',
      descripcion: 'Vehículo devuelto en perfecto estado.',
      imagen: ''
    },
    {
      id: 6,
      fecha: '22/04/2026',
      cliente: 'Sofia Díaz',
      vehiculo: 'Mercedes C-Class',
      estado: 'Cancelado',
      descripcion: 'Contrato anulado por disponibilidad.',
      imagen: ''
    }
  ]);

  const getUniqueValues = (key) => [...new Set(contracts.map(c => c[key]))];

  const filteredContracts = contracts.filter(contract =>
    (searchTerm === '' || 
      contract.vehiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.cliente.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedFilters.fecha === null || contract.fecha === selectedFilters.fecha) &&
    (selectedFilters.cliente === null || contract.cliente === selectedFilters.cliente) &&
    (selectedFilters.vehiculo === null || contract.vehiculo === selectedFilters.vehiculo) &&
    (selectedFilters.estado === null || contract.estado === selectedFilters.estado)
  );

  const handleFilterClick = (filterType) => {
    setActiveFilter(activeFilter === filterType ? null : filterType);
  };

  const handleFilterSelect = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({ fecha: null, cliente: null, vehiculo: null, estado: null });
  };

  const getEstadoClass = (estado) => {
    switch(estado.toLowerCase()) {
      case 'finalizado':
        return 'estado-finalizado';
      case 'vigente':
        return 'estado-vigente';
      case 'cancelado':
        return 'estado-cancelado';
      default:
        return '';
    }
  };

  return (
    <div className="contract-history-page">
      <Navbar />
      
      <div className="contract-history-container">
        <h1 className="contract-history-title">Historial de contratos</h1>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar vehiculo"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="column-headers">
          <div className="col-header-filter">
            <button 
              className={`filter-btn ${activeFilter === 'fecha' ? 'active' : ''} ${selectedFilters.fecha ? 'selected' : ''}`}
              onClick={() => handleFilterClick('fecha')}
            >
              Fecha Establecida
              <span className="filter-arrow">▼</span>
            </button>
            {activeFilter === 'fecha' && (
              <div className="filter-dropdown">
                {getUniqueValues('fecha').map(fecha => (
                  <button
                    key={fecha}
                    className={`filter-option ${selectedFilters.fecha === fecha ? 'chosen' : ''}`}
                    onClick={() => handleFilterSelect('fecha', fecha)}
                  >
                    {selectedFilters.fecha === fecha && '✓ '}
                    {fecha}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="col-header-filter">
            <button 
              className={`filter-btn ${activeFilter === 'cliente' ? 'active' : ''} ${selectedFilters.cliente ? 'selected' : ''}`}
              onClick={() => handleFilterClick('cliente')}
            >
              Cliente
              <span className="filter-arrow">▼</span>
            </button>
            {activeFilter === 'cliente' && (
              <div className="filter-dropdown">
                {getUniqueValues('cliente').map(cliente => (
                  <button
                    key={cliente}
                    className={`filter-option ${selectedFilters.cliente === cliente ? 'chosen' : ''}`}
                    onClick={() => handleFilterSelect('cliente', cliente)}
                  >
                    {selectedFilters.cliente === cliente && '✓ '}
                    {cliente}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="col-header-filter">
            <button 
              className={`filter-btn ${activeFilter === 'vehiculo' ? 'active' : ''} ${selectedFilters.vehiculo ? 'selected' : ''}`}
              onClick={() => handleFilterClick('vehiculo')}
            >
              Vehículo
              <span className="filter-arrow">▼</span>
            </button>
            {activeFilter === 'vehiculo' && (
              <div className="filter-dropdown">
                {getUniqueValues('vehiculo').map(vehiculo => (
                  <button
                    key={vehiculo}
                    className={`filter-option ${selectedFilters.vehiculo === vehiculo ? 'chosen' : ''}`}
                    onClick={() => handleFilterSelect('vehiculo', vehiculo)}
                  >
                    {selectedFilters.vehiculo === vehiculo && '✓ '}
                    {vehiculo}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="col-header-filter">
            <button 
              className={`filter-btn ${activeFilter === 'estado' ? 'active' : ''} ${selectedFilters.estado ? 'selected' : ''}`}
              onClick={() => handleFilterClick('estado')}
            >
              Estado
              <span className="filter-arrow">▼</span>
            </button>
            {activeFilter === 'estado' && (
              <div className="filter-dropdown">
                {getUniqueValues('estado').map(estado => (
                  <button
                    key={estado}
                    className={`filter-option ${selectedFilters.estado === estado ? 'chosen' : ''}`}
                    onClick={() => handleFilterSelect('estado', estado)}
                  >
                    {selectedFilters.estado === estado && '✓ '}
                    {estado}
                  </button>
                ))}
              </div>
            )}
          </div>

          {(selectedFilters.fecha || selectedFilters.cliente || selectedFilters.vehiculo || selectedFilters.estado) && (
            <button className="clear-filters-btn" onClick={clearAllFilters}>
              ✕ Limpiar filtros
            </button>
          )}
        </div>

        <div className="contracts-grid">
          {filteredContracts.map((contract) => (
            <div key={contract.id} className={`contract-card ${getEstadoClass(contract.estado)}`}>
              <div className="contract-image">
                <span className="vehicle-emoji">{contract.imagen}</span>
              </div>
              <div className="contract-info">
                <h3 className="contract-estado">{contract.estado}</h3>
                <p className="contract-description">{contract.descripcion}</p>
                <button className="btn-ver-mas">ver mas</button>
              </div>
            </div>
          ))}
        </div>

        <div className="contract-history-actions">
          <button 
            className="btn btn-primary-action"
            onClick={() => navigate('/Contract')}
          >
            Crear nuevo contrato
          </button>
          <button 
            className="btn btn-back"
            onClick={() => navigate(-1)}
          >
            regresar
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
