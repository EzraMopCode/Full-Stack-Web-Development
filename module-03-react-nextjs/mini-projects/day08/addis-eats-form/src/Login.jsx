import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/checkout';

  function handleLogin() {
    login();
    navigate(from, { replace: true });
  }

  return (
    <div className="login-page">
      <h2>Sign in</h2>
      <p>Sign in to continue to checkout.</p>
      <button className="add-btn" onClick={handleLogin}>
        Sign in
      </button>
    </div>
  );
}

export default Login;
