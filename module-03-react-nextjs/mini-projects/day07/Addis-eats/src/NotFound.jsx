import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found">
      <h2>Page not found</h2>
      <p>We couldn't find what you were looking for.</p>
      <Link className="add-btn" to="/">Back home</Link>
    </div>
  );
}

export default NotFound;
