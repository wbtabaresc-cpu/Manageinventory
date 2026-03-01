import React from "react";
import { Plus, ArrowRight, FolderOpen } from "lucide-react";

const ActionButtons = () => {
  const buttons = [
    { icon: <Plus className="w-5 h-5" />, label: "INGRESO DE STOCK" },
    { icon: <ArrowRight className="w-5 h-5" />, label: "SALIDA DE STOCK" },
    { icon: <FolderOpen className="w-5 h-5" />, label: "NUEVA SOLICITUD" },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-8 mt-6 w-full max-w-5xl mx-auto px-4">
      {buttons.map((btn, i) => (
        <button
          key={i}
          className="bg-blue-600 text-white px-5 py-3.5 rounded-xl flex items-center justify-center gap-3 shadow-md hover:bg-blue-700 transition-all border border-blue-500 active:scale-95 group"
        >
          <span className="bg-white/10 p-1.5 rounded-lg group-hover:bg-white/20 transition-colors shrink-0">
            {btn.icon}
          </span>
          
          <span className="text-xs md:text-sm font-bold text-white uppercase tracking-wide truncate">
            {btn.label}
          </span>
        </button>
      ))}
    </section>
  );
};

export default ActionButtons;