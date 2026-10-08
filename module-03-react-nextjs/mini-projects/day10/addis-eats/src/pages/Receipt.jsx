import { useLocation, Link } from 'react-router-dom';

function Receipt() {
  const location = useLocation();
  const total = location.state?.total;

  return (
    <div className="receipt-page card">
      <div className="success-icon">🎉</div>
      <h2>Order Confirmed!</h2>
      <p className="success-message">Your authentic Ethiopian meal is being prepared.</p>

      {total != null && (
        <div className="receipt-total">
          <span>Total Paid:</span>
          <strong>{total} ETB</strong>
        </div>
      )}

      <div className="delivery-estimate">
        <span role="img" aria-label="scooter">🛵</span> Estimated delivery in 30-45 minutes.
      </div>

      <Link className="add-btn" to="/menu">Order More Food</Link>
    </div>
  );
}

export default Receipt;
