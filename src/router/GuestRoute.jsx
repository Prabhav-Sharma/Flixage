import React from "react";
import { useAuth } from "../contexts/providers/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

function GuestRoute() {
  const { authState } = useAuth();

  return authState.isAuthenticated ? <Navigate to={"/videos"} /> : <Outlet />;
}

export default GuestRoute;
