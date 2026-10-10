import { useCartCount, useCartTotal } from '../store/cartStore';

function CartBadge() {
  const count = useCartCount();
  const total = useCartTotal();

  return (
    <div className="flex items-center gap-2 bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-700 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors">
      <span className="flex items-center justify-center bg-orange-600 text-white rounded-full w-5 h-5 text-xs font-bold">
        {count}
      </span>
      <span>{total} ETB</span>
    </div>
  );
}

export default CartBadge;
