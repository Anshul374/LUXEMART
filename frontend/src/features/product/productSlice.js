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

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (
    {
      keyword = "",
      currentPage = 1,
      price = [0, 100000],
      category = "",
      ratings = 0,
    },
    { rejectWithValue }
  ) => {
    let link = "";
    if (category) {
      link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    } else {
      link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
    }
    return axios
      .get(link)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      // console.log(action.payload.products);
      state.products = action.payload.products;
      state.productsCount = action.payload.productCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredProductCount = action.payload.filteredProductCount;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      // console.log(action.payload);
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        console.log(action.error.message);
        state.error = action.error.message;
      }
    });
  },
});

export default productsSlice.reducer;
export const { CLEAR_ERRORS } = productsSlice.actions;
