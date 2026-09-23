import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      <h2>Ethiopian food, delivered fast</h2>
      <p>Browse the menu and get your favorites sent straight to your door.</p>
      <Link className="add-btn" to="/menu">View the menu</Link>
    </div>
  );
}

export default Home;
