import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "./auth/useAuth.js";

export default function Layout() {
  const { staff, signOut } = useAuth();

  return (
    <div className="app-shell">
      <header>
        <Link to="/" className="brand">
          Clinic Diary
        </Link>
        <nav>
          <NavLink to="/diary">Diary</NavLink>
          <NavLink to="/book">Book</NavLink>
          {staff ? (
            <button className="link-btn" onClick={signOut}>
              Sign out ({staff.name})
            </button>
          ) : (
            <NavLink to="/login">Staff sign in</NavLink>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>Clinic Diary — capstone project, CodeOps Full Stack.</footer>
    </div>
  );
}
