import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  isUpdated: {},
  error: "",
};

export const updateUser = createAsyncThunk(
  "updateProfileUser/updateUser",
  async (userData, { rejectWithValue }) => {
    const config = { headers: { "Content-Type": "application/json" } };
    return axios
      .put("/api/v1/me/update", userData, config)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const updateUserSlice = createSlice({
  name: "updateProfileUser",
  initialState,
  reducers: {
    UPDATE_USER_CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
    UPDATE_PROFILE_RESET: (state, action) => {
      state.isUpdated = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
      state.error = "";
    });
    builder.addCase(updateUser.rejected, (state, action) => {
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

export default updateUserSlice.reducer;
export const { UPDATE_USER_CLEAR_ERRORS, UPDATE_PROFILE_RESET } =
  updateUserSlice.actions;
