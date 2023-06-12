import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  success: false,
  reviews: "",
  error: "",
};

export const getProductReviews = createAsyncThunk(
  "adminProductReviews/getProductReviews",
  async (productId, { rejectWithValue }) => {
    return axios
      .get(`/api/v1/reviews?productId=${productId}`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const adminProductReviewsSlice = createSlice({
  name: "adminProductReviews",
  initialState,
  reducers: {
    ADMIN_REVIEWS_CLEAR_ERRORS: (state, action) => {
      state.error = "";
    },
    ADMIN_REVIEWS_RESET: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductReviews.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProductReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;
      state.reviews = action.payload.reviews;
      state.error = "";
    });
    builder.addCase(getProductReviews.rejected, (state, action) => {
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

export default adminProductReviewsSlice.reducer;
export const { ADMIN_REVIEWS_CLEAR_ERRORS, ADMIN_REVIEWS_RESET } =
  adminProductReviewsSlice.actions;
