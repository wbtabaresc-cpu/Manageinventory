import React from "react";
import { Plus, Pencil, Trash2, Eye, List, MapPin } from "lucide-react";

const actions = [
  { id: "registrar", label: "Registrar Productos", icon: <Plus /> },
  { id: "editar", label: "Editar Productos", icon: <Pencil /> },
  { id: "eliminar", label: "Eliminar Productos", icon: <Trash2 /> },
  { id: "ver", label: "Ver Productos", icon: <Eye /> },
  { id: "clasificacion", label: "Clasificación de Inventario", icon: <List /> },
  { id: "ubicacion", label: "Ubicación y Estanterías", icon: <MapPin /> },
];

const ProductActions = ({ onAction }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => onAction && onAction(action.id)}
          className="bg-blue-600 text-white p-6 rounded-2xl flex flex-col justify-center items-center gap-3 shadow-lg hover:bg-blue-700 cursor-pointer transition transform hover:scale-105"
        >
          <div className="text-4xl">{action.icon}</div>
          <p className="text-center font-semibold text-sm">{action.label}</p>
        </button>
      ))}
    </div>
  );
};

export default ProductActions;
