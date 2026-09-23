import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      items: [
        { id: 1, name: "Doro Wat", price: 15 },
        { id: 2, name: "Shiro", price: 10 }
      ],
      addItem: (dish) => set((s) => ({ items: [...s.items, dish] })),
      remove: (id) =>
        set((s) => ({ items: s.items.filter((d) => d.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    { name: "addis-eats-cart" }
  )
);
