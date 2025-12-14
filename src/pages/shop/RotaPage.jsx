import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRotas, deleteRota } from "../../features/rotas/rotaSlice";
import { fetchShops } from "../../features/shops/shopSlice";
import { fetchEmployees } from "../../features/employees/employeeSlice";
import ShopLayout from "../../components/layout/shopLayout/ShopLayout.jsx";
import { FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { useDarkMode } from "../../context/DarkModeContext.jsx";
import ConfirmationModal from "../../components/global/ConfirmationModal.jsx";
import RotaCreateModal from "../../components/shopAdmin/RotaCreateModal.jsx";

export default function RotaPage() {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();

  const { list, loading } = useSelector((state) => state.rotas);
  const { list: shops } = useSelector((state) => state.shops);
  const { list: employees } = useSelector((state) => state.employees);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Filters
  const [filterShop, setFilterShop] = useState("");
  const [filterEmployee, setFilterEmployee] = useState("");

  // Fetch shops and employees on mount
  useEffect(() => {
    dispatch(fetchShops());
    dispatch(fetchEmployees());
  }, [dispatch]);

  // Fetch rotas whenever filters change
  useEffect(() => {
    dispatch(fetchRotas({ shopId: filterShop, employeeId: filterEmployee }));
  }, [dispatch, filterShop, filterEmployee]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteRota(deleteId)).then(() => {
        setDeleteModalOpen(false);
        setDeleteId(null);
      });
    }
  };

  const resetFilters = () => {
    setFilterShop("");
    setFilterEmployee("");
  };

  return (
    <ShopLayout>
      <div className="flex flex-col flex-1 p-2 md:p-6">
        <h1
          className={`text-2xl md:text-3xl font-semibold mb-6 transition-colors duration-500
          ${darkMode ? "text-cyan-400" : "text-gray-800"}`}
        >
          Rotas
        </h1>

        {/* TOP ACTION BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex gap-2 items-center">
            {/* Shop Filter */}
            <select
              value={filterShop}
              onChange={(e) => setFilterShop(e.target.value)}
              className={`p-2 rounded-md border ${
                darkMode ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-800"
              }`}
            >
              <option value="">All Shops</option>
              {shops.map((shop) => (
                <option key={shop._id} value={shop._id}>
                  {shop.name}
                </option>
              ))}
            </select>

            {/* Employee Filter */}
            <select
              value={filterEmployee}
              onChange={(e) => setFilterEmployee(e.target.value)}
              className={`p-2 rounded-md border ${
                darkMode ? "bg-gray-800 border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-800"
              }`}
            >
              <option value="">All Employees</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </select>

            {/* Reset Filters Button */}
            <button
              onClick={resetFilters}
              className={`px-3 py-1 rounded-md transition-all ${
                darkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              Reset Filters
            </button>
          </div>

          <button
            onClick={() => setCreateModalOpen(true)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              darkMode ? "bg-cyan-600 text-white hover:bg-cyan-500" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            + Add Rota
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p className={`text-center py-10 text-lg transition-colors duration-500 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Loading rotas...
          </p>
        )}

        {/* TABLE */}
        {!loading && (
         <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className={`rounded-xl border transition-colors duration-500
    ${
      darkMode
        ? "bg-gray-900 border-gray-800 shadow-[0_5px_20px_rgba(0,255,255,0.2)]"
        : "bg-white border-gray-200 shadow-lg"
    }`}
>
  {/* ONLY TABLE SCROLLS */}
  <div className="overflow-x-auto w-full">
    <table className="w-full table-fixed rounded-lg">
      {/* TABLE HEADER */}
      <thead
        className={`transition-colors duration-500
          ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"}
        `}
      >
        <tr>
          <th className="p-4 text-[9px] md:text-sm text-left">Employee</th>
          <th className="p-4 text-[9px] md:text-sm text-left">Note</th>
          <th className="p-4 text-[9px] md:text-sm text-left">Shift Date</th>
          <th className="p-4 text-[9px] md:text-sm text-left">Time</th>
          <th className="p-4 text-[9px] md:text-sm text-left">Actions</th>
        </tr>
      </thead>

      {/* TABLE BODY */}
      <tbody>
        {list.map((rota, index) => (
          <motion.tr
            key={rota._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`border-t transition-all duration-300
              ${
                darkMode
                  ? "border-gray-800 hover:bg-gray-800"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
          >
            <td className="p-4 whitespace-normal text-[9px] md:text-sm font-medium">
              {rota?.employee?.name || "-"}
            </td>

            <td className="p-4 whitespace-normal text-[9px] md:text-sm break-words">
              {rota?.note || "-"}
            </td>

            <td className="p-4 whitespace-normal text-[9px] md:text-sm">
              {new Date(rota.shiftDate).toLocaleDateString()}
            </td>

            <td className="p-4 whitespace-normal text-[9px] md:text-sm">
              {rota.scheduledStart || "--"} – {rota.scheduledEnd || "--"}
            </td>

            <td className="p-4 whitespace-normal text-sm">
              <button
                onClick={() => handleDeleteClick(rota._id)}
                title="Delete Rota"
                className={`
                  group relative inline-flex items-center justify-center
                  md:w-10 w-4 md:h-10 h-4 rounded-xl
                  transition-all duration-300 ease-out
                  ${
                    darkMode
                      ? "bg-gray-800 text-red-400 hover:bg-red-700 hover:text-white shadow hover:shadow-red-500/50"
                      : "bg-gray-100 text-red-600 hover:bg-red-600 hover:text-white shadow hover:shadow-red-300/50"
                  }
                  hover:scale-110 active:scale-95
                `}
              >
                <FiTrash2
                  size={16}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                {/* subtle shine */}
                <span
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  bg-gradient-to-tr from-white/30 via-transparent to-transparent"
                />
              </button>
            </td>
          </motion.tr>
        ))}

        {/* EMPTY STATE */}
        {list.length === 0 && (
          <tr>
            <td
              colSpan="5"
              className={`text-center py-8 transition-colors duration-500
                ${darkMode ? "text-gray-500" : "text-gray-600"}`}
            >
              No rotas found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</motion.div>

        )}

        {/* MODALS */}
        <RotaCreateModal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} />
        <ConfirmationModal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={confirmDelete} message="Are you sure you want to delete this rota?" />
      </div>
    </ShopLayout>
  );
}
