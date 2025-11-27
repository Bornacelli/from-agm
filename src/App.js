import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import AutomovilList from './components/AutomovilList';
import AutomovilForm from './components/AutomovilForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

function NavBar() {
  const location = useLocation();
  
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path === '/create' && (location.pathname === '/create' || location.pathname.startsWith('/edit'))) return true;
    return false;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center py-2" to="/">
          <div 
            className="rounded-circle bg-white d-flex align-items-center justify-content-center me-2"
            style={{ width: '40px', height: '40px' }}
          >
            <i className="bi bi-car-front-fill" style={{ color: '#667eea', fontSize: '1.3rem' }}></i>
          </div>
          <div>
            <div className="fw-bold" style={{ fontSize: '1.1rem', letterSpacing: '0.5px' }}>
              Administrador
            </div>
            <small className="d-none d-md-block" style={{ fontSize: '0.7rem', opacity: '0.9' }}>
              Sistema de Gestion 
            </small>
          </div>
        </Link>

        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          style={{ boxShadow: 'none' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 ${isActive('/') ? 'active' : ''}`}
                to="/"
                style={{
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  backgroundColor: isActive('/') ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  fontWeight: isActive('/') ? '600' : '400'
                }}
              >
                <i className="bi bi-list-ul me-2"></i>
                Lista de Automoviles
              </Link>
            </li>
            <li className="nav-item ms-2">
              <Link 
                className={`nav-link px-3 py-2 ${isActive('/create') ? 'active' : ''}`}
                to="/create"
                style={{
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  backgroundColor: isActive('/create') ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                  fontWeight: isActive('/create') ? '600' : '400'
                }}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Nuevo automovil
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <NavBar />

        <main className="container mt-4 mb-5 flex-grow-1">
          <Routes>
            <Route path="/" element={<AutomovilList />} />
            <Route path="/create" element={<AutomovilForm />} />
            <Route path="/edit/:id" element={<AutomovilForm />} />
          </Routes>
        </main>

        <style>{`
          .hover-primary:hover {
            color: #667eea !important;
            transition: color 0.3s ease;
          }
          
          .nav-link:hover {
            background-color: rgba(255, 255, 255, 0.15) !important;
          }
          
          .navbar-brand:hover {
            opacity: 0.9;
            transition: opacity 0.3s ease;
          }
        `}</style>
      </div>
    </Router>
  );
}

export default App;