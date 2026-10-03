import Link from 'next/link';
import CategoryBar from './CategoryBar';
import DishList from './DishList';

export default function Menu() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Our Menu</h1>
      <CategoryBar />
      <DishList />
      <div>
        <Link href="/">Back Home</Link> ||
        <Link href="/cart">Go to Cart</Link> |
      </div>
    </main>
  );
}
