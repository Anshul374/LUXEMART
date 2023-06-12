import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loadingR: false,
  // isAuthenticatedR: false,
  userR: {},
  errorR: "",
};

export const register = createAsyncThunk(
  "userRegister/register",
  async (userDetails, { rejectWithValue }) => {
    console.log(userDetails);
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    return axios
      .post("/api/v1/register", userDetails, config)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState,
  reducers: {
    REGISTER_CLEAR_ERRORS: (state, action) => {
      state.errorR = "";
    },
    REGISTER_CLEAR_USER: (state, action) => {
      state.userR = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state, action) => {
      state.loadingR = true;
      // state.isAuthenticatedR = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loadingR = false;
      // state.isAuthenticatedR = true;
      state.userR = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loadingR = false;
      // state.isAuthenticatedR = false;
      state.userR = {};
      if (action.payload) {
        console.log(action.payload.message);
        state.errorR = action.payload.message;
      } else {
        console.log(action.error.message);
        state.errorR = action.error.message;
      }
    });
  },
});

export default userRegisterSlice.reducer;
export const { REGISTER_CLEAR_ERRORS, REGISTER_CLEAR_USER } =
  userRegisterSlice.actions;
