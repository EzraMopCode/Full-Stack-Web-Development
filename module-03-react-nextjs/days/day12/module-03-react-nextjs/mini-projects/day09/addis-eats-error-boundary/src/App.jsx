import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { ThemeProvider } from './ThemeContext';
import ErrorBoundary from './ErrorBoundary';
import Layout from './Layout';
import Home from './Home';
import Menu from './Menu';
import DishDetail from './DishDetail';
import Cart from './Cart';
import Login from './Login';
import NotFound from './NotFound';
import RequireAuth from './RequireAuth';
import Skeleton from '../src/Ui/Skleton';
import './App.css';

const Checkout = lazy(() => import('./Checkout'));
const Receipt = lazy(() => import('./Receipt'));

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
