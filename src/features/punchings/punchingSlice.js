import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import punchingApi from "../../api/punchingApi";
import { toast } from "react-toastify";

//
// ─── FETCH PUNCHINGS (with filters) ──────────────────────────────────────────
//
export const fetchPunchings = createAsyncThunk(
  "punchings/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await punchingApi.get("/", { params });
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load punchings"
      );
    }
  }
);

//
// ─── PUNCH IN ────────────────────────────────────────────────────────────────
//
export const punchIn = createAsyncThunk(
  "punchings/punchIn",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await punchingApi.post("/in", formData);
      toast.success("Punch in successful");
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Punch in failed");
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//
// ─── PUNCH OUT ───────────────────────────────────────────────────────────────
//
export const punchOut = createAsyncThunk(
  "punchings/punchOut",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await punchingApi.post("/out", formData);
      toast.success("Punch out successful");
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Punch out failed");
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//
// ─── SLICE ───────────────────────────────────────────────────────────────────
//
const punchingSlice = createSlice({
  name: "punchings",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchPunchings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPunchings.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPunchings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Punch In
      .addCase(punchIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(punchIn.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(punchIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Punch Out
      .addCase(punchOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(punchOut.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.list.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(punchOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default punchingSlice.reducer;
