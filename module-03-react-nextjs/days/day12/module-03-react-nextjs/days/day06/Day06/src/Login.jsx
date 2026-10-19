import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // Find where they were trying to go before being redirected, defaulting to home
  const from = location.state?.from?.pathname || "/";

  const handleLogin = () => {
    localStorage.setItem("auth", "true");
    // Send them back to the exact page they were trying to access
    navigate(from, { replace: true });
  };

  return (
    <div className="login-screen">
      <h2>Sign In Required</h2>
      <p>You must be signed in to access the checkout page.</p>
      <button onClick={handleLogin}>Sign In (Demo)</button>
    </div>
  );
}
