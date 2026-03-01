import React, { useMemo, useState } from "react";

const TablaUbicaciones = ({ locations = [], onBack, onView, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return locations;

    return locations.filter((l) => {
      const label = (l.label || "").toLowerCase();
      const desc = (l.description || "").toLowerCase();
      const status = (l.status || "").toLowerCase();
      const wh = String(l.warehouse ?? "").toLowerCase();
      const aisle = String(l.aisle ?? "").toLowerCase();
      const rack = (l.rack || "").toLowerCase();

      return (
        label.includes(q) ||
        desc.includes(q) ||
        status.includes(q) ||
        wh.includes(q) ||
        aisle.includes(q) ||
        rack.includes(q)
      );
    });
  }, [search, locations]);

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-md w-full max-w-7xl mx-auto border border-gray-100">
      
      {/* Cabecera Adaptable */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Ubicaciones en Almacén</h2>
          <p className="text-sm text-gray-500">Gestión de espacios y zonas de guardado</p>
        </div>

        <button
          onClick={onBack}
          className="w-full sm:w-auto px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-colors"
        >
          Volver
        </button>
      </div>

      {/* Buscador Estilizado */}
      <div className="relative mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por bodega, pasillo, rack o descripción..."
          className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all shadow-sm"
        />
      </div>

      {/* Tabla con Scroll Horizontal */}
      <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Etiqueta / Posición</th>
              <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Bodega</th>
              <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Pasillo</th>
              <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Rack</th>
              <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Descripción</th>
              <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {filtered.map((l) => (
              <tr key={l._id} className="hover:bg-emerald-50/30 transition-colors align-middle">
                <td className="py-4 px-4 font-bold text-gray-800">
                  {l.label || `B${l.warehouse}-P${l.aisle}-R${l.rack}`}
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-mono">{l.warehouse}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-mono">{l.aisle}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm font-bold font-mono">{l.rack}</span>
                </td>

                <td className="py-4 px-4">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                      l.status === "INACTIVE"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {l.status === "INACTIVE" ? "Inactivo" : "Disponible"}
                  </span>
                </td>

                <td className="py-4 px-4 text-sm text-gray-500 italic max-w-xs truncate">
                  {l.description || "—"}
                </td>

                <td className="py-4 px-4">
                  <div className="flex justify-center gap-2">
                    <button
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      onClick={() => onView?.(l)}
                      title="Ver Detalle"
                    >
                      Ver
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-yellow-600 transition-colors"
                      onClick={() => onEdit?.(l)}
                      title="Editar"
                    >
                      Editar
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      onClick={() => onDelete?.(l)}
                      title="Eliminar"
                    >
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" className="py-12 text-center text-gray-400">
                  No se encontraron ubicaciones para la búsqueda "{search}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaUbicaciones;