import React from "react";
import { useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";

export default function HeadBar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className="
        w-full h-16
        bg-[#0f0f0f]/70 backdrop-blur-xl
        border-b border-white/10
        flex items-center justify-between
        px-6 shadow-lg
      "
    >
      <h1 className="text-xl font-semibold tracking-wide text-white">
        {user?.role === "Admin" ? "Admin Panel" : "Shop Panel"}
      </h1>

      <div className="flex items-center gap-3">
        <FiUser className="text-white/70 text-xl" />
        <span className="text-white/80 text-sm">{user?.email}</span>
      </div>
    </div>
  );
}
