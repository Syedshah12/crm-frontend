import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useDarkMode } from "../../context/DarkModeContext.jsx";
import { fetchShops } from "../../features/shops/shopSlice.js";
import { fetchEmployees } from "../../features/employees/employeeSlice.js";
import { punchIn, fetchPunchings } from "../../features/punchings/punchingSlice.js";

export default function PunchInModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();

  const shopsState = useSelector((state) => state.shops || { list: [], loading: false });
  const { list: shops } = shopsState;

  const employeesState = useSelector((state) => state.employees || { list: [], loading: false });
  const { list: employees } = employeesState;

  const { loading } = useSelector((state) => state.punchings);

  const [formData, setFormData] = useState({
    shopId: "",
    employeeId: "",
  });

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchShops());
      dispatch(fetchEmployees());
    }
  }, [isOpen, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.shopId || !formData.employeeId) return;

    dispatch(
      punchIn({
        ...formData,
        punchInDatetime: new Date().toISOString(),
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        // ✅ Option 2: Refresh punchings so employee name shows immediately
        dispatch(fetchPunchings());

        // Reset form and close modal
        onClose();
        setFormData({ shopId: "", employeeId: "" });
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center px-2 sm:px-4 z-50 transition-colors duration-500 overflow-y-auto
        ${darkMode ? "bg-black/70" : "bg-black/40"}`}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`w-full sm:w-11/12 md:w-3/4 lg:w-1/2 max-w-xl rounded-xl shadow-xl p-6 my-10 transition-colors duration-500
          ${darkMode ? "bg-gray-900 border border-gray-700 text-gray-200" : "bg-white border border-gray-200 text-gray-800"}`}
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
          <h2 className={`text-xl font-semibold ${darkMode ? "text-cyan-400" : "text-gray-900"}`}>
            Punch In Employee
          </h2>
          <button
            onClick={onClose}
            className={`px-3 py-1 rounded-md text-sm transition-all
              ${darkMode ? "bg-gray-800 hover:bg-gray-700 text-gray-300" : "bg-gray-200 hover:bg-gray-300 text-gray-800"}`}
          >
            Close
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* SHOP SELECT */}
          <div className="md:col-span-2">
            <label className="text-sm opacity-70">Select Shop</label>
            <select
              name="shopId"
              value={formData.shopId}
              onChange={handleChange}
              className={`w-full p-2 rounded-md mt-1 border
                ${darkMode ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-800"}`}
            >
              <option value="">Select Shop</option>
              {shops.map((shop) => (
                <option key={shop._id} value={shop._id}>
                  {shop.name}
                </option>
              ))}
            </select>
          </div>

          {/* EMPLOYEE SELECT */}
          <div className="md:col-span-2">
            <label className="text-sm opacity-70">Select Employee</label>
            <select
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className={`w-full p-2 rounded-md mt-1 border
                ${darkMode ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-800"}`}
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 mt-2 rounded-lg font-medium transition-all
                ${darkMode ? "bg-cyan-600 hover:bg-cyan-500 text-white" : "bg-cyan-500 hover:bg-cyan-600 text-white"}`}
            >
              {loading ? "Punching..." : "Punch In"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
