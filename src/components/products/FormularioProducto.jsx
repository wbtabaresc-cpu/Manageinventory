import React, { useEffect, useState } from "react";
import FormCard from "../ui/FormCard.jsx";

const FormularioProducto = ({ producto, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    _id: "",
    code: "",
    name: "",
    description: "",
    category: "",
    subcategory: "",
    initialQuantity: "",
    unit: "Unidad",
    location: "",
    supplier: "",
  });

  useEffect(() => {
    if (producto) {
      setFormData({
        _id: producto._id || "",
        code: producto.code || "",
        name: producto.name || "",
        description: producto.description || "",
        category: producto.category || "",
        subcategory: producto.subcategory || "",
        initialQuantity:
          producto.initialQuantity !== undefined && producto.initialQuantity !== null
            ? String(producto.initialQuantity)
            : "",
        unit: producto.unit || "Unidad",
        location: producto.location || "",
        supplier: producto.supplier || "",
      });
    }
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Validación básica
    if (!formData.code.trim()) return alert("El código del producto es obligatorio.");
    if (!formData.name.trim()) return alert("El nombre del producto es obligatorio.");
    if (!formData.category.trim()) return alert("La categoría es obligatoria.");
    if (!formData.location.trim()) return alert("La ubicación es obligatoria.");

    const qty = Number(formData.initialQuantity);
    if (formData.initialQuantity !== "" && (Number.isNaN(qty) || qty < 0)) {
      return alert("La cantidad inicial debe ser un número mayor o igual a 0.");
    }

    onSave({
      ...formData,
      initialQuantity: formData.initialQuantity === "" ? 0 : qty,
    });
  };

  return (
    <FormCard
      title={producto ? "Editar Producto" : "Registrar Nuevo Producto"}
      subtitle="Complete la información requerida"
      onCancel={onCancel}
      onSubmit={handleSubmit}
    >
      {/* ===================== DATOS DEL PRODUCTO ===================== */}
      <h3 className="font-semibold text-gray-700 mt-1">Datos del producto</h3>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Código *</label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Ej: A-0001"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Nombre *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Ej: Tinta color azul"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Descripción (opcional)"
        />
      </div>

      {/* ===================== CLASIFICACIÓN ===================== */}
      <h3 className="font-semibold text-gray-700 mt-3">Clasificación</h3>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Categoría *</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        >
          <option value="">Seleccionar categoría</option>
          <option value="Plasticos">Plásticos</option>
          <option value="Celulosas">Celulosas</option>
          <option value="Cajas">Cajas</option>
          <option value="Tintas">Tintas</option>
          <option value="Mallas">Mallas</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Subcategoría</label>
        <input
          type="text"
          name="subcategory"
          value={formData.subcategory}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Ej: Insumos, Materia prima, etc."
        />
      </div>

      {/* ===================== INVENTARIO / STOCK ===================== */}
      <h3 className="font-semibold text-gray-700 mt-3">Inventario</h3>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Cantidad inicial</label>
        <input
          type="number"
          name="initialQuantity"
          value={formData.initialQuantity}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="0"
          min={0}
        />
        <p className="text-xs text-gray-500 mt-1">
          Cantidad inicial. Los futuros movimientos se registran en “Movimientos y Stock”.
        </p>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Unidad</label>
        <select
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="Unidad">Unidad</option>
          <option value="Cajas">Cajas</option>
          <option value="Paquetes">Paquetes</option>
          <option value="Metros">Metros</option>
          <option value="Litros">Litros</option>
          <option value="Galónes">Galónes</option>
          <option value="Kilogramos">Kilogramos</option>
        </select>
      </div>

      {/* ===================== LOGÍSTICA ===================== */}
      <h3 className="font-semibold text-gray-700 mt-3">Logística</h3>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Ubicación *</label>
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        >
          <option value="">Seleccionar ubicación</option>
          <option value="Bodega 1 - Pasillo 1 - Rack A">Bodega 1 - Pasillo 1 - Rack A</option>
          <option value="Bodega 1 - Pasillo 2 - Rack B">Bodega 1 - Pasillo 2 - Rack B</option>
          <option value="Bodega 2 - Pasillo 1 - Rack A">Bodega 2 - Pasillo 1 - Rack A</option>
          <option value="Bodega 3 - Pasillo 4 - Rack C">Bodega 3 - Pasillo 4 - Rack C</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Luego conectaremos este listado con las ubicaciones reales registradas.
        </p>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Proveedor</label>
        <input
          type="text"
          name="supplier"
          value={formData.supplier}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Ej: Proveedor ABC"
        />
      </div>
    </FormCard>
  );
};

export default FormularioProducto;
