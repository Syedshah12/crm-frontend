import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import shopApi from "../../api/shopApi";
import { toast } from "react-toastify";

//
// ─── GET SHOPS ─────────────────────────────────────────────────────────────
//
export const fetchShops = createAsyncThunk(
  "shops/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await shopApi.get("/");
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load shops");
    }
  }
);

//
// ─── CREATE SHOP ─────────────────────────────────────────────────────────────
//
export const createShop = createAsyncThunk(
  "shops/create",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await shopApi.post("/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      return data;
    } catch (err) {
     
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//
// ─── UPDATE SHOP ─────────────────────────────────────────────────────────────
//
export const updateShop = createAsyncThunk(
  "shops/update",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const { data } = await shopApi.put(`/${id}`, updates);
     
      return data;
    } catch (err) {
      
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//
// ─── GET SHOP DASHBOARD ─────────────────────────────────────────────────────────────
//



export const fetchShopDashboard = createAsyncThunk(
  "shops/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {

      const { data } = await shopApi.get("/dashboard");
      return data.data; // returning only dashboard data object
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load dashboard");
    }
  }
);

//
// ─── DELETE SHOP ─────────────────────────────────────────────────────────────
//
export const deleteShop = createAsyncThunk(
  "shops/delete",
  async (id, { rejectWithValue }) => {
    try {
      await shopApi.delete(`/${id}`);
      toast.success("Shop deleted!");
      return id;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete shop");
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//
// ─── SLICE ─────────────────────────────────────────────────────────────
//
const shopSlice = createSlice({
 name: "shops",
  initialState: {
    list: [],
    dashboard: {},        // <--- add this
    loading: false,
    dashboardLoading: false, // <--- add this for dashboard API loading
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch Shops
      .addCase(fetchShops.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShops.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchShops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })



 //
      // ─── DASHBOARD ───────────────────────────────────────────────────────
      //
      .addCase(fetchShopDashboard.pending, (state) => {
        state.dashboardLoading = true;
      })
      .addCase(fetchShopDashboard.fulfilled, (state, action) => {
        state.dashboardLoading = false;
        state.dashboard = action.payload;   // save dashboard
      })
      .addCase(fetchShopDashboard.rejected, (state, action) => {
        state.dashboardLoading = false;
        state.error = action.payload;
      })



      // Create
      .addCase(createShop.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // Update
      .addCase(updateShop.fulfilled, (state, action) => {
        const index = state.list.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })

      // Delete
      .addCase(deleteShop.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s._id !== action.payload);
      });
  },
});

export default shopSlice.reducer;
