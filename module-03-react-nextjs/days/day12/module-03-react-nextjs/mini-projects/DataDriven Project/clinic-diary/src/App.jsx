import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import Diary from "./diary/Diary.jsx";
import AppointmentDetail from "./appointment/AppointmentDetail.jsx";
import Login from "./Login.jsx";
import NotFound from "./NotFound.jsx";
import { RequireAuth } from "./auth/RequireAuth.jsx";
import { ErrorBoundary } from "./ui/ErrorBoundary.jsx";
import { Spinner } from "./ui/Spinner.jsx";

// Day 34: one lazy-loaded route. Booking pulls in its own validation module
// and isn't needed until someone actually clicks "Book".
const Booking = lazy(() => import("./booking/Booking.jsx"));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route
          path="diary"
          element={
            <ErrorBoundary>
              <Diary />
            </ErrorBoundary>
          }
        />

        <Route path="appointments/:id" element={<AppointmentDetail />} />

        <Route
          path="book"
          element={
            <RequireAuth>
              <Suspense fallback={<Spinner label="Loading booking form…" />}>
                <Booking />
              </Suspense>
            </RequireAuth>
          }
        />

        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
