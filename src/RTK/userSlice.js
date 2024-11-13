import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  id: "",
  username: "",
  cart: [],
  wishlist: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loggedUser: (state, action) => {
      const { id, username, cart, wishlist } = action.payload;

      state.id = id;
      state.username = username;
      state.cart = cart;
      state.wishlist = wishlist;

      console.log("Logged user data:", state);
    },

    addToCart: (state, action) => {
      const item = action.payload;
      const isDuplicate = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (!isDuplicate) {
        state.cart.push(item);
        toast.success("Item added");
      } else {
        toast.error("Already added");
      }
    },

    removeCart: (state, action) => {
      const itemId = action.payload;
      const updatedCart = state.cart.filter(
        (cartItem) => cartItem.id !== itemId
      );

      state.cart = updatedCart;
      toast.success("Item removed");
    },
    addToWishList: (state, action) => {
      const item = action.payload;
      const isDuplicate = state.wishlist.find(
        (wishlistItem) => wishlistItem.id === item.id
      );

      if (isDuplicate) {
        state.wishlist = state.wishlist.filter(
          (wishlistItem) => wishlistItem.id !== item.id
        );
        toast.info("Item removed from wishlist");
      } else {
        state.wishlist.push(item);
        toast.success("Item added to wishlist");
      }
    },
    removeFromWishList: (state, action) => {
      const itemId = action.payload;
      const updatedWishlist = state.wishlist.filter(
        (wishlistItem) => wishlistItem.id !== itemId
      );

      state.wishlist = updatedWishlist;
      toast.success("Item removed from wishlist");
    },
  },
});

export const {
  loggedUser,
  addToCart,
  removeCart,
  addToWishList,
  removeFromWishList,
} = userSlice.actions;

export default userSlice.reducer;
