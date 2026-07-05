// src/components/MenuCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MenuCard.css'; // Estilos específicos de la tarjeta

export default function MenuCard({ title, image, redirectTo, bgColor, textColor }) {
  const navigate = useNavigate();

  return (
    <div 
      className="menu-card-item" 
      style={{ backgroundColor: bgColor || 'var(--bg-card)' }}
      onClick={() => navigate(redirectTo)}
    >
      <div className="menu-card-title-container">
        <h2 className="menu-card-title" style={{ color: textColor || 'var(--text-dark)' }}>
          {title}
        </h2>
      </div>
      <div className="menu-card-image-container">
        <img src={image} alt={title} className="menu-card-img" />
      </div>
    </div>
  );
}