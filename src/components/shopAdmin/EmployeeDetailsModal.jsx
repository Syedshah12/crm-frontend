import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode } from "../../context/DarkModeContext.jsx";

export default function EmployeeDetailsModal({ employee, isOpen, onClose }) {
  const { darkMode } = useDarkMode();

  if (!isOpen || !employee) return null;

  return (
    <AnimatePresence>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center px-4
          ${darkMode ? "bg-black/70" : "bg-black/40"}`}
      >
        {/* MODAL CARD */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={`
            w-full max-w-lg
            max-h-[90vh]
            flex flex-col
            rounded-xl border shadow-xl
            transition-colors duration-500
            ${
              darkMode
                ? "bg-gray-900 border-gray-700 text-gray-200 shadow-[0_5px_20px_rgba(0,255,255,0.2)]"
                : "bg-white border-gray-200 text-gray-800"
            }
          `}
        >
          {/* HEADER (STICKY) */}
          <div
            className={`
              sticky top-0 z-10
              flex items-center justify-between gap-3
              px-6 py-4 border-b
              ${
                darkMode
                  ? "bg-gray-900 border-gray-700"
                  : "bg-white border-gray-200"
              }
            `}
          >
            <h2
              className={`text-lg font-semibold
                ${darkMode ? "text-cyan-400" : "text-gray-800"}`}
            >
              Employee Details
            </h2>

            <button
              onClick={onClose}
              className={`
                px-3 py-1.5 rounded-md text-sm
                transition-all duration-300
                ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }
              `}
            >
              Close
            </button>
          </div>

          {/* SCROLLABLE CONTENT */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Detail label="Name" value={employee.name} />
              <Detail label="Phone" value={employee.phoneNumber} />
              <Detail label="Address" value={employee.address} />
              <Detail label="NI Number" value={employee.niNumber} />
              <Detail label="Share Code" value={employee.shareCode} />
              <Detail label="Shift Timing" value={employee.shiftTiming} />
              <Detail label="Pay Type" value={employee.payType} />

              {employee.payType === "Fixed Daily" && (
                <Detail
                  label="Daily Rate"
                  value={`£${employee.fixedDailyRate}`}
                />
              )}

              {employee.payType === "Hourly" && (
                <Detail
                  label="Hourly Rate"
                  value={`£${employee.hourlyRate}`}
                />
              )}

              <Detail
                label="Custom Hourly Rate"
                value={employee.customHourlyRate}
              />
              <Detail
                label="Custom Daily Rate"
                value={employee.customDailyRate}
              />
              <Detail label="Shop" value={employee?.shop?.name} />
              <Detail
                label="Created At"
                value={new Date(employee.createdAt).toLocaleString()}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* -------------------------------- */
/* SMALL DETAIL ROW COMPONENT */
/* -------------------------------- */
function Detail({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="text-xs opacity-60 mb-1 whitespace-nowrap">
        {label}
      </p>
      <p className="text-sm font-medium break-words leading-relaxed">
        {value || "-"}
      </p>
    </div>
  );
}
