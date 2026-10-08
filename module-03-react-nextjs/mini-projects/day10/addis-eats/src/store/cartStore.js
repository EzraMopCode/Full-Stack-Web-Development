import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (dish) => set((state) => ({ items: [...state.items, dish] })),
      remove: (id) => set((state) => ({ items: state.items.filter((d) => d.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    { name: 'addis-eats-cart' }
  )
);

// Narrow selector hooks — each consumer subscribes to only what it reads.
export const useCartItems = () => useCartStore((state) => state.items);
export const useCartCount = () => useCartStore((state) => state.items.length);
export const useCartTotal = () =>
  useCartStore((state) => state.items.reduce((sum, dish) => sum + dish.price, 0));
export const useAddItem = () => useCartStore((state) => state.addItem);
export const useRemoveItem = () => useCartStore((state) => state.remove);
export const useClearCart = () => useCartStore((state) => state.clear);
