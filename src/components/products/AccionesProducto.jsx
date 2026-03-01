import React from "react";
import { PackagePlus, ClipboardPlus, Eye, MapPinPlusIcon } from "lucide-react";

const actions = [
  { id: "registrar_pro", label: "Registrar Producto", icon: <PackagePlus size={44} /> },
  { id: "ver_pro", label: "Ver Productos", icon: <Eye size={44} /> },
  { id: "registrar_cat", label: "Registrar Categoría", icon: <ClipboardPlus size={44} /> },
  { id: "ver_cat", label: "Ver Categorías", icon: <Eye size={44} /> },
  { id: "registrar_ubi", label: "Registrar Ubicación", icon: <MapPinPlusIcon size={44} /> },
  { id: "ver_ubi", label: "Ver Ubicaciones", icon: <Eye size={44} /> },
];

const AccionesProducto = ({ onAction }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10 w-full max-w-7xl mx-auto px-4">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => onAction && onAction(action.id)}
          className="flex flex-col items-center justify-center p-8 md:p-10 gap-6 
                     bg-blue-600 rounded-3xl shadow-xl hover:bg-blue-700 hover:-translate-y-2 
                     transition-all duration-300 group border border-blue-500"
        >
          <div className="text-white group-hover:scale-110 transition-transform">
            {action.icon}
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