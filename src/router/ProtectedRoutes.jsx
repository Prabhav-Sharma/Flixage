import React from "react";
import { useAuth } from "../contexts/providers/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const { authState } = useAuth();
  return authState.isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
}

export default ProtectedRoutes;
