export const metadata = {
  title: 'Menu | Addis Eats',
  description: 'Explore authentic Ethiopian traditional, vegan, and fasting dishes.'
};

export default function MenuLayout({ children }) {
  return (
    <div className="menu-layout-wrapper">
      {children}
    </div>
  );
}
