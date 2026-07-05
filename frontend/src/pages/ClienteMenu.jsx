import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClienteMenu.css';
import logo from '../assets/cliente_menu/logo.png';
import imgPlatillos from '../assets/cliente_menu/platillos.jpg';
import imgHabitaciones from '../assets/cliente_menu/habitaciones.jpg';
import imgPerfil from '../assets/cliente_menu/perfil.jpg';

const ClienteMenu = () => {
    const navigate = useNavigate();

    return (
        <div className="cliente_menu_grid_layout">
            <div className="cliente_logo_container">
                <img src={logo} alt="Logo" style={{width: '400px'}} />
            </div>

            <div className="cliente_menu_card" role="button" onClick={() => navigate('/restaurante')}>
                <h3>Platillos y Bebidas</h3>
                <img src={imgPlatillos} className="cliente_menu_img" alt="Platillos" />
            </div>

            <div className="cliente_menu_card" role="button" onClick={() => navigate('/perfil')}>
                <h3>Mi Perfil</h3>
                <img src={imgPerfil} className="cliente_menu_img" alt="Perfil" />
            </div>

            <div className="cliente_menu_card_habitaciones" role="button" onClick={() => navigate('/habitaciones')}>
                <h3>Habitaciones</h3>
                <img src={imgHabitaciones} className="cliente_menu_img" alt="Habitaciones" />
            </div>
        </div>
    );
};
export default ClienteMenu;