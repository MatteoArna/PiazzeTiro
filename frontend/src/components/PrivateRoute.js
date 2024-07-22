// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children, requiredRoleId }) => {
  const { auth } = useAuth();

  if (!auth.token) {
    return <Navigate to="/login" />;
  }

  if (requiredRoleId && auth.roleId !== requiredRoleId) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
