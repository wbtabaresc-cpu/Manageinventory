import React from "react";

const DetalleUbicacion = ({ location, ubicacion, onBack }) => {
  const l = location || ubicacion;

  if (!l) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl">
        <p className="text-gray-600">No hay ubicación seleccionada.</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Volver
        </button>
      </div>
    );
  }

  const label =
    l.label || `Bodega ${l.warehouse} - Pasillo ${l.aisle} - Rack ${l.rack}`;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-700">Detalle de Ubicación</h2>

        <button
          onClick={onBack}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Volver
        </button>
      </div>

      <div className="space-y-3 text-gray-800">
        <p><b>Etiqueta:</b> {label}</p>
        <p><b>Bodega:</b> {l.warehouse}</p>
        <p><b>Pasillo:</b> {l.aisle}</p>
        <p><b>Rack:</b> {l.rack}</p>
        <p>
          <b>Estado:</b>{" "}
          <span className={l.status === "INACTIVE" ? "text-red-600" : "text-green-700"}>
            {l.status || "ACTIVE"}
          </span>
        </p>
        <p><b>Descripción:</b> {l.description || "—"}</p>
      </div>
    </div>
  );
};

export default DetalleUbicacion;
