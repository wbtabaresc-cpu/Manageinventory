const DetalleCategoria = ({ categoria, onBack }) => {
  if (!categoria) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-xl">
      <h2 className="text-xl font-bold mb-4">Detalle de Categoría</h2>

      <p><strong>Nombre:</strong> {categoria.name}</p>
      <p><strong>Descripción:</strong> {categoria.description || "—"}</p>
      <p><strong>Estado:</strong> {categoria.status}</p>

      <button
        onClick={onBack}
        className="mt-4 px-4 py-2 bg-gray-200 rounded"
      >
        Volver
      </button>
    </div>
  );
};

export default DetalleCategoria;
