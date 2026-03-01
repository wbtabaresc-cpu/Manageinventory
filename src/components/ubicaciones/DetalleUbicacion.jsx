import React from "react";

const DetalleUbicacion = ({ location, ubicacion, onBack }) => {
  const l = location || ubicacion;

  if (!l) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md mx-auto border border-gray-100">
        <p className="text-gray-500 font-medium">No se ha seleccionado ninguna ubicación.</p>
        <button
          onClick={onBack}
          className="mt-6 px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg"
        >
          Volver al listado
        </button>
      </div>
    );
  }

  const label = l.label || `Bodega ${l.warehouse} - P${l.aisle} - R${l.rack}`;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-3xl mx-auto border border-gray-100">
      {/* Encabezado Estilizado */}
      <div className="bg-emerald-600 px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Información de Ubicación
        </h2>
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm border border-white/20 text-sm font-medium"
        >
          ← Volver
        </button>
      </div>

      <div className="p-6 md:p-8">
        {/* Título y Estado */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest px-2 py-1 bg-emerald-50 rounded">
              Etiqueta de Almacén
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-2">{label}</h1>
          </div>
          <div className={`px-4 py-2 rounded-xl border-2 font-bold text-center ${
            l.status === "INACTIVE" 
            ? "border-red-200 bg-red-50 text-red-600" 
            : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}>
            {l.status === "INACTIVE" ? "🚫 INACTIVA" : "✅ ACTIVA"}
          </div>
        </div>

        {/* Rejilla de Datos: 3 columnas en PC */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <DataCard label="Número Bodega" value={l.warehouse} />
          <DataCard label="Número Pasillo" value={l.aisle} />
          <DataCard label="Rack / Estante" value={l.rack} />
        </div>

        {/* Descripción */}
        <div className="mt-10 border-t pt-6">
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
            Notas de la ubicación
          </h4>
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-gray-700 leading-relaxed italic">
              {l.description || "Esta ubicación no tiene observaciones registradas."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para las tarjetas de datos
const DataCard = ({ label, value }) => (
  <div className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow text-center">
    <p className="text-xs font-bold text-gray-400 uppercase mb-1">{label}</p>
    <p className="text-2xl font-black text-gray-800">{value || "-"}</p>
  </div>
);

export default DetalleUbicacion;