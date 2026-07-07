import React, { useState } from 'react';
import './ClientePerfil.css';

const ClientePerfil = () => {
  // Estado para controlar qué sección inferior se muestra
  const [vistaActiva, setVistaActiva] = useState(null); 

  // Datos simulados (Mock data)
  const reservacionActual = {
    fecha: '29 de junio',
    hotel: 'Este hotel',
    checkIn: '10/07/2026 (15:00 hrs)',
    checkOut: '12/07/2026 (12:00 hrs)',
    duracion: '2 Noches',
    detallesCompra: [
      { id: 1, concepto: 'King Size', precio: 1350 },
      { id: 2, concepto: 'Premium Oasis con Tina', precio: 2900 }
    ],
    total: 4250
  };

  const historialReservaciones = [
    { id: 'RES-001', fecha: '15/05/2026', hotel: 'Este hotel', habitacion: 'Estándar', total: '$1,200', estado: 'Completada' },
    { id: 'RES-002', fecha: '02/04/2026', hotel: 'Este hotel', habitacion: 'Suite Ejecutiva', total: '$3,400', estado: 'Completada' },
  ];

  const historialOrdenes = [
    { id: 'ORD-099', fecha: '11/07/2026', items: 'Solomillo, Gin Frutos Rojos', total: '$520', estado: 'Entregado' },
    { id: 'ORD-085', fecha: '10/07/2026', items: 'Dúo de Mojitos', total: '$135', estado: 'Entregado' },
  ];

  const RenderizarVista = () => {
    switch (vistaActiva) {
      case 'reservaciones':
        return (
          <div className="vista_desplegada">
            <h3>Historial de Reservaciones</h3>
            <table className="tabla_historial">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Habitación</th>
                  <th>Total</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {historialReservaciones.map((res) => (
                  <tr key={res.id}>
                    <td>{res.id}</td>
                    <td>{res.fecha}</td>
                    <td>{res.habitacion}</td>
                    <td>{res.total}</td>
                    <td>{res.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'ordenes':
        return (
          <div className="vista_desplegada">
            <h3>Historial de Órdenes (Restaurante)</h3>
            <table className="tabla_historial">
              <thead>
                <tr>
                  <th>Orden</th>
                  <th>Fecha</th>
                  <th>Artículos</th>
                  <th>Total</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {historialOrdenes.map((ord) => (
                  <tr key={ord.id}>
                    <td>{ord.id}</td>
                    <td>{ord.fecha}</td>
                    <td>{ord.items}</td>
                    <td>{ord.total}</td>
                    <td>{ord.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'perfil':
        return (
          <div className="vista_desplegada vista_perfil">
            <h3>Mi Perfil</h3>
            <form className="formulario_perfil" onSubmit={(e) => e.preventDefault()}>
              <div className="form_group file_group">
                <div className="foto_preview"></div>
                <label className="btn_secundario">
                  Cambiar Foto
                  <input type="file" hidden accept="image/*" />
                </label>
              </div>
              <div className="form_group">
                <label>Nombre Completo</label>
                <input type="text" defaultValue="Persona 1" />
              </div>
              <div className="form_group">
                <label>Dirección</label>
                <input type="text" defaultValue="Por allá" />
              </div>
              <button type="submit" className="btn_primario_guardar">Guardar Cambios</button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="portal_layout">
      {/* Header Superior */}
      <header className="portal_header">
        <h1>PORTAL DEL CLIENTE</h1>
        <button className="btn_volver">←</button>
      </header>

      {/* Banner Principal */}
      <div className="portal_banner">
        <img src="https://via.placeholder.com/1200x300/e9ecef/888888?text=Banner+Hotel" alt="Fachada del Hotel" />
      </div>

      <div className="portal_contenido">
        {/* Tarjeta de Reservación Actual (Visible si existe) */}
        {reservacionActual && (
          <div className="tarjeta_reservacion_actual">
            <h2 className="titulo_seccion">Detalle de Reservación Actual</h2>
            <div className="reservacion_grid">
              
              {/* Columna 1: Huésped y Fechas */}
              <div className="columna_info">
                <div className="bloque_datos">
                  <h4>Datos de Huésped</h4>
                  <p>Fecha : {reservacionActual.fecha}</p>
                  <p>Hotel: {reservacionActual.hotel}</p>
                </div>
                <hr className="separador" />
                <div className="bloque_datos">
                  <h4>Detalles de estancia</h4>
                  <p>Check-in: {reservacionActual.checkIn}</p>
                  <p>Check-out: {reservacionActual.checkOut}</p>
                  <p>Duración: {reservacionActual.duracion}</p>
                </div>
              </div>

              {/* Columna 2: Compra */}
              <div className="columna_compra">
                <h4>Detalles de Compra</h4>
                <div className="lista_compra">
                  {reservacionActual.detallesCompra.map(item => (
                    <div className="item_compra" key={item.id}>
                      <span>{item.concepto}</span>
                      <span>${item.precio}</span>
                    </div>
                  ))}
                </div>
                <hr className="separador_solido" />
                <div className="item_compra total_compra">
                  <span>Total</span>
                  <span>${reservacionActual.total}</span>
                </div>
              </div>

              {/* Columna 3: Imagen de la habitación */}
              <div className="columna_imagen">
                <img src="https://via.placeholder.com/400x250/cccccc/ffffff?text=Habitacion+Premium" alt="Habitación" />
              </div>
            </div>
          </div>
        )}

        {/* Tarjetas de Navegación */}
        <div className="navegacion_acciones">
          <div className="grid_tarjetas">
            <button className={`tarjeta_accion ${vistaActiva === 'reservaciones' ? 'activa' : ''}`} onClick={() => setVistaActiva('reservaciones')}>
              <div className="img_accion img_res"></div>
              <span>Mis Reservaciones</span>
            </button>
            <button className={`tarjeta_accion ${vistaActiva === 'ordenes' ? 'activa' : ''}`} onClick={() => setVistaActiva('ordenes')}>
              <div className="img_accion img_ord"></div>
              <span>Mis ordenes</span>
            </button>
            <button className={`tarjeta_accion ${vistaActiva === 'perfil' ? 'activa' : ''}`} onClick={() => setVistaActiva('perfil')}>
              <div className="img_accion img_perfil"></div>
              <span>Mi perfil</span>
            </button>
          </div>
          
          <div className="controles_derecha">
             <div className="iconos_decorativos">
                <span className="icono">H</span>
                <span className="icono">🍽️</span>
             </div>
             <button className="btn_ayuda" disabled>
                💬 Ayuda
             </button>
          </div>
        </div>

        {/* Área dinámica para tablas o formulario */}
        {RenderizarVista()}

      </div>
    </div>
  );
};

export default ClientePerfil;