import React from "react";
import { Plus, ArrowRight, FolderOpen } from "lucide-react";

const ActionButtons = () => {
  const buttons = [
    { icon: <Plus className="w-6 h-6" />, label: "INGRESO DE STOCK" },
    { icon: <ArrowRight className="w-6 h-6" />, label: "SALIDA DE STOCK" },
    { icon: <FolderOpen className="w-6 h-6" />, label: "NUEVA SOLICITUD" },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 mt-8 w-full max-w-7xl mx-auto px-4">
      {buttons.map((btn, i) => (
        <button
          key={i}
          className="bg-blue-600 text-white px-4 py-6 rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:bg-blue-700 transition-all border border-blue-400"
        >
          <span className="bg-white/20 p-2 rounded-lg shrink-0">{btn.icon}</span>
          <span className="text-sm md:text-base font-black text-white leading-tight">
            {btn.label}
          </span>
        </button>
      ))}
    </section>
  );
};

export default ActionButtons;