import React from "react";
import { PackagePlus, ClipboardPlus, Eye, MapPinPlusIcon } from "lucide-react";

const actions = [
  { id: "registrar_pro", label: "Registrar Producto", icon: <PackagePlus /> },
  { id: "ver_pro", label: "Ver Productos", icon: <Eye /> },
  { id: "registrar_cat", label: "Registrar Categoría", icon: <ClipboardPlus /> },
  { id: "ver_cat", label: "Ver Categorías", icon: <Eye /> },
  { id: "registrar_ubi", label: "Registrar Ubicación", icon: <MapPinPlusIcon /> },
  { id: "ver_ubi", label: "Ver Ubicaciones", icon: <Eye /> },
];

const AccionesProducto = ({ onAction }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10 w-full max-w-7xl mx-auto px-4">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => onAction && onAction(action.id)}
          className="flex flex-col items-center justify-center p-6 md:p-10 gap-4 
                     bg-blue-600 rounded-3xl shadow-xl hover:bg-blue-700 hover:-translate-y-2 
                     transition-all duration-300 group border border-white/10"
        >
          <div className="bg-white/20 p-4 rounded-2xl group-hover:bg-white/30 transition-all text-white">
            <div className="text-3xl md:text-4xl">
              {action.icon}
            </div>
          </div>

          <p className="font-black text-sm md:text-base text-white uppercase tracking-widest text-center leading-tight">
            {action.label}
          </p>
        </button>
      ))}
    </div>
  );
};

export default AccionesProducto;