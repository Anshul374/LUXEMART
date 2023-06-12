import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  success: false,
  error: "",
};

export const adminEditProduct = createAsyncThunk(
  "editProduct/adminEditProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    const config = { headers: { "Content-Type": "application/json" } };
    console.log(id, productData);
    return axios
      .put(`/api/v1/admin/product/${id}`, productData, config)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const adminEditProductSlice = createSlice({
  name: "editProduct",
  initialState,
  reducers: {
    ADMIN_EDIT_PRODUCT_CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
    ADMIN_EDIT_PRODUCT_RESET: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminEditProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(adminEditProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.error = "";
    });
    builder.addCase(adminEditProduct.rejected, (state, action) => {
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

export default adminEditProductSlice.reducer;
export const { ADMIN_EDIT_PRODUCT_CLEAR_ERRORS, ADMIN_EDIT_PRODUCT_RESET } =
  adminEditProductSlice.actions;
