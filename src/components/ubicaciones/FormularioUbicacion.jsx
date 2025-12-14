import React, { useState, useEffect } from "react";
import FormCard from "../ui/FormCard.jsx";

const FormularioUbicacion = ({ location, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    warehouse: "",
    aisle: "",
    rack: "",
    description: "",
    status: "Activo",
  });

  useEffect(() => {
    if (location) {
      setFormData({
        warehouse: location.warehouse ?? "",
        aisle: location.aisle ?? "",
        rack: location.rack ?? "",
        description: location.description ?? "",
        status:
          location.status === "INACTIVE"
            ? "Inactivo"
            : location.status === "ACTIVE"
            ? "Activo"
            : "Activo",
      });
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
   
    onSave(formData);
  };

  return (
    <FormCard
      title={location ? "Editar Ubicación" : "Registrar Nueva Ubicación"}
      subtitle="Complete la información requerida"
      onCancel={onCancel}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">
          Número de Bodega
        </label>
        <select
          name="warehouse"
          value={formData.warehouse}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        >
          <option value="">Seleccionar Bodega</option>
          <option value="1">Bodega 1</option>
          <option value="2">Bodega 2</option>
          <option value="3">Bodega 3</option>
          <option value="4">Bodega 4</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Número de Pasillo</label>
        <select
          name="aisle"
          value={formData.aisle}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        >
          <option value="">Seleccionar Pasillo</option>
          <option value="1">Pasillo 1</option>
          <option value="2">Pasillo 2</option>
          <option value="3">Pasillo 3</option>
          <option value="4">Pasillo 4</option>
          <option value="5">Pasillo 5</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Número de Rack</label>
        <select
          name="rack"
          value={formData.rack}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        >
          <option value="">Seleccionar Rack</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Descripción de la ubicación (opcional)"
        ></textarea>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Estado</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>
    </FormCard>
  );
};

export default FormularioUbicacion;

