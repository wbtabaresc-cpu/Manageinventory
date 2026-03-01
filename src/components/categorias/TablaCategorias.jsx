import React, { useMemo, useState } from "react";

const TablaCategorias = ({ categories = [], onBack, onView, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return categories;

    return categories.filter((c) => {
      const name = (c.name || "").toLowerCase();
      const desc = (c.description || "").toLowerCase();
      const status = (c.status || "").toLowerCase();
      return name.includes(q) || desc.includes(q) || status.includes(q);
    });
  }, [search, categories]);

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-md w-full max-w-7xl mx-auto border border-gray-100">
      
      {/* Cabecera Responsiva */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Categorías de Inventario</h2>
          <p className="text-sm text-gray-500">Clasificación y agrupación de suministros</p>
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
          placeholder="Buscar por nombre, descripción o estado..."
          className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all shadow-sm"
        />
      </div>

      {/* Tabla con Scroll Horizontal */}
      <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider w-1/4">Nombre</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider w-1/2">Descripción</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Estado</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {filtered.map((c) => (
              <tr key={c._id} className="hover:bg-indigo-50/30 transition-colors align-middle">
                <td className="py-4 px-6 font-bold text-indigo-900">
                  {c.name}
                </td>
                
                <td className="py-4 px-6 text-sm text-gray-600 italic">
                  <div className="max-w-md truncate md:whitespace-normal">
                    {c.description || "—"}
                  </div>
                </td>

                <td className="py-4 px-6 text-center">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                      c.status === "INACTIVE"
                        ? "bg-red-100 text-red-600"
                        : "bg-indigo-100 text-indigo-700"
                    }`}
                  >
                    {c.status === "INACTIVE" ? "Inactivo" : "Activo"}
                  </span>
                </td>

                <td className="py-4 px-6">
                  <div className="flex justify-center gap-3">
                    <button
                      className="text-sm font-medium text-gray-400 hover:text-indigo-600 transition-colors"
                      onClick={() => onView?.(c)}
                    >
                      Ver
                    </button>
                    <button
                      className="text-sm font-medium text-gray-400 hover:text-yellow-600 transition-colors"
                      onClick={() => onEdit?.(c)}
                    >
                      Editar
                    </button>
                    <button
                      className="text-sm font-medium text-gray-400 hover:text-red-600 transition-colors"
                      onClick={() => onDelete?.(c)}
                    >
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="4" className="py-12 text-center text-gray-400">
                  No se encontraron categorías que coincidan con "{search}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaCategorias;