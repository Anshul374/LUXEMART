import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  success: false,
  error: "",
};

export const adminDeleteUser = createAsyncThunk(
  "deleteUser/adminDeleteUser",
  async (id, { rejectWithValue }) => {
    return axios
      .delete(`/api/v1/admin/user/${id}`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const adminDeleteUserSlice = createSlice({
  name: "deleteUser",
  initialState,
  reducers: {
    ADMIN_DELETE_USER_CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
    ADMIN_DELETE_USER_RESET: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminDeleteUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(adminDeleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.error = "";
    });
    builder.addCase(adminDeleteUser.rejected, (state, action) => {
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

export default adminDeleteUserSlice.reducer;
export const { ADMIN_DELETE_USER_CLEAR_ERRORS, ADMIN_DELETE_USER_RESET } =
  adminDeleteUserSlice.actions;
