import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAutomoviles, deleteAutomovil } from '../services/api';

function AutomovilList() {
  const [automoviles, setAutomoviles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAutomoviles();
  }, []);

  const fetchAutomoviles = async () => {
    try {
      const data = await getAutomoviles();
      setAutomoviles(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar automoviles:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este automovil?')) {
      try {
        await deleteAutomovil(id);
        fetchAutomoviles();
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar el automovil');
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted">Cargando automoviles...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header mejorado con gradiente y sombra */}
      <div className="card border-0 shadow-sm mb-4" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="card-body py-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="text-white mb-1 fw-bold">Gestion de Automoviles</h2>
              <p className="text-white-50 mb-0">
                <i className="bi bi-car-front-fill me-2"></i>
                {automoviles.length} {automoviles.length === 1 ? 'automovil registrado' : 'automoviles registrados'}
              </p>
            </div>
            <Link to="/create" className="btn btn-light btn-lg shadow-sm">
              <i className="bi bi-plus-circle-fill me-2"></i>
              Nuevo automovil
            </Link>
          </div>
        </div>
      </div>

      {/* Estado vacío mejorado */}
      {automoviles.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-4">
            <i className="bi bi-inbox" style={{ fontSize: '4rem', color: '#cbd5e0' }}></i>
          </div>
          <h4 className="text-muted mb-3">No hay automoviles registrados</h4>
          <p className="text-muted mb-4">Comienza agregando tu primer automovil al sistema</p>
          <Link to="/create" className="btn btn-primary btn-lg">
            <i className="bi bi-plus-circle me-2"></i>
            Crear Primer automovil
          </Link>
        </div>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            {/* Tabla optimizada - columnas reducidas y mejor espaciado */}
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                  <tr>
                    <th className="py-3 ps-4" style={{ width: '25%' }}>
                      <span className="text-muted text-uppercase" style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.5px' }}>
                        automovil
                      </span>
                    </th>
                    <th className="py-3" style={{ width: '15%' }}>
                      <span className="text-muted text-uppercase" style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.5px' }}>
                        Modelo
                      </span>
                    </th>
                    <th className="py-3" style={{ width: '15%' }}>
                      <span className="text-muted text-uppercase" style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.5px' }}>
                        Marca
                      </span>
                    </th>
                    <th className="py-3" style={{ width: '15%' }}>
                      <span className="text-muted text-uppercase" style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.5px' }}>
                        País
                      </span>
                    </th>
                    <th className="py-3" style={{ width: '15%' }}>
                      <span className="text-muted text-uppercase" style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.5px' }}>
                        Actualizado
                      </span>
                    </th>
                    <th className="py-3 pe-4 text-end" style={{ width: '15%' }}>
                      <span className="text-muted text-uppercase" style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.5px' }}>
                        Acciones
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {automoviles.map((auto, index) => (
                    <tr 
                      key={auto.auto_id}
                      style={{ 
                        borderBottom: index === automoviles.length - 1 ? 'none' : '1px solid #f1f3f5',
                        transition: 'background-color 0.2s ease'
                      }}
                    >
                      <td className="ps-4 py-3">
                        <div className="d-flex align-items-center">
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center me-3"
                            style={{ 
                              width: '40px', 
                              height: '40px', 
                              backgroundColor: '#e9ecef',
                              color: '#495057',
                              fontWeight: '600'
                            }}
                          >
                            <i className="bi bi-car-front"></i>
                          </div>
                          <div>
                            <div className="fw-semibold text-dark">{auto.auto_name}</div>
                            <small className="text-muted">ID: {auto.auto_id}</small>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="badge bg-light text-dark border px-3 py-2" style={{ fontWeight: '500' }}>
                          {auto.auto_modelo}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="text-dark">{auto.auto_marca}</span>
                      </td>
                      <td className="py-3">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-globe2 text-muted me-2"></i>
                          <span className="text-dark">{auto.auto_pais}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <small className="text-muted">
                          {new Date(auto.fechaupdate).toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </small>
                      </td>
                      <td className="pe-4 py-3 text-end">
                        <div className="btn-group" role="group">
                          <Link
                            to={`/edit/${auto.auto_id}`}
                            className="btn btn-sm btn-outline-primary"
                            style={{ 
                              borderTopRightRadius: '0',
                              borderBottomRightRadius: '0'
                            }}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                          <button
                            onClick={() => handleDelete(auto.auto_id)}
                            className="btn btn-sm btn-outline-danger"
                            style={{ 
                              borderTopLeftRadius: '0',
                              borderBottomLeftRadius: '0'
                            }}
                          >
                            <i className="bi bi-trash3"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Footer de la tabla con información adicional */}
          <div className="card-footer bg-light border-0 py-3">
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                Mostrando {automoviles.length} {automoviles.length === 1 ? 'registro' : 'registros'}
              </small>
              <small className="text-muted">
                <i className="bi bi-info-circle me-1"></i>
                Última actualización: {new Date().toLocaleTimeString('es-ES')}
              </small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AutomovilList;