import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createAutomovil, updateAutomovil, getAutomovil, getCountries } from '../services/api';

function AutomovilForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    auto_name: '',
    auto_modelo: '',
    auto_marca: '',
    auto_pais: ''
  });

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEdit);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCountries();
    if (isEdit) {
      fetchAutomovil();
    }
  }, [id]);

  const fetchCountries = async () => {
    try {
      const data = await getCountries();
      setCountries(data);
    } catch (error) {
      console.error('Error al cargar países:', error);
    }
  };

  const fetchAutomovil = async () => {
    try {
      const data = await getAutomovil(id);
      setFormData({
        auto_name: data.auto_name,
        auto_modelo: data.auto_modelo,
        auto_marca: data.auto_marca,
        auto_pais: data.auto_pais
      });
      setLoadingData(false);
    } catch (error) {
      console.error('Error al cargar automovil:', error);
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar error del campo
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      if (isEdit) {
        await updateAutomovil(id, formData);
      } else {
        await createAutomovil(formData);
      }
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert('Error al guardar el automovil');
      }
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3 text-muted">Cargando datos del automovil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-7 col-md-9">
        {/* Breadcrumb de navegación */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="text-decoration-none">
                <i className="bi bi-house-door me-1"></i>
                Inicio
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {isEdit ? 'Editar automovil' : 'Nuevo automovil'}
            </li>
          </ol>
        </nav>

        <div className="card border-0 shadow-sm">
          {/* Header mejorado con gradiente consistente */}
          <div className="card-header border-0 py-4" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="d-flex align-items-center">
              <div 
                className="rounded-circle bg-white bg-opacity-25 d-flex align-items-center justify-content-center me-3"
                style={{ width: '50px', height: '50px' }}
              >
                <i className="bi bi-car-front-fill text-white" style={{ fontSize: '1.5rem' }}></i>
              </div>
              <div>
                <h3 className="text-white mb-1 fw-bold">
                  {isEdit ? 'Editar automovil' : 'Registrar Nuevo automovil'}
                </h3>
                <p className="text-white-50 mb-0 small">
                  {isEdit ? 'Modifica los datos del vehículo' : 'Completa el formulario con los datos del vehículo'}
                </p>
              </div>
            </div>
          </div>

          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              {/* Campo Nombre con icono */}
              <div className="mb-4">
                <label htmlFor="auto_name" className="form-label fw-semibold text-dark">
                  <i className="bi bi-card-heading text-primary me-2"></i>
                  Nombre del automovil
                  <span className="text-danger ms-1">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-tag text-muted"></i>
                  </span>
                  <input
                    type="text"
                    className={`form-control border-start-0 ${errors.auto_name ? 'is-invalid' : ''}`}
                    id="auto_name"
                    name="auto_name"
                    value={formData.auto_name}
                    onChange={handleChange}
                    placeholder="Ej: Toyota Corolla GLi"
                    required
                    style={{ paddingLeft: '0' }}
                  />
                  {errors.auto_name && (
                    <div className="invalid-feedback">{errors.auto_name[0]}</div>
                  )}
                </div>
                <small className="text-muted">Nombre completo o identificador del vehículo</small>
              </div>

              {/* Row con Modelo y Marca */}
              <div className="row mb-4">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label htmlFor="auto_modelo" className="form-label fw-semibold text-dark">
                    <i className="bi bi-calendar-event text-primary me-2"></i>
                    Modelo
                    <span className="text-danger ms-1">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="bi bi-hash text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className={`form-control border-start-0 ${errors.auto_modelo ? 'is-invalid' : ''}`}
                      id="auto_modelo"
                      name="auto_modelo"
                      value={formData.auto_modelo}
                      onChange={handleChange}
                      placeholder="Ej: 2024"
                      required
                      style={{ paddingLeft: '0' }}
                    />
                    {errors.auto_modelo && (
                      <div className="invalid-feedback">{errors.auto_modelo[0]}</div>
                    )}
                  </div>
                  <small className="text-muted">Año o versión del modelo</small>
                </div>

                <div className="col-md-6">
                  <label htmlFor="auto_marca" className="form-label fw-semibold text-dark">
                    <i className="bi bi-award text-primary me-2"></i>
                    Marca
                    <span className="text-danger ms-1">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="bi bi-star text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className={`form-control border-start-0 ${errors.auto_marca ? 'is-invalid' : ''}`}
                      id="auto_marca"
                      name="auto_marca"
                      value={formData.auto_marca}
                      onChange={handleChange}
                      placeholder="Ej: Toyota"
                      required
                      style={{ paddingLeft: '0' }}
                    />
                    {errors.auto_marca && (
                      <div className="invalid-feedback">{errors.auto_marca[0]}</div>
                    )}
                  </div>
                  <small className="text-muted">Fabricante del vehículo</small>
                </div>
              </div>

              {/* Campo País */}
              <div className="mb-4">
                <label htmlFor="auto_pais" className="form-label fw-semibold text-dark">
                  <i className="bi bi-globe2 text-primary me-2"></i>
                  País de Origen
                  <span className="text-danger ms-1">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-geo-alt text-muted"></i>
                  </span>
                  <select
                    className={`form-select border-start-0 ${errors.auto_pais ? 'is-invalid' : ''}`}
                    id="auto_pais"
                    name="auto_pais"
                    value={formData.auto_pais}
                    onChange={handleChange}
                    required
                    style={{ paddingLeft: '0' }}
                  >
                    <option value="">Seleccione un país</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country.sName}>
                        {country.sName}
                      </option>
                    ))}
                  </select>
                  {errors.auto_pais && (
                    <div className="invalid-feedback">{errors.auto_pais[0]}</div>
                  )}
                </div>
                <small className="text-muted">País donde se fabrica el automovil</small>
              </div>

              <hr className="my-4" />

             
              <div className="d-flex justify-content-between align-items-center">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/')}
                  disabled={loading}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Volver
                </button>
                
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-light border"
                    onClick={() => navigate('/')}
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={loading}
                    style={{ 
                      background: loading ? undefined : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none'
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <i className={`bi ${isEdit ? 'bi-check-circle' : 'bi-plus-circle'} me-2`}></i>
                        {isEdit ? 'Actualizar automovil' : 'Guardar automovil'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AutomovilForm;