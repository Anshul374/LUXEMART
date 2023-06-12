import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  orders: "",
  totalAmount: "",
  error: "",
};

export const getAdminOrders = createAsyncThunk(
  "adminOrders/getAdminOrders",
  async (_, { rejectWithValue }) => {
    return axios
      .get(`/api/v1/admin/orders`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const adminOrdersSlice = createSlice({
  name: "adminOrders",
  initialState,
  reducers: {
    ADMIN_ORDERS_CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
    ADMIN_ORDERS_RESET: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAdminOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAdminOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
      state.totalAmount = action.payload.totalAmount;
      state.success = action.payload.success;
      state.error = "";
    });
    builder.addCase(getAdminOrders.rejected, (state, action) => {
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

export default adminOrdersSlice.reducer;
export const { ADMIN_ORDERS_CLEAR_ERRORS, ADMIN_ORDERS_RESET } =
  adminOrdersSlice.actions;
