import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loadingD: false,
  successD: false,
  errorD: "",
};

export const deleteCartItem = createAsyncThunk(
  "delCitem/deleteCartItem",
  async (product_id, { rejectWithValue }) => {
    console.log(product_id);
    const config = { headers: { "Content-Type": "application/json" } };
    return axios
      .delete(`/api/v1/cart/delete/${product_id}`, config)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const deleteCitemSlice = createSlice({
  name: "delCitem",
  initialState,
  reducers: {
    CARTD_ITEMS_CLEAR_ERRORS: (state, action) => {
      state.errorD = "";
    },
    CARTD_ITEMS_RESET: (state, action) => {
      state.successD = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteCartItem.pending, (state, action) => {
      state.loadingD = true;
    });
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      state.loadingD = false;
      state.successD = action.payload.success;
    });
    builder.addCase(deleteCartItem.rejected, (state, action) => {
      state.loadingD = false;
      if (action.payload) {
        // console.log(action.payload.message);
        state.errorD = action.payload.message;
      } else {
        // console.log(action.error.message);
        state.errorD = action.error.message;
      }
    });
  },
});

export default deleteCitemSlice.reducer;
export const { CARTD_ITEMS_CLEAR_ERRORS, CARTD_ITEMS_RESET } =
  deleteCitemSlice.actions;
