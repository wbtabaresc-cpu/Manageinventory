import React from "react";
import { PackagePlus, ClipboardPlus, Eye, MapPinPlusIcon } from "lucide-react";

const actions = [
  { id: "registrar_pro", label: "Registrar Producto", icon: <PackagePlus />, color: "bg-blue-600 hover:bg-blue-700 shadow-blue-200" },
  { id: "ver_pro", label: "Ver Productos", icon: <Eye />, color: "bg-blue-500 hover:bg-blue-600 shadow-blue-200" },
  { id: "registrar_cat", label: "Registrar Categoría", icon: <ClipboardPlus />, color: "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200" },
  { id: "ver_cat", label: "Ver Categorías", icon: <Eye />, color: "bg-indigo-500 hover:bg-indigo-600 shadow-indigo-200" },
  { id: "registrar_ubi", label: "Registrar Ubicación", icon: <MapPinPlusIcon />, color: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200" },
  { id: "ver_ubi", label: "Ver Ubicaciones", icon: <Eye />, color: "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200" },
];

const AccionesProducto = ({ onAction }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10 w-full max-w-7xl mx-auto px-4">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => onAction && onAction(action.id)}
          /* - text-white: Texto blanco puro.
             - transition-all: Para que el hover se vea suave.
             - active:scale-95: Para que el botón se "hunda" al clickear.
          */
          className={`flex flex-col items-center justify-center p-6 md:p-10 gap-4 
                     ${action.color} rounded-3xl shadow-xl hover:-translate-y-2 
                     transition-all duration-300 group border border-white/10`}
        >
          {/* Icono con fondo traslúcido para dar profundidad */}
          <div className="bg-white/20 p-4 rounded-2xl group-hover:bg-white/30 transition-all">
            <div className="text-white text-3xl md:text-4xl">
              {action.icon}
            </div>
          </div>

          {/* Texto en BLANCO, Negrita y Mayúsculas */}
          <p className="font-black text-sm md:text-base text-white uppercase tracking-widest text-center leading-tight">
            {action.label}
          </p>
        </button>
      ))}
    </div>
  );
};

export default AccionesProducto;