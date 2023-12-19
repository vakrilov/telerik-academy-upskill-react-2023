import { create } from "zustand";

const initialState = {
  chatMessages: [{ id: 0, content: "Hi there" }],
  items: [
    { id: 1, name: "Item 1", price: 10 },
    { id: 2, name: "Item 2", price: 20 },
    { id: 3, name: "Item 3", price: 30 },
  ],
  cart: { items: 4, price: 100 },
};

export const useAppStore = create((set) => ({
  ...initialState,
  addChatMessage: (message) =>
    set((state) => ({
      chatMessages: [...state.chatMessages, message].slice(-5),
    })),
  addItemToCart: (item) =>
    set((state) => ({
      cart: {
        items: state.cart.items + 1,
        price: state.cart.price + item.price,
      },
    })),
  removeItemFromCart: (item) =>
    set((state) => ({
      cart: {
        items: state.cart.items - 1,
        price: state.cart.price - item.price,
      },
    })),
}));

