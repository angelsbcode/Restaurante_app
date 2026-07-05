// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Importaciones de Vistas
import Login from './views/auth/Login';
import AdminMenu from './views/admin/AdminMenu';
import AdminPlatillos from './views/admin/AdminPlatillos';
import AdminBebidas from './views/admin/AdminBebidas';
import AdminCuartos from './views/admin/AdminCuartos';
/* 
import ClientMenu from './views/client/ClientMenu';
import ClientRooms from './views/client/ClientRooms';
import ClientDishes from './views/client/ClientDishes';
import ClientPerfil from './views/client/ClientPerfil';
*/

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. RUTAS PÚBLICAS */}
          <Route path="/login" element={<Login />} />

          {/* 2. RUTAS PROTEGIDAS PARA EL ADMINISTRADOR */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminMenu />} />
            <Route path="/admin/platillos" element={<AdminPlatillos />} />
            <Route path="/admin/bebidas" element={<AdminBebidas />} />
            <Route path="/admin/cuartos" element={<AdminCuartos />} /> 
          </Route>

          {/* 3. RUTAS PROTEGIDAS PARA EL CLIENTE */}
          <Route element={<ProtectedRoute allowedRoles={['client']} />}>
            {/* 
            <Route path="/client" element={<ClientMenu />} />
            <Route path="/client/habitaciones" element={<ClientRooms />} />
            <Route path="/client/ordenar" element={<ClientDishes />} />
            <Route path="/client/perfil" element={<ClientPerfil />} />
            */}
          </Route>

          {/* Redirección por defecto si la ruta no existe */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}