import React, { useState, useEffect } from "react";

const FormularioProducto = ({ onCancel, onSave, producto }) => {
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    categoria: "",
    subcategoria: "",
    cantidad: "",
    unidad: "",
    ubicacion: "",
    proveedor: "",
    descripcion: "",
  });

  // Cuando producto cambie, precarga los datos
  useEffect(() => {
    if (producto) {
      setFormData({
        id: producto.id || "",
        nombre: producto.nombre || "",
        categoria: producto.categoria || "",
        subcategoria: producto.subcategoria || "",
        cantidad: producto.cantidad || "",
        unidad: producto.unidad || "",
        ubicacion: producto.ubicacion || "",
        proveedor: producto.proveedor || "",
        descripcion: producto.descripcion || "",
      });
    }
  }, [producto]);

  // Manejo de inputs controlados
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // devuelve los datos al padre
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg border flex flex-col gap-6 w-full max-w-3xl"
    >
      <h3 className="text-2xl font-bold text-gray-700 mb-2">
        {producto ? "Editar Producto" : "Registrar Nuevo Producto"}
      </h3>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">ID Producto</label>
        <input
          name="id"
          value={formData.id}
          onChange={handleChange}
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Nombre del Producto</label>
        <input
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Categoría</label>
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1"
        >
          <option value="">Seleccionar categoría</option>
          <option>Plasticos</option>
          <option>Celulosas</option>
          <option>Cajas</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Subcategoría</label>
        <select
          name="subcategoria"
          value={formData.subcategoria}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1"
        >
          <option value="">Seleccionar Subcategoría</option>
          <option>NaloSmart</option>
          <option>NaloPeel</option>
          <option>Viga3</option>
          <option>NaloFibrosa</option>
          <option>Podanfol</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Cantidad</label>
        <input
          name="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Unidad de Medida</label>
        <select
          name="unidad"
          value={formData.unidad}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1"
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
          name="ubicacion"
          value={formData.ubicacion}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1"
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
          name="proveedor"
          value={formData.proveedor}
          onChange={handleChange}
          type="text"
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold">Descripción</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-4 py-2 mt-1 h-24 resize-none"
        ></textarea>
      </div>

      <div className="flex justify-end gap-4 mt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default FormularioProducto;

