"use client";

import { ShoppingCart } from "lucide-react";

export default function CartFab({ onClick, itemCount }) {
  return (
    <button
      type="button"
      className="cart-fab"
      onClick={onClick}
      aria-label="Open cart"
    >
      <ShoppingCart size={25} />

      {itemCount > 0 && (
        <span className="cart-count">
          {itemCount}
        </span>
      )}
    </button>
  );
}
