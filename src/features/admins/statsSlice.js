import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminApi from "../../api/adminApi";
import { toast } from "react-toastify";

export const fetchAdminStats = createAsyncThunk(
  "admin/stats",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.get("/stats");
      return data;
    } catch (err) {
      toast.error("Failed to load dashboard stats");
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

const statsSlice = createSlice({
  name: "adminStats",
  initialState: {
    stats: null,
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default statsSlice.reducer;
