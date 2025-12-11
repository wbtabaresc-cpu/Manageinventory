import React from "react";
import { PackagePlus, ClipboardPlus, Eye, MapPinPlusIcon } from "lucide-react";

const actions = [
  { id: "registrar_pro", label: "Registrar Producto", icon: <PackagePlus /> },
  { id: "ver_pro", label: "Ver Producto", icon: <Eye /> },
  { id: "registrar_cat", label: "Registrar Categoría", icon: <ClipboardPlus /> },
  { id: "ver_cat", label: "Ver Categoría", icon: <Eye /> },
  { id: "registrar_ubi", label: "Registrar Ubicación", icon: <MapPinPlusIcon /> },
  { id: "ver_ubi", label: "Ver Ubicación", icon: <Eye /> },
];

const AccionesProducto = ({ onAction }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-10">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => onAction && onAction(action.id)}
          className="btn-card"
    >
    <div className="btn-card-icon">{action.icon}</div>
       <p className="text-center font-semibold text-sm">{action.label}</p>
        </button>

      ))}
    </div>
  );
};

export default AccionesProducto;
