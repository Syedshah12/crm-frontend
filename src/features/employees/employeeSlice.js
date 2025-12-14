import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeApi from "../../api/employeeApi";
import { toast } from "react-toastify";

//
// ─── FETCH ALL EMPLOYEES ─────────────────────────────────────────────
//
export const fetchEmployees = createAsyncThunk(
  "employees/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await employeeApi.get("/");
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch employees");
    }
  }
);

//
// ─── GET SINGLE EMPLOYEE ─────────────────────────────────────────────
//
export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await employeeApi.get(`/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load employee");
    }
  }
);

//
// ─── CREATE EMPLOYEE ─────────────────────────────────────────────
//
export const createEmployee = createAsyncThunk(
  "employees/create",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await employeeApi.post("/", formData);
      toast.success("Employee created!");
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message);
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//
// ─── UPDATE EMPLOYEE ─────────────────────────────────────────────
//
export const updateEmployee = createAsyncThunk(
  "employees/update",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const { data } = await employeeApi.put(`/${id}`, updates);
      toast.success("Employee updated!");
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message);
      return rejectWithValue(err.response?.data?.message);
    }
  }
);








//
// ─── CALCULATE SALARY FOR ALL EMPLOYEES ─────────────────────────────
//
export const calculateAllSalaries = createAsyncThunk(
  "all/calc",
  async ({ from, to }, { rejectWithValue }) => {
    try {
 

      const { data } = await employeeApi.get("/all/calc", {
        params: { from, to },
      });
     
      return data;
       
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to calculate all salaries");
    }
  }
);

//
// ─── GET SALARY SUMMARY FOR SINGLE EMPLOYEE ─────────────────────────────
//
export const fetchEmployeeSalarySummary = createAsyncThunk(
  "employees/fetchSalarySummary",
  async ({ id, from, to }, { rejectWithValue }) => {
    try {
      const { data } = await employeeApi.get(`/summary/${id}`, {
        params: { from, to },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch salary summary");
    }
  }
);






//
// ─── DELETE EMPLOYEE ─────────────────────────────────────────────
//
export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id, { rejectWithValue }) => {
    try {
      await employeeApi.delete(`/${id}`);
      toast.success("Employee deleted!");
      return id;
    } catch (err) {
      toast.error(err.response?.data?.message);
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

//
// ─── CALCULATE SALARY FOR EMPLOYEE ─────────────────────────────────────────────
//
export const calculateEmployeeSalary = createAsyncThunk(
  "employees/calcSalary",
  async ({ id, from, to }, { rejectWithValue }) => {
    try {
      const { data } = await employeeApi.get(`/employee/${id}/calc`, {
        params: { from, to },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to calculate salary");
    }
  }
);

//
// ─── SLICE ─────────────────────────────────────────────────────────────
//
const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    list: [],
    selected: null,
    salaryResult: null,
    loading: false,
    salaryLoading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      //
      // ─── GET EMPLOYEES ─────────────────────────────────────────────
      //
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //
      // ─── GET SINGLE EMPLOYEE ─────────────────────────────────────────────
      //
      .addCase(fetchEmployeeById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })

      //
      // ─── CREATE ─────────────────────────────────────────────
      //
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      //
      // ─── UPDATE ─────────────────────────────────────────────
      //
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.list.findIndex((e) => e._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })

      //
      // ─── DELETE ─────────────────────────────────────────────
      //
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter((e) => e._id !== action.payload);
      })


// ─── CALCULATE SALARY FOR ALL EMPLOYEES ─────────────────────────────
.addCase(calculateAllSalaries.pending, (state) => {
  state.salaryLoading = true;
})
.addCase(calculateAllSalaries.fulfilled, (state, action) => {
  state.salaryLoading = false;
  state.allSalaries = action.payload; // new state field for all salaries
})
.addCase(calculateAllSalaries.rejected, (state, action) => {
  state.salaryLoading = false;
  state.error = action.payload;
})



// ─── FETCH EMPLOYEE SALARY SUMMARY ─────────────────────────────
.addCase(fetchEmployeeSalarySummary.pending, (state) => {
  state.salaryLoading = true;
})
.addCase(fetchEmployeeSalarySummary.fulfilled, (state, action) => {
  state.salaryLoading = false;
  state.salarySummary = action.payload; // new state field for employee summary
})
.addCase(fetchEmployeeSalarySummary.rejected, (state, action) => {
  state.salaryLoading = false;
  state.error = action.payload;
})


      
      //
      // ─── CALCULATE SALARY ─────────────────────────────────────────────
      //
      .addCase(calculateEmployeeSalary.pending, (state) => {
        state.salaryLoading = true;
      })
      .addCase(calculateEmployeeSalary.fulfilled, (state, action) => {
        state.salaryLoading = false;
        state.salaryResult = action.payload;
      })
      .addCase(calculateEmployeeSalary.rejected, (state, action) => {
        state.salaryLoading = false;
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;
