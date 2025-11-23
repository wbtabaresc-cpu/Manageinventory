import React, { useState } from "react";
import { Plus, Eye, Trash2, Edit, Layers, MapPin } from "lucide-react";
import ProductForm from "./ProductForm";
import ActionButtons from "../ActionButtons";
import AlertBox from "../AlertBox";

const ProductosAlmacen = () => {
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSave = () => {
    setShowForm(false);
    setSuccessMessage("Registro Exitoso");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000); // el aviso de registro exitoso se desaparece en 3 segundos
  };

  const actions = [
    { label: "Registrar Productos", icon: <Plus />, color: "bg-blue-600", action: () => setShowForm(true) },
    { label: "Editar Productos", icon: <Edit />, color: "bg-blue-600" },
    { label: "Eliminar Productos", icon: <Trash2 />, color: "bg-blue-600" },
    { label: "Ver Productos", icon: <Eye />, color: "bg-blue-600" },
    { label: "Clasificación de Inventario", icon: <Layers />, color: "bg-blue-600" },
    { label: "Ubicación y Estanterías", icon: <MapPin />, color: "bg-blue-600" },
  ];

  return (
    <div className="flex flex-col w-full items-center">
      
      {successMessage && (
        <div className="bg-green-600 text-white px-6 py-3 rounded-lg mb-6 shadow-lg font-semibold">
          {successMessage}
        </div>
      )}

      {!showForm && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-8">
            {actions.map((btn, i) => (
              <button
                key={i}
                onClick={btn.action}
                className={`${btn.color} text-white p-10 rounded-2xl flex flex-col justify-center items-center gap-3 shadow-lg hover:bg-blue-700 cursor-pointer transition transform hover:scale-105`}
              >
                <div className="text-3xl">{btn.icon}</div>
                <span className="text-lg font-semibold">{btn.label}</span>
              </button>
            ))}
          </div>

          <ActionButtons />
          <AlertBox />
        </>
      )}

      {showForm && <ProductForm onCancel={() => setShowForm(false)} onSave={handleSave} />}
    </div>
  );
};

export default ProductosAlmacen;
