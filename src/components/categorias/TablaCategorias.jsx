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
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-6xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-700">Categorías</h2>

        <button
          onClick={onBack}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Volver
        </button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar por nombre, descripción o estado..."
        className="w-full border px-4 py-2 rounded-lg mb-4"
      />

      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="border-b">
              <th className="py-2 pr-6">Nombre</th>
              <th className="py-2 pr-6">Descripción</th>
              <th className="py-2 pr-6">Estado</th>
              <th className="py-2">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((c) => (
              <tr key={c._id} className="border-b align-top">
                <td className="py-2 pr-6 font-medium text-gray-800">{c.name}</td>
                <td className="py-2 pr-6 text-gray-700 whitespace-pre-wrap">
                  {c.description || "—"}
                </td>
                <td className="py-2 pr-6">
                  <span
                    className={`inline-flex px-2 py-1 rounded-md text-xs font-semibold ${
                      c.status === "INACTIVE"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {c.status || "ACTIVE"}
                  </span>
                </td>

                <td className="py-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                      onClick={() => onView?.(c)}
                    >
                      Ver
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => onEdit?.(c)}
                    >
                      Editar
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                      onClick={() => onDelete?.(c)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-500">
                  No hay categorías para mostrar.
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
