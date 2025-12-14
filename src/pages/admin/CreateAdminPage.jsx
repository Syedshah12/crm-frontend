import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAdmin } from "../../features/admins/adminSlice";
import Layout from "../../components/layout/adminLayout/Layout";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useDarkMode } from "../../context/DarkModeContext.jsx";

export default function CreateAdminPage() {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(createAdmin(form)).unwrap();
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
            darkMode ? "text-cyan-400" : "text-gray-800"
          }`}
        >
          Create New Shop Admin
        </motion.h1>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          className={`p-8 rounded-xl shadow-xl border space-y-6 transition-colors duration-300 ${
            darkMode
              ? "bg-gray-900 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          {/* Name */}
          <div>
            <label
              className={`block mb-2 font-medium transition-colors duration-300 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter admin name"
              className={`w-full p-3 rounded-lg border outline-none transition ${
                darkMode
                  ? "bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-blue-500"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-400"
              }`}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              className={`block mb-2 font-medium transition-colors duration-300 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className={`w-full p-3 rounded-lg border outline-none transition ${
                darkMode
                  ? "bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-blue-500"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-400"
              }`}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              className={`block mb-2 font-medium transition-colors duration-300 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className={`w-full p-3 rounded-lg border outline-none transition ${
                darkMode
                  ? "bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-blue-500"
                  : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-400"
              }`}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold text-lg transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : darkMode
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating..." : "Create Admin"}
          </button>
        </motion.form>
      </div>
    </Layout>
  );
}
