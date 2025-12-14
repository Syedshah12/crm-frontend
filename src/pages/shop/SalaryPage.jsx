import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateAllSalaries, fetchEmployeeSalarySummary } from "../../features/employees/employeeSlice";
import ShopLayout from "../../components/layout/shopLayout/ShopLayout.jsx";
import { motion } from "framer-motion";
import { useDarkMode } from "../../context/DarkModeContext.jsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FiDownload } from "react-icons/fi";

export default function SalaryPage() {
  const dispatch = useDispatch();
  const { allSalaries, salaryLoading } = useSelector((state) => state.employees);
  const { darkMode } = useDarkMode();

  const [from, setFrom] = useState("2025-12-01");
  const [to, setTo] = useState("2025-12-31");

  useEffect(() => {
    dispatch(calculateAllSalaries({ from, to }));
  }, [dispatch, from, to]);

  const handleRefresh = () => {
    dispatch(calculateAllSalaries({ from, to }));
  };

  const downloadSalaryPDF = async (employeeId) => {
    try {
      const result = await dispatch(fetchEmployeeSalarySummary({ id: employeeId, from, to })).unwrap();
      const emp = result.data;

      const doc = new jsPDF("p", "pt", "a4");
      doc.setFontSize(18);
      doc.text(`Salary Summary - ${emp.employeeName}`, 40, 40);
      doc.setFontSize(12);
      doc.text(`Pay Type: ${emp.payType}`, 40, 60);
      doc.text(`Period: ${from} to ${to}`, 40, 75);
      doc.text(`Hourly Rate: ${emp.hourlyRate}`, 40, 90);
      doc.text(`Daily Rate: ${emp.dailyRate}`, 150, 90);
      doc.text(`Total Hours: ${emp.totalHours.toFixed(2)}`, 40, 105);
      doc.text(`Days Worked: ${emp.totalDays}`, 150, 105);
      doc.text(`Salary: ${emp.salary.toFixed(2)}`, 40, 120);

      const tableData = emp.dailyBreakdown.map((item) => [
        item.date,
        item.hours.toFixed(2),
        item.source,
        item.punchIn ? new Date(item.punchIn).toLocaleTimeString() : "-",
        item.punchOut ? new Date(item.punchOut).toLocaleTimeString() : "-",
      ]);

      autoTable(doc, {
        startY: 140,
        head: [["Date", "Hours", "Source", "Punch In", "Punch Out"]],
        body: tableData,
        theme: "grid",
        headStyles: { fillColor: [22, 160, 133], textColor: 255, fontStyle: "bold" },
        styles: { fontSize: 10 },
        margin: { left: 40, right: 40 },
      });

      doc.save(`${emp.employeeName}_Salary_${from}_to_${to}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
      alert("Failed to generate PDF. Try again.");
    }
  };

  return (
    <ShopLayout>
      <div className="flex flex-col  flex-1 p-6">
        {/* PAGE TITLE */}
        <h1 className={`text-2xl text-center md:text-left md:text-3xl font-semibold mb-6 transition-colors duration-500 ${darkMode ? "text-cyan-400" : "text-gray-800"}`}>
          Salary Overview
        </h1>

        {/* FILTER & ACTION BAR */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <p className={`text-sm transition-colors duration-500 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Salary summary for all employees
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="px-3 py-2 rounded-lg border w-full sm:w-auto" />
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="px-3 py-2 rounded-lg border w-full sm:w-auto" />
            <button
              onClick={handleRefresh}
              className={`px-4 py-2 rounded-lg transition-all duration-300 w-full sm:w-auto ${darkMode ? "bg-cyan-600 text-white hover:bg-cyan-500" : "bg-blue-600 text-white hover:bg-blue-700"}`}
            >
              Refresh
            </button>
          </div>
        </div>

        {/* LOADING */}
        {salaryLoading && (
          <p className={`text-center py-10 text-lg transition-colors duration-500 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Calculating salaries...
          </p>
        )}

        {/* SALARY TABLE */}
        {!salaryLoading && (
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className={`rounded-xl  border over  transition-colors duration-500 ${darkMode ? "bg-gray-900 border-gray-800 shadow-[0_5px_20px_rgba(0,255,255,0.2)]" : "bg-white border-gray-200 shadow-lg"}`}
>
  {/* Only table scrolls horizontally */}
  <div className="overflow-x-auto w-full">
    <table className="w-full table-fixed rounded-lg">
      <thead className={`transition-colors w-full duration-500 ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"}`}>
        <tr>
          <th className="p-4 text-[9px] md:text-sm text-left">Name</th>
          <th className="p-4 text-[9px] md:text-sm text-left">Pay Type</th>
          <th className="p-4 text-[9px] md:text-sm text-left">Total Hours</th>
          <th className="p-4 text-[9px] md:text-sm text-left">Days Worked</th>
          <th className="p-4 text-[9px] md:text-sm text-left">Hourly Rate</th>
          <th className="p-4 text-[9px] md:text-sm text-left">Daily Rate</th>
          <th className="p-4 text-[9px] md:text-sm text-left">Salary</th>
          <th className="p-4 text-[9px] md:text-sm text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {allSalaries?.data?.length > 0 ? (
          allSalaries.data.map((emp, idx) => (
            <motion.tr
              key={emp.employeeId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={`border-t transition-all duration-300 ${darkMode ? "border-gray-800 hover:bg-gray-800" : "border-gray-200 hover:bg-gray-50"}`}
            >
              <td className="p-4    whitespace-normal text-[9px] md:text-sm font-medium">{emp.employeeName}</td>
              <td className="p-4   whitespace-normal text-[9px] md:text-sm ">{emp.payType}</td>
              <td className="p-4   whitespace-normal text-[9px] md:text-sm ">{emp.totalHours.toFixed(2)}</td>
              <td className="p-4   whitespace-normal text-[9px] md:text-sm ">{emp.daysWorked}</td>
              <td className="p-4   whitespace-normal text-[9px] md:text-sm ">{emp.hourlyRate}</td>
              <td className="p-4   whitespace-normal  text-[9px] md:text-sm text-s">{emp.dailyRate}</td>
              <td className="p-4   whitespace-normal text-[9px] md:text-sm  font-semibold">{emp.salary.toFixed(2)}</td>
             <td className="p-4  whitespace-normal text-sm">
  <button
    onClick={() => downloadSalaryPDF(emp.employeeId)}
    title="Download Salary PDF"
    className={`
      group relative inline-flex cursor-pointer items-center justify-center
      md:w-10 w-4 h-4 md:h-10 rounded-xl
      transition-all duration-300 ease-out
      ${darkMode
        ? "bg-gray-800 text-cyan-400 hover:bg-cyan-600 hover:text-white shadow-[0_0_0_0_rgba(34,211,238,0.6)] hover:shadow-[0_0_18px_rgba(34,211,238,0.8)]"
        : "bg-gray-100 text-blue-600 hover:bg-blue-600 hover:text-white shadow-md hover:shadow-lg"}
      hover:scale-110 active:scale-95
    `}
  >
    <FiDownload
      size={18}
      className="transition-transform duration-300 group-hover:translate-y-[1px]"
    />

    {/* subtle shine effect */}
    <span
      className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
      bg-gradient-to-tr from-white/30 via-transparent to-transparent"
    />
  </button>
</td>

            </motion.tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className={`text-center py-8 transition-colors duration-500 ${darkMode ? "text-gray-500" : "text-gray-600"}`}>
              No salary data available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</motion.div>

        )}
      </div>
    </ShopLayout>
  );
}
