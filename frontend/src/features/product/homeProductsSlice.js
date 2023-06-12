import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  products: [],
  productsCount: 0,
  resultPerPage: 0,
  filteredProductCount: 0,
  error: "",
};

export const fetchHomeProducts = createAsyncThunk(
  "homeProduct/fetchHomeProducts",
  async (_, { rejectWithValue }) => {
    return axios
      .get("/api/v1/products/")
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const homeProductsSlice = createSlice({
  name: "homeProduct",
  initialState,
  reducers: {
    CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHomeProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchHomeProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredProductCount = action.payload.filteredProductCount;
      state.error = "";
    });
    builder.addCase(fetchHomeProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        console.log(action.error.message);
        state.error = action.error.message;
      }
    });
  },
});

export default homeProductsSlice.reducer;
export const { CLEAR_ERRORS } = homeProductsSlice.actions;
