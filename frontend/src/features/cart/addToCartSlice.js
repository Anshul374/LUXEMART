import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loadingC: false,
  cartM: "",
  errorC: "",
};

export const addToCart = createAsyncThunk(
  "addCart/addToCart",
  async (pDetails, { rejectWithValue, getState }) => {
    const config = { headers: { "Content-Type": "application/json" } };
    return axios
      .post(`/api/v1/product/add/cart`, pDetails, config)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const cartSlice = createSlice({
  name: "addCart",
  initialState,
  reducers: {
    CART_CLEAR_ERRORS: (state, action) => {
      state.errorC = "";
    },
    CART_RESET: (state, action) => {
      state.cartM = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state, action) => {
      state.loadingC = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.loadingC = false;
      state.cartM = action.payload;
      state.errorC = "";
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.loadingC = false;
      if (action.payload) {
        // console.log(action.payload.message);
        state.errorC = action.payload.message;
      } else {
        // console.log(action.error.message);
        state.errorC = action.error.message;
      }
    });
  },
});

export default cartSlice.reducer;
export const { CART_CLEAR_ERRORS, CART_RESET } = cartSlice.actions;
