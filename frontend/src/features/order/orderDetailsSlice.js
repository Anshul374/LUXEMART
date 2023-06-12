import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  orderDetail: "",
  error: "",
};

export const getOrderDetails = createAsyncThunk(
  "orderDetails/getOrderDetails",
  async (id, { rejectWithValue }) => {
    return axios
      .get(`/api/v1/order/${id}`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    ORDER_DETAILS_CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
    ORDER_DETAILS_RESET: (state, action) => {
      state.orderDetail = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.orderDetail = action.payload.order;
      state.error = "";
    });
    builder.addCase(getOrderDetails.rejected, (state, action) => {
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

export default orderDetailsSlice.reducer;
export const { ORDER_DETAILS_CLEAR_ERRORS, ORDER_DETAILS_RESET } =
  orderDetailsSlice.actions;
