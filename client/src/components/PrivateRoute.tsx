// components/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { isLogged } = useAuth();
  return isLogged ? children : <Navigate to="/login" />;
}
