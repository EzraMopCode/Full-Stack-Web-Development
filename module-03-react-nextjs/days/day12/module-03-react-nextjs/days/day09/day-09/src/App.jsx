import { Suspense, lazy, Profiler, useState } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Header } from "./components/Header";
import { Menu } from "./components/Menu";
import { Cart } from "./components/Cart";

const Checkout = lazy(() =>
  import("./components/Checkout").then((module) => ({
    default: module.Checkout,
  }))
);

const logRenderTimes = (id, phase, actualDuration) => {
  console.log(`${id} [${phase}] took ${actualDuration}ms`);
};

export default function App() {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Profiler id="Menu" onRender={logRenderTimes}>
          <ErrorBoundary
            fallback={<div className="error-panel">The menu is currently unavailable.</div>}
          >
            <Menu />
          </ErrorBoundary>
        </Profiler>

        <div className="side-panel">
          <Profiler id="Cart" onRender={logRenderTimes}>
            <ErrorBoundary
              fallback={<div className="error-panel">Cart encountered an issue.</div>}
            >
              <Cart />
            </ErrorBoundary>
          </Profiler>

          <button
            className="submit-btn"
            onClick={() => setShowCheckout(!showCheckout)}
          >
            {showCheckout ? "Close Checkout" : "Proceed to Checkout"}
          </button>

          {showCheckout && (
            <Suspense
              fallback={<div className="skeleton-loader">Loading secure checkout...</div>}
            >
              <Checkout />
            </Suspense>
          )}
        </div>
      </main>
    </div>
  );
}
