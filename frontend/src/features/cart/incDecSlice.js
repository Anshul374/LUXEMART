import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loadingI: false,
  cartItem: "",
  errorI: "",
};

export const incDecQty = createAsyncThunk(
  "incDec/incDecQty",
  async (pDetails, { rejectWithValue, getState }) => {
    const config = { headers: { "Content-Type": "application/json" } };
    return axios
      .post(`/api/v1/cart/qty`, pDetails, config)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const incDecQtySlice = createSlice({
  name: "incDec",
  initialState,
  reducers: {
    INC_DEC_CLEAR_ERRORS: (state, action) => {
      state.errorI = "";
    },
    INC_DEC_RESET: (state, action) => {
      state.cartItem = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(incDecQty.pending, (state, action) => {
      state.loadingI = true;
    });
    builder.addCase(incDecQty.fulfilled, (state, action) => {
      state.loadingI = false;
      state.cartItem = action.payload;
      state.errorI = "";
    });
    builder.addCase(incDecQty.rejected, (state, action) => {
      state.loadingI = false;
      if (action.payload) {
        // console.log(action.payload.message);
        state.errorI = action.payload.message;
      } else {
        // console.log(action.error.message);
        state.errorI = action.error.message;
      }
    });
  },
});

export default incDecQtySlice.reducer;
export const { INC_DEC_CLEAR_ERRORS, INC_DEC_RESET } = incDecQtySlice.actions;
