import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  users: "",
  success: false,
  error: "",
};

export const getAdminUsers = createAsyncThunk(
  "adminUsers/getAdminUsers",
  async (_, { rejectWithValue }) => {
    return axios
      .get(`/api/v1/admin/users`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {
    ADMIN_USERS_CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
    ADMIN_USERS_RESET: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAdminUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAdminUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.users = action.payload.users;
      state.error = "";
    });
    builder.addCase(getAdminUsers.rejected, (state, action) => {
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

export default adminUsersSlice.reducer;
export const { ADMIN_USERS_CLEAR_ERRORS, ADMIN_USERS_RESET } =
  adminUsersSlice.actions;
