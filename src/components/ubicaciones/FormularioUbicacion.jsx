import React, { useState, useEffect } from "react";
import FormCard from "../ui/FormCard.jsx";

const FormularioUbicacion = ({ location, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    _id: "",
    warehouse: "",
    aisle: "",
    rack: "",
    description: "",
    status: "Activo",
  });

  // Recuperamos el token para validación de seguridad previa al envío
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (location) {
      const rawStatus = location.status;

      setFormData({
        _id: location._id ?? "",
        warehouse: location.warehouse ?? "",
        aisle: location.aisle ?? "",
        rack: location.rack ?? "",
        description: location.description ?? "",
        status: rawStatus === "INACTIVE" ? "Inactivo" : "Activo",
      });
    } else {
      setFormData({
        _id: "",
        warehouse: "",
        aisle: "",
        rack: "",
        description: "",
        status: "Activo",
      });
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Validaciones de negocio requeridas
    if (formData.warehouse === "") return alert("Seleccione la bodega.");
    if (formData.aisle === "") return alert("Seleccione el pasillo.");
    if (!String(formData.rack || "").trim()) return alert("Seleccione el rack.");

    // Validación de seguridad: Integración con el sistema de autenticación
    if (!token) {
      return alert("Su sesión ha expirado. Por favor, ingrese de nuevo para realizar esta acción.");
    }

    const payload = {
      ...(formData._id ? { _id: formData._id } : {}),
      warehouse: Number(formData.warehouse),
      aisle: Number(formData.aisle),
      rack: String(formData.rack).trim(),
      description: formData.description || "",
      status: formData.status === "Inactivo" ? "INACTIVE" : "ACTIVE",
    };

    // Envía el payload al método handleSaveLocation de ProductosAlmacen.jsx
    onSave(payload);
  };

  return (
    <FormCard
      title={location ? "Editar Ubicación" : "Registrar Nueva Ubicación"}
      subtitle="Defina la posición física en el almacén"
      onCancel={onCancel}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Número de Bodega *</label>
        <select
          name="warehouse"
          value={formData.warehouse}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
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
        <label className="text-gray-700 font-semibold">Número de Pasillo *</label>
        <select
          name="aisle"
          value={formData.aisle}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
          required
        >
          <option value="">Seleccionar Pasillo</option>
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>Pasillo {n}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Rack / Estantería *</label>
        <select
          name="rack"
          value={formData.rack}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
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
        <label className="text-gray-700 font-semibold">Descripción de la ubicación</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 h-24 resize-none focus:ring-2 focus:ring-blue-600 outline-none transition-all"
          placeholder="Ej: Esquina norte, nivel superior..."
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Estado de disponibilidad</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
        >
          <option value="Activo">Activo (Disponible)</option>
          <option value="Inactivo">Inactivo (Mantenimiento/Lleno)</option>
        </select>
      </div>
    </FormCard>
  );
};

export default FormularioUbicacion;