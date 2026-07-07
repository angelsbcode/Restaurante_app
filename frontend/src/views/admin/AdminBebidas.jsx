// src/views/admin/AdminBebidas.jsx
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import InventoryCard from '../../components/InventoryCard';
import { useAuth } from '../../context/AuthContext';
import '../../styles/AdminPlatillos.css'; 

export default function AdminBebidas() {
  const { user } = useAuth(); // Traemos el administrador logueado
  const [bebidas, setBebidas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Campos del Formulario
  const [formNombre, setFormNombre] = useState('');
  const [formPrecio, setFormPrecio] = useState('');
  const [formTipo, setFormTipo] = useState(''); // Ej: "Cóctel", "Refresco", "Vino"
  const [formImagen, setFormImagen] = useState(null);

  // URLs de nuestra API de Node.js
  const API_GET_BEBIDAS = 'http://localhost:3000/api/platillos/categoria/bebidas';
  const API_BASE_PLATILLOS = 'http://localhost:3000/api/platillos';

  // --- 1. Cargar las bebidas desde MySQL ---
  useEffect(() => {
    const cargarBebidas = async () => {
      try {
        const res = await fetch(API_GET_BEBIDAS);
        const data = await res.json();

        const datosAdaptados = data.map(b => ({
          idPlatillo: b.idProducto,
          nombreOrden: b.nombre,
          precio: b.precio,
          tipo: b.categoria,
          imagen: b.imagen,
          idAdmin: b.idAdmin
        }));
        setBebidas(datosAdaptados);
      } catch (error) {
        console.error("Error cargando bebidas de MySQL:", error);
      }
    };
    cargarBebidas();
  }, []);

  const openCreateModal = () => {
    setIsEditMode(false);
    setFormNombre('');
    setFormPrecio('');
    setFormTipo('Bebidas'); // Valor base para identificarlo en la tabla
    setFormImagen('');
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
  if (e.target.files && e.target.files[0]) {
    setFormImagen(e.target.files[0]); // Guardamos el archivo binario completo
  }
};

  const openEditModal = (item) => {
    setEditingItem(item);
    setIsEditMode(true);
    setFormNombre(item.nombreOrden);
    setFormPrecio(item.precio);
    setFormTipo(item.tipo);
    setFormImagen(item.imagen || '');
    setIsModalOpen(true);
  };

  // --- 2. Crear o Editar Bebida en la Base de Datos ---
const handleFormSubmit = async (e) => {
  e.preventDefault();
  
  // Creamos el contenedor FormData obligatorio para subir archivos
  const formData = new FormData();
  formData.append('nombre', formNombre); // Cambiado nombreOrden -> nombre
  formData.append('precio', parseFloat(formPrecio));
  formData.append('tipo', 'Bebida'); // Fijo como Bebida para el filtro del backend
  formData.append('categoria', formTipo); // El valor de tu input (Cóctel, Vino, etc.)
  formData.append('idAdmin', user?.idAdmin || 1);
  
  if (formImagen) {
    formData.append('imagen', formImagen); // Adjuntamos el archivo binario de la PC
  }

  try {
    if (isEditMode) {
      // Petición PUT
      const res = await fetch(`${API_BASE_PLATILLOS}/${editingItem.idPlatillo}`, {
        method: 'PUT',
        // ¡OJO! NO añadas 'Content-Type' en los headers, el navegador lo calcula solo al ver el FormData
        body: formData 
      });

      if (res.ok) {
        // Para actualizar el estado visual rápido, recargamos o mapeamos
        const editado = await res.json();
        setBebidas(bebidas.map(b => b.idPlatillo === editingItem.idPlatillo ? { ...b, ...editado } : b));
      }
    } else {
      // Petición POST
      const res = await fetch(API_BASE_PLATILLOS, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const nuevaBebidaCreada = await res.json();
        setBebidas([...bebidas, nuevaBebidaCreada]);
      }
    }
  } catch (error) {
    console.error("Error enviando el archivo al servidor:", error);
  }
  
  setIsModalOpen(false);
};

  // --- 3. Eliminar Bebida de MySQL ---
  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta bebida permanentemente?")) {
      try {
        const res = await fetch(`${API_BASE_PLATILLOS}/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setBebidas(bebidas.filter(b => b.idPlatillo !== id));
        }
      } catch (error) {
        console.error("Error al borrar la bebida:", error);
      }
    }
  };

  return (
    <AdminLayout folderColor="#23747d"> {/* Cambia al color naranja de bebidas en tu Figma */}
      
      <div className="inventory-workspace">
        <div className="search-bar-container">
          <input type="text" placeholder="🔍 Buscar bebida..." className="folder-search-input" />
        </div>
        
        <div className="inventory-grid">
          {bebidas.map(bebida => (
            <InventoryCard 
              key={bebida.idPlatillo}
              item={bebida} 
              onEdit={() => openEditModal(bebida)} 
              onDelete={() => handleDelete(bebida.idPlatillo)}
            />
          ))}
        </div>
      </div>

      <div className="inventory-summary-sidebar">
        <div className="mini-logo-block">
            <span className="mini-h">H</span>
            <span className="mini-fork">🍹</span>
            <p>Hotel Management System</p>
        </div>
        
        <div className="add-placeholder-card" onClick={openCreateModal}>
            <div className="add-card-img-simulate">
              <div className="plus-icon-circle">＋</div>
            </div>
            <div className="add-card-info-simulate">
              <p className="add-placeholder-title">Agregar nueva Bebida</p>
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
            <h2 className="modal-form-title">{isEditMode ? 'Editar Bebida' : 'Agregar Nueva Bebida'}</h2>
            
            <form onSubmit={handleFormSubmit} className="edit-form-layout">            
              <div className="form-group">
                <label>Subir Imagen desde la Computadora</label>
                <input 
                  type="file" 
                  accept="image/*" // Limita la ventana de selección solo a imágenes (jpg, png, webp)
                  onChange={handleFileChange} 
                  className="file-input-style"
                />
              </div>

              <div className="form-group">
                <label>Nombre de la Bebida</label>
                <input type="text" value={formNombre} onChange={(e) => setFormNombre(e.target.value)} required />
              </div>
              
              <div className="form-group">
                <label>Categoría / Tipo de Bebida</label>
                <input 
                  type="text" 
                  list="bebidas-tipo-options"
                  value={formTipo} 
                  onChange={(e) => setFormTipo(e.target.value)} 
                  required 
                />
                <datalist id="bebidas-tipo-options">
                  <option value="Bebidas" />
                  <option value="Cóctel" />
                  <option value="Refresco" />
                  <option value="Vino" />
                </datalist>
              </div>

              <div className="form-group">
                <label>Precio ($)</label>
                <input type="number" step="0.01" value={formPrecio} onChange={(e) => setFormPrecio(e.target.value)} required />
              </div>

              <button type="submit" className="btn-submit">
                {isEditMode ? 'Guardar Cambios' : 'Crear Bebida'}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}