import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  isAuthenticated: false,
  logoutm: "",
  error: "",
  user: [],
};

export const logout = createAsyncThunk(
  "userLogout/logout",
  async (_, { rejectWithValue, getState }) => {
    return axios
      .get("/api/v1/logout")
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const userLogoutSlice = createSlice({
  name: "userLogout",
  initialState,
  reducers: {
    LOGOUT_CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
    CLEAR_LOGOUTM: (state, action) => {
      state.logoutm = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.pending, (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.logoutm = action.payload;
      state.user = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
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

export default userLogoutSlice.reducer;
export const { LOGOUT_CLEAR_ERRORS, CLEAR_LOGOUTM } = userLogoutSlice.actions;
