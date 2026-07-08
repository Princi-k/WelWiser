import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // If no token exists, redirect to login page (root path)
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
