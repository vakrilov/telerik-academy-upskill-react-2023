/* eslint-disable react-refresh/only-export-components */
import { useMemo } from "react";
import { useReducer } from "react";
import { createContext, useContext } from "react";

const AppState = createContext();

const initialState = {
  chatMessages: [{ id: 0, content: "Hello" }],
  items: [
    { id: 1, name: "Item 1", price: 10 },
    { id: 2, name: "Item 2", price: 20 },
    { id: 3, name: "Item 3", price: 30 },
  ],
  cart: { items: 4, price: 100 },
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "add_chat_message":
      return {
        ...state,
        chatMessages: [...state.chatMessages, action.payload].slice(-5),
      };
    case "add_item_to_cart":
      return {
        ...state,
        cart: {
          items: state.cart.items + 1,
          price: state.cart.price + action.payload.price,
        },
      };
    case "remove_item_from_cart":
      return {
        ...state,
        cart: {
          items: state.cart.items - 1,
          price: state.cart.price - action.payload.price,
        },
      };
    default:
      return state;
  }
};

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, null, () => initialState);

  const actions = useMemo(
    () => ({
      addChatMessage: (message) =>
        dispatch({ type: "add_chat_message", payload: message }),
      addItemToCart: (item) =>
        dispatch({ type: "add_item_to_cart", payload: item }),
      removeItemFromCart: (item) =>
        dispatch({ type: "remove_item_from_cart", payload: item }),
    }),
    [dispatch]
  );

  return (
    <AppState.Provider value={{ state, actions }}>{children}</AppState.Provider>
  );
};

export const useAppActions = () => useContext(AppState).actions;

export const useItems = () => useContext(AppState).state.items;
export const useChatMessages = () => useContext(AppState).state.chatMessages;
export const useCart = () => useContext(AppState).state.cart;
