import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loadingL: false,
  isAuthenticatedL: false,
  userL: [],
  errorL: "",
};

export const login = createAsyncThunk(
  "userLogin/login",
  async ({ loginEmail, loginPassword }, { rejectWithValue }) => {
    const config = { headers: { "Content-Type": "application/json" } };
    return axios
      .post("/api/v1/login", { loginEmail, loginPassword }, config)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    LOGIN_CLEAR_ERRORS: (state, action) => {
      state.errorL = "";
    },
    LOGIN_RESET: (state, action) => {
      state.loadingL = false;
      state.isAuthenticatedL = false;
      state.userL = null;
      state.errorL = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loadingL = true;
      state.isAuthenticatedL = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loadingL = false;
      state.isAuthenticatedL = true;
      state.userL = action.payload.user;
      state.errorL = "";
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loadingL = false;
      state.isAuthenticatedL = false;
      state.userL = null;
      if (action.payload) {
        state.errorL = action.payload.message;
      } else {
        console.log(action.error.message);
        state.errorL = action.error.message;
      }
    });
  },
});

export default userLoginSlice.reducer;
export const { LOGIN_CLEAR_ERRORS, LOGIN_RESET } = userLoginSlice.actions;
