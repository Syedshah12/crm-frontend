// src/features/admins/adminSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

// --- Admin CRUD & Stats --- //

// Fetch all admins
export const fetchAdmins = createAsyncThunk(
  'admins/fetchAdmins',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/admin/with-shops');
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create a new admin
export const createAdmin = createAsyncThunk(
  'admins/createAdmin',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/admin', payload);
      toast.success('Shop admin created');
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create admin');
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update an admin
export const updateAdmin = createAsyncThunk(
  'admins/updateAdmin',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/admin/${id}`, payload);
      toast.success('Shop admin updated');
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update admin');
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete an admin
export const deleteAdmin = createAsyncThunk(
  'admins/deleteAdmin',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/admin/${id}`);
      toast.success('Shop admin deleted');
      return id;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete admin');
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch admin stats
export const fetchStats = createAsyncThunk(
  'admins/stats',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/admin/stats');
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch stats');
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch unassigned ShopAdmins
export const fetchUnassignedAdmins = createAsyncThunk(
  'admins/fetchUnassignedAdmins',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/admin/unassigned');
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch unassigned admins');
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// --- Slice --- //
const adminSlice = createSlice({
  name: 'admins',
  initialState: {
    admins: [],
    unassignedAdmins: [],
    stats: {
      totalShops: 0,
      totalShopAdmins: 0,
      totalEmployees: 0,
      rotasThisWeek: 0,
      punchesToday: 0,
      salariesGenerated: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all admins
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create admin
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.admins.unshift(action.payload);
      })

      // Update admin
      .addCase(updateAdmin.fulfilled, (state, action) => {
        const index = state.admins.findIndex(ad => ad._id === action.payload._id);
        if (index !== -1) state.admins[index] = action.payload;
      })

      // Delete admin
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.admins = state.admins.filter(ad => ad._id !== action.payload);
      })

      // Fetch stats
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch unassigned admins
      .addCase(fetchUnassignedAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnassignedAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.unassignedAdmins = action.payload;
      })
      .addCase(fetchUnassignedAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
