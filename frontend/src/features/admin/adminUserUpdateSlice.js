import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  success: false,
  error: "",
};

export const adminEditUser = createAsyncThunk(
  "editUser/adminEditUser",
  async ({ id, userData }, { rejectWithValue }) => {
    const config = { headers: { "Content-Type": "application/json" } };

    return axios
      .put(`/api/v1/admin/user/${id}`, userData, config)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const adminEditUserSlice = createSlice({
  name: "editUser",
  initialState,
  reducers: {
    ADMIN_EDIT_USER_CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
    ADMIN_EDIT_USER_RESET: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminEditUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(adminEditUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.error = "";
    });
    builder.addCase(adminEditUser.rejected, (state, action) => {
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

export default adminEditUserSlice.reducer;
export const { ADMIN_EDIT_USER_CLEAR_ERRORS, ADMIN_EDIT_USER_RESET } =
  adminEditUserSlice.actions;
