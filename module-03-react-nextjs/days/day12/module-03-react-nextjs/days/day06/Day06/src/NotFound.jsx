import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>We couldn't find the page you were looking for.</p>
      <Link to="/" className="button-link">Go Home</Link>
    </section>
  );
}
