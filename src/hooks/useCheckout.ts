import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useCartStore from "../state";
import type { CartItem } from "../types/tipos";

export const useCheckout = () => {
  const clearCart = useCartStore((state) => state.clearCart);
  return useMutation({
    mutationFn: (cart: CartItem[]) =>
      axios.post("https://fakestoreapi.com/carts", { products: cart }),
    onSuccess: () => {
      clearCart();
    },
    onError(error) {
      console.log(error);
    },
  });
};
