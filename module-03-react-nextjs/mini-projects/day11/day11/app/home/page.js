import Link from 'next/link';
import NavigateButton from '../components/navigation';

export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <nav>
        <Link href="/menu">Go to Menu</Link>
        <Link href="/cart">Go to Cart</Link>
      </nav>
      <NavigateButton to="/menu" label="Programmatic Link to Menu" />
    </main>
  );
}
