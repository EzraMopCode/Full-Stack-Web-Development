export const metadata = {
  title: 'Your Orders | Addis Eats',
  description: 'Track and manage your placed orders in real-time.'
};

export default function OrdersLayout({ children }) {
  return (
    <div className="orders-layout-wrapper">
      {children}
    </div>
  );
}
