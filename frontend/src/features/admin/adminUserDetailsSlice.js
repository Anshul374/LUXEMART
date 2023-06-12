import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  user: "",
  success: false,
  error: "",
};

export const getAdminUserDetails = createAsyncThunk(
  "adminUserDetails/getAdminUserDetails",
  async (id, { rejectWithValue }) => {
    return axios
      .get(`/api/v1/admin/user/${id}`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const adminUserDetailsSlice = createSlice({
  name: "adminUserDetails",
  initialState,
  reducers: {
    ADMIN_USER_DETAILS_CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
    ADMIN_USER_DETAILS_RESET: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAdminUserDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAdminUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.success = action.payload.success;
      state.error = "";
    });
    builder.addCase(getAdminUserDetails.rejected, (state, action) => {
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

export default adminUserDetailsSlice.reducer;
export const { ADMIN_USER_DETAILS_CLEAR_ERRORS, ADMIN_USER_DETAILS_RESET } =
  adminUserDetailsSlice.actions;
