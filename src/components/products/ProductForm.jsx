import React from "react";

const ProductForm = ({ onCancel, onSave }) => {
  return (
    <form className="bg-white p-8 rounded-2xl shadow-lg border flex flex-col gap-6 w-full max-w-3xl">

      <h3 className="text-2xl font-bold text-gray-700 mb-2">
        Registrar Producto
      </h3>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">ID Producto</label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Nombre del Producto</label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Categoría</label>
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Seleccionar categoría</option>
          <option>Plasticos</option>
          <option>Celulosas</option>
          <option>Cajas</option>
          <option>Malla</option>
        </select>
      </div>
      
      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Cantidad</label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Unidad de Medida</label>
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Seleccionar unidad</option>
          <option>Metros</option>
          <option>Kilogramos</option>
          <option>Gramos</option>
          <option>Unidades</option>
          <option>Litros</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Ubicación</label>
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="">Seleccionar ubicación</option>
          <option>Bodega 1</option>
          <option>Bodega 2</option>
          <option>Bodega 3</option>
          <option>Bodega 4</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Proveedor</label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Descripción</label>
        <textarea
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
        ></textarea>
      </div>

      <div className="flex justify-end gap-4 mt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
        >
          Cancelar
        </button>

        <button
          type="submit"
          onClick={onSave}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Guardar
        </button>
      </div>

    </form>
  );
};

export default ProductForm;

