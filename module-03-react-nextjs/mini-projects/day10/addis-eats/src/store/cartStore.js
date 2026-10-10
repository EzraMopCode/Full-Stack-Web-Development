import { create } from 'zustand';

export const useCartStore = create((set) => ({
  // --- CART STATE ---
  cart: [],
  addToCart: (dish) => set((state) => {
    const existingItem = state.cart.find(item => item.id === dish.id);
    if (existingItem) {
      return { cart: state.cart.map(item => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item) };
    }
    return { cart: [...state.cart, { ...dish, quantity: 1 }] };
  }),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter(item => item.id !== id) })),
  updateQuantity: (id, quantity) => set((state) => ({ cart: state.cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item) })),
  clearCart: () => set({ cart: [] }),

  // --- FAVORITES STATE ---
  favorites: [],
  toggleFavorite: (dish) => set((state) => {
    const isFav = state.favorites.some(item => item.id === dish.id);
    if (isFav) {
      return { favorites: state.favorites.filter(item => item.id !== dish.id) };
    }
    return { favorites: [...state.favorites, dish] };
  }),
}));
