import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import shopReducer from "../features/shops/shopSlice";
import employeeReducer  from "../features/employees/employeeSlice";
import rotaReducer from "../features/rotas/rotaSlice";
import adminReducer from "../features/admins/adminSlice"; // updated
import punchingReducer from "../features/punchings/punchingSlice";
import payoutReducer from "../features/payouts/payoutSlice"; 
const store = configureStore({
  reducer: {
    auth: authReducer,
    shops:shopReducer,
    employees:employeeReducer,
    rotas: rotaReducer,
    punchings: punchingReducer,
    admins: adminReducer, // use single admin slice for CRUD + stats
     payouts: payoutReducer,
  },
});

export default store;
