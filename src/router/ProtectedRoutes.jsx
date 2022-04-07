import React from "react";
import { useAuth } from "../contexts/providers/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoutes() {
  const { authState } = useAuth();
  const location = useLocation();
  return authState.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={{ from: location }} />
  );
}

export default ProtectedRoutes;
