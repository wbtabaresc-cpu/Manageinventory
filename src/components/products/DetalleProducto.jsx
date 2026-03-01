import React from "react";

const DetalleProducto = ({ producto, onBack }) => {
  if (!producto) return null;

  // Normalización de datos
  const code = producto.code || producto.id || "N/A";
  const name = producto.name || producto.nombre || "Sin nombre";
  const category = producto.category || producto.categoria || "-";
  const subcategory = producto.subcategory || producto.subcategoria || "-";
  const stock = producto.stock ?? producto.quantity ?? producto.cantidad ?? 0;
  const unit = producto.unit || producto.unidad || "";
  const location = producto.location || producto.ubicacion || "-";
  const supplier = producto.supplier || producto.proveedor || "-";
  const description = producto.description || producto.descripcion || "";

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl mx-auto border border-gray-100">
      {/* Encabezado con color de énfasis */}
      <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Ficha Técnica de Producto
        </h2>
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm border border-white/20 text-sm font-medium"
        >
          ← Volver al listado
        </button>
      </div>

      <div className="p-6 md:p-8">
        {/* Título y Código Destacado */}
        <div className="mb-8">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest px-2 py-1 bg-blue-50 rounded">
            ID: {code}
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 mt-2">{name}</h1>
        </div>

        {/* Rejilla de Información */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Info label="Categoría" value={category} />
          <Info label="Subcategoría" value={subcategory} />
          <Info label="Stock Actual" value={`${stock} ${unit}`} isHighlight />
          <Info label="Ubicación" value={location} />
          <Info label="Proveedor" value={supplier} />
        </div>

        {/* Sección de Descripción Separada */}
        <div className="mt-10 border-t pt-6">
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
            Descripción del artículo
          </h4>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-gray-700 leading-relaxed italic">
              {description ? description : "El producto no cuenta con una descripción detallada registrada."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente Info más estilizado
const Info = ({ label, value, isHighlight }) => (
  <div className={`p-4 rounded-xl border ${isHighlight ? 'border-blue-200 bg-blue-50/50' : 'border-gray-100 bg-white'}`}>
    <p className="text-xs font-bold text-gray-400 uppercase mb-1">{label}</p>
    <p className={`text-lg ${isHighlight ? 'text-blue-700 font-bold' : 'text-gray-800 font-semibold'}`}>
      {value || "-"}
    </p>
  </div>
);

export default DetalleProducto;