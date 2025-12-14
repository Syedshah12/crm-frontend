
import React from "react";
import { FiMenu, FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";
import {  useDarkMode } from "../../../context/DarkModeContext.jsx";
 // path to your context

export default function ShopTopBar({ user, onHamburgerClick }) {

   const { darkMode } = useDarkMode();
  return (
 <div
      className={`flex items-center justify-between px-6 py-3 border-b shadow-lg backdrop-blur-sm transition-colors duration-500
        ${darkMode
          ? "bg-gradient-to-r from-gray-900/80 via-gray-800/70 to-gray-900/80 border-gray-700"
          : "bg-gradient-to-r from-white/90 via-gray-100/90 to-white/90 border-gray-200"
        }`}
    >
      {/* Hamburger */}
      <motion.button
        className={`md:hidden p-2 rounded-lg transition-all duration-300
          ${darkMode ? "text-gray-200 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-200"}`}
        onClick={onHamburgerClick}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.1 }}
      >
        <FiMenu size={24} />
      </motion.button>

      {/* Title */}
      <div className="hidden md:block flex-1  text-center md:text-left">
        <h1
          className={`text-xl md:text-2xl font-semibold transition-colors duration-500
            ${darkMode ? "text-cyan-400" : "text-gray-800"}`}
        >
          Shop Dashboard
        </h1>
      </div>

      {/* User info */}
      {user && (
        <div
          className={`flex items-center gap-3 px-4 py-1 rounded-full shadow-inner transition-colors duration-500
            ${darkMode
              ? "bg-gray-800 text-gray-200 shadow-[0_0_15px_cyan/40]"
              : "bg-gray-100 text-gray-800 shadow-sm"
            }`}
        >
          <div className="w-9 h-9 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
            {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className={`text-sm md:text-base font-medium transition-colors duration-500`}>
              {user.name || "Admin"}
            </span>
            <span className={`text-xs md:text-sm transition-colors duration-500 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              {user.email}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
