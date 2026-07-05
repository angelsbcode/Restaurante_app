// src/layouts/AdminLayout.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/AdminLayout.css';

export default function AdminLayout({ children, folderColor }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Determinamos qué pestaña está activa basándonos en la URL actual
  const activeTab = location.pathname;

  return (
    <div className="folder-layout-page">
      {/* Botón de cerrar general (X) */}
      <button className="folder-global-close" onClick={() => navigate('/admin')}>✕</button>

      <div className="folder-main-structure">
        {/* Cuerpo Principal de la Carpeta */}
        <div className="folder-body" style={{ backgroundColor: folderColor || '#23747d' }}>
          {children}
        </div>

        {/* Pestañas Laterales Estilo Carpeta */}
        <div className="folder-tabs-container">
          <button 
            className={`folder-tab platillos-tab ${activeTab === '/admin/platillos' ? 'active' : ''}`}
            onClick={() => navigate('/admin/platillos')}
          >
            🍽️
          </button>
          <button 
            className={`folder-tab bebidas-tab ${activeTab === '/admin/bebidas' ? 'active' : ''}`}
            onClick={() => navigate('/admin/bebidas')}
          >
            🍹
          </button>
          <button 
            className={`folder-tab cuartos-tab ${activeTab === '/admin/cuartos' ? 'active' : ''}`}
            onClick={() => navigate('/admin/cuartos')}
          >
            🛏️
          </button>
        </div>
      </div>
    </div>
  );
}