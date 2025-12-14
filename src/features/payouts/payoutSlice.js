import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import payoutApi from "../../api/payoutApi";
import { toast } from "react-toastify";

//
// ─── FETCH PAYOUTS (with filters) ─────────────────────────────────────────────
//
export const fetchPayouts = createAsyncThunk(
  "payouts/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await payoutApi.get("/", { params });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load payouts");
    }
  }
);

//
// ─── CREATE PAYOUT ─────────────────────────────────────────────────────────────
//
export const createPayout = createAsyncThunk(
  "payouts/create",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await payoutApi.post("/", formData);
      toast.success("Payout created");
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create payout");
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//
// ─── DELETE PAYOUT ─────────────────────────────────────────────────────────────
//
export const deletePayout = createAsyncThunk(
  "payouts/delete",
  async (id, { rejectWithValue }) => {
    try {
      await payoutApi.delete(`/${id}`);
      toast.success("Payout deleted");
      return id;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete payout");
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//
// ─── SLICE ─────────────────────────────────────────────────────────────
//
const payoutSlice = createSlice({
  name: "payouts",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchPayouts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPayouts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPayouts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createPayout.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // Delete
      .addCase(deletePayout.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p._id !== action.payload);
      });
  },
});

export default payoutSlice.reducer;
