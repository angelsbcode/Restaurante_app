// src/views/auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

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
    <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-3 bg-[#e2e2e2] relative">
      
      {/* COLUMNA IZQUIERDA: Galería Habitaciones (Figma Sign In) */}
      <div className="hidden md:flex flex-col justify-between p-4 space-y-4 bg-white">
        <div className="flex-1 overflow-hidden rounded shadow-sm">
          <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500" alt="Room 1" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 overflow-hidden rounded shadow-sm">
          <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500" alt="Room 2" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 overflow-hidden rounded shadow-sm">
          <img src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=500" alt="Room 3" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* COLUMNA CENTRAL: Formulario Principal de Login */}
      <div className="flex flex-col items-center justify-center p-6 bg-[#e2e2e2]">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <span className="text-7xl font-serif font-black tracking-tighter text-black">H</span>
            <span className="text-5xl text-black">🍴</span>
          </div>
          <h1 className="text-2xl font-light text-neutral-800 tracking-wide font-sans">
            Hotel Management System
          </h1>
        </div>

        {/* Tarjeta Blanca de Credenciales */}
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="Value"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-400 placeholder-neutral-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-600 mb-1">Password</label>
              <input
                type="password"
                placeholder="Value"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-400 placeholder-neutral-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2e2d2d] text-white py-2.5 rounded-md font-medium hover:bg-neutral-800 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="flex justify-between items-center mt-6 text-sm">
            <a href="#forgot" className="text-neutral-600 hover:underline">
              Forgot password?
            </a>
            {/* Botón para abrir la vista modal de registro de Figma */}
            <button 
              onClick={() => setIsRegisterOpen(true)} 
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>

      {/* COLUMNA DERECHA: Galería Gastronómica */}
      <div className="hidden md:flex flex-col justify-between p-4 space-y-4 bg-white">
        <div className="flex-1 overflow-hidden rounded shadow-sm">
          <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=500" alt="Food 1" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 overflow-hidden rounded shadow-sm">
          <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500" alt="Food 2" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 overflow-hidden rounded shadow-sm">
          <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500" alt="Coffee" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* --- MODAL FLOTANTE DE REGISTRO (Figma Sign in con X) --- */}
      {isRegisterOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-sm bg-white rounded-lg shadow-xl p-8 relative animate-fade-in">
            
            {/* Botón Cerrar (X) */}
            <button 
              onClick={() => setIsRegisterOpen(false)}
              className="absolute top-4 right-4 text-xl text-neutral-500 hover:text-black focus:outline-none"
            >
              ✕
            </button>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Value"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-400 placeholder-neutral-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-1">Surname</label>
                <input
                  type="text"
                  placeholder="Value"
                  value={regSurname}
                  onChange={(e) => setRegSurname(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-400 placeholder-neutral-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Value"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-400 placeholder-neutral-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-600 mb-1">Dirección</label>
                <textarea
                  placeholder="Value"
                  value={regDireccion}
                  onChange={(e) => setRegDireccion(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-400 placeholder-neutral-300 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2e2d2d] text-white py-2.5 rounded-md font-medium hover:bg-neutral-800 transition-colors mt-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}