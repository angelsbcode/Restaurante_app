// src/views/client/ClienteRestaurante.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClienteHabitaciones.css';
// 1. IMPORTAR EL HOOK DE AUTENTICACIÓN
import { useAuth } from '../context/AuthContext'; 

const ClienteRestaurante = () => {
    const navigate = useNavigate();
    // 2. EXTRAER EL USUARIO DE SESIÓN
    const { user } = useAuth(); 

    // Estados
    const [filtroActivo, setFiltroActivo] = useState('Plato Fuerte');
    const [platillos, setPlatillos] = useState([]); // Cargados dinámicamente desde MySQL
    const [carrito, setCarrito] = useState([]);
    const [loading, setLoading] = useState(false);
    const fechaHoy = new Date().toLocaleDateString('es-MX');

    const API_URL = 'http://localhost:3000/api/platillos';

    // --- 1. Cargar el menú de Productos desde el Backend ---
    useEffect(() => {
        const cargarMenu = async () => {
            setLoading(true);
            try {
                const res = await fetch(API_URL);
                const data = await res.json();
                
                // NORMALIZACIÓN: Traducimos las propiedades de la BD al formato del carrito
                const datosAdaptados = data.map(p => ({
                    id: p.idProducto,
                    nombre: p.nombre,
                    categoria: p.categoria, // 'Plato Fuerte', 'Postres', etc.
                    precio: p.precio,
                    imagen: p.imagen,
                    descripcion: 'Preparado al momento con ingredientes frescos de alta calidad.'
                }));

                setPlatillos(datosAdaptados);
            } catch (error) {
                console.error("Error cargando el menú del restaurante:", error);
            } finally {
                setLoading(false);
            }
        };

        cargarMenu();
    }, []);

    // Filtrar dinámicamente por la pestaña (Tab) activa
    const platillosFiltrados = platillos.filter(p => p.categoria === filtroActivo);

    // Las "Especialidades" serán de manera elegante los primeros 3 productos de la lista
    const especialidades = platillos.slice(0, 3);

    // --- 2. Lógica del Carrito (Usando idProducto normalizado como item.id) ---
    const agregarAlCarrito = (item) => {
        setCarrito(prev => {
            const existe = prev.find(i => i.id === item.id);
            if (existe) return prev.map(i => i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i);
            return [...prev, { ...item, cantidad: 1 }];
        });
    };

    const quitarDelCarrito = (item) => {
        setCarrito((prev) => {
            const existe = prev.find((i) => i.id === item.id);
            if (!existe) return prev;
            if (existe.cantidad > 1) {
                return prev.map((i) => 
                    i.id === item.id ? { ...i, cantidad: i.cantidad - 1 } : i
                );
            }
            return prev.filter((i) => i.id !== item.id);
        });
    };

    const obtenerCantidad = (id) => carrito.find(i => i.id === id)?.cantidad || 0;
    const calcularTotal = () => carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    return (
        <div className="contenedor_reservaciones">
            <header className="header_top">
                <h1>RESTAURANTE</h1>
                <button className="btn_cerrar" onClick={() => navigate('/client')}>X</button>
            </header>

            <main className="contenido_principal">
                <section className="seccion_seleccion">
                    
                    {/* Carrusel Superior: Especialidades de la Casa */}
                    <div className="bloque_seccion">
                        <h3>ESPECIALIDADES RECOMENDADAS</h3>
                        <div className="carrusel_camas">
                            {especialidades.map((especialidad) => (
                                <div key={`esp-${especialidad.id}`} className="tarjeta_cama_carrusel">
                                    <div className="img_placeholder">
                                        {especialidad.imagen ? (
                                            <img src={especialidad.imagen} alt={especialidad.nombre} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'}} />
                                        ) : (
                                            <div className="no-img-fallback">🍽️</div>
                                        )}
                                    </div>
                                    <h4>{especialidad.nombre}</h4>
                                    <p className="max_pax">{especialidad.descripcion}</p>
                                    <div className="tarjeta_controles">
                                        <span className="precio">${especialidad.precio}</span>
                                        <div className="contador">
                                            <button onClick={() => quitarDelCarrito(especialidad)}>-</button>
                                            <span>{obtenerCantidad(especialidad.id)}</span>
                                            <button onClick={() => agregarAlCarrito(especialidad)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Menú Filtrable por Categorías */}
                    <div className="header_habitaciones">
                        <h3>MENÚ DEL RESTAURANTE</h3>
                        <div className="tabs_habitaciones">
                            {['Plato Fuerte', 'Bebidas', 'Postres'].map(tab => (
                                <button 
                                    key={tab}
                                    className={`tab_btn ${filtroActivo === tab ? 'tab_activa' : ''}`}
                                    onClick={() => setFiltroActivo(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <p className="loading_text">Cargando menú desde la cocina...</p>
                    ) : (
                        <div className="grid_tarjetas">
                            {platillosFiltrados.length === 0 ? (
                                <p className="no_disponible_text">No hay opciones disponibles en la categoría "{filtroActivo}" en este momento.</p>
                            ) : (
                                platillosFiltrados.map((platillo) => (
                                    <div key={platillo.id} className="tarjeta">
                                        <div className="img_placeholder">
                                            {platillo.imagen ? (
                                                <img src={platillo.imagen} alt={platillo.nombre} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'}} />
                                            ) : (
                                                <div className="no-img-fallback">🍔</div>
                                            )}
                                        </div>
                                        <h4>{platillo.nombre}</h4>
                                        <p className="max_pax">{platillo.descripcion}</p>
                                        <div className="tarjeta_controles">
                                            <span className="precio">${platillo.precio} <sub>c/u</sub></span>
                                            <div className="contador">
                                                <button onClick={() => quitarDelCarrito(platillo)}>-</button>
                                                <span>{obtenerCantidad(platillo.id)}</span>
                                                <button onClick={() => agregarAlCarrito(platillo)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </section>

                {/* Panel lateral: Ticket de la Comanda */}
                <aside className="panel_ticket">
                    <h2>Nueva Orden</h2>

                    <div className="datos_huesped">
                        <h4>Datos de Cliente</h4>
                        {/* 3. CAMBIADO: Nombre dinámico real del usuario de sesión */}
                        <label>Nombre: <strong>{user?.nombre || "Huésped Registrado"}</strong></label>
                        <p>Fecha de registro: {fechaHoy}</p>
                    </div>
                    
                    <div className="resumen_carrito">
                        {carrito.map((item) => (
                            <div key={item.id} className="item_carrito">
                                <span style={{cursor: 'pointer'}} onClick={() => quitarDelCarrito(item)}>🗑️</span>
                                <span>{item.cantidad > 1 ? `(${item.cantidad}) ` : ''}{item.nombre}</span>
                                <span>${item.precio * item.cantidad}</span>
                            </div>
                        ))}
                    </div>

                    <div className="total_seccion">
                        <h3>Total</h3>
                        <h3>${calcularTotal()}</h3>
                    </div>

                    <div className="acciones_finales">
                        <button className="btn_secundario" onClick={() => navigate('/client')}>Ver Habitaciones</button>
                        <button className="btn_primario" onClick={() => alert("¡Comanda enviada a la cocina con éxito!")}>Finalizar compra</button>
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default ClienteRestaurante;