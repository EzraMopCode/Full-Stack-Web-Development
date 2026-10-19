import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section>
      <h1>Page not found</h1>
      <p>There's nothing at this address.</p>
      <Link to="/">Back to home</Link>
    </section>
  );
}
