// src/views/admin/AdminBebidas.jsx
import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import InventoryCard from '../../components/InventoryCard';
import '../../styles/AdminPlatillos.css'; // Reutilizamos los mismos estilos de estructura

export default function AdminBebidas() {
  // Datos Dummy basados en tu tabla Platillo (filtrados por tipo de bebida)
  const [bebidas, setBebidas] = useState([
    { idPlatillo: 4, nombreOrden: 'Bebida 1', tipo: 'Cóctel Frutal', precio: 120, imagen: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300' },
    { idPlatillo: 5, nombreOrden: 'Bebida 2', tipo: 'Clásicos / Gin', precio: 160, imagen: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300' },
    { idPlatillo: 6, nombreOrden: 'Bebida 3', tipo: 'Refrescante / Mocktail', precio: 95, imagen: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Campos del Formulario de Edición
  const [formNombre, setFormNombre] = useState('');
  const [formPrecio, setFormPrecio] = useState('');
  const [formTipo, setFormTipo] = useState('');

  const openCreateModal = () => {
  setIsEditMode(false); // Modo Creación
  setFormNombre('');
  setFormPrecio('');
  setFormTipo('');
  setIsModalOpen(true);
};

  const openEditModal = (item) => {
    setEditingItem(item);
    setIsEditMode(true);
    setFormNombre(item.nombreOrden);
    setFormPrecio(item.precio);
    setFormTipo(item.tipo);
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      setBebidas(bebidas.map(b => 
        b.idPlatillo === editingItem.idPlatillo 
          ? { ...b, nombreOrden: formNombre, precio: parseFloat(formPrecio), tipo: formTipo }
          : b
      ));
    } else {
      // LÓGICA DE CREACIÓN NUEVA (Simula un INSERT en tu tabla Platillo)
      const nuevaBebida = {
        idPlatillo: Date.now(),
        nombreOrden: formNombre,
        precio: parseFloat(formPrecio),
        tipo: formTipo, // Ej: "Cóctel", "Refresco"
        imagen: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300'
      };
    setBebidas([...bebidas, nuevaBebida]);
  }
  setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if(window.confirm("¿Seguro que deseas eliminar esta bebida?")) {
      setBebidas(bebidas.filter(b => b.idPlatillo !== id));
    }
  };

  return (
    /* Pasamos el color celeste claro (#9ad5de) característico de las Bebidas en tu Figma */
    <AdminLayout folderColor="#9ad5de">
      
      {/* SECCIÓN IZQUIERDA: Buscador y Rejilla de Bebidas */}
      <div className="inventory-workspace">
        <div className="search-bar-container">
          <input type="text" placeholder="🔍 Buscar bebida..." className="folder-search-input" />
        </div>
        
        <div className="inventory-grid">
          {bebidas.map(bebida => (
            <InventoryCard 
              key={bebida.idPlatillo} 
              item={bebida} 
              onEdit={openEditModal} 
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {/* SECCIÓN DERECHA Fija: Resumen/Agregar */}
      <div className="inventory-summary-sidebar">
        {/* Cabecera del Logo (Ahora renderizará más grande gracias al CSS) */}
        <div className="mini-logo-block">
          <span className="mini-h">H</span>
          <span className="mini-fork">🍴</span>
          <p>Hotel Management System</p>
        </div>
        
        {/* Tarjeta Reutilizable de Creación: Al dar clic activa el modal para crear */}
        <div className="add-placeholder-card" onClick={() => openCreateModal()}>
          <div className="add-card-img-simulate">
            <div className="plus-icon-circle">＋</div>
          </div>
          <div className="add-card-info-simulate">
            <p className="add-placeholder-title">Agregar nuevo registro</p>
            <p className="add-placeholder-price">$0.00</p>
            <span className="add-placeholder-tag">Haga clic aquí</span>
          </div>
        </div>
      </div>

      {/* --- FORMULARIO MODAL DE EDICIÓN --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <button className="btn-close-modal" onClick={() => setIsModalOpen(false)}>✕</button>
            <h2 className="modal-form-title">Editar Bebida</h2>
            
            <form onSubmit={handleUpdateSubmit} className="edit-form-layout">
              <div className="form-group">
                <label>Nombre de la Bebida</label>
                <input type="text" value={formNombre} onChange={(e) => setFormNombre(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Precio ($)</label>
                <input type="number" step="0.01" value={formPrecio} onChange={(e) => setFormPrecio(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Tipo de Bebida</label>
                <input type="text" value={formTipo} onChange={(e) => setFormTipo(e.target.value)} required />
              </div>
              <button type="submit" className="btn-submit">Guardar Cambios</button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}