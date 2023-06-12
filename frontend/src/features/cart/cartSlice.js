import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  success: false,
  cart: "",
  error: "",
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, { rejectWithValue }) => {
    return axios
      .get(`/api/v1/cart`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const getCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    CART_ITEMS_CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
    CART_ITEMS_RESET: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItems.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCartItems.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.cart = action.payload.cartItems;
      state.error = "";
    });
    builder.addCase(getCartItems.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        // console.log(action.payload.message);
        state.error = action.payload.message;
      } else {
        // console.log(action.error.message);
        state.error = action.error.message;
      }
    });
  },
});

export default getCartSlice.reducer;
export const { CART_ITEMS_CLEAR_ERRORS, CART_ITEMS_RESET } =
  getCartSlice.actions;
