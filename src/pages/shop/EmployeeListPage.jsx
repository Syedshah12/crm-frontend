import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees,deleteEmployee  } from "../../features/employees/employeeSlice";
import ShopLayout from "../../components/layout/shopLayout/ShopLayout.jsx";
import { Link } from "react-router-dom";
import EmployeeDetailsModal from "../../components/shopAdmin/EmployeeDetailsModal.jsx";
import EmployeeCreateModal from "../../components/shopAdmin/EmployeeCreateModal.jsx";
import { FiTrash2,FiEye  } from "react-icons/fi";
import { motion } from "framer-motion";
import { useDarkMode } from "../../context/DarkModeContext.jsx";
import ConfirmationModal from "../../components/global/ConfirmationModal.jsx";

export default function EmployeeListPage() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.employees);
  const { darkMode } = useDarkMode();
const [selectedEmployee, setSelectedEmployee] = useState(null);
const [modalOpen, setModalOpen] = useState(false);
const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

``

const openModal = (employee) => {

  
  setSelectedEmployee(employee);
  setModalOpen(true);
};


const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteEmployee(deleteId)).then(() => {
        setDeleteModalOpen(false);
        setDeleteId(null);
      });
    }
  };


  return (
    <ShopLayout>
      <div className="flex flex-col flex-1 p-2 md:p-6">

        {/* PAGE TITLE */}
        <h1
          className={`text-2xl md:text-3xl font-semibold mb-6 transition-colors duration-500
          ${darkMode ? "text-cyan-400" : "text-gray-800"}`}
        >
          Employees
        </h1>

        {/* TOP ACTION BAR */}
        <div className="flex justify-between items-center mb-6">
          <p
            className={`text-xs md:text-sm transition-colors duration-500 
            ${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Manage all shop employees
          </p>

       <button
  onClick={() => setCreateModalOpen(true)}
  className={`px-4 py-2 rounded-lg transition-all duration-300
    ${darkMode 
      ? "bg-cyan-600 text-white hover:bg-cyan-500" 
      : "bg-blue-600 text-white hover:bg-blue-700"
    }`}
>
  + Add Employee
</button>

        </div>

        {/* LOADING STATE */}
        {loading && (
          <p
            className={`text-center py-10 text-lg transition-colors duration-500
            ${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Loading employees...
          </p>
        )}

        {/* TABLE */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={` rounded-xl border transition-colors duration-500
              ${
                darkMode
                  ? "bg-gray-900 border-gray-800 shadow-[0_5px_20px_rgba(0,255,255,0.2)]"
                  : "bg-white border-gray-200 shadow-lg"
              }`}
          >
           <div className="overflow-x-auto w-full">
             <table className="w-full table-fixed rounded-lg">

              {/* TABLE HEADER */}
              <thead
                className={`transition-colors duration-500
                ${
                  darkMode
                    ? "bg-gray-800 text-gray-300"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <tr>
                  <th className="p-4 text-left text-xs md:text-sm whitespace-normal ">Name</th>
                  <th className="p-4 text-left text-xs md:text-sm whitespace-normal ">Phone</th>
                  <th className="p-4 text-left text-xs md:text-sm whitespace-normal ">Pay Type</th>
                  <th className="p-4 text-left text-xs md:text-sm whitespace-normal ">Shop</th>
                  <th className="p-4 text-left text-xs md:text-sm whitespace-normal ">Actions</th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>
                {list.map((emp, index) => (
                  <motion.tr
                    key={emp._id}
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
                    <td className="p-4 font-medium text-xs md:text-sm whitespace-normal ">{emp.name}</td>
                    <td className="p-4 text-xs md:text-sm whitespace-normal break-words">{emp.phoneNumber || "-"}</td>
                    <td className="p-4 text-xs md:text-sm whitespace-normal ">{emp.payType}</td>
                    <td className="p-4 text-xs md:text-sm whitespace-normal ">{emp?.shop?.name}</td>
                 <td className="p-4 flex items-center gap-3">
  {/* View Employee */}
  <button
    onClick={() => openModal(emp)}
    className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300
      ${darkMode
        ? "bg-gray-800 hover:bg-cyan-700 text-cyan-400 hover:text-white shadow hover:shadow-cyan-500/50"
        : "bg-gray-100 hover:bg-blue-600 text-blue-600 hover:text-white shadow hover:shadow-blue-300/50"
      }`}
    title="View Employee"
  >
    <FiEye size={20} />
  </button>

  {/* Delete Employee */}
  <button
    onClick={() => handleDeleteClick(emp._id)}
    className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300
      ${darkMode
        ? "bg-gray-800 hover:bg-red-700 text-red-400 hover:text-white shadow hover:shadow-red-500/50"
        : "bg-gray-100 hover:bg-red-600 text-red-600 hover:text-white shadow hover:shadow-red-300/50"
      }`}
    title="Delete Employee"
  >
    <FiTrash2 size={20} />
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
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
           </div>
          </motion.div>
        )}
        <EmployeeDetailsModal
  employee={selectedEmployee}
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
/>
<EmployeeCreateModal
  isOpen={createModalOpen}
  onClose={() => setCreateModalOpen(false)}
/>
 <ConfirmationModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          message="Are you sure you want to delete this employee?"
        />

      </div>
    </ShopLayout>
  );
}
