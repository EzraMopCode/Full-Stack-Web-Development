import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

import ErrorBoundary from './components/ErrorBoundary';
import RequireAuth from './components/RequireAuth';
import Layout from './layouts/Layout';
import Skeleton from './Ui/Skleton';

import Home from './pages/Home';
import Menu from './pages/Menu';
import DishDetail from './pages/DishDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

import './App.css';

const Checkout = lazy(() => import('./pages/Checkout'));
const Receipt = lazy(() => import('./pages/Receipt'));

function menuFallback(retry) {
  return (
    <div className="error-fallback">
      <p>The menu couldn&apos;t load right now.</p>
      <button className="add-btn" onClick={retry}>Try again</button>
    </div>
  );
}

function cartFallback(retry) {
  return (
    <div className="error-fallback">
      <p>We couldn&apos;t load your cart.</p>
      <button className="add-btn" onClick={retry}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route
                path="menu"
                element={<ErrorBoundary fallback={menuFallback}><Menu /></ErrorBoundary>}
              />
              <Route
                path="menu/:id"
                element={<ErrorBoundary fallback={menuFallback}><DishDetail /></ErrorBoundary>}
              />
              <Route
                path="cart"
                element={<ErrorBoundary fallback={cartFallback}><Cart /></ErrorBoundary>}
              />
              <Route path="login" element={<Login />} />
              <Route
                path="checkout"
                element={
                  <RequireAuth>
                    <Suspense fallback={<Skeleton />}>
                      <Checkout />
                    </Suspense>
                  </RequireAuth>
                }
              />
              <Route
                path="receipt"
                element={
                  <Suspense fallback={<Skeleton />}>
                    <Receipt />
                  </Suspense>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
