import { useLocation, Link } from 'react-router-dom';

function Receipt() {
  const location = useLocation();
  const total = location.state?.total;

  return (
    <div className="receipt-page">
      <h2>Order placed!</h2>
      {total != null && <p>Total charged: {total} ETB</p>}
      <p>We&apos;ll text you when it&apos;s on the way.</p>
      <Link className="add-btn" to="/menu">Back to menu</Link>
    </div>
  );
}

export default Receipt;
