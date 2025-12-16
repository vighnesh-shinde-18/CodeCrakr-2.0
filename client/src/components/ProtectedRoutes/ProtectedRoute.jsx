import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => { 
  console.log("start")
  const isAuthenticated = document.cookie
    .split(';')
    .some((cookie) => cookie.trim().startsWith('AccessToken='));

  console.log("end : ",isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
