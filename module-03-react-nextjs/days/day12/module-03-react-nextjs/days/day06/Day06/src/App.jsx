import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./CartProvider";
import Layout from "./Layout";
import Home from "./Home";
import Menu from "./Menu";
import DishDetail from "./DishDetail";
import CheckoutPanel from "./CheckoutPanel";
import Login from "./Login";
import RequireAuth from "./RequireAuth";
import NotFound from "./NotFound";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="menu/:id" element={<DishDetail />} />
            <Route path="login" element={<Login />} />
            <Route
              path="checkout"
              element={
                <RequireAuth>
                  <CheckoutPanel />
                </RequireAuth>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
