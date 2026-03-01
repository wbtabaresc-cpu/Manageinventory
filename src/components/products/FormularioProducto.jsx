import React, { useEffect, useState } from "react";
import FormCard from "../ui/FormCard.jsx";
import { API_URL } from "../../config";

const normalizeStatus = (s) => {
  if (!s) return "ACTIVE";
  if (s === "Activo") return "ACTIVE";
  if (s === "Inactivo") return "INACTIVE";
  return s;
};

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

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loadingCats, setLoadingCats] = useState(false);
  const [loadingLocs, setLoadingLocs] = useState(false);

  const token = localStorage.getItem("token");

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
            : producto.quantity !== undefined && producto.quantity !== null
            ? String(producto.quantity)
            : "",
        unit: producto.unit || "Unidad",
        location: producto.location || "",
        supplier: producto.supplier || "",
      });
    }
  }, [producto]);

  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCats(true);
      try {
        const res = await fetch(`${API_URL}/categories`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) return;

        const active = (Array.isArray(data) ? data : []).filter(
          (c) => normalizeStatus(c.status) !== "INACTIVE"
        );
        setCategories(active);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCats(false);
      }
    };
    if (token) loadCategories();
  }, [token]);

  useEffect(() => {
    const loadLocations = async () => {
      setLoadingLocs(true);
      try {
        const res = await fetch(`${API_URL}/locations`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) return;
        setLocations(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingLocs(false);
      }
    };
    if (token) loadLocations();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.code.trim()) return alert("El código es obligatorio.");
    if (!formData.name.trim()) return alert("El nombre es obligatorio.");
    if (!formData.category.trim()) return alert("La categoría es obligatoria.");
    if (!formData.location.trim()) return alert("La ubicación es obligatoria.");

    const qty = Number(formData.initialQuantity);
    if (formData.initialQuantity !== "" && (Number.isNaN(qty) || qty < 0)) {
      return alert("La cantidad debe ser un número positivo.");
    }

    const payload = {
      ...formData,
      initialQuantity: formData.initialQuantity === "" ? 0 : qty,
    };
    onSave(payload);
  };

  return (
    <FormCard
      title={producto ? "Editar Producto" : "Registrar Nuevo Producto"}
      subtitle="Complete la información requerida"
      onCancel={onCancel}
      onSubmit={handleSubmit}
    >
      <div className="space-y-6">
        {/* SECCIÓN: DATOS BÁSICOS */}
        <section>
          <h3 className="font-bold text-blue-600 border-b pb-1 mb-4 text-sm uppercase tracking-wider">
            Información General
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm">Código *</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Ej: A-0001"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm">Nombre *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Nombre del producto"
              />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label className="text-gray-700 font-semibold text-sm">Descripción</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 h-20 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Breve descripción del artículo..."
              />
            </div>
          </div>
        </section>

        {/* SECCIÓN: CLASIFICACIÓN E INVENTARIO */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-blue-600 border-b pb-1 mb-4 text-sm uppercase tracking-wider">
              Clasificación
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold text-sm">Categoría *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                >
                  <option value="">{loadingCats ? "Cargando..." : "Seleccionar..."}</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold text-sm">Subcategoría</label>
                <input
                  type="text"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Ej: Insumos"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-blue-600 border-b pb-1 mb-4 text-sm uppercase tracking-wider">
              Stock e Inventario
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold text-sm">Cantidad Inicial</label>
                <input
                  type="number"
                  name="initialQuantity"
                  value={formData.initialQuantity}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="0"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700 font-semibold text-sm">Unidad de Medida</label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                >
                  <option value="Unidad">Unidad</option>
                  <option value="Cajas">Cajas</option>
                  <option value="Paquetes">Paquetes</option>
                  <option value="Metros">Metros</option>
                  <option value="Litros">Litros</option>
                  <option value="Kilogramos">Kilogramos</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN: LOGÍSTICA */}
        <section>
          <h3 className="font-bold text-blue-600 border-b pb-1 mb-4 text-sm uppercase tracking-wider">
            Logística y Origen
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm">Ubicación en Bodega *</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="">{loadingLocs ? "Cargando..." : "Seleccionar ubicación"}</option>
                {locations.map((l) => {
                  const label = `Bodega ${l.warehouse} - P${l.aisle} - R${l.rack}`;
                  return <option key={l._id} value={label}>{label}</option>;
                })}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold text-sm">Proveedor</label>
              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Nombre del proveedor"
              />
            </div>
          </div>
        </section>
      </div>
    </FormCard>
  );
};

export default FormularioProducto;