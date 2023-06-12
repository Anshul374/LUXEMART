import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  product: "",
  error: "",
};

export const fetchProductDetails = createAsyncThunk(
  "productDetails/fetchProductDetails",
  (id) => {
    return axios.get(`/api/v1/product/${id}`).then((response) => response.data);
  }
);

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
    });
    builder.addCase(fetchProductDetails.rejected, (state, action) => {
      state.loading = false;
      state.product = "";
      state.error = action.payload;
    });
  },
});

export default productDetailsSlice.reducer;
