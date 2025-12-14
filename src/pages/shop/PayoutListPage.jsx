import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayouts, createPayout } from "../../features/payouts/payoutSlice";
import ShopLayout from "../../components/layout/shopLayout/ShopLayout.jsx";
import PayoutDetailsModal from "../../components/shopAdmin/PayoutDetailsModal.jsx";
import PayoutCreateModal from "../../components/shopAdmin/PayoutCreateModal.jsx";
import { FiTrash2, FiEye } from "react-icons/fi";
import { motion } from "framer-motion";
import { useDarkMode } from "../../context/DarkModeContext.jsx";
import ConfirmationModal from "../../components/global/ConfirmationModal.jsx";

export default function PayoutListPage() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.payouts);
  const { darkMode } = useDarkMode();

  const [selectedPayout, setSelectedPayout] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);


  useEffect(() => {
    dispatch(fetchPayouts());
  }, [dispatch]);

  const openModal = (payout) => {
    setSelectedPayout(payout);
    setModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };


  return (
    <ShopLayout>
      <div className="flex flex-col flex-1 p-2 md:p-6">

        {/* PAGE TITLE */}
        <h1
          className={`text-2xl md:text-3xl font-semibold mb-6 transition-colors duration-500
          ${darkMode ? "text-cyan-400" : "text-gray-800"}`}
        >
          Payouts
        </h1>

        {/* TOP ACTION BAR */}
        <div className="flex justify-between items-center mb-6">
          <p
            className={`text-xs md:text-sm transition-colors duration-500 
            ${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Manage all employee payouts
          </p>

          <button
            onClick={() => setCreateModalOpen(true)}
            className={`px-4 py-2 rounded-lg transition-all duration-300
              ${darkMode 
                ? "bg-cyan-600 text-white hover:bg-cyan-500" 
                : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
          >
            + Add Payout
          </button>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <p
            className={`text-center py-10 text-lg transition-colors duration-500
            ${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Loading payouts...
          </p>
        )}

        {/* TABLE */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`rounded-xl border transition-colors duration-500
              ${darkMode
                ? "bg-gray-900 border-gray-800 shadow-[0_5px_20px_rgba(0,255,255,0.2)]"
                : "bg-white border-gray-200 shadow-lg"
              }`}
          >
            <div className="overflow-x-auto w-full">
              <table className="w-full table-fixed rounded-lg">

                {/* TABLE HEADER */}
                <thead
                  className={`transition-colors duration-500
                  ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"}`}
                >
                  <tr>
                    <th className="p-4 text-left text-xs md:text-sm whitespace-normal">Employee</th>
                    <th className="p-4 text-left text-xs md:text-sm whitespace-normal">Amount</th>
                    <th className="p-4 text-left text-xs md:text-sm whitespace-normal">Date</th>
                    <th className="p-4 text-left text-xs md:text-sm whitespace-normal">Actions</th>
                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                  {list.map((payout, index) => (
                    <motion.tr
                      key={payout._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`border-t transition-all duration-300
                        ${darkMode ? "border-gray-800 hover:bg-gray-800" : "border-gray-200 hover:bg-gray-50"}`}
                    >
                      <td className="p-4 font-medium text-xs md:text-sm whitespace-normal">
                        {payout.employee?.name || "-"}
                      </td>
                      <td className="p-4 text-xs md:text-sm whitespace-normal">
                        ${payout.amountPaid}
                      </td>
                      <td className="p-4 text-xs md:text-sm whitespace-normal">
                        {new Date(payout.payoutDate).toLocaleDateString()}
                      </td>
                      <td className="p-4 flex items-center gap-3">
                        {/* View Payout */}
                        <button
                          onClick={() => openModal(payout)}
                          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300
                            ${darkMode
                              ? "bg-gray-800 hover:bg-cyan-700 text-cyan-400 hover:text-white shadow hover:shadow-cyan-500/50"
                              : "bg-gray-100 hover:bg-blue-600 text-blue-600 hover:text-white shadow hover:shadow-blue-300/50"
                            }`}
                          title="View Payout"
                        >
                          <FiEye size={20} />
                        </button>

                 
                      </td>
                    </motion.tr>
                  ))}

                  {/* EMPTY STATE */}
                  {list.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        className={`text-center py-8 transition-colors duration-500
                        ${darkMode ? "text-gray-500" : "text-gray-600"}`}
                      >
                        No payouts found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* MODALS */}
        <PayoutDetailsModal
          payout={selectedPayout}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
        <PayoutCreateModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
        />

      </div>
    </ShopLayout>
  );
}
