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

  // Estados para el Modal de Registro 
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [regName, setRegName] = useState('');
  const [regSurname, setRegSurname] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');   // <-- ¡FALTABA ESTE ESTADO CRUCIAL!
  const [regTelefono, setRegTelefono] = useState('');   // <-- ¡FALTABA ESTE ESTADO CRUCIAL!
  const [regDireccion, setRegDireccion] = useState('');

  // --- 1. Manejador del Inicio de Sesión Real ---
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email, 
          password: password 
        })
      });

      const data = await res.json();

      if (res.ok) {
        // Guarda los datos reales devueltos por MySQL en tu AuthContext global
        login(data.user, data.token);

        // Redirección estricta basada en el rol devuelto por la BD
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/client');
        }
      } else {
        // MySQL invalida las credenciales y frena el acceso aquí
        alert(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error en la conexión con el servidor:", error);
      alert("No se pudo conectar con el servidor. ¿El backend está encendido en el puerto 3000?");
    }
  };

  // --- 2. Manejador del Registro de Clientes Real ---
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const nuevoCliente = {
      nombre: `${regName} ${regSurname}`.trim(),
      correo: regEmail,
      contrasena: regPassword, 
      telefono: regTelefono, 
      direccion: regDireccion
    };

    try {
      const res = await fetch('http://localhost:3000/api/clientes', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoCliente)
      });

      const data = await res.json();

      if (res.ok) {
        alert(`¡Registro exitoso! Bienvenido, ${nuevoCliente.nombre}.\nYa puedes iniciar sesión.`);
        setIsRegisterOpen(false);
        
        // Limpiar campos por completo
        setRegName('');
        setRegSurname('');
        setRegEmail('');
        setRegPassword('');
        setRegTelefono('');
        setRegDireccion('');
      } else {
        alert(data.message || "Hubo un problema al registrar tu cuenta.");
      }
    } catch (error) {
      console.error("Error al registrar cliente:", error);
      alert("Error de red al intentar registrar al cliente.");
    }
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

          <div className="login-card">
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="******"
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
                Registrarse como Cliente
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
            
            <button onClick={() => setIsRegisterOpen(false)} className="btn-close-modal">✕</button>

            <h2 style={{marginBottom: '20px', color: '#23747d'}}>Registrar Nueva Cuenta</h2>

            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label>Nombre(s)</label>
                <input type="text" placeholder="Value" value={regName} onChange={(e) => setRegName(e.target.value)} required />
              </div>

              <div className="form-group">
                <label>Apellidos</label>
                <input type="text" placeholder="Value" value={regSurname} onChange={(e) => setRegSurname(e.target.value)} required />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Value" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required />
              </div>

              <div className="form-group">
                <label>Contraseña</label>
                <input type="password" placeholder="Mínimo 6 caracteres" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required />
              </div>

              <div className="form-group">
                <label>Teléfono</label>
                <input type="text" placeholder="10 dígitos" value={regTelefono} onChange={(e) => setRegTelefono(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Dirección</label>
                <textarea placeholder="Dirección completa" value={regDireccion} onChange={(e) => setRegDireccion(e.target.value)} rows="2" required />
              </div>

              <button type="submit" className="btn-submit">
                Crear Cuenta
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}