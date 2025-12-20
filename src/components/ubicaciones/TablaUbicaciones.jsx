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
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-6xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-700">Ubicaciones</h2>

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
        placeholder="Buscar por bodega, pasillo, rack, descripción o etiqueta..."
        className="w-full border px-4 py-2 rounded-lg mb-4"
      />

      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="border-b">
              <th className="py-2 pr-6">Etiqueta</th>
              <th className="py-2 pr-6">Bodega</th>
              <th className="py-2 pr-6">Pasillo</th>
              <th className="py-2 pr-6">Rack</th>
              <th className="py-2 pr-6">Estado</th>
              <th className="py-2 pr-6">Descripción</th>
              <th className="py-2">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((l) => (
              <tr key={l._id} className="border-b align-top">
                <td className="py-2 pr-6 font-medium text-gray-800">
                  {l.label || `Bodega ${l.warehouse} - Pasillo ${l.aisle} - Rack ${l.rack}`}
                </td>
                <td className="py-2 pr-6">{l.warehouse}</td>
                <td className="py-2 pr-6">{l.aisle}</td>
                <td className="py-2 pr-6">{l.rack}</td>

                <td className="py-2 pr-6">
                  <span
                    className={`inline-flex px-2 py-1 rounded-md text-xs font-semibold ${
                      l.status === "INACTIVE"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {l.status || "ACTIVE"}
                  </span>
                </td>

                <td className="py-2 pr-6 text-gray-700 whitespace-pre-wrap">
                  {l.description || "—"}
                </td>

                <td className="py-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                      onClick={() => onView?.(l)}
                    >
                      Ver
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => onEdit?.(l)}
                    >
                      Editar
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                      onClick={() => onDelete?.(l)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" className="py-6 text-center text-gray-500">
                  No hay ubicaciones para mostrar.
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
