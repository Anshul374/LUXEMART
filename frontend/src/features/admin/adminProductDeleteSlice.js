import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  success: false,
  error: "",
};

export const adminDeleteProduct = createAsyncThunk(
  "deleteProduct/adminDeleteProduct",
  async (id, { rejectWithValue }) => {
    return axios
      .delete(`/api/v1/admin/product/${id}`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const adminDeleteProductSlice = createSlice({
  name: "deleteProduct",
  initialState,
  reducers: {
    ADMIN_DELETE_PRODUCT_CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
    ADMIN_DELETE_PRODUCT_RESET: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminDeleteProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(adminDeleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.error = "";
    });
    builder.addCase(adminDeleteProduct.rejected, (state, action) => {
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

export default adminDeleteProductSlice.reducer;
export const { ADMIN_DELETE_PRODUCT_CLEAR_ERRORS, ADMIN_DELETE_PRODUCT_RESET } =
  adminDeleteProductSlice.actions;
