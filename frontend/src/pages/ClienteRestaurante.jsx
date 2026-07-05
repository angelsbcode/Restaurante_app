import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClienteHabitaciones.css';

const ClienteRestaurante = () => {
    const navigate = useNavigate();
    const [filtroActivo, setFiltroActivo] = useState('Plato Fuerte');
    const [carrito, setCarrito] = useState([]);
    const [notas, setNotas] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState(new Date().toISOString().split('T')[0]);
    const [ordenHora, setOrdenHora] = useState(new Date().toISOString().split('T')[0]);
    const fechaHoy = new Date().toLocaleDateString('es-MX');

    const especialidades = [
        { id: 'e1', nombre: 'Filete en Salsa', precio: 340, descripcion: 'Delicioso filete de res en salsa de champiñones y vino tinto.' },
        { id: 'e2', nombre: 'Tártara de Atún', precio: 280, descripcion: 'Deliciosa tarta de atún con mayonesa y verduras.' },
        { id: 'e3', nombre: 'Solomillo', precio: 360, descripcion: 'Delicioso solomillo de cerdo a la parrilla.' },
        { id: 'e4', nombre: 'Pasta Pesto', precio: 220, descripcion: 'Pasta fresca con salsa de albahaca y parmesano.' }
    ];

    const platillos = [
        { id: 'p1', nombre: 'Solomillo en Costra', categoria: 'Plato Fuerte', precio: 360, descripcion: 'Delicioso solomillo de cerdo en costra de pan rallado.' },
        { id: 'p2', nombre: 'Salmón a la Parrilla', categoria: 'Plato Fuerte', precio: 320, descripcion: 'Salmón fresco a la parrilla con hierbas aromáticas.' },
        { id: 'p3', nombre: 'Gin de Frutos Rojos', categoria: 'Bebidas', precio: 160, descripcion: 'Drink de gin con jugo de frutos rojos y espirulina.' },
        { id: 'p4', nombre: 'Agua de Jamaica', categoria: 'Bebidas', precio: 60, descripcion: 'Refrescante agua de jamaica con limón y canela.' },
        { id: 'p5', nombre: 'Hojaldre Fino', categoria: 'Postres', precio: 180, descripcion: 'Delicioso hojaldre relleno con crema y frutas.' },
        { id: 'p6', nombre: 'Volcán de Chocolate', categoria: 'Postres', precio: 150, descripcion: 'Postre de chocolate con salsa de caramelo y helado.' }
    ];

    const platillosFiltrados = platillos.filter(p => p.categoria === filtroActivo);


    const agregarAlCarrito = (item) => {
        setCarrito(prev => {
            const existe = prev.find(i => i.id === item.id);
            if (existe) return prev.map(i => i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i);
            return [...prev, { ...item, cantidad: 1 }];
        });
    };

    const quitarDelCarrito = (id) => {
        setCarrito(prev => prev.map(i => i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i).filter(i => i.cantidad > 0));
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
                    {/* Sección Camas */}
                    <div className="bloque_seccion">
                <h3>ESPECIALIDADES</h3>
                <div className="carrusel_camas">
                    {especialidades.map((especialidad) => (
                        <div key={especialidad.id} className="tarjeta_cama_carrusel">
                            <div className="img_placeholder"></div>
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

                    {/* Sección Habitaciones */}
                    <div className="header_habitaciones">
                        <h3>TIPO DE HABITACIÓN</h3>
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
                    <div className="grid_tarjetas">
                        {platillosFiltrados.map((platillo) => (
                            <div key={platillo.id} className="tarjeta">
                                <div className="img_placeholder">{/* <img src={platillo.img} /> */}</div>
                                <h4>{platillo.nombre}</h4>
                                <p className="max_pax">{platillo.descripcion}</p>
                                <div className="tarjeta_controles">
                                    <span className="precio">${platillo.precio} <sub>por noche</sub></span>
                                    <div className="contador">
                                        <button onClick={() => quitarDelCarrito(platillo)}>-</button>
                                        <span>{obtenerCantidad(platillo.id)}</span>
                                        <button onClick={() => agregarAlCarrito(platillo)}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Panel lateral: Ticket */}
                <aside className="panel_ticket">
                    <h2>Reservación #000</h2>

                    <div className="datos_huesped">
                        <h4>Datos de Cliente</h4>
                        <label>Nombre: [Usuario de Sesión]</label>
                        <p>Fecha de registro: {fechaHoy}</p>
                    </div>

                    <div className="detalles_estancia">
                        <h4>Hora de Reservación</h4>
                        <div className="detalle_fechas">
                            <div>
                                <input type="date" value={ordenHora} onChange={(e) => setOrdenHora(e.target.value)} />
                                <input type="time" defaultValue="15:00" />
                            </div>
                        </div>
                    </div>

                    <div className="resumen_carrito">
                        {carrito.map((item) => (
                            <div key={item.id} className="item_carrito">
                                <span>🗑️</span>
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
                        <button className="btn_secundario">Reservar restaurante</button>
                        <button className="btn_primario">Finalizar compra</button>
                    </div>
                </aside>
            </main>
        </div>
    );
};
export default ClienteRestaurante;