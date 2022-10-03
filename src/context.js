import React, { useContext, useEffect, useReducer, useState } from "react";
import cartItem from "./data";
import reducer from "./reducer";
const url = "https://course-api.com/react-useReducer-cart-project";

const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItem,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Clear Item funcation
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  // remove one item funcataion
  const removeItem = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };
  // increment Item
  const add = (id) => {
    dispatch({ type: "INCREASE", payload: id });
  };
  // descrement item
  const sub = (id) => {
    dispatch({ type: "DECREMENT", payload: id });
  };

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    const res = await fetch(url);
    const cart = await res.json();

    dispatch({ type: "DISPLAY-ITEM", payload: cart });
  };

  const toggel = (id, type) => {
    dispatch({ type: "TOGGEL_AMOUNT", payload: { id, type } });
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: "TOTAL" });
  }, [state.cart]);
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        add,
        sub,
        toggel,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
