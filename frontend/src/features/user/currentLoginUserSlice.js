import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: [],
  error: "",
};

export const currentLoginUser = createAsyncThunk(
  "user/currentLoginUser",
  async (toggle, { rejectWithValue, getState }) => {
    return axios
      .get("/api/v1/me")
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const currentLoginUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(currentLoginUser.pending, (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(currentLoginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = "";
    });
    builder.addCase(currentLoginUser.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
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

export default currentLoginUserSlice.reducer;
export const { CLEAR_ERRORS } = currentLoginUserSlice.actions;
