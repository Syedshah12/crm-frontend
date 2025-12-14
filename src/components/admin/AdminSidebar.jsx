import { NavLink } from "react-router-dom";
import { Home, Store, Users, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import React from "react";
export default function AdminSidebar() {
  const dispatch = useDispatch();

  return (
    <div className="w-64 bg-[#111] text-white h-screen fixed flex flex-col border-r border-gray-800">
      <div className="px-6 py-6 border-b border-gray-800">
        <h1 className="text-xl font-semibold tracking-wide">Admin Panel</h1>
      </div>

      <div className="flex-1 px-4 py-6 space-y-2">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-gray-800 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <Home size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/shops"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-gray-800 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <Store size={18} />
          Shops
        </NavLink>

        <NavLink
          to="/admin/shop-admins"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-gray-800 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          <Users size={18} />
          Shop Admins
        </NavLink>
      </div>

      <button
        onClick={() => dispatch(logout())}
        className="flex items-center gap-3 px-6 py-4 text-gray-300 hover:bg-gray-800 hover:text-white transition border-t border-gray-800"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}
