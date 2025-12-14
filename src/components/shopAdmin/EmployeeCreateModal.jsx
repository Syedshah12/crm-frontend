import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useDarkMode } from "../../context/DarkModeContext.jsx";
import { fetchShops } from "../../features/shops/shopSlice.js";
import { createEmployee } from "../../features/employees/employeeSlice.js";

export default function EmployeeCreateModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();

  const shopsState = useSelector((state) => state.shops || { list: [], loading: false });
  const { list: shops, loading: shopsLoading } = shopsState;
  const { loading } = useSelector((state) => state.employees);

  const [formData, setFormData] = useState({
    name: "",
    shareCode: "",
    niNumber: "",
    address: "",
    phoneNumber: "",
    shiftTiming: "",
    payType: "Fixed Daily",
    fixedDailyRate: "",
    hourlyRate: "",
    customHourlyRate: "",
    customDailyRate: "",
    shopId: "",
  });

  useEffect(() => {
    if (isOpen) dispatch(fetchShops());
  }, [isOpen, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEmployee(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        onClose();
        setFormData({
          name: "",
          shareCode: "",
          niNumber: "",
          address: "",
          phoneNumber: "",
          shiftTiming: "",
          payType: "Fixed Daily",
          fixedDailyRate: "",
          hourlyRate: "",
          customHourlyRate: "",
          customDailyRate: "",
          shopId: "",
        });
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
            Add New Employee
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
          <Input label="Name" name="name" value={formData.name} onChange={handleChange} dark={darkMode} />
          <Input label="Phone" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} dark={darkMode} />
          <Input label="Address" name="address" value={formData.address} onChange={handleChange} dark={darkMode} />
          <Input label="NI Number" name="niNumber" value={formData.niNumber} onChange={handleChange} dark={darkMode} />
          <Input label="Share Code" name="shareCode" value={formData.shareCode} onChange={handleChange} dark={darkMode} />
          <Input label="Shift Timing" name="shiftTiming" value={formData.shiftTiming} onChange={handleChange} dark={darkMode} />

          {/* PAY TYPE (full width) */}
          <div className="md:col-span-2">
            <label className="text-sm opacity-70">Pay Type</label>
            <select
              name="payType"
              value={formData.payType}
              onChange={handleChange}
              className={`w-full p-2 rounded-md mt-1 border
                ${darkMode ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-800"}`}
            >
              <option value="Fixed Daily">Fixed Daily</option>
              <option value="Hourly">Hourly</option>
            </select>
          </div>

          {/* FIXED OR HOURLY FIELDS */}
          {formData.payType === "Fixed Daily" && (
            <Input type="number" label="Daily Rate (£)" name="fixedDailyRate" value={formData.fixedDailyRate} onChange={handleChange} dark={darkMode} />
          )}
          {formData.payType === "Hourly" && (
            <Input type="number" label="Hourly Rate (£)" name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} dark={darkMode} />
          )}

          <Input type="number" label="Custom Daily Rate" name="customDailyRate" value={formData.customDailyRate} onChange={handleChange} dark={darkMode} />
          <Input type="number" label="Custom Hourly Rate" name="customHourlyRate" value={formData.customHourlyRate} onChange={handleChange} dark={darkMode} />

          {/* SHOP SELECT (full width) */}
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
              {shops?.map((shop) => (
                <option key={shop._id} value={shop._id}>
                  {shop.name}
                </option>
              ))}
            </select>
          </div>

          {/* SUBMIT BUTTON (full width) */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 mt-2 rounded-lg font-medium transition-all
                ${darkMode ? "bg-cyan-600 hover:bg-cyan-500 text-white" : "bg-cyan-500 hover:bg-cyan-600 text-white"}`}
            >
              {loading ? "Creating..." : "Create Employee"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

/* INPUT COMPONENT */
function Input({ label, name, value, onChange, dark, type = "text" }) {
  return (
    <div>
      <label className="text-sm opacity-70">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full p-2 rounded-md mt-1 border
          ${dark ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-800"}`}
      />
    </div>
  );
}
