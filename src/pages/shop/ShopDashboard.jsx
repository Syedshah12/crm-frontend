import React, { useEffect } from "react";
import ShopLayout from "../../components/layout/shopLayout/ShopLayout.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchShopDashboard } from "../../features/shops/shopSlice.js"; 
import { motion } from "framer-motion";
import { useDarkMode } from "../../context/DarkModeContext.jsx";

export default function ShopDashboard() {
  const dispatch = useDispatch();
const { dashboard, dashboardLoading } = useSelector((state) => state.shops);
  const { darkMode } = useDarkMode();
console.log(dashboard);

if (dashboardLoading) {
  console.log("Loading dashboard...");
} else {
  console.log("Dashboard:", dashboard);
}

  useEffect(() => {
    dispatch(fetchShopDashboard());
  }, [dispatch]);

  const cards = [
    { label: "Total Employees", value: dashboard?.totalEmployees || 0 },
    { label: "Today's Punches", value: dashboard?.todaysPunches || 0 },
    { label: "Upcoming Shifts", value: dashboard?.upcomingShifts?.length || 0 },
    { label: "Weekly Payout", value: `Rs ${dashboard?.weeklyPayout || 0}` },
  ];

  return (
    <ShopLayout>
      <div className="flex flex-col flex-1 p-6">
        <h1
          className={`text-2xl md:text-3xl font-semibold mb-6 transition-colors duration-500
          ${darkMode ? "text-cyan-400" : "text-gray-800"}`}
        >
          Shop Overview
        </h1>

        {dashboardLoading ? (
          <p
            className={`text-sm transition-colors duration-500 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Loading dashboard...
          </p>
        ) : (
          <>
            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`rounded-xl p-6 border transition-colors duration-500
                    ${
                      darkMode
                        ? "bg-gray-900 border-gray-700 text-gray-200 shadow-[0_5px_20px_rgba(0,255,255,0.3)]"
                        : "bg-white border-gray-200 text-gray-900 shadow-lg"
                    }`}
                >
                  <h3
                    className={`text-sm transition-colors duration-500 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {c.label}
                  </h3>
                  <p
                    className={`mt-2 text-3xl font-bold transition-colors duration-500 ${
                      darkMode ? "text-cyan-400" : "text-gray-900"
                    }`}
                  >
                    {c.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Upcoming Shifts */}
            <div
              className={`mt-10 rounded-xl p-6 border transition-colors duration-500
                ${
                  darkMode
                    ? "bg-gray-900 border-gray-800 text-gray-200"
                    : "bg-white border-gray-200 text-gray-800"
                }`}
            >
              <h2
                className={`text-xl font-semibold mb-4 transition-colors duration-500 ${
                  darkMode ? "text-cyan-300" : "text-gray-800"
                }`}
              >
                Upcoming Shifts
              </h2>

              {dashboard?.upcomingShifts?.length === 0 ? (
                <p
                  className={`text-sm transition-colors duration-500 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  No upcoming shifts.
                </p>
              ) : (
               <ul className="space-y-4">
  {dashboard?.upcomingShifts?.map((shift, idx) => {
    // Format date nicely
    const date = new Date(shift.shiftDate).toLocaleDateString();
    const shiftTime = `${shift.scheduledStart} - ${shift.scheduledEnd}`;
    const employeeName = shift.employee.name;

    return (
      <motion.li
        key={shift._id}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: idx * 0.1 }}
        className={`p-4 rounded-lg border transition-colors duration-500
          ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-gray-200"
              : "bg-gray-50 border-gray-200 text-gray-700"
          }`}
      >
        <p>
          <span className="font-semibold">Employee:</span> {employeeName}
        </p>
        <p>
          <span className="font-semibold">Shift:</span> {shiftTime}
        </p>
        <p>
          <span className="font-semibold">Date:</span> {date}
        </p>
      </motion.li>
    );
  })}
</ul>

              )}
            </div>
          </>
        )}
      </div>
    </ShopLayout>
  );
}
