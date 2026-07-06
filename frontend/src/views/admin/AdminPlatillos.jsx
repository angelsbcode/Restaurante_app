 // src/views/admin/AdminPlatillos.jsx
import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import InventoryCard from '../../components/InventoryCard';
import '../../styles/AdminPlatillos.css';

export default function AdminPlatillos() {
  // Datos Dummy mapeando a la estructura de tu tabla Platillo
const [platillos, setPlatillos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Campos del Formulario
  const [formNombre, setFormNombre] = useState('');
  const [formPrecio, setFormPrecio] = useState('');
  const [formTipo, setFormTipo] = useState('');

  const API_URL = 'http://localhost:5000/api/platillos';

  useEffect(() => {
    const cargarPlatillos = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setPlatillos(data);
      } catch (error) {
        console.error("Error cargando platillos de MySQL:", error);
      }
    };
    cargarPlatillos();
  }, []);

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

    const payload = {
      nombreOrden: formNombre,
      precio: parseFloat(formPrecio),
      tipo: formTipo,
      imagen: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300' // Imagen mock
    };

    try {
      if (isEditMode) {
        // Enviar PUT al Backend
        const res = await fetch(`${API_URL}/${editingItem.idPlatillo}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          setPlatillos(platillos.map(p => 
            p.idPlatillo === editingItem.idPlatillo ? { ...p, ...payload } : p
          ));
        }
      } else {
        // Enviar POST al Backend
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const nuevoPlatilloCreado = await res.json();
          setPlatillos([...platillos, nuevoPlatilloCreado]); // Agrega el registro con su ID real de MySQL
        }
      }
    } catch (error) {
      console.error("Error al procesar el formulario:", error);
    }
    
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este platillo permanentemente de la base de datos?")) {
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