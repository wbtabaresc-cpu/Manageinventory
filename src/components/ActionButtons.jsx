import React from "react";
import { Plus, ArrowRight, FolderOpen } from "lucide-react";

const ActionButtons = () => {
  const buttons = [
    { icon: <Plus className="w-5 h-5 md:w-6 md:h-6" />, label: "Ingreso de Stock" },
    { icon: <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />, label: "Salida de Stock" },
    { icon: <FolderOpen className="w-5 h-5 md:w-6 md:h-6" />, label: "Nueva Solicitud" },
  ];

  return (
    
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 mt-8 w-full max-w-6xl mx-auto px-4">
      {buttons.map((btn, i) => (
        <button
          key={i}
          className="bg-blue-100 text-gray-800 px-6 py-4 rounded-2xl flex items-center justify-center md:justify-start gap-3 text-base md:text-lg font-bold hover:bg-blue-200 transition-all shadow-sm hover:shadow-md border border-blue-200 active:scale-95"
        >
          <span className="text-blue-600">{btn.icon}</span>
          <span className="text-center md:text-left">{btn.label}</span>
        </button>
      ))}
    </section>
  );
};

export default ActionButtons;