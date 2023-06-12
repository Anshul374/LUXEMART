import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  order: "",
  error: "",
};

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, { rejectWithValue }) => {
    const config = { headers: { "Content-Type": "application/json" } };
    return axios
      .post(`/api/v1/order/new`, order, config)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    ORDER_CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
    ORDER_ITEM_RESET: (state, action) => {
      state.order = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.error = "";
    });
    builder.addCase(createOrder.rejected, (state, action) => {
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

export default orderSlice.reducer;
export const { ORDER_CLEAR_ERRORS, ORDER_ITEM_RESET } = orderSlice.actions;
