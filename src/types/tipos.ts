export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type CartStore = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  getTotal: () => number;
  clearCart: () => void;
  removeItem: (id: number) => void;
};
