import React from "react";

const DetalleCategoria = ({ categoria, onBack }) => {
  if (!categoria) return null;

  const name = categoria.name || categoria.nombre || "Sin nombre";
  const description = categoria.description || categoria.descripcion || "";
  const status = categoria.status || categoria.estado || "ACTIVE";

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-2xl mx-auto border border-gray-100">
      {/* Encabezado con Identidad Índigo */}
      <div className="bg-indigo-600 px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Ficha de Categoría
        </h2>
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm border border-white/20 text-sm font-medium"
        >
          ← Volver
        </button>
      </div>

      <div className="p-6 md:p-8">
        {/* Título y Badge de Estado */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest px-2 py-1 bg-indigo-50 rounded">
              Categorización de Inventario
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-2">{name}</h1>
          </div>
          
          <div className={`px-4 py-2 rounded-xl border-2 font-bold text-center ${
            status === "INACTIVE" || status === "Inactivo"
            ? "border-red-200 bg-red-50 text-red-600" 
            : "border-indigo-200 bg-indigo-50 text-indigo-700"
          }`}>
            {status === "INACTIVE" || status === "Inactivo" ? "🚫 INACTIVA" : "✅ ACTIVA"}
          </div>
        </div>

        {/* Sección de Descripción */}
        <div className="mt-6 border-t pt-6">
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
            Descripción y Alcance
          </h4>
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <p className="text-gray-700 leading-relaxed italic text-lg">
              {description ? description : "Esta categoría agrupa productos del inventario sin una descripción específica registrada aún."}
            </p>
          </div>
        </div>

        {/* Info adicional para la sustentación */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-blue-50/30 border border-blue-100">
                <p className="text-xs text-blue-600 font-bold uppercase mb-1">Impacto</p>
                <p className="text-sm text-blue-800">Organización jerárquica de suministros.</p>
            </div>
            <div className="p-4 rounded-lg bg-indigo-50/30 border border-indigo-100">
                <p className="text-xs text-indigo-600 font-bold uppercase mb-1">Filtrado</p>
                <p className="text-sm text-indigo-800">Habilitada para búsqueda en tiempo real.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleCategoria;