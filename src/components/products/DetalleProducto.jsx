const DetalleProducto = ({ producto, onBack }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl">

      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        Detalle del Producto
      </h2>

      <div className="flex flex-col gap-4">
        <p><strong>ID:</strong> {producto.id}</p>
        <p><strong>Nombre:</strong> {producto.nombre}</p>
        <p><strong>Categoría:</strong> {producto.categoria}</p>
        <p><strong>Stock:</strong> {producto.stock}</p>
        <p><strong>Ubicación:</strong> {producto.ubicacion}</p>
        <p><strong>Proveedor:</strong> Proveedor X</p>
        <p><strong>Descripción:</strong> Producto para embalaje general.</p>
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <button className="btn-azul">Editar</button>
        <button className="btn-rojo">Eliminar</button>
        <button className="btn-gris" onClick={onBack}>Volver</button>
      </div>

    </div>
  );
};

export default DetalleProducto;
