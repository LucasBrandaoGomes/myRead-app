import { Outlet, Navigate } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('autoLogin');
  return token ? <Outlet /> : <Navigate to="/sign-in" />;
}