import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rotaApi from "../../api/rotaApi";
import { toast } from "react-toastify";

//
// ─── FETCH ROTAS (with filters) ─────────────────────────────────────────────
//
export const fetchRotas = createAsyncThunk(
  "rotas/fetchAll",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { data } = await rotaApi.get("/", { params });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load rotas");
    }
  }
);

//
// ─── CREATE ROTA ─────────────────────────────────────────────────────────────
//
export const createRota = createAsyncThunk(
  "rotas/create",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await rotaApi.post("/", formData);
      toast.success("Rota created");
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create rota");
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//
// ─── UPDATE ROTA ─────────────────────────────────────────────────────────────
//
export const updateRota = createAsyncThunk(
  "rotas/update",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const { data } = await rotaApi.put(`/${id}`, updates);
      toast.success("Rota updated");
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update rota");
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//
// ─── DELETE ROTA ─────────────────────────────────────────────────────────────
//
export const deleteRota = createAsyncThunk(
  "rotas/delete",
  async (id, { rejectWithValue }) => {
    try {
      await rotaApi.delete(`/${id}`);
      toast.success("Rota deleted");
      return id;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete rota");
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//
// ─── SLICE ─────────────────────────────────────────────────────────────
//
const rotaSlice = createSlice({
  name: "rotas",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchRotas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRotas.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRotas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createRota.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // Update
      .addCase(updateRota.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (r) => r._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteRota.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (r) => r._id !== action.payload
        );
      });
  },
});

export default rotaSlice.reducer;
