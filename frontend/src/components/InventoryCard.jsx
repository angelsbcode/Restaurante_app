// src/components/InventoryCard.jsx
import React from 'react';
import '../styles/InventoryCard.css';

export default function InventoryCard({ item, onEdit, onDelete }) {
  return (
    <div className="inventory-card">
      <div className="inventory-card-img-wrap">
        <img src={item.imagen || "https://placehold.co/150"} alt={item.nombreOrden} />
      </div>
      <div className="inventory-card-content">
        <h3 className="inventory-card-title">{item.nombreOrden}</h3>
        <p className="inventory-card-price">${item.precio}</p>
        <p className="inventory-card-bodytext">{item.tipo}</p>
        <div className="inventory-card-actions">
          <button className="action-btn edit-btn" onClick={() => onEdit(item)}>✏️</button>
          <button className="action-btn delete-btn" onClick={() => onDelete(item.idPlatillo)}>🗑️</button>
        </div>
      </div>
    </div>
  );
}