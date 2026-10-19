"use client";

import {
  X,
  Minus,
  Plus,
} from "lucide-react";

export default function CartSheet({
  cartItems,
  onClose,
  onUpdateQuantity,
}) {
  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-overlay">

      <div className="cart-sheet">

        <div className="cart-handle"></div>

        <div className="cart-header">
          <div>
            <h2>Your Cart</h2>

            <p>
              {cartItems.length}{" "}
              {cartItems.length === 1
                ? "item"
                : "items"}
            </p>
          </div>

          <button
            className="cart-close"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">

              {cartItems.map((item) => (
                <div
                  className="cart-item"
                  key={item.id}
                >

                  <img
                    className="cart-item-image"
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-item-info">

                    <h3>{item.name}</h3>

                    <p>
                      {item.price} ETB
                    </p>

                    <div className="cart-quantity">

                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item.id,
                            -1
                          )
                        }
                      >
                        <Minus size={15} />
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item.id,
                            1
                          )
                        }
                      >
                        <Plus size={15} />
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>

            <div className="cart-summary">

              <div>
                <span>Subtotal</span>

                <strong>
                  {subtotal} ETB
                </strong>
              </div>

              <button className="checkout-btn">
                Checkout →
              </button>

            </div>
          </>
        )}

      </div>
    </div>
  );
}
