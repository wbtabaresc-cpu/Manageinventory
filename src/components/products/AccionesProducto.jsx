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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-10 w-full max-w-6xl">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => onAction && onAction(action.id)}
          className="btn-card flex flex-row md:flex-col items-center justify-center p-4 md:p-6 gap-4"
        >
          <div className="btn-card-icon shrink-0">{action.icon}</div>
          <p className="font-semibold text-sm md:text-base text-gray-700">
            {action.label}
          </p>
        </button>
      ))}
    </div>
  );
};

export default AccionesProducto;