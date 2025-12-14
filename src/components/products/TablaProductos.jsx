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
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-6xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-700">Productos</h2>

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
        placeholder="Buscar por código o nombre..."
        className="w-full border px-4 py-2 rounded-lg mb-4"
      />

      <p className="text-sm text-gray-500 mb-3">
        Mostrando {filtered.length} producto(s)
      </p>


      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-3 w-24">Código</th>
                <th className="py-2 px-3">Nombre</th>
                <th className="py-2 px-3 w-40">Categoría</th>
                <th className="py-2 px-3 w-24">Stock</th>
                <th className="py-2 px-3 w-56">Ubicación</th>
                <th className="py-2 px-3 w-40">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p._id} className="border-b">
               <td className="py-2 px-3">{p.code}</td>
              <td className="py-2 px-3">{p.name}</td>
              <td className="py-2 px-3">{p.category}</td>
              <td className="py-2 px-3">{p.stock ?? p.quantity ?? 0}</td>
              <td className="py-2 px-3">{p.location}</td>

                <td className="py-2">
                <div className="flex gap-2 flex-wrap">

                  <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                    onClick={() => onView(p)}
                  >
                    Ver
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => onEdit(p)}
                  >
                    Editar
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                    onClick={() => onDelete(p)}
                  >
                    Eliminar
                  </button>
                </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="py-6 text-center text-gray-500">
                  No hay productos para mostrar.
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
