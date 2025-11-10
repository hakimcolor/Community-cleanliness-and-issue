// src/Router/PublicRoute.jsx
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const PublicRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  return user ? <Navigate to="/allissues" replace /> : <Outlet />;
};

export default PublicRoute;
