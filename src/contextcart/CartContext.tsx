// import { createContext, useContext, useState } from "react";

// type ShoppingCartProviderProps = {
//   children: React.ReactNode;
// };

// type CartItem = {
//   id: number;
//   quantity: number;
// };

// type CartContext = {
//   getItemQuantity: (id: number) => number;
//   increasetCartQuantity: (id: number) => void;
//   decreaseCartQuantity: (id: number) => void;
//   removeFromCart: (id: number) => void;
// };

// const CartContext = createContext({} as CartContext);

// export function useShoppingCart() {
//   return useContext(CartContext);
// }

// export function CartProvider({ children }: ShoppingCartProviderProps) {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   function getItemQuantity(id: number) {
//     return cartItems.find((item) => item.id === id)?.quantity || 0;
//   }

//   return <CartContext.Provider value={{ getItemQuantity }}>{children}</CartContext.Provider>;

