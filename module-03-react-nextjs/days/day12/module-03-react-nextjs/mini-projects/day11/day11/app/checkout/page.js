import Link from 'next/link';

export default function Checkout() {
  return (
    <main>
      <h1>Checkout</h1>
      <p>Complete your order details here.</p>
      <Link href="/cart">Back to Cart</Link>
    </main>
  );
}
