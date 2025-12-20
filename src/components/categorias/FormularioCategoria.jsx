import React, { useEffect, useState } from "react";
import FormCard from "../ui/FormCard";

const FormularioCategoria = ({ categoria, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    _id: "",
    nombre: "",
    descripcion: "",
    estado: "Activo",
  });

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
