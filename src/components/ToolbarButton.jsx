// ToolbarButton.jsx
import React from "react";

const ToolbarButton = ({ icon: Icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-gray-200 text-sm font-medium"
      title={label}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
};

export default ToolbarButton;
