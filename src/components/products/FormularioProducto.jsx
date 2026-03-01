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

        if (!res.ok) {
          alert(data.message || "Error cargando categorías");
          return;
        }

        const active = (Array.isArray(data) ? data : []).filter(
          (c) => normalizeStatus(c.status) !== "INACTIVE"
        );

        setCategories(active);
      } catch (err) {
        console.error(err);
        alert("No se pudo conectar con el servidor para cargar categorías.");
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

        if (!res.ok) {
          alert(data.message || "Error cargando ubicaciones");
          return;
        }

        const active = (Array.isArray(data) ? data : []).filter(
          (l) => normalizeStatus(l.status) !== "INACTIVE"
        );

        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        alert("No se pudo conectar con el servidor para cargar ubicaciones.");
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
    if (!formData.code.trim()) return alert("El código del producto es obligatorio.");
    if (!formData.name.trim()) return alert("El nombre del producto es obligatorio.");
    if (!formData.category.trim()) return alert("La categoría es obligatoria.");
    if (!formData.location.trim()) return alert("La ubicación es obligatoria.");

    const qty = Number(formData.initialQuantity);
    if (formData.initialQuantity !== "" && (Number.isNaN(qty) || qty < 0)) {
      return alert("La cantidad inicial debe ser un número mayor o igual a 0.");
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
          <option value="">
            {loadingCats ? "Cargando categorías..." : "Seleccionar categoría"}
          </option>

          {!loadingCats &&
            categories.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
        </select>

        {!loadingCats && categories.length === 0 && (
          <p className="text-xs text-red-600 mt-1">
            No hay categorías ACTIVAS registradas. Crea una categoría primero.
          </p>
        )}
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
          <option value="">
            {loadingLocs ? "Cargando ubicaciones..." : "Seleccionar ubicación"}
          </option>

          {!loadingLocs &&
            locations.map((l) => (
              <option key={l._id} value={l.name}>
                {l.name}
              </option>
            ))}
        </select>

        {!loadingLocs && locations.length === 0 && (
          <p className="text-xs text-red-600 mt-1">
            No hay ubicaciones ACTIVAS registradas. Crea una ubicación primero.
          </p>
        )}
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