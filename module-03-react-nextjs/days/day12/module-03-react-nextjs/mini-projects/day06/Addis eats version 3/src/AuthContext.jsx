import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAuthenticated(localStorage.getItem('addisEatsAuth') === 'true');
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  function login() {
    localStorage.setItem('addisEatsAuth', 'true');
    setIsAuthenticated(true);
  }

  function logout() {
    localStorage.removeItem('addisEatsAuth');
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
}
