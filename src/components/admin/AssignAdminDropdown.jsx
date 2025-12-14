import React, { useState, useEffect, useRef } from "react";

export default function AssignAdminDropdown({ formData, setFormData, unassignedAdmins, getInputClass }) {
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef(null);

  // Filter admins as per search input
  const filteredAdmins = unassignedAdmins.filter((admin) =>
    (admin.name || admin.email).toLowerCase().includes(search.toLowerCase())
  );

  // Pre-fill input with selected admin on load
  useEffect(() => {
    if (formData.adminId) {
      const selectedAdmin = unassignedAdmins.find((a) => a._id === formData.adminId);
      if (selectedAdmin) setSearch(selectedAdmin.name || selectedAdmin.email);
    }
  }, [formData.adminId, unassignedAdmins]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <label className="block text-gray-700 text-sm mb-1 font-medium">
        Assign ShopAdmin <span className="text-red-500">*</span>
      </label>

      {/* Input */}
      <input
        type="text"
        placeholder="Search and select admin..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setDropdownOpen(true);
        }}
        onFocus={() => setDropdownOpen(true)}
        className={`${getInputClass("adminId")} cursor-pointer`}
      />

      {/* Dropdown */}
      {dropdownOpen && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg">
          {filteredAdmins.length > 0 ? (
            filteredAdmins.map((admin) => (
              <li
                key={admin._id}
                onClick={() => {
                  setFormData((prev) => ({ ...prev, adminId: admin._id }));
                  setSearch(admin.name || admin.email);
                  setDropdownOpen(false);
                }}
                className={`cursor-pointer px-4 py-2 hover:bg-blue-600 hover:text-white transition-colors duration-150 ${
                  formData.adminId === admin._id
                    ? "bg-blue-600 text-white font-semibold"
                    : "text-gray-800"
                }`}
              >
                {admin.name ? `${admin.name} (${admin.email})` : admin.email}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-400">No admins found</li>
          )}
        </ul>
      )}

      {/* Selected Admin Badge */}
      {formData.adminId && !dropdownOpen && (
        <div className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-lg inline-block">
          Selected:{" "}
          {unassignedAdmins.find((a) => a._id === formData.adminId)?.name ||
            unassignedAdmins.find((a) => a._id === formData.adminId)?.email ||
            "Admin"}
        </div>
      )}
    </div>
  );
}
