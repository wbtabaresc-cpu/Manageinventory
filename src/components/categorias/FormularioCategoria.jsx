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
        description: categoria.description ?? categoria.descripcion ?? "",
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
    
    // Verificación de seguridad básica antes de enviar
    if (!token) return alert("Sesión expirada. Por favor, inicia sesión nuevamente.");

    const status = formData.estado === "Inactivo" ? "INACTIVE" : "ACTIVE";

    const payload = {
      ...(formData._id ? { _id: formData._id } : {}),
      name,
      description: formData.descripcion || "",
      status,
    };

    // Esto envía los datos a handleSaveCategory en ProductosAlmacen.jsx
    // la cual ya actualizamos con los headers de Authorization.
    onSave(payload);
  };

  return (
    <FormCard
      title={categoria ? "Editar Categoría" : "Registrar Nueva Categoría"}
      subtitle="Complete la información requerida"
      onCancel={onCancel}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <label className="text-gray-700 font-semibold">Nombre de la categoría *</label>
        <input
          type="text"
          name="nombre"
          placeholder="Ej: Insumos de Oficina"
          value={formData.nombre}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-gray-700 font-semibold">Descripción</label>
        <textarea
          name="descripcion"
          placeholder="Breve descripción de los artículos de esta categoría"
          value={formData.descripcion}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-2 rounded-lg h-24 resize-none focus:ring-2 focus:ring-blue-600 outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-gray-700 font-semibold">Estado</label>
        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>
    </FormCard>
  );
};

export default FormularioCategoria;