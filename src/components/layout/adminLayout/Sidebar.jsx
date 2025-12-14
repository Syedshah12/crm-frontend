import React from "react";
import { motion } from "framer-motion";
import {
  FiX,
  FiHome,
  FiShoppingCart,
  FiUsers,
  FiLogOut,
  FiPlusCircle,
  FiUserPlus,
} from "react-icons/fi";
import { FiMenu, FiSun, FiMoon } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import { useLocation, Link } from "react-router-dom";
import { DarkModeProvider, useDarkMode } from "../../../context/DarkModeContext.jsx";

const menuItems = [
  { name: "Dashboard", icon: <FiHome />, path: "/admin/dashboard" },
  { name: "Shops", icon: <FiShoppingCart />, path: "/admin/shops" },
  { name: "Create Shop", icon: <FiPlusCircle />, path: "/admin/create/shop" },
  { name: "Admins", icon: <FiUsers />, path: "/admin/admins" },
  { name: "Create Admin", icon: <FiUserPlus />, path: "/admin/create" },
];

export default function Sidebar({ isOpen, onClose, user }) {
  const dispatch = useDispatch();
  const location = useLocation();
   const { darkMode, toggleDarkMode } = useDarkMode();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={onClose}
        />
      )}

<motion.div
  initial={{ x: "-100%" }}
  animate={{ x: isOpen ? 0 : "-100%" }}
  transition={{ type: "tween", duration: 0.3 }}
  className={`fixed top-0 left-0 w-64 h-full shadow-2xl z-40 flex flex-col
    ${darkMode 
      ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-200 shadow-[0_0_25px_rgba(0,255,255,0.2)]" 
      : "bg-white text-gray-800"
    }`}
>
  {/* Close button for mobile */}
  <div className="flex justify-end p-4 md:hidden">
    <button onClick={onClose} className={darkMode ? "text-gray-200" : "text-gray-700"}>
      <FiX size={24} />
    </button>
  </div>

  {/* Top Section: Logo + User */}
  <div className={`px-6 py-4 border-b transition-colors duration-500
    ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
    <h2 className={`text-xl font-bold transition-colors duration-500
      ${darkMode ? "text-cyan-400" : "text-gray-800"}`}>
      CRM MOBILETECH
    </h2>
    {user && (
      <p className={`text-sm transition-colors duration-500
        ${darkMode ? "text-gray-400" : "text-gray-500"} mt-1`}>
        {user.name}
      </p>
    )}
  </div>

  {/* Sidebar Menu */}
  <nav className="flex-1 px-4 py-6 space-y-2">
    {menuItems.map((item) => {
      const isActive = location.pathname === item.path;

      return (
        <Link key={item.name} to={item.path}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-r-full transition-all duration-300 ease-in-out
              ${isActive
                ? darkMode
                  ? "bg-gradient-to-r from-cyan-800 via-blue-900 to-purple-800 text-cyan-300 shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                  : "bg-blue-100 text-blue-700 shadow-lg"
                : darkMode
                  ? "text-gray-300 hover:bg-gradient-to-r hover:from-cyan-900 hover:via-blue-900 hover:to-purple-900 hover:text-cyan-300"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
              }`}
          >
            <motion.div
              className="flex-shrink-0 ml-1"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {item.icon}
            </motion.div>
            <span className="font-medium">{item.name}</span>
          </motion.div>
        </Link>
      );
    })}
  </nav>

  {/* Logout + Dark Mode Toggle */}
  {user && (
    <div className="px-6 py-4 border-t flex flex-col gap-3 transition-colors duration-500"
      className={darkMode ? "border-gray-700" : "border-gray-200"}>
      {/* Dark Mode Toggle */}
      <motion.div
        className={`relative w-16 h-8 flex items-center rounded-full cursor-pointer transition-colors duration-500
          ${darkMode ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 shadow-[0_0_20px_cyan]" : "bg-gray-200"}`}
        onClick={toggleDarkMode}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className={`absolute w-7 h-7 rounded-full flex items-center justify-center shadow-md
            ${darkMode ? "bg-black text-cyan-400 shadow-cyan-400/70" : "bg-white text-yellow-400 shadow-yellow-300/50"}`}
          animate={{ x: darkMode ? 32 : 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {darkMode ? <FiMoon size={16} /> : <FiSun size={16} />}
        </motion.div>
      </motion.div>

      {/* Logout Button */}
      <motion.button
        onClick={handleLogout}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg cursor-pointer font-semibold transition-all duration-300 shadow-md
          ${darkMode 
            ? "bg-gray-800 text-red-400 hover:bg-gray-700 shadow-red-500/30" 
            : "bg-gray-100 text-red-500 hover:bg-gray-200 shadow-red-300/30"
          }`}
      >
        <FiLogOut className="text-xl" />
        Logout
      </motion.button>
    </div>
  )}
</motion.div>
    </>
  );
}
