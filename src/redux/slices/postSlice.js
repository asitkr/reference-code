import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ✅ Async thunk to fetch posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      // ✅ Test success (uncomment this to check success)
    //   const response = await api.get("/posts?_limit=5");

      // ✅ Test error scenarios (uncomment ONE to test rejection)
      const response = await api.get("/invalid-endpoint"); // 404 Error
    //   const response = await api.get("https://httpstat.us/500"); // Server Error 500
      // const response = await api.get("https://invaliddomain12345.com/posts"); // Network Error
      // const response = await api.get("https://httpstat.us/200?sleep=10000", { timeout: 1000 }); // Timeout Error

      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded but failed
        return rejectWithValue(
          error.response.data?.message || `Server Error: ${error.response.status}`
        );
      } else if (error.request) {
        // Request made but no response
        return rejectWithValue("Network Error: Request blocked or no internet connection.");
      } else {
        // Other unknown errors
        return rejectWithValue(error.message || "Unexpected error occurred.");
      }
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🕒 Pending
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // ✅ Fulfilled
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      // ❌ Rejected
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong while fetching posts.";
      });
  },
});

export default postSlice.reducer;
