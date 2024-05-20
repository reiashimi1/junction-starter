import React from "react";

const SidebarItem = ({ onClick, isActive, icon, label }) => {
  return (
    <div
      onClick={onClick}
      className={`flex w-full flex-row mb-1 items-center h-8 cursor-pointer text-gray-700 rounded-md text-sm p-5 hover:scale-105 ${
        isActive ? "bg-plum-700 font-bold" : "bg-plum-500"
      }`}
    >
        <span className="text-blue-900">{icon}</span>
        <span className="ml-1 font-semibold">{label}</span>
    </div>
  );
};

export default SidebarItem;
