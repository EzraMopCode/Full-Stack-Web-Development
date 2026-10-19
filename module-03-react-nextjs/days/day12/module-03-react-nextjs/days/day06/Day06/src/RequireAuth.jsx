import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const location = useLocation();

  // For this exercise, we check localStorage. In a real app, this would use an AuthContext.
  const isAuthenticated = localStorage.getItem("auth") === "true";

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
