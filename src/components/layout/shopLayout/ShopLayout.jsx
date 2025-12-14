import React, { useState } from "react";
import { useSelector } from "react-redux";
import ShopSidebar from "./ShopSidebar";
import ShopTopBar from "./ShopTopBar";
import {  useDarkMode } from "../../../context/DarkModeContext.jsx";
export default function ShopLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

   const { darkMode } = useDarkMode();
  return (
<div className={`flex min-h-screen overflow-x-hidden transition-colors duration-500 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
  {/* Desktop sidebar */}
  <div className="hidden md:flex md:flex-shrink-0">
    <ShopSidebar isOpen={true} user={user} />
  </div>

  {/* Main content */}
  <div className="flex-1 flex    flex-col md:ml-64">
    {/* Top bar */}
    <ShopTopBar user={user} onHamburgerClick={() => setSidebarOpen(true)} />

    {/* Mobile sidebar */}
    <ShopSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user} />

    {/* Scrollable page content */}
    <main
      className={`flex-1 overflow-x-hidden overflow-y-auto p-2 md:p-6 transition-colors duration-500
        ${darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"}`}
    >
      {children}
    </main>
  </div>
</div>

  );
}
