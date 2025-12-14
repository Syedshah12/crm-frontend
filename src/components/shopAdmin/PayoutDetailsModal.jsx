import React from "react";
import { motion } from "framer-motion";
import { useDarkMode } from "../../context/DarkModeContext.jsx";

export default function PayoutDetailsModal({ payout, isOpen, onClose }) {
  const { darkMode } = useDarkMode();

  if (!isOpen || !payout) return null;

  return (
    <div        className={`fixed inset-0 z-50 flex items-center justify-center px-4
          ${darkMode ? "bg-black/70" : "bg-black/40"}`}>





            
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`rounded-lg p-6 w-full max-w-md shadow-lg transition-colors duration-500
          ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200"}`}
      >
        <h2 className={`text-xl font-semibold mb-4 transition-colors duration-500
          ${darkMode ? "text-cyan-400" : "text-gray-800"}`}>
          Payout Details
        </h2>

        <div className={`flex flex-col gap-2 transition-colors duration-500
          ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          <p><strong>Employee:</strong> {payout.employee?.name || "-"}</p>
          <p><strong>Amount Paid:</strong> ${payout.amountPaid}</p>
          <p><strong>Payout Date:</strong> {new Date(payout.payoutDate).toLocaleDateString()}</p>
          <p><strong>Start Date:</strong> {new Date(payout.payoutStartDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(payout.payoutEndDate).toLocaleDateString()}</p>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg transition-colors duration-500
              ${darkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
