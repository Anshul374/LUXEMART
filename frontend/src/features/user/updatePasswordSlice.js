import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  isPswUpdated: false,
  error: "",
};

export const updatePassword = createAsyncThunk(
  "updateP/updatePassword",
  async (passwords, { rejectWithValue }) => {
    const config = { headers: { "Content-Type": "application/json" } };
    return axios
      .put("/api/v1/password/update", passwords, config)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const updatePasswordSlice = createSlice({
  name: "updateP",
  initialState,
  reducers: {
    UPDATE_PSW_CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
    UPDATE_PSW_RESET: (state, action) => {
      state.isPswUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updatePassword.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.isPswUpdated = action.payload.success;
      state.error = "";
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
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

export default updatePasswordSlice.reducer;
export const { UPDATE_PSW_RESET, UPDATE_PSW_CLEAR_ERRORS } =
  updatePasswordSlice.actions;
