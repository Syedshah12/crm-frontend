import React, { useEffect } from "react";
import Layout from "../../components/layout/adminLayout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchStats } from "../../features/admins/adminSlice";
import { motion } from "framer-motion";
import {  useDarkMode } from "../../context/DarkModeContext.jsx";
export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.admins);
   const { darkMode } = useDarkMode();
  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  const cards = [
    { label: "Total Shops", value: stats?.totalShops || 0 },
    { label: "Total Shop Admins", value: stats?.totalShopAdmins || 0 },
    { label: "Total Employees", value: stats?.totalEmployees || 0 },
    { label: "Rotas This Week", value: stats?.rotasThisWeek || 0 },
    { label: "Punches Today", value: stats?.punchesToday || 0 },
    { label: "Salaries Generated", value: stats?.salariesGenerated || 0 },
  ];

  return (
   <Layout>
  <div className="flex flex-col flex-1 p-6">
    <h1
      className={`text-2xl md:text-3xl font-semibold mb-6 transition-colors duration-500
        ${darkMode ? "text-cyan-400" : "text-gray-800"}`}
    >
      Overview
    </h1>

    {loading ? (
      <p className={`text-sm transition-colors duration-500 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        Loading stats...
      </p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((c, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`rounded-xl p-6 border transition-colors duration-500
  ${
    darkMode
      ? "bg-gray-900 border-gray-700 text-gray-200 shadow-[0_5px_20px_rgba(0,255,255,0.3)]"
      : "bg-white border-gray-200 text-gray-900 shadow-lg"
  }`}

          >
            <h3 className={`text-sm transition-colors duration-500 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              {c.label}
            </h3>
            <p className={`mt-2 text-3xl font-bold transition-colors duration-500 ${darkMode ? "text-cyan-400" : "text-gray-900"}`}>
              {c.value}
            </p>
          </motion.div>
        ))}
      </div>
    )}
  </div>
</Layout>

  );
}
