// src/views/admin/AdminPlatillos.jsx
import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import InventoryCard from '../../components/InventoryCard';
import { useAuth } from '../../context/AuthContext';  
import '../../styles/AdminPlatillos.css';

export default function AdminPlatillos() {
  const { user } = useAuth();

  const [platillos, setPlatillos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Campos del Formulario
  const [formNombre, setFormNombre] = useState('');
  const [formPrecio, setFormPrecio] = useState('');
  const [formTipo, setFormTipo] = useState(''); // Controlará la categoría (Plato Fuerte / Postre)
  const [formImagen, setFormImagen] = useState(null);

  const API_URL = 'http://localhost:3000/api/platillos';

  // --- 1. Cargar platillos desde el Backend ---
  useEffect(() => {
    const cargarPlatillos = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        
        // PUENTE DE NORMALIZACIÓN: Traducimos lo nuevo del backend al formato que entiende tu Frontend actual
        const datosAdaptados = data.map(p => ({
          idPlatillo: p.idProducto,
          nombreOrden: p.nombre,
          precio: p.precio,
          tipo: p.categoria, // Mapeamos la categoría de la BD a la propiedad tipo
          imagen: p.imagen,
          idAdmin: p.idAdmin
        }));

        setPlatillos(datosAdaptados);
      } catch (error) {
        console.error("Error cargando platillos de MySQL:", error);
      }
    };
    cargarPlatillos();
  }, []);

  const openCreateModal = () => {
    setIsEditMode(false);
    setFormNombre('');
    setFormPrecio('');
    setFormTipo('');
    setFormImagen(null);
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormImagen(e.target.files[0]);
    }
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setIsEditMode(true);
    setFormNombre(item.nombreOrden);
    setFormPrecio(item.precio);
    setFormTipo(item.tipo);
    setFormImagen(null);
    setIsModalOpen(true);
  };

  // --- 2. Crear o Editar usando FormData (Con las nuevas columnas del Backend) ---
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // ALINEACIÓN CON EL BACKEND: Mandamos las claves exactas que espera productoController
    formData.append('nombre', formNombre); 
    formData.append('precio', parseFloat(formPrecio));
    formData.append('tipo', 'Comida'); // Fijo como comida para esta sección
    formData.append('categoria', formTipo); // El valor del input (Plato Fuerte / Postre) viaja a la columna categoria
    formData.append('idAdmin', user?.idAdmin || 1);

    if (formImagen) {
      formData.append('imagen', formImagen);
    }

    try {
      if (isEditMode) {
        const res = await fetch(`${API_URL}/${editingItem.idPlatillo}`, {
          method: 'PUT',
          body: formData
        });

        if (res.ok) {
          const editadoRaw = await res.json();
          // Adaptamos la respuesta del backend para actualizar el estado de React de inmediato
          const editadoNormalizado = {
            idPlatillo: editadoRaw.idProducto,
            nombreOrden: editadoRaw.nombre,
            precio: editadoRaw.precio,
            tipo: editadoRaw.categoria,
            imagen: editadoRaw.imagen,
            idAdmin: editadoRaw.idAdmin
          };

          setPlatillos(platillos.map(p => 
            p.idPlatillo === editingItem.idPlatillo ? editadoNormalizado : p
          ));
        }
      } else {
        const res = await fetch(API_URL, {
          method: 'POST',
          body: formData
        });

        if (res.ok) {
          const nuevoRaw = await res.json();
          const nuevoNormalizado = {
            idPlatillo: nuevoRaw.idProducto,
            nombreOrden: nuevoRaw.nombre,
            precio: nuevoRaw.precio,
            tipo: nuevoRaw.categoria,
            imagen: nuevoRaw.imagen,
            idAdmin: nuevoRaw.idAdmin
          };
          setPlatillos([...platillos, nuevoNormalizado]);
        }
      }
    } catch (error) {
      console.error("Error al procesar el formulario:", error);
    }
    
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este platillo permanentemente?")) {
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setPlatillos(platillos.filter(p => p.idPlatillo !== id));
        }
      } catch (error) {
        console.error("Error al borrar el platillo:", error);
      }
    }
  };

  return (
    <AdminLayout folderColor="#23747d">
      <div className="inventory-workspace">
        <div className="search-bar-container">
          <input type="text" placeholder="🔍 Buscar platillo..." className="folder-search-input" />
        </div>
        
        <div className="inventory-grid">
          {platillos.map(platillo => (
            <InventoryCard 
              key={platillo.idPlatillo} 
              item={platillo} 
              onEdit={() => openEditModal(platillo)} 
              onDelete={() => handleDelete(platillo.idPlatillo)} 
            />
          ))}
        </div>
      </div>

      <div className="inventory-summary-sidebar">
        <div className="mini-logo-block">
            <span className="mini-h">H</span>
            <span className="mini-fork">🍴</span>
            <p>Hotel Management System</p>
        </div>
        
        <div className="add-placeholder-card" onClick={openCreateModal}>
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

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <button className="btn-close-modal" onClick={() => setIsModalOpen(false)}>✕</button>
            <h2 className="modal-form-title">{isEditMode ? 'Editar Registro' : 'Agregar Nuevo Registro'}</h2>
            
            <form onSubmit={handleUpdateSubmit} className="edit-form-layout">
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
                <label>Nombre del Platillo</label>
                <input type="text" value={formNombre} onChange={(e) => setFormNombre(e.target.value)} required />
              </div>

              <div className="form-group">
                <label>Precio ($)</label>
                <input type="number" step="0.01" value={formPrecio} onChange={(e) => setFormPrecio(e.target.value)} required />
              </div>

              <div className="form-group">
                <label>Tipo de Platillo</label>
                <input 
                  type="text" 
                  list="platillos-tipo-options"
                  value={formTipo} 
                  onChange={(e) => setFormTipo(e.target.value)} 
                  required 
                  placeholder="Ej: Plato Fuerte, Postres"
                />
                <datalist id="platillos-tipo-options">
                  <option value="Plato Fuerte" />
                  <option value="Postres" />
                </datalist>
              </div>

              <button type="submit" className="btn-submit">
                {isEditMode ? 'Guardar Cambios' : 'Crear Platillo'}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}