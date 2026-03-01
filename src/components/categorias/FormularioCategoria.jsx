import React, { useEffect, useState } from "react";
import FormCard from "../ui/FormCard";

const FormularioCategoria = ({ categoria, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    _id: "",
    nombre: "",
    descripcion: "",
    estado: "Activo",
  });
  
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (categoria) {
      const rawStatus = categoria.status ?? categoria.estado;
      setFormData({
        _id: categoria._id ?? "",
        nombre: categoria.name ?? categoria.nombre ?? "",
        descripcion: categoria.description ?? categoria.descripcion ?? "",
        estado: rawStatus === "INACTIVE" || rawStatus === "Inactivo" ? "Inactivo" : "Activo",
      });
    } else {
      setFormData({
        _id: "",
        nombre: "",
        descripcion: "",
        estado: "Activo",
      });
    }
  }, [categoria]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const name = (formData.nombre || "").trim();
    if (!name) return alert("El nombre de la categoría es obligatorio.");
    if (!token) return alert("Sesión expirada. Por favor, inicia sesión nuevamente.");

    const status = formData.estado === "Inactivo" ? "INACTIVE" : "ACTIVE";

    const payload = {
      ...(formData._id ? { _id: formData._id } : {}),
      name,
      description: formData.descripcion || "",
      status,
    };

    onSave(payload);
  };

  return (
    <FormCard
      title={categoria ? "Editar Categoría" : "Registrar Nueva Categoría"}
      subtitle="Defina los grupos para organizar sus productos"
      onCancel={onCancel}
      onSubmit={handleSubmit}
    >
      <div className="space-y-6">
        {/* Fila Superior: Nombre y Estado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-gray-700 font-bold text-sm">Nombre de la categoría *</label>
            <input
              type="text"
              name="nombre"
              placeholder="Ej: Insumos de Oficina"
              value={formData.nombre}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-bold text-sm">Estado</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium"
            >
              <option value="Activo">✅ Activo</option>
              <option value="Inactivo">🚫 Inactivo</option>
            </select>
          </div>
        </div>

        {/* Fila Inferior: Descripción */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-700 font-bold text-sm">Descripción Detallada</label>
          <textarea
            name="descripcion"
            placeholder="¿Qué tipo de artículos pertenecen a esta categoría?"
            value={formData.descripcion}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-2 rounded-xl h-28 resize-none focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
          />
        </div>
      </div>
    </FormCard>
  );
};

export default FormularioCategoria;