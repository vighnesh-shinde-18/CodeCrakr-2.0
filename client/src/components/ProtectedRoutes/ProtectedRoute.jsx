import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // We put the check inside useEffect to ensure it runs 
    // after the component mounts, giving the browser time to sync cookies.
    const checkAuth = () => {
      const hasToken = document.cookie
        .split(';')
        .some((cookie) => cookie.trim().startsWith('AccessToken='));

      setIsAuthenticated(hasToken);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // 1. While checking, show a loader (prevents premature redirect)
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  // 2. Once done loading, decide where to go
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
