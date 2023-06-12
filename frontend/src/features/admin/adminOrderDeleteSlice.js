import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  success: false,
  error: "",
};

export const adminDeleteOrder = createAsyncThunk(
  "deleteOrder/adminDeleteOrder",
  async (id, { rejectWithValue }) => {
    return axios
      .delete(`/api/v1/admin/order/${id}`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const adminDeleteOrderSlice = createSlice({
  name: "deleteOrder",
  initialState,
  reducers: {
    ADMIN_DELETE_ORDER_CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
    ADMIN_DELETE_ORDER_RESET: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminDeleteOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(adminDeleteOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.error = "";
    });
    builder.addCase(adminDeleteOrder.rejected, (state, action) => {
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

export default adminDeleteOrderSlice.reducer;
export const { ADMIN_DELETE_ORDER_CLEAR_ERRORS, ADMIN_DELETE_ORDER_RESET } =
  adminDeleteOrderSlice.actions;
