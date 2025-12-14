import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/adminLayout/Layout";
import { fetchShops, deleteShop } from "../../features/shops/shopSlice";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmationModal from "../../components/global/ConfirmationModal";
import { FiTrash2, FiEdit } from "react-icons/fi";
import EditShopModal from "../../components/admin/EditShopModal"; // import modal
import {  useDarkMode } from ".././../context/DarkModeContext.jsx";
export default function ShopListPage() {
  const dispatch = useDispatch();
  const shopsState = useSelector((state) => state.shops || { list: [], loading: false });
  const { list: shops, loading } = shopsState;

   const { darkMode } = useDarkMode();
  const [deleteId, setDeleteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editShop, setEditShop] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteShop(deleteId));
    setModalOpen(false);
  };

  const handleEdit = (shop) => {
    setEditShop(shop);
    setEditModalOpen(true);
  };

  return (
<Layout>
  <div className="flex flex-col flex-1 h-full">
    <h1
      className={`text-2xl md:text-3xl font-bold mb-4 transition-colors duration-500 ${
        darkMode ? "text-cyan-400" : "text-gray-800"
      }`}
    >
      Shops
    </h1>

    {loading ? (
      <p
        className={`text-sm transition-colors duration-500 ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Loading shops...
      </p>
    ) : (
      <div
        className={`flex-1 flex flex-col overflow-hidden rounded-xl border p-0 transition-colors duration-500 ${
          darkMode
            ? "bg-gray-900 border-gray-700 shadow-[0_5px_20px_rgba(0,255,255,0.2)]"
            : "bg-white border-gray-200 shadow-lg"
        }`}
      >
        <div className="overflow-auto flex-1">
          <table className="min-w-full table-auto text-sm transition-colors duration-500">
            <thead
              className={`sticky top-0 z-10 transition-colors duration-500 ${
                darkMode ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <tr>
                {["Logo", "Name", "Address", "Phone", "Shop Admin Email", "Actions"].map(
                  (col) => (
                    <th
                      key={col}
                      className={`px-3 py-2 text-left font-semibold uppercase tracking-wider transition-colors duration-500 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <AnimatePresence>
              <tbody
                className={`transition-colors duration-500 ${
                  darkMode ? "bg-gray-900 divide-gray-700" : "bg-white divide-gray-200"
                }`}
              >
                {shops.map((shop) => (
                  <motion.tr
                    key={shop._id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`transition-colors duration-300 ${
                      darkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="px-3 py-2">
                      <img
                        src={shop.logo}
                        alt={shop.name}
                        className={`w-8 h-8 rounded object-cover border transition-colors duration-500 ${
                          darkMode ? "border-gray-700" : "border-gray-200"
                        }`}
                      />
                    </td>
                    <td
                      className={`px-3 py-2 font-medium transition-colors duration-500 ${
                        darkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      {shop.name}
                    </td>
                    <td
                      className={`px-3 py-2 transition-colors duration-500 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {shop.address}
                    </td>
                    <td
                      className={`px-3 py-2 transition-colors duration-500 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {shop.phoneNumber}
                    </td>
                    <td
                      className={`px-3 py-2 transition-colors duration-500 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {shop.admin?.email}
                    </td>
                    <td className="px-3 py-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(shop)}
                        className={`transition-colors duration-500 ${
                          darkMode
                            ? "text-blue-400 hover:text-blue-300"
                            : "text-blue-500 hover:text-blue-700"
                        }`}
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(shop._id)}
                        className={`transition-colors duration-500 ${
                          darkMode
                            ? "text-red-400 hover:text-red-300"
                            : "text-red-500 hover:text-red-700"
                        }`}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </AnimatePresence>
          </table>
        </div>
      </div>
    )}
  </div>

  {/* Delete Confirmation Modal */}
  <ConfirmationModal
    open={modalOpen}
    onClose={() => setModalOpen(false)}
    onConfirm={confirmDelete}
    message="Are you sure you want to delete this shop?"
  />

  {/* Edit Shop Modal */}
  {editShop && (
    <EditShopModal
      isOpen={editModalOpen}
      onClose={() => setEditModalOpen(false)}
      shop={editShop}
    />
  )}
</Layout>

  );
}
