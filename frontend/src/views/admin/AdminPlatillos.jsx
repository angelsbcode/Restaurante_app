 // src/views/admin/AdminPlatillos.jsx
import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import InventoryCard from '../../components/InventoryCard';
import '../../styles/AdminPlatillos.css';

export default function AdminPlatillos() {
  // Datos Dummy mapeando a la estructura de tu tabla Platillo
  const [platillos, setPlatillos] = useState([
    { idPlatillo: 1, nombreOrden: 'Platillo 1', tipo: 'Corte de Carne', precio: 340, imagen: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300' },
    { idPlatillo: 2, nombreOrden: 'Platillo 2', tipo: 'Mariscos Gourmet', precio: 280, imagen: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300' },
    { idPlatillo: 3, nombreOrden: 'Platillo 3', tipo: 'Especialidad', precio: 360, imagen: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Campos del Formulario
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
        setPlatillos(platillos.map(p => 
        p.idPlatillo === editingItem.idPlatillo 
            ? { ...p, nombreOrden: formNombre, precio: parseFloat(formPrecio), tipo: formTipo }
            : p
        ));
    } else {
        // LÓGICA DE CREACIÓN NUEVA (Simula un INSERT en tu tabla Platillo)
        const nuevoPlatillo = {
        idPlatillo: Date.now(), // ID temporal único
        nombreOrden: formNombre,
        precio: parseFloat(formPrecio),
        tipo: formTipo,
        imagen: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300' // Imagen por defecto
        };
        setPlatillos([...platillos, nuevoPlatillo]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if(window.confirm("¿Seguro que deseas eliminar este platillo?")) {
      setPlatillos(platillos.filter(p => p.idPlatillo !== id));
    }
  };

  return (
    <AdminLayout folderColor="#23747d">
      {/* SECCIÓN IZQUIERDA: Buscador y Rejilla de Platillos */}
      <div className="inventory-workspace">
        <div className="search-bar-container">
          <input type="text" placeholder="🔍 Buscar platillo..." className="folder-search-input" />
        </div>
        
        <div className="inventory-grid">
          {platillos.map(platillo => (
            <InventoryCard 
              key={platillo.idPlatillo} 
              item={platillo} 
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
            <p className="add-placeholder-title">Agregar nuevo Platillo</p>
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
            <h2 className="modal-form-title">{isEditMode ? 'Editar Registro' : 'Agregar Nuevo Registro'}</h2>
            
            <form onSubmit={handleUpdateSubmit} className="edit-form-layout">
              <div className="form-group">
                <label>Nombre del Platillo</label>
                <input type="text" value={formNombre} onChange={(e) => setFormNombre(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Precio ($)</label>
                <input type="number" step="0.01" value={formPrecio} onChange={(e) => setFormPrecio(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Tipo de Platillo (Body Text)</label>
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