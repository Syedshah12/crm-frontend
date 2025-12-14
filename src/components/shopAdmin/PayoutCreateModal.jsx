import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPayout } from "../../features/payouts/payoutSlice";
import { fetchEmployees } from "../../features/employees/employeeSlice";
import { motion } from "framer-motion";
import { useDarkMode } from "../../context/DarkModeContext.jsx";

export default function PayoutCreateModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { list: employees } = useSelector((state) => state.employees);
  const { darkMode } = useDarkMode();

  const [formData, setFormData] = useState({
    employeeId: "",
    amountPaid: "",
    payoutDate: "",
    payoutStartDate: "",
    payoutEndDate: "",
  });

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPayout(formData)).then(() => onClose());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-md bg-opacity-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`rounded-lg p-6 w-full max-w-md shadow-lg transition-colors duration-500
          ${darkMode ? "bg-gray-900 border border-gray-800 text-gray-300" : "bg-white border border-gray-200 text-gray-700"}`}
      >
        <h2 className={`text-xl font-semibold mb-4 transition-colors duration-500
          ${darkMode ? "text-cyan-400" : "text-gray-800"}`}>
          Create Payout
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="flex flex-col">
            Employee
            <select
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
              className={`w-full mt-1 p-2 rounded border transition-colors duration-500
                ${darkMode ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white border-gray-300 text-gray-700"}`}
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col">
            Amount Paid
            <input
              type="number"
              name="amountPaid"
              value={formData.amountPaid}
              onChange={handleChange}
              required
              className={`w-full mt-1 p-2 rounded border transition-colors duration-500
                ${darkMode ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white border-gray-300 text-gray-700"}`}
            />
          </label>

          <label className="flex flex-col">
            Payout Date
            <input
              type="date"
              name="payoutDate"
              value={formData.payoutDate}
              onChange={handleChange}
              required
              className={`w-full mt-1 p-2 rounded border transition-colors duration-500
                ${darkMode ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white border-gray-300 text-gray-700"}`}
            />
          </label>

          <label className="flex flex-col">
            Start Date
            <input
              type="date"
              name="payoutStartDate"
              value={formData.payoutStartDate}
              onChange={handleChange}
              required
              className={`w-full mt-1 p-2 rounded border transition-colors duration-500
                ${darkMode ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white border-gray-300 text-gray-700"}`}
            />
          </label>

          <label className="flex flex-col">
            End Date
            <input
              type="date"
              name="payoutEndDate"
              value={formData.payoutEndDate}
              onChange={handleChange}
              required
              className={`w-full mt-1 p-2 rounded border transition-colors duration-500
                ${darkMode ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white border-gray-300 text-gray-700"}`}
            />
          </label>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg transition-colors duration-500
                ${darkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg transition-colors duration-500
                ${darkMode ? "bg-cyan-600 text-white hover:bg-cyan-500" : "bg-blue-600 text-white hover:bg-blue-700"}`}
            >
              Create
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
