// src/views/admin/AdminMenu.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import MenuCard from '../../components/MenuCard';
import '../../styles/AdminMenu.css'; // Estilos para la cuadrícula del menú

export default function AdminMenu() {
  const { logout } = useAuth();

  return (
    <div className="admin-menu-page">
      
      {/* Botón de cerrar/X del diseño superior derecho */}
      <button className="admin-close-btn" onClick={logout} title="Cerrar sesión">
        ✕
      </button>

      {/* Contenedor principal de la interfaz */}
      <div className="admin-menu-container">
        
        {/* Lado Izquierdo: El Grid de 2x2 con las tarjetas y el logo */}
        <div className="admin-menu-grid">
          
          <MenuCard 
            title="Platillos" 
            image="https://images.unsplash.com/photo-1544025162-d76694265947?w=400" 
            redirectTo="/admin/platillos"
            bgColor="#23747d" /* Verde azulado oscuro de Figma */
            textColor="#000000"
          />

          <MenuCard 
            title="Bebidas" 
            image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400" 
            redirectTo="/admin/bebidas"
            bgColor="#9ad5de" /* Celeste claro de Figma */
            textColor="#000000"
          />

          <MenuCard 
            title="Cuartos" 
            image="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400" 
            redirectTo="/admin/cuartos"
            bgColor="#e1f5fe" /* Azul blanquecino de Figma */
            textColor="#000000"
          />

          {/* Cuarto cuadrante: Logotipo del Hotel */}
          <div className="admin-menu-logo-area">
            <div className="admin-logo-wrapper">
              <span className="admin-logo-text">H</span>
              <span className="admin-logo-icon">🍴</span>
            </div>
            <h1 className="admin-logo-title">Hotel Management System</h1>
          </div>

        </div>

      </div>
    </div>
  );
}