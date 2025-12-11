import React, { useState } from "react";

const TablaProductos = ({ onBack, onView, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");

  const productos = [
    {
      id: "P001",
      nombre: "Producto A",
      categoria: "Categoría 1",
      ubicacion: "Almacén 1",
      stock: 25,
    },
    {
      id: "P002",
      nombre: "Producto B",
      categoria: "Categoría 2",
      ubicacion: "Almacén 3",
      stock: 10,
    },
  ];

  const filtered = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Lista de Productos</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Volver
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre o ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded-lg w-full mb-4"
      />

      <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Categoría</th>
            <th className="p-3 text-left">Ubicación</th>
            <th className="p-3 text-left">Stock</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p.id} className="border-b hover:bg-gray-100">
              <td className="p-3">{p.id}</td>
              <td className="p-3">{p.nombre}</td>
              <td className="p-3">{p.categoria}</td>
              <td className="p-3">{p.ubicacion}</td>
              <td className="p-3">{p.stock}</td>
              <td className="p-3 flex justify-center gap-3">
                <button
                  onClick={() => onView(p)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm"
                >
                  Ver
                </button>
                <button
                  onClick={() => onEdit(p)}
                  className="px-3 py-1 bg-yellow-600 text-white rounded-lg text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(p)}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaProductos;
