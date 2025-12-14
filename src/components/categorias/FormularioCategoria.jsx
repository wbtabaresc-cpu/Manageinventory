import React, { useState, useEffect } from "react";
import FormCard from "../ui/FormCard";

const FormularioCategoria = ({ categoria, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    estado: "Activo",
  });

  useEffect(() => {
    if (categoria) {
      setFormData({
        nombre: categoria.nombre || "",
        descripcion: categoria.descripcion || "",
        estado: categoria.estado || "Activo",
      });
    }
  }, [categoria]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <FormCard
      title={categoria ? "Editar Categoría" : "Registrar Nueva Categoría"}
      subtitle="Complete la información requerida"
      onCancel={onCancel}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="nombre"
        placeholder="Nombre de la categoría"
        value={formData.nombre}
        onChange={handleChange}
        className="border px-4 py-2 rounded-lg"
        required
      />

      <textarea
        name="descripcion"
        placeholder="Descripción (opcional)"
        value={formData.descripcion}
        onChange={handleChange}
        className="border px-4 py-2 rounded-lg h-24 resize-none"
      />

      <select
        name="estado"
        value={formData.estado}
        onChange={handleChange}
        className="border px-4 py-2 rounded-lg"
      >
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>
    </FormCard>
  );
};

export default FormularioCategoria;
