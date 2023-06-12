import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : "",
  error: "",
};

const shippingInfoSlice = createSlice({
  name: "shipInfo",
  initialState,
  reducers: {
    SAVE_SHIPPING_INFO: (state, action) => {
      localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
      state.shippingInfo = action.payload;
    },
  },
});

export default shippingInfoSlice.reducer;
export const { SAVE_SHIPPING_INFO } = shippingInfoSlice.actions;
