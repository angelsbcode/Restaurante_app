// src/views/admin/AdminCuartos.jsx
import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import InventoryCard from '../../components/InventoryCard';
import '../../styles/AdminPlatillos.css'; 
import '../../styles/AdminCuartos.css'; 

export default function AdminCuartos() {
  const [cuartos, setCuartos] = useState([
    { idCuarto: 1, tipoCuarto: 'Premium', tipoCama: 'Matrimonial', precio: 1150, cantidad: 2, imagen: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=300' },
    { idCuarto: 2, tipoCuarto: 'Premium', tipoCama: 'King Size', precio: 1350, cantidad: 1, imagen: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=300' },
    { idCuarto: 3, tipoCuarto: 'Premium', tipoCama: 'Doble Matrimonial', precio: 2200, cantidad: 4, imagen: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=300' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Campos del Formulario (Mapeados correctamente)
  const [formTipoCuarto, setFormTipoCuarto] = useState('');
  const [formTipoCama, setFormTipoCama] = useState('');
  const [formPrecio, setFormPrecio] = useState('');

  // CORREGIDO: Se limpian los estados que sí existen en tu componente
  const openCreateModal = () => {
    setIsEditMode(false); 
    setFormTipoCama('');
    setFormTipoCuarto('');
    setFormPrecio('');
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setIsEditMode(true);
    setFormTipoCuarto(item.tipoCuarto);
    setFormTipoCama(item.tipoCama);
    setFormPrecio(item.precio);
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
        setCuartos(cuartos.map(c => 
          c.idCuarto === editingItem.idCuarto 
            ? { ...c, tipoCuarto: formTipoCuarto, tipoCama: formTipoCama, precio: parseFloat(formPrecio) }
            : c
        ));
    } else {
        const nuevoCuarto = {
          idCuarto: Date.now(),
          tipoCuarto: formTipoCuarto, 
          tipoCama: formTipoCama,     
          precio: parseFloat(formPrecio),
          cantidad: 1, 
          imagen: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=300'
        };
        setCuartos([...cuartos, nuevoCuarto]);
    }
    setIsModalOpen(false);
  };

  const handleQuantityChange = (id, amount) => {
    setCuartos(cuartos.map(c => {
      if (c.idCuarto === id) {
        const newQty = c.cantidad + amount;
        return { ...c, cantidad: newQty < 0 ? 0 : newQty }; 
      }
      return c;
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta habitación?")) {
      setCuartos(cuartos.filter(c => c.idCuarto !== id));
    }
  };

  return (
    <AdminLayout folderColor="#e1f5fe">
      
      {/* SECCIÓN IZQUIERDA: Buscador y Rejilla */}
      <div className="inventory-workspace">
        <div className="search-bar-container">
          <input type="text" placeholder="🔍 Tipo de cama / tipo de habitación..." className="folder-search-input" />
        </div>
        
        <div className="inventory-grid">
          {cuartos.map(cuarto => (
            <div key={cuarto.idCuarto} className="room-card-wrapper">
              <InventoryCard 
                item={{
                  idPlatillo: cuarto.idCuarto, 
                  nombreOrden: cuarto.tipoCama,
                  precio: cuarto.precio,
                  tipo: cuarto.tipoCuarto,
                  imagen: cuarto.imagen
                }} 
                onEdit={() => openEditModal(cuarto)} 
                onDelete={() => handleDelete(cuarto.idCuarto)}
              />
              <div className="room-quantity-control">
                <button onClick={() => handleQuantityChange(cuarto.idCuarto, -1)}>−</button>
                <span>{cuarto.cantidad}</span>
                <button onClick={() => handleQuantityChange(cuarto.idCuarto, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN DERECHA Fija: Resumen/Agregar */}
      <div className="inventory-summary-sidebar">
        <div className="mini-logo-block" style={{ color: '#000' }}>
            <span className="mini-h">H</span>
            <span className="mini-fork">🍴</span>
            <p>Hotel Management System</p>
        </div>
        
        <div className="add-placeholder-card" onClick={openCreateModal}>
            <div className="add-card-img-simulate">
              <div className="plus-icon-circle">＋</div>
            </div>
            <div className="add-card-info-simulate">
              <p className="add-placeholder-title">Agregar nuevo Cuarto</p>
              <p className="add-placeholder-price">$0.00</p>
              <span className="add-placeholder-tag">Haga clic aquí</span>
            </div>
        </div>
      </div>

      {/* --- FORMULARIO MODAL DE EDICIÓN / CREACIÓN --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <button className="btn-close-modal" onClick={() => setIsModalOpen(false)}>✕</button>
            <h2 className="modal-form-title">{isEditMode ? 'Editar Cuarto' : 'Agregar Nuevo Cuarto'}</h2>
            
            <form onSubmit={handleUpdateSubmit} className="edit-form-layout">
              
              {/* Tipo de Cama con lista desplegable inteligente */}
              <div className="form-group">
                <label>Tipo de Cama</label>
                <input 
                  type="text" 
                  list="camas-options" 
                  value={formTipoCama} 
                  onChange={(e) => setFormTipoCama(e.target.value)} 
                  placeholder="Selecciona o escribe una nueva..."
                  required 
                />
                <datalist id="camas-options">
                  <option value="Matrimonial" />
                  <option value="King Size" />
                  <option value="Individual" />
                  <option value="Doble Matrimonial" />
                </datalist>
              </div>

              {/* Tipo de Habitación con lista desplegable inteligente */}
              <div className="form-group">
                <label>Tipo de Habitación (Categoría)</label>
                <input 
                  type="text" 
                  list="cuartos-options" 
                  value={formTipoCuarto} 
                  onChange={(e) => setFormTipoCuarto(e.target.value)} 
                  placeholder="Selecciona o escribe una nueva..."
                  required 
                />
                <datalist id="cuartos-options">
                  <option value="Premium" />
                  <option value="Estándar" />
                  <option value="Deluxe" />
                  <option value="Suite Ejecutiva" />
                </datalist>
              </div>

              <div className="form-group">
                <label>Precio por Noche ($)</label>
                <input type="number" step="0.01" value={formPrecio} onChange={(e) => setFormPrecio(e.target.value)} required />
              </div>

              <button type="submit" className="btn-submit">
                {isEditMode ? 'Guardar Cambios' : 'Crear Cuarto'}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}