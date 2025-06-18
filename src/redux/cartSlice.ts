import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../reactQuery/ProductInterface";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}
const savedCart = sessionStorage.getItem("caart");
const parsedCart = savedCart ? JSON.parse(savedCart) : [];

const initialState: CartState = {
  items: parsedCart,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      else if (item && item.quantity === 1)
        state.items = state.items.filter((item) => item.id !== action.payload);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.items = [];
    },

}});

export const { addItem, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
