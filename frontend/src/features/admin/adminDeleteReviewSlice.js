import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  success: false,
  error: "",
};

export const adminDeleteReview = createAsyncThunk(
  "deleteReview/adminDeleteReview",
  async ({ reviewId, productId }, { rejectWithValue }) => {
    return axios
      .delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const adminDeleteReviewSlice = createSlice({
  name: "deleteReview",
  initialState,
  reducers: {
    ADMIN_DELETE_REVIEW_CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
    ADMIN_DELETE_REVIEW_RESET: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminDeleteReview.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(adminDeleteReview.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.error = "";
    });
    builder.addCase(adminDeleteReview.rejected, (state, action) => {
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

export default adminDeleteReviewSlice.reducer;
export const { ADMIN_DELETE_REVIEW_CLEAR_ERRORS, ADMIN_DELETE_REVIEW_RESET } =
  adminDeleteReviewSlice.actions;
