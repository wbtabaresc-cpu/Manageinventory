import React, { useState } from "react";

const TablaProductos = ({ products = [], onBack, onView, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      (p.code || "").toLowerCase().includes(q) ||
      (p.name || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-md w-full max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Inventario de Productos
        </h2>

        <button
          onClick={onBack}
          className="w-full sm:w-auto px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors font-medium text-gray-700"
        >
          Volver
        </button>
      </div>

      <div className="relative mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por código o nombre..."
          className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all shadow-sm"
        />
      </div>

      <p className="text-sm text-gray-500 mb-4 font-medium">
        Mostrando {filtered.length} producto(s)
      </p>
      <div className="overflow-x-auto border border-gray-100 rounded-lg">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-3 px-4 text-sm font-bold text-gray-600 uppercase">Código</th>
              <th className="py-3 px-4 text-sm font-bold text-gray-600 uppercase">Nombre</th>
              <th className="py-3 px-4 text-sm font-bold text-gray-600 uppercase">Categoría</th>
              <th className="py-3 px-4 text-sm font-bold text-gray-600 uppercase text-center">Stock</th>
              <th className="py-3 px-4 text-sm font-bold text-gray-600 uppercase">Ubicación</th>
              <th className="py-3 px-4 text-sm font-bold text-gray-600 uppercase text-center">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filtered.map((p) => (
              <tr key={p._id} className="hover:bg-blue-50/30 transition-colors">
                <td className="py-3 px-4 font-mono text-sm text-blue-600 font-semibold">{p.code}</td>
                <td className="py-3 px-4 text-gray-700 font-medium">{p.name}</td>
                <td className="py-3 px-4 text-gray-600">
                   <span className="px-2 py-1 bg-gray-100 rounded-md text-xs">{p.category}</span>
                </td>
                <td className="py-3 px-4 text-center font-bold text-gray-700">
                  {p.stock ?? p.quantity ?? 0}
                </td>
                <td className="py-3 px-4 text-gray-600 text-sm">{p.location}</td>

                <td className="py-3 px-4">
                  <div className="flex justify-center gap-2">
                    <button
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                      title="Ver Detalle"
                      onClick={() => onView(p)}
                    >
                      Ver
                    </button>
                    <button
                      className="p-2 rounded-lg bg-blue-100 hover:bg-blue-600 hover:text-white text-blue-600 transition-colors"
                      title="Editar"
                      onClick={() => onEdit(p)}
                    >
                      Editar
                    </button>
                    <button
                      className="p-2 rounded-lg bg-red-100 hover:bg-red-600 hover:text-white text-red-600 transition-colors"
                      title="Eliminar"
                      onClick={() => onDelete(p)}
                    >
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="py-12 text-center text-gray-400 italic">
                  No se encontraron productos que coincidan con la búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaProductos;