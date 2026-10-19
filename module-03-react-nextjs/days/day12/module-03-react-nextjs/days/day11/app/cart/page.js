import Link from 'next/link';

export default function Cart() {
  return (
    <main>
      <h1>Your Cart</h1>
      <nav>
        <Link href="/menu">Back to Menu</Link>
        <Link href="/checkout">Proceed to Checkout</Link>
      </nav>
    </main>
  );
}
