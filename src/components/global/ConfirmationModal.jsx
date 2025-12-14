import React from "react";
import { motion } from "framer-motion";
import {  useDarkMode } from "../../context/DarkModeContext.jsx";
export default function ConfirmationModal({ open, onClose, onConfirm, message }) {
  if (!open) return null;

   const { darkMode } = useDarkMode();
  return (
 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className={`rounded-xl p-6 max-w-sm w-full shadow-2xl transition-colors duration-500
          ${darkMode ? "bg-gray-900 text-gray-200 shadow-[0_0_30px_rgba(0,255,255,0.3)]" : "bg-white text-gray-700 shadow-xl"}
        `}
      >
        <p className="text-lg mb-6 transition-colors duration-500">
          {message || "Are you sure?"}
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded transition-colors duration-300 ${
              darkMode ? "bg-gray-800 hover:bg-gray-700 text-gray-200" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded transition-colors duration-300 ${
              darkMode ? "bg-red-700 hover:bg-red-600 text-white" : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
}
