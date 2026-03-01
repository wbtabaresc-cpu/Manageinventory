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
    if (formData.warehouse === "") return alert("Seleccione la bodega.");
    if (formData.aisle === "") return alert("Seleccione el pasillo.");
    if (!String(formData.rack || "").trim()) return alert("Seleccione el rack.");

    if (!token) {
      return alert("Su sesión ha expirado. Por favor, ingrese de nuevo.");
    }

    const payload = {
      ...(formData._id ? { _id: formData._id } : {}),
      warehouse: Number(formData.warehouse),
      aisle: Number(formData.aisle),
      rack: String(formData.rack).trim(),
      description: formData.description || "",
      status: formData.status === "Inactivo" ? "INACTIVE" : "ACTIVE",
    };

    onSave(payload);
  };

  return (
    <FormCard
      title={location ? "Editar Ubicación" : "Registrar Nueva Ubicación"}
      subtitle="Defina la posición física exacta en el almacén"
      onCancel={onCancel}
      onSubmit={handleSubmit}
    >
      <div className="space-y-6">
        {/* GRUPO DE SELECTORES: 3 columnas en PC, 1 en móvil */}
        <section>
          <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4 border-b pb-1">
            Posición Geográfica
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm text-center sm:text-left">Bodega *</label>
              <select
                name="warehouse"
                value={formData.warehouse}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-600 outline-none bg-white transition-all"
              >
                <option value="">Seleccionar</option>
                {[1, 2, 3, 4].map(n => <option key={n} value={n}>B-{n}</option>)}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm text-center sm:text-left">Pasillo *</label>
              <select
                name="aisle"
                value={formData.aisle}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-600 outline-none bg-white transition-all"
              >
                <option value="">Seleccionar</option>
                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>P-{n}</option>)}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm text-center sm:text-left">Rack *</label>
              <select
                name="rack"
                value={formData.rack}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-600 outline-none bg-white transition-all"
              >
                <option value="">Seleccionar</option>
                {["A", "B", "C", "D"].map(r => <option key={r} value={r}>R-{r}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* DETALLES Y ESTADO */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold text-sm">Estado de disponibilidad</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-600 outline-none bg-white font-medium"
            >
              <option value="Activo">✅ Activo (Disponible)</option>
              <option value="Inactivo">🚫 Inactivo (Mantenimiento)</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold text-sm">Anotaciones</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 mt-1 h-20 resize-none focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="Ej: Nivel superior, frágiles..."
            />
          </div>
        </section>
      </div>
    </FormCard>
  );
};

export default FormularioUbicacion;