import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  success: false,
  product: "",
  error: "",
};

export const createProduct = createAsyncThunk(
  "newProduct/createProduct",
  async (formData, { rejectWithValue }) => {
    const config = { headers: { "Content-Type": "application/json" } };
    return axios
      .post(`/api/v1/admin/product/new`, formData, config)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const createProductSlice = createSlice({
  name: "newProduct",
  initialState,
  reducers: {
    ADMIN_CREATE_PRODUCT_CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
    ADMIN_CREATE_PRODUCT_RESET: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.product = action.payload.product;
      state.error = "";
    });
    builder.addCase(createProduct.rejected, (state, action) => {
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

export default createProductSlice.reducer;
export const { ADMIN_CREATE_PRODUCT_CLEAR_ERRORS, ADMIN_CREATE_PRODUCT_RESET } =
  createProductSlice.actions;
