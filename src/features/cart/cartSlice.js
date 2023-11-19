import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      //payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((e) => e.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      //If the pizza quantity is on the verge of deleting then call the delete reducer
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state, action) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

//reduce(callback,initialvalue) => reduce((sum,item)=>{},initialValueOfSum)
export const getTotalCartQuantity = (state) => {
  return state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
};

export const getTotalCartPrice = (state) => {
  return state.cart.cart.reduce((sum, item) => sum + item.unitPrice, 0);
};

//This is an important function

//()=>()=>{} is known as function currying and the outer function receives the id and returns anotheer function that receives the state object
export const getCurrentQuantityById = (id) => (state) => {
  // Optional Chaining and Nullish Coalescing: The ?. (optional chaining) is used to handle cases where the find method returns undefined (if there's no matching item in the array). The ?? (nullish coalescing) is used to provide a default value of 0 if the quantity is not found.
  return state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
};
