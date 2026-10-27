export const metadata = {
  title: 'Checkout | Addis Eats',
  description: 'Complete your authentic Ethiopian meal order securely.'
};

export default function CheckoutLayout({ children }) {
  return (
    <div className="checkout-layout-wrapper">
      {children}
    </div>
  );
}
