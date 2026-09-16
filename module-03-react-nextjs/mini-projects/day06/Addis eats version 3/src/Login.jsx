import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = () => {
    localStorage.setItem("auth", "true");
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
