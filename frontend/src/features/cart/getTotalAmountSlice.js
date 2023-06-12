import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loadingT: false,
  totalAmt: "",
  errorT: "",
};

export const getTotalAmount = createAsyncThunk(
  "totalAmt/getTotalAmount",
  async (_, { rejectWithValue, getState }) => {
    return axios
      .get(`/api/v1/cart/totalamount`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const getTotalAmtSlice = createSlice({
  name: "totalAmt",
  initialState,
  reducers: {
    TAMT_CLEAR_ERRORS: (state, action) => {
      state.errorT = "";
    },
    TAMT_RESET: (state, action) => {
      state.totalAmt = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTotalAmount.pending, (state, action) => {
      state.loadingT = true;
    });
    builder.addCase(getTotalAmount.fulfilled, (state, action) => {
      state.loadingT = false;
      state.totalAmt = action.payload.totalAmount;
      state.errorT = "";
    });
    builder.addCase(getTotalAmount.rejected, (state, action) => {
      state.loadingT = false;
      if (action.payload) {
        // console.log(action.payload.message);
        state.errorT = action.payload.message;
      } else {
        // console.log(action.error.message);
        state.errorT = action.error.message;
      }
    });
  },
});

export default getTotalAmtSlice.reducer;
export const { TAMT_CLEAR_ERRORS, TAMT_RESET } = getTotalAmtSlice.actions;
