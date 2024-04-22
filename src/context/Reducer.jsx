
const initialState = {
  cartItems: [],
  total: [],
};




const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (item) throw new Error("Item is already in cart.");
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case "INCREMENT_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      };
    case "DECREMENT_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }),
      };
    default:
      return state;
  }
};

export { reducer, initialState }