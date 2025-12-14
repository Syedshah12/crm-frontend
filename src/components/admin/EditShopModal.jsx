import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { updateShop } from "../../features/shops/shopSlice";
import { fetchUnassignedAdmins } from "../../features/admins/adminSlice";
import AssignAdminDropdown from "../../components/admin/AssignAdminDropdown"; // your dropdown
import { toast } from "react-toastify";
import {  useDarkMode } from "../../context/DarkModeContext.jsx";
export default function EditShopModal({ isOpen, onClose, shop }) {
  const dispatch = useDispatch();
  const { unassignedAdmins } = useSelector((state) => state.admins);

   const { darkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    name: "",
    logo: null,
    address: "",
    site: "",
    phone: "",
    rent: "",
    bills: "",
    openTime: "",
    closeTime: "",
    adminId: "", // using adminId now
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [logoPreview, setLogoPreview] = useState(null);

  const requiredFields = ["name", "address", "phone", "adminId"];

  useEffect(() => {
    if (shop) {
      setFormData({
        name: shop.name || "",
        logo: null,
        address: shop.address || "",
        site: shop.site || "",
        phone: shop.phoneNumber || "",
        rent: shop.rent || "",
        bills: shop.bills || "",
        openTime: shop.shopOpenTime || "",
        closeTime: shop.shopCloseTime || "",
        adminId: shop.admin?._id || "",
      });
      setLogoPreview(shop.logo || null);
    }

    dispatch(fetchUnassignedAdmins());
  }, [shop, dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, logo: file }));
      if (file) setLogoPreview(URL.createObjectURL(file));
      else setLogoPreview(shop?.logo || null);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field] === "") newErrors[field] = true;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    const updates = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) updates.append(key, value);
    });

    try {
      await dispatch(updateShop({ id: shop._id, updates })).unwrap();
      toast.success("Shop updated successfully!");
      onClose();
    } catch (error) {
      toast.error(error || "Failed to update shop");
    } finally {
      setLoading(false);
    }
  };

  const getInputClass = (field) =>
    `w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-blue-500"
    }`;

  // Combine unassigned admins with currently assigned admin for pre-fill
  const currentAdmin =
    shop?.admin && !unassignedAdmins.find((a) => a._id === shop.admin._id)
      ? [shop.admin]
      : [];
  const dropdownAdmins = [...currentAdmin, ...unassignedAdmins];

  return (
 <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`w-full max-w-3xl p-6 relative overflow-y-auto max-h-[90vh] rounded-xl transition-colors duration-500
              ${darkMode
                ? "bg-gray-900 text-gray-200 border border-gray-700 shadow-[0_0_30px_rgba(0,255,255,0.3)]"
                : "bg-white text-gray-700 border border-gray-200 shadow-xl"
              }`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 transition-colors duration-300 ${
                darkMode ? "text-gray-400 hover:text-gray-100" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <FiX size={24} />
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-6 transition-colors duration-500">
              Edit Shop
            </h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
              {/* Shop Name */}
              <div>
                <label
                  className={`block text-sm mb-1 transition-colors duration-500 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Shop Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={getInputClass("name")}
                />
              </div>

              {/* Logo Upload */}
              <div>
                <label
                  className={`block text-sm mb-1 transition-colors duration-500 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Logo Upload
                </label>
                {logoPreview && (
                  <img
                    src={logoPreview}
                    alt="Shop Logo Preview"
                    className="w-20 h-20 object-cover rounded mb-2 border transition-colors duration-500"
                    style={{ borderColor: darkMode ? "#555" : "#e5e7eb" }}
                  />
                )}
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleChange}
                  className={getInputClass("logo")}
                />
              </div>

              {/* Address */}
              <div>
                <label
                  className={`block text-sm mb-1 transition-colors duration-500 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={getInputClass("address")}
                />
              </div>

              {/* Site */}
              <div>
                <label
                  className={`block text-sm mb-1 transition-colors duration-500 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Site
                </label>
                <input
                  type="text"
                  name="site"
                  value={formData.site}
                  onChange={handleChange}
                  className={getInputClass("site")}
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  className={`block text-sm mb-1 transition-colors duration-500 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={getInputClass("phone")}
                />
              </div>

              {/* Rent */}
              <div>
                <label
                  className={`block text-sm mb-1 transition-colors duration-500 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Rent
                </label>
                <input
                  type="number"
                  name="rent"
                  value={formData.rent}
                  onChange={handleChange}
                  className={getInputClass("rent")}
                />
              </div>

              {/* Bills */}
              <div>
                <label
                  className={`block text-sm mb-1 transition-colors duration-500 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Bills
                </label>
                <input
                  type="number"
                  name="bills"
                  value={formData.bills}
                  onChange={handleChange}
                  className={getInputClass("bills")}
                />
              </div>

              {/* Open Time */}
              <div>
                <label
                  className={`block text-sm mb-1 transition-colors duration-500 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Shop Open Time
                </label>
                <input
                  type="time"
                  name="openTime"
                  value={formData.openTime}
                  onChange={handleChange}
                  className={getInputClass("openTime")}
                />
              </div>

              {/* Close Time */}
              <div>
                <label
                  className={`block text-sm mb-1 transition-colors duration-500 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Shop Close Time
                </label>
                <input
                  type="time"
                  name="closeTime"
                  value={formData.closeTime}
                  onChange={handleChange}
                  className={getInputClass("closeTime")}
                />
              </div>

              {/* Assign Admin */}
              <div className="md:col-span-2">
                <AssignAdminDropdown
                  formData={formData}
                  setFormData={setFormData}
                  unassignedAdmins={dropdownAdmins}
                  getInputClass={getInputClass}
                />
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 px-4 rounded-md font-semibold transition ${
                    loading
                      ? "opacity-70 cursor-not-allowed"
                      : darkMode
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {loading ? "Updating..." : "Update Shop"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
