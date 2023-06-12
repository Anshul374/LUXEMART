import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  success: false,
  error: "",
};

export const adminEditOrder = createAsyncThunk(
  "editOrder/adminEditOrder",
  async ({ id, formData }, { rejectWithValue }) => {
    const config = { headers: { "Content-Type": "application/json" } };

    return axios
      .put(`/api/v1/admin/order/${id}`, formData, config)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const adminEditOrderSlice = createSlice({
  name: "editOrder",
  initialState,
  reducers: {
    ADMIN_EDIT_ORDER_CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
    ADMIN_EDIT_ORDER_RESET: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminEditOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(adminEditOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.error = "";
    });
    builder.addCase(adminEditOrder.rejected, (state, action) => {
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

export default adminEditOrderSlice.reducer;
export const { ADMIN_EDIT_ORDER_CLEAR_ERRORS, ADMIN_EDIT_ORDER_RESET } =
  adminEditOrderSlice.actions;
