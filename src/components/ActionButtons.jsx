import React from "react";
import { Plus, ArrowRight, FolderOpen } from "lucide-react";

const ActionButtons = () => {
  const buttons = [
    { icon: <Plus className="w-5 h-5 md:w-6 md:h-6" />, label: "Ingreso de Stock" },
    { icon: <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />, label: "Salida de Stock" },
    { icon: <FolderOpen className="w-5 h-5 md:w-6 md:h-6" />, label: "Nueva Solicitud" },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 mt-8 w-full max-w-7xl mx-auto px-4">
      {buttons.map((btn, i) => (
        <button
          key={i}
          className="bg-blue-600 text-white px-6 py-5 rounded-2xl flex items-center justify-center md:justify-start gap-4 text-base md:text-lg font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 border border-blue-500 active:scale-95 group"
        >
          {/* El icono ahora es blanco y tiene una pequeña animación al pasar el mouse */}
          <span className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
            {btn.icon}
          </span>
          
          {/* Texto en blanco puro para que resalte melo */}
          <span className="text-center md:text-left uppercase tracking-wide">
            {btn.label}
          </span>
        </button>
      ))}
    </section>
  );
};

export default ActionButtons;