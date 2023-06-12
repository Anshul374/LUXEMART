import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  products: "",
  error: "",
};

export const getAdminProducts = createAsyncThunk(
  "adminProducts/getAdminProducts",
  async (_, { rejectWithValue }) => {
    return axios
      .get(`/api/v1/admin/products`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {
    ADMIN_PRODUCTS_CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
    // ADMIN_PRODUCTS_RESET: (state, action) => {
    //   state. = "";
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getAdminProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAdminProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.error = "";
    });
    builder.addCase(getAdminProducts.rejected, (state, action) => {
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

export default adminProductsSlice.reducer;
export const { ADMIN_PRODUCTS_CLEAR_ERRORS } = adminProductsSlice.actions;
