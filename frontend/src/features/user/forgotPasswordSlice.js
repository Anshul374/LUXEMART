import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  message: "",
  error: "",
};

export const forgotPassword = createAsyncThunk(
  "forgotP/forgotPassword",
  async (email, { rejectWithValue }) => {
    const config = { headers: { "Content-Type": "application/json" } };
    return axios
      .post("/api/v1/password/forgot", { email }, config)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotP",
  initialState,
  reducers: {
    FORGOT_PSW_CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
    FORGOT_PSW_RESET: (state, action) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = "";
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
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

export default forgotPasswordSlice.reducer;
export const { FORGOT_PSW_CLEAR_ERRORS, FORGOT_PSW_RESET } =
  forgotPasswordSlice.actions;
