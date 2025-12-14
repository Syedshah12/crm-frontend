import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmins, deleteAdmin } from "../../features/admins/adminSlice";
import Layout from "../../components/layout/adminLayout/Layout";
import EditAdminModal from "../../components/admin/EditAdminModal";
import ConfirmationModal from "../../components/global/ConfirmationModal";
import {  useDarkMode } from "../../context/DarkModeContext.jsx";
import { Pencil, Trash2, Store, ShieldCheck, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage() {
  const dispatch = useDispatch();
  const { admins, loading } = useSelector((state) => state.admins);
   const { darkMode } = useDarkMode();
  const [search, setSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setShowEditModal(true);
  };

  const handleDelete = (admin) => {
  
    setAdminToDelete(admin);
      console.log(admin);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteAdmin(adminToDelete._id));
    setShowDeleteModal(false);
  };

  // Filter admins by search query (name or email)
  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name?.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
  
<Layout>
  <div className="p-6">
    <motion.h1
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-3xl font-semibold mb-6 ${darkMode ? "text-cyan-400" : "text-gray-800"}`}
    >
      Manage Admins
    </motion.h1>

    {/* Search Bar */}
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-6 flex items-center w-full  rounded-full shadow-sm px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400 transition ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
      }`}
    >
      <Search className={`mr-2 ${darkMode ? "text-gray-400" : "text-gray-400"}`} />
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`w-full bg-transparent focus:outline-none ${
          darkMode ? "text-gray-200 placeholder-gray-500" : "text-gray-800 placeholder-gray-400"
        }`}
      />
    </motion.div>

    {/* Table */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`overflow-x-auto border-4 rounded-xl shadow-md transition-colors duration-500 ${
        darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"
      }`}
    >
      <table className="w-full table-auto text-left">
        <thead className={`${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
          <tr>
            {["Name", "Email", "Assigned Shop", "Actions"].map((col) => (
              <th
                key={col}
                className={`px-5 py-3 font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <AnimatePresence>
            {filteredAdmins.map((admin) => {
              const isSuper = admin.role === "Admin";
              const bgClass = isSuper
                ? darkMode
                  ? "bg-blue-900/20"
                  : "bg-blue-50"
                : darkMode
                ? "hover:bg-gray-800"
                : "hover:bg-gray-50";

              return (
                <motion.tr
                  key={admin._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`border-t transition ${darkMode ? "border-gray-700" : "border-gray-200"} ${bgClass}`}
                >
                  {/* Name + Badge */}
                  <td className={`px-5 py-4 flex items-center gap-2 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                    <span>{admin.name || "—"}</span>
                    {isSuper && (
                      <ShieldCheck size={16} className={darkMode ? "text-blue-300" : "text-blue-600"} />
                    )}
                  </td>

                  <td className={`${darkMode ? "text-gray-200" : "text-gray-800"} px-5 py-4`}>
                    {admin.email}
                  </td>

                  <td className={`px-5 py-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                    {admin.shop ? (
                      <div className="flex items-center gap-3">
                        <img
                          src={admin.shop.shopLogo}
                          alt="Shop Logo"
                          className={`w-10 h-10 rounded-lg object-cover border shadow-sm ${darkMode ? "border-gray-700" : ""}`}
                        />
                        <div>
                          <div className="font-semibold">{admin.shop.shopName}</div>
                          <div className={darkMode ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>
                            {admin.shop.shopAddress}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <span
                        className={`px-3 py-1 text-sm rounded-lg ${
                          darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        Unassigned
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 flex items-center justify-end gap-4">
                    <button
                      onClick={() => handleEdit(admin)}
                      disabled={isSuper}
                      className={`p-2 rounded-lg transition ${
                        isSuper
                          ? darkMode
                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : darkMode
                          ? "bg-blue-900/40 text-blue-300 hover:bg-blue-900"
                          : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                      }`}
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(admin)}
                      disabled={isSuper}
                      className={`p-2 rounded-lg transition ${
                        isSuper
                          ? darkMode
                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : darkMode
                          ? "bg-red-900/40 text-red-300 hover:bg-red-900"
                          : "bg-red-50 text-red-600 hover:bg-red-100"
                      }`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              );
            })}

            {!loading && filteredAdmins.length === 0 && (
              <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <td
                  colSpan="4"
                  className={`p-6 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  No admins found
                </td>
              </motion.tr>
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </motion.div>

    {/* Edit Admin Modal */}
    <AnimatePresence>
      {showEditModal && (
        <EditAdminModal admin={selectedAdmin} onClose={() => setShowEditModal(false)} darkMode={darkMode} />
      )}
    </AnimatePresence>

    {/* Delete Confirmation */}
    <AnimatePresence>
      {showDeleteModal && (
<ConfirmationModal
  open={showDeleteModal}          // ✅ REQUIRED
  message="Are you sure you want to delete this admin?"
  onConfirm={confirmDelete}
  onClose={() => setShowDeleteModal(false)}
  darkMode={darkMode}
/>


      )}
    </AnimatePresence>
  </div>
</Layout>
  );
}
