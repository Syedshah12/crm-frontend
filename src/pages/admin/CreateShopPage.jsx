import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/adminLayout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { createShop } from "../../features/shops/shopSlice";
import { fetchUnassignedAdmins } from "../../features/admins/adminSlice";
import { toast } from "react-toastify";
import AssignAdminDropdown from "../../components/admin/AssignAdminDropdown";
import {  useDarkMode } from "../../context/DarkModeContext.jsx";
export default function CreateShopPage() {
  const dispatch = useDispatch();
  const { unassignedAdmins } = useSelector((state) => state.admins);
   const { darkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    name: "",
    logo: null,
    address: "",
    site: "",
    phoneNumber: "",
    rent: "",
    bills: "",
    openTime: "",
    closeTime: "",
    adminId: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");

  const requiredFields = ["name", "logo", "address", "phoneNumber", "adminId"];

  useEffect(() => {
    dispatch(fetchUnassignedAdmins());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      setFormData((prev) => ({ ...prev, logo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
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
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      await dispatch(createShop(data)).unwrap();
      toast.success("Shop created successfully!");
      setFormData({
        name: "",
        logo: null,
        address: "",
        site: "",
        phoneNumber: "",
        rent: "",
        bills: "",
        openTime: "",
        closeTime: "",
        adminId: "",
      });
      setSearch("");
    } catch (error) {
      toast.error(error || "Failed to create shop");
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

  // Filter admins as per search input
const filteredAdmins = unassignedAdmins.filter((admin) => {
  const text = (admin.name || admin.email || "").toLowerCase();
  return text.includes(search.toLowerCase());
});


  return (
    <Layout>
      <div className="flex flex-col flex-1">
        <h1
          className={`text-3xl font-bold mb-6 transition-colors duration-500 ${
            darkMode ? "text-cyan-400" : "text-gray-800"
          }`}
        >
          Create Shop
        </h1>

        <form
          onSubmit={handleSubmit}
          className={`shadow-lg rounded-xl p-6 max-w-3xl space-y-4 transition-colors duration-500 ${
            darkMode ? "bg-gray-900 border border-gray-700" : "bg-white border border-gray-200"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                Logo Upload <span className="text-red-500">*</span>
              </label>
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
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={getInputClass("phoneNumber")}
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
            <AssignAdminDropdown
              formData={formData}
              setFormData={setFormData}
              unassignedAdmins={unassignedAdmins}
              getInputClass={getInputClass}
            />
          </div>

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
            {loading ? "Creating..." : "Create Shop"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
