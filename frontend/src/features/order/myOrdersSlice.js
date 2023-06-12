import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  orders: "",
  error: "",
};

export const getMyOrders = createAsyncThunk(
  "myOrders/getMyOrders",
  async (_, { rejectWithValue }) => {
    return axios
      .get(`/api/v1/orders/me`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const myOrdersSlice = createSlice({
  name: "myOrders",
  initialState,
  reducers: {
    MY_ORDERS_CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
    MY_ORDERS_ITEM_RESET: (state, action) => {
      state.orders = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyOrders.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMyOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
      state.error = "";
    });
    builder.addCase(getMyOrders.rejected, (state, action) => {
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

export default myOrdersSlice.reducer;
export const { MY_ORDERS_CLEAR_ERRORS, MY_ORDERS_ITEM_RESET } =
  myOrdersSlice.actions;
