import CartItem from "./CartItem";

const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    };
  }
  if (action.type === "INCREASE") {
    let addition = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return { ...state, cart: addition };
  }
  if (action.type === "DECREMENT") {
    let subs = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: subs };
  }
  if (action.type === "TOTAL") {
    let { total, amount } = state.cart.reduce(
      (total, cartItem) => {
        const { price, amount } = cartItem;
        let totalAmount = price * amount;
        total.total += totalAmount;
        total.amount += amount;
        return total;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));

    return { ...state, total, amount };
  }

  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }

  if (action.type === "DISPLAY-ITEM") {
    return { ...state, cart: action.payload, loading: false };
  }

  if (action.type === "TOGGEL_AMOUNT") {
    let addition = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload.id) {
        }
        if (action.payload.type === "inc") {
          return { ...cartItem, amount: cartItem.amount + 1 };
        }
        if (action.payload.type === "dec") {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);

    return { ...state, cart: addition };
  }
  throw new Error("no catching action type ");
};

export default reducer;
