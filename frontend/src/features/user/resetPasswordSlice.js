import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  success: false,
  error: "",
};

export const resetPassword = createAsyncThunk(
  "resetP/resetPassword",
  async (data, { rejectWithValue }) => {
    const config = { headers: { "Content-Type": "application/json" } };
    console.log(data);
    return axios
      .put(`/api/v1/password/reset/${data.token}`, data, config)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const resetPasswordSlice = createSlice({
  name: "resetP",
  initialState,
  reducers: {
    RESET_PSW_CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
    RESET_PSW_RESET: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetPassword.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.error = "";
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
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

export default resetPasswordSlice.reducer;
export const { RESET_PSW_CLEAR_ERRORS, RESET_PSW_RESET } =
  resetPasswordSlice.actions;
