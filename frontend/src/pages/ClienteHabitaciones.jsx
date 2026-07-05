import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClienteHabitaciones.css';

const ClienteHabitaciones = () => {
    const navigate = useNavigate();

    // Fecha actual estática para el registro
    const fechaHoy = new Date().toLocaleDateString('es-MX', { 
        day: 'numeric', month: 'long', year: 'numeric' 
    });

    // Estados
    const [filtroActivo, setFiltroActivo] = useState('Premium');
    const [carrito, setCarrito] = useState([]);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');

    // Datos simulados (puedes reemplazarlos con la respuesta de tu backend)
    const camas = [
        { id: 'c1', nombre: 'Matrimonial', desc: '1 Cama Matrimonial', max: 2, precio: 1150, img: 'cama-matrimonial.jpg' },
        { id: 'c2', nombre: 'King Size', desc: '1 Cama Matrimonial Premium', max: 2, precio: 1350, img: 'king-size.jpg' },
        { id: 'c3', nombre: 'Doble Matrimonial', desc: '2 Camas Matrimoniales', max: 4, precio: 2200, img: 'doble-matrimonial.jpg' },
        { id: 'c4', nombre: 'Matrimonial', desc: '1 Cama Matrimonial', max: 2, precio: 1150, img: 'cama-matrimonial.jpg' },
        { id: 'c5', nombre: 'King Size', desc: '1 Cama Matrimonial Premium', max: 2, precio: 1350, img: 'king-size.jpg' },
        { id: 'c6', nombre: 'Doble Matrimonial', desc: '2 Camas Matrimoniales', max: 4, precio: 2200, img: 'doble-matrimonial.jpg' }
    ];

    const habitaciones = [
        { id: 'h1', nombre: 'Habitación Sencilla', tipo: 'Estándar', max: 2, precio: 1150, img: 'sencilla.jpg' },
        { id: 'h2', nombre: 'Premium Executive King', tipo: 'Premium', max: 2, precio: 2450, img: 'exec-king.jpg' },
        { id: 'h3', nombre: 'Premium Oasis con Tina', tipo: 'Premium', max: 2, precio: 2900, img: 'oasis.jpg' },
        { id: 'h4', nombre: 'Premium Sky Suite', tipo: 'Premium', max: 2, precio: 3400, img: 'sky-suite.jpg' },
        { id: 'h5', nombre: 'Familiar King', tipo: 'Familiar', max: 4, precio: 2200, img: 'familiar.jpg' },
        { id: 'h6', nombre: 'Habitación Sencilla', tipo: 'Estándar', max: 2, precio: 1150, img: 'sencilla.jpg' },
        { id: 'h7', nombre: 'Premium Executive King', tipo: 'Premium', max: 2, precio: 2450, img: 'exec-king.jpg' },
        { id: 'h8', nombre: 'Premium Oasis con Tina', tipo: 'Premium', max: 2, precio: 2900, img: 'oasis.jpg' },
        { id: 'h9', nombre: 'Premium Sky Suite', tipo: 'Premium', max: 2, precio: 3400, img: 'sky-suite.jpg' },
        { id: 'h10', nombre: 'Familiar King', tipo: 'Familiar', max: 4, precio: 2200, img: 'familiar.jpg' }
    ];

    // Lógica de fechas
    const calcularNoches = () => {
        if (!checkIn || !checkOut) return 0;
        const fechaInicio = new Date(checkIn);
        const fechaFin = new Date(checkOut);
        const diferenciaTiempo = fechaFin.getTime() - fechaInicio.getTime();
        const dias = Math.ceil(diferenciaTiempo / (1000 * 3600 * 24));
        return dias > 0 ? dias : 0;
    };

    const noches = calcularNoches();

    // Lógica del carrito
    const agregarAlCarrito = (item) => {
        setCarrito((prev) => {
            const existe = prev.find((i) => i.id === item.id);
            if (existe) {
                return prev.map((i) => 
                    i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i
                );
            }
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

    const obtenerCantidad = (id) => {
        const item = carrito.find((i) => i.id === id);
        return item ? item.cantidad : 0;
    };

    const calcularTotal = () => {
        const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        // Si hay noches definidas se multiplica, de lo contrario se asume 1 para reflejar el subtotal
        return subtotal * (noches > 0 ? noches : 1); 
    };

    const habitacionesFiltradas = habitaciones.filter(h => h.tipo === filtroActivo);

    return (
        <div className="contenedor_reservaciones">
            <header className="header_top">
                <h1>RESERVACIONES</h1>
                <button className="btn_cerrar" onClick={() => navigate('/menu')}>X</button>
            </header>

            <main className="contenido_principal">
                <section className="seccion_seleccion">
                    {/* Sección Camas */}
                    <div className="bloque_seccion">
                <h3>TIPO DE CAMA</h3>
                <div className="carrusel_camas">
                    {camas.map((cama) => (
                        <div key={cama.id} className="tarjeta_cama_carrusel">
                            <div className="img_placeholder"></div>
                            <h4>{cama.nombre}</h4>
                            <p className="max_pax">Máx. {cama.max} personas</p>
                            <div className="tarjeta_controles">
                                <span className="precio">${cama.precio}</span>
                                <div className="contador">
                                    <button onClick={() => quitarDelCarrito(cama)}>-</button>
                                        <span>{obtenerCantidad(cama.id)}</span>
                                        <button onClick={() => agregarAlCarrito(cama)}>+</button>
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
                            {['Estándar', 'Premium', 'Familiar', 'Ejecutiva', 'Suite'].map(tab => (
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
                        {habitacionesFiltradas.map((hab) => (
                            <div key={hab.id} className="tarjeta">
                                <div className="img_placeholder">{/* <img src={hab.img} /> */}</div>
                                <h4>{hab.nombre}</h4>
                                <p className="max_pax">Máx. {hab.max} personas</p>
                                <div className="tarjeta_controles">
                                    <span className="precio">${hab.precio} <sub>por noche</sub></span>
                                    <div className="contador">
                                        <button onClick={() => quitarDelCarrito(hab)}>-</button>
                                        <span>{obtenerCantidad(hab.id)}</span>
                                        <button onClick={() => agregarAlCarrito(hab)}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Panel lateral: Ticket */}
                <aside className="panel_ticket">
                    <h2>Reservación #000</h2>
                    <p className="fecha_emision">Fecha: {fechaHoy}</p>
                    <p className="hotel_nombre">Hotel: Este hotel</p>

                    <div className="datos_huesped">
                        <h4>Datos de Huésped</h4>
                        <label>Nombre: [Usuario de Sesión]</label>
                        <p>Fecha de registro: {fechaHoy}</p>
                    </div>

                    <div className="detalles_estancia">
                        <h4>Detalles de estancia</h4>
                        <div className="detalle_fechas">
                        <div>
                            <p className="etiqueta">Check-in</p>
                            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                            <input type="time" defaultValue="15:00" />
                        </div>
                        <div>
                            <p className="etiqueta">Check-out</p>
                            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                            <input type="time" defaultValue="12:00" />
                        </div>
                    </div>
                        <p className="duracion">Duración: {noches} Noches</p>
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

export default ClienteHabitaciones;