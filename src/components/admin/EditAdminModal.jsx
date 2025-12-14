import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAdmin } from "../../features/admins/adminSlice";
import { useDarkMode } from "../../context/DarkModeContext.jsx";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function EditAdminModal({ admin, onClose }) {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();
  
  const [form, setForm] = useState({
    name: admin.name || "",
    email: admin.email || "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const payload = { ...form };

    // If password is empty, don't send it
    if (!payload.password) delete payload.password;

    dispatch(updateAdmin({ id: admin._id, payload }));
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm ${
        darkMode ? "bg-black/40" : "bg-black/40"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`w-[420px] p-6 rounded-xl shadow-2xl relative transition-colors duration-300 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-3 right-3 transition-colors duration-200 ${
            darkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <X size={22} />
        </button>

        <h2
          className={`text-2xl font-semibold mb-5 transition-colors duration-200 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Edit Admin
        </h2>

        {/* Name */}
        <label
          className={`block mb-1 text-sm font-medium ${
            darkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className={`w-full p-2.5 border rounded-lg mb-4 transition-colors duration-200 ${
            darkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-gray-50 text-gray-800 border-gray-300"
          }`}
          placeholder="Enter full name"
        />

        {/* Email */}
        <label
          className={`block mb-1 text-sm font-medium ${
            darkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Email
        </label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className={`w-full p-2.5 border rounded-lg mb-4 transition-colors duration-200 ${
            darkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-gray-50 text-gray-800 border-gray-300"
          }`}
          placeholder="Enter email"
        />

        {/* Password */}
        <label
          className={`block mb-1 text-sm font-medium ${
            darkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          New Password{" "}
          <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            (optional)
          </span>
        </label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className={`w-full p-2.5 border rounded-lg mb-6 transition-colors duration-200 ${
            darkMode
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-gray-50 text-gray-800 border-gray-300"
          }`}
          placeholder="Enter new password"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}
