import { create } from "zustand";
import type { CartStore } from "../types/tipos";
import { persist } from "zustand/middleware";
const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id);

          if (existing) {
            return {
              cart: state.cart.map((cantidad) =>
                cantidad.id === product.id
                  ? { ...cantidad, quantity: cantidad.quantity + 1 }
                  : cantidad,
              ),
            };
          } else {
            return {
              cart: [...state.cart, { ...product, quantity: 1 }],
            };
          }
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
            )
            .filter((item) => item.quantity > 0),
        })),

      updateQuantity: (id, delta) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity + delta }
                : item,
            )
            .filter((item) => item.quantity > 0),
        })),

      getTotal: () =>
        get().cart.reduce((acc, item) => acc + item.price * item.quantity, 0),

      removeItem: (id: number) =>
        set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),

      clearCart: () => set({ cart: [] }),
    }),
    { name: "cart-storage" },
  ),
);

export default useCartStore;
