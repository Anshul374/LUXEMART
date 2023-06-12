import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loadingRe: false,
  successRe: "",
  errorRe: "",
};

export const createNewReview = createAsyncThunk(
  "review/createNewReview",
  async (reviewData, { rejectWithValue }) => {
    const config = { headers: { "Content-Type": "application/json" } };
    return axios
      .put(`/api/v1/review`, reviewData, config)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return rejectWithValue(err.response.data);
      });
  }
);

const newReviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    NEW_REVIEW_CLEAR_ERRORS: (state, action) => {
      state.errorRe = "";
    },
    NEW_REVIEW_RESET: (state, action) => {
      state.successRe = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewReview.pending, (state, action) => {
      state.loadingRe = true;
    });
    builder.addCase(createNewReview.fulfilled, (state, action) => {
      state.loadingRe = false;
      state.successRe = action.payload.success;
      state.errorRe = "";
    });
    builder.addCase(createNewReview.rejected, (state, action) => {
      state.loadingRe = false;
      if (action.payload) {
        // console.log(action.payload.message);
        state.errorRe = action.payload.message;
      } else {
        // console.log(action.error.message);
        state.errorRe = action.error.message;
      }
    });
  },
});

export default newReviewSlice.reducer;
export const { NEW_REVIEW_CLEAR_ERRORS, NEW_REVIEW_RESET } =
  newReviewSlice.actions;
