// src/views/auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Index.css';
import '../../styles/Login.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Estados para el Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estados para el Modal de Registro (Campos basados en la tabla Cliente)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [regName, setRegName] = useState('');
  const [regSurname, setRegSurname] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regDireccion, setRegDireccion] = useState('');

  // Manejador del Inicio de Sesión
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("¡Formulario atrapado sin recargar!");
    console.log("Email ingresado:", email);

    // NOTA: Por ahora simulamos la respuesta del backend (Node.js + MySQL)
    // Cuando conectes tu API, aquí harás el fetch() correspondiente.
    
    if (email === 'admin@hotel.com') {
      // Simulamos que es un Administrador
      const mockUserData = { id: 1, email: email, role: 'admin' };
      const mockToken = 'token-admin-12345';
      
      login(mockUserData, mockToken);
      navigate('/admin'); // Redirige al menú de administración
    } else {
      // Simulamos que cualquier otro correo es un Cliente
      const mockUserData = { id: 10, email: email, role: 'client' };
      const mockToken = 'token-cliente-54321';
      
      login(mockUserData, mockToken);
      navigate('/client'); // Redirige al portal del cliente
    }
  };

  // Manejador del Registro de Clientes
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Aquí irá tu petición POST hacia Node.js para insertar en la tabla 'Cliente'
    alert(`Cliente registrado temporalmente:\nNombre: ${regName} ${regSurname}\nEmail: ${regEmail}`);
    setIsRegisterOpen(false);
    
    // Limpiar campos
    setRegName('');
    setRegSurname('');
    setRegEmail('');
    setRegDireccion('');
  };

  return (
    <div className="login-container">
      <div className="login-table">
        
        {/* COLUMNA IZQUIERDA: Galería Habitaciones */}
        <div className="login-column side-column">
          <div className="gallery-wrapper">
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500" alt="Room 1" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500" alt="Room 2" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=500" alt="Room 3" />
            </div>
          </div>
          <h1 className="text-2xl font-light text-neutral-800 tracking-wide font-sans">
            Hotel Management System
          </h1>
        </div>

        {/* COLUMNA CENTRAL: Formulario Principal de Login */}
        <div className="login-column center-column">
          <div className="login-header">
            <div>
              <span className="logo-brand">H</span>
              <span className="logo-icon">🍴</span>
            </div>
            <h1 className="system-title">Hotel Management System</h1>
          </div>

          {/* Tarjeta Blanca de Credenciales */}
          <div className="login-card">
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Value"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Value"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-submit">
                Sign In
              </button>
            </form>

            <div className="card-footer">
              <a href="#forgot" className="footer-link-left">
                Forgot password?
              </a>
              <button 
                onClick={() => setIsRegisterOpen(true)} 
                className="footer-link-right"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Galería Gastronómica */}
        <div className="login-column side-column">
          <div className="gallery-wrapper">
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=500" alt="Food 1" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500" alt="Food 2" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500" alt="Coffee" />
            </div>
          </div>
        </div>

      </div>

      {/* --- MODAL FLOTANTE DE REGISTRO --- */}
      {isRegisterOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            
            <button 
              onClick={() => setIsRegisterOpen(false)}
              className="btn-close-modal"
            >
              ✕
            </button>

            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Value"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Surname</label>
                <input
                  type="text"
                  placeholder="Value"
                  value={regSurname}
                  onChange={(e) => setRegSurname(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Value"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Dirección</label>
                <textarea
                  placeholder="Value"
                  value={regDireccion}
                  onChange={(e) => setRegDireccion(e.target.value)}
                  rows="3"
                  required
                />
              </div>

              <button type="submit" className="btn-submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}