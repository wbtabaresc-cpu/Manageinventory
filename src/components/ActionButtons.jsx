import React from "react";
import { Plus, ArrowRight, FolderOpen, FileText } from "lucide-react";

const ActionButtons = () => {
  return (
    <section className="flex gap-12 mb-5 mt-12 justify-center">

      {[
        { icon: <Plus />, label: "Nuevo Producto" },
        { icon: <ArrowRight />, label: "Registrar Salida" },
        { icon: <FolderOpen />, label: "Nueva Solicitud" },
        { icon: <FileText />, label: "Generar Reporte" },
      ].map((btn, i) => (
        <button
          key={i}
          className="bg-blue-100 text-gray-800 px-6 py-4 rounded-xl flex items-center gap-3 text-lg font-semibold hover:bg-blue-200 transition shadow"
        >
          {btn.icon}
          {btn.label}
        </button>
      ))}

    </section>
  );
};

export default ActionButtons;
