import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useDarkMode } from "../../context/DarkModeContext.jsx";
import { fetchShops } from "../../features/shops/shopSlice";
import { fetchEmployees } from "../../features/employees/employeeSlice";
import { createRota } from "../../features/rotas/rotaSlice";

export default function RotaCreateModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();

  const { list: shops } = useSelector((state) => state.shops);
  const { list: employees } = useSelector((state) => state.employees);
  const { loading } = useSelector((state) => state.rotas);

  const [formData, setFormData] = useState({
    shopId: "",
    employeeId: "",
    shiftDate: "",
    scheduledStart: "",
    scheduledEnd: "",
    note: "",
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
    dispatch(createRota(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        onClose();
        setFormData({
          shopId: "",
          employeeId: "",
          shiftDate: "",
          scheduledStart: "",
          scheduledEnd: "",
          note: "",
        });
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center px-2 sm:px-4 z-50 transition-colors duration-500
        ${darkMode ? "bg-black/70" : "bg-black/40"}`}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`w-full sm:w-11/12 md:w-3/4 lg:w-1/2 max-w-xl rounded-xl shadow-xl p-6 transition-colors duration-500
          ${darkMode
            ? "bg-gray-900 border border-gray-700 text-gray-200"
            : "bg-white border border-gray-200 text-gray-800"}`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-xl font-semibold ${darkMode ? "text-cyan-400" : "text-gray-900"}`}>
            Add New Rota
          </h2>
          <button
            onClick={onClose}
            className={`px-3 py-1 rounded-md text-sm transition-all
              ${darkMode
                ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"}`}
          >
            Close
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* SHOP */}
          <Select
            label="Select Shop"
            name="shopId"
            value={formData.shopId}
            onChange={handleChange}
            options={shops}
            dark={darkMode}
          />

          {/* EMPLOYEE */}
          <Select
            label="Select Employee"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            options={employees}
            dark={darkMode}
            optionLabel="name"
          />

          <Input
            label="Shift Date"
            name="shiftDate"
            type="date"
            value={formData.shiftDate}
            onChange={handleChange}
            dark={darkMode}
          />

          <Input
            label="Start Time"
            name="scheduledStart"
            type="time"
            value={formData.scheduledStart}
            onChange={handleChange}
            dark={darkMode}
          />

          <Input
            label="End Time"
            name="scheduledEnd"
            type="time"
            value={formData.scheduledEnd}
            onChange={handleChange}
            dark={darkMode}
          />

          {/* NOTE */}
          <div className="md:col-span-2">
            <label className="text-sm opacity-70">Note</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows="3"
              className={`w-full p-2 rounded-md mt-1 border
                ${darkMode
                  ? "bg-gray-800 border-gray-700 text-gray-200"
                  : "bg-white border-gray-300 text-gray-800"}`}
            />
          </div>

          {/* SUBMIT */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 mt-2 rounded-lg font-medium transition-all
                ${darkMode
                  ? "bg-cyan-600 hover:bg-cyan-500 text-white"
                  : "bg-cyan-500 hover:bg-cyan-600 text-white"}`}
            >
              {loading ? "Creating..." : "Create Rota"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

/* INPUT */
function Input({ label, dark, ...props }) {
  return (
    <div>
      <label className="text-sm opacity-70">{label}</label>
      <input
        {...props}
        className={`w-full p-2 rounded-md mt-1 border
          ${dark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-800"}`}
      />
    </div>
  );
}

/* SELECT */
function Select({ label, name, value, onChange, options, dark, optionLabel = "name" }) {
  return (
    <div>
      <label className="text-sm opacity-70">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full p-2 rounded-md mt-1 border
          ${dark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-800"}`}
      >
        <option value="">Select</option>
        {options?.map((o) => (
          <option key={o._id} value={o._id}>
            {o[optionLabel]}
          </option>
        ))}
      </select>
    </div>
  );
}
