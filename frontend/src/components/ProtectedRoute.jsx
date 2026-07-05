// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  // Si no está logueado, redirige al Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si su rol no está autorizado para esta vista, redirige a su menú correspondiente
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/client'} replace />;
  }

  return <Outlet />; // Renderiza las pantallas hijas de forma segura
};