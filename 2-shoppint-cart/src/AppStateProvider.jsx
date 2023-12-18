import { useMemo } from "react";
import { useCallback } from "react";
import { useSyncExternalStore } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { createContext, useContext } from "react";

const AppState = createContext();

const initialState = {
  chatMessages: [{ id: 0, content: "Hi there" }],
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
  // const [state, dispatch_internal] = useReducer(appReducer, null, () => initialState);
  const state = useRef(initialState);
  const dispatch = useCallback((action) => {
    state.current = appReducer(state.current, action);
    subscriptions.current.forEach((callback) => callback(state.current));
  }, []);

  const subscriptions = useRef([]);
  const subscribe = useCallback((callback) => {
    subscriptions.current.push(callback);
    return () => {
      subscriptions.current = subscriptions.current.filter(
        (cb) => cb !== callback
      );
    };
  }, []);

  const getState = useCallback(() => state.current, []);

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
    <AppState.Provider value={{ getState, subscribe, actions }}>
      {children}
    </AppState.Provider>
  );
};

export const useAppActions = () => useContext(AppState).actions;

export const useAppSelector = (selector) => {
  const { getState, subscribe } = useContext(AppState);
  // const lastValue = useRef(selector(getState()));
  // const [cachedState, setCachedState] = useState(selector(getState()));

  // useEffect(() => {
  //   console.log("Creating subscription");
  //   subscribe((store) => {
  //     const newState = selector(store);
  //     if (newState !== lastValue.current) {
  //       lastValue.current = newState;
  //       setCachedState(newState);
  //     }
  //   });
  // }, [selector, subscribe]);

  const getSnapshot = useCallback(
    () => selector(getState()),
    [selector, getState]
  );

  const value = useSyncExternalStore(subscribe, getSnapshot);

  return value;
};
