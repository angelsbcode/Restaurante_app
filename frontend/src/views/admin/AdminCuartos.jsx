// src/views/admin/AdminCuartos.jsx
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import InventoryCard from '../../components/InventoryCard';
import '../../styles/AdminPlatillos.css'; 
import '../../styles/AdminCuartos.css'; 
import { useAuth } from '../../context/AuthContext';

export default function AdminCuartos() {
  const { user } = useAuth();
  const [cuartos, setCuartos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Campos del Formulario
  const [formTipoCuarto, setFormTipoCuarto] = useState('');
  const [formTipoCama, setFormTipoCama] = useState('');
  const [formPrecio, setFormPrecio] = useState('');
  const [formImagen, setFormImagen] = useState(null); // Cambiado a null para el archivo binario

  // Cambiado dinámicamente al puerto asignado
  const API_URL = 'http://localhost:3000/api/habitaciones'; 

  // --- 1. Cargar Habitaciones desde MySQL ---
  useEffect(() => {
    const cargarCuartos = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setCuartos(data);
      } catch (error) {
        console.error("Error cargando habitaciones de MySQL:", error);
      }
    };
    cargarCuartos();
  }, []);

  const openCreateModal = () => {
    setIsEditMode(false); 
    setFormTipoCama('');
    setFormTipoCuarto('');
    setFormPrecio('');
    setFormImagen(null); // Limpio para archivo binario
    setIsModalOpen(true);
  };

  // Capturar archivo físico de la PC
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormImagen(e.target.files[0]);
    }
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setIsEditMode(true);
    setFormTipoCuarto(item.tipoCuarto);
    setFormTipoCama(item.tipoCama);
    setFormPrecio(item.precio);
    setFormImagen(null); // Ponemos null para no sobreescribir la imagen previa a menos que elija otra
    setIsModalOpen(true);
  };

  // --- 2. Crear o Editar Habitación con FormData ---
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('tipoCuarto', formTipoCuarto);
    formData.append('tipoCama', formTipoCama);
    formData.append('precio', parseFloat(formPrecio));
    formData.append('idAdmin', user?.idAdmin || 1);

    if (formImagen) {
      formData.append('imagen', formImagen); // Adjuntamos archivo de la PC
    }

    try {
      if (isEditMode) {
        // Enviar PUT al Backend
        const res = await fetch(`${API_URL}/${editingItem.idCuarto}`, {
          method: 'PUT',
          body: formData
        });

        if (res.ok) {
          const editado = await res.json();
          setCuartos(cuartos.map(c => c.idCuarto === editingItem.idCuarto ? editado : c));
        }
      } else {
        // Enviar POST al Backend
        const res = await fetch(API_URL, {
          method: 'POST',
          body: formData
        });

        if (res.ok) {
          const nuevoCuartoCreado = await res.json();
          setCuartos([...cuartos, nuevoCuartoCreado]);
        }
      }
    } catch (error) {
      console.error("Error al procesar el formulario de habitaciones:", error);
    }
    
    setIsModalOpen(false);
  };

  // --- 3. Eliminar Habitación de MySQL ---
  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta habitación permanentemente de la base de datos?")) {
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setCuartos(cuartos.filter(c => c.idCuarto !== id));
        }
      } catch (error) {
        console.error("Error al borrar el cuarto:", error);
      }
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

      {/* --- FORMULARIO MODAL --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <button className="btn-close-modal" onClick={() => setIsModalOpen(false)}>✕</button>
            <h2 className="modal-form-title">{isEditMode ? 'Editar Cuarto' : 'Agregar Nuevo Cuarto'}</h2>
            
            <form onSubmit={handleUpdateSubmit} className="edit-form-layout">
              {/* CAMBIADO: Carga local de archivos de la PC */}
              <div className="form-group">
                <label>Subir Imagen desde la Computadora</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="file-input-style"
                />
              </div>
              
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