import React from "react";

const DetalleProducto = ({ producto, onBack }) => {
  if (!producto) return null;

  const code = producto.code || producto.id || "";
  const name = producto.name || producto.nombre || "";
  const category = producto.category || producto.categoria || "";
  const subcategory = producto.subcategory || producto.subcategoria || "";
  const stock = producto.stock ?? producto.quantity ?? producto.cantidad ?? 0;
  const unit = producto.unit || producto.unidad || "";
  const location = producto.location || producto.ubicacion || "";
  const supplier = producto.supplier || producto.proveedor || "";
  const description = producto.description || producto.descripcion || "";

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-700">Detalle del Producto</h2>

        <button
          onClick={onBack}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Volver
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Info label="Código" value={code} />
        <Info label="Nombre" value={name} />
        <Info label="Categoría" value={category} />
        <Info label="Subcategoría" value={subcategory} />
        <Info label="Stock" value={`${stock} ${unit ? unit : ""}`} />
        <Info label="Ubicación" value={location} />
        <Info label="Proveedor" value={supplier} />
      </div>

      <div className="mt-4">
        <p className="text-gray-700 font-semibold">Descripción</p>
        <p className="text-gray-600 mt-1">
          {description ? description : "Sin descripción"}
        </p>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="border rounded-lg p-3">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-gray-800 font-semibold">{value || "-"}</p>
  </div>
);

export default DetalleProducto;
