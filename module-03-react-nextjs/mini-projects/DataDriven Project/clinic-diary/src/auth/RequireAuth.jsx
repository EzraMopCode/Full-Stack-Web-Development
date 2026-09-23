import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth.js";

export function RequireAuth({ children }) {
  const { staff } = useAuth();
  const location = useLocation();

  if (!staff) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
