import React, { useState } from "react";
import AccionesProducto from "./AccionesProducto";
import FormularioProducto from "./FormularioProducto";
import FormularioCategoria from "../categorias/FormularioCategoria";
import FormularioUbicacion from "../ubicaciones/FormularioUbicacion";
import TablaProductos from "./TablaProductos";
import DetalleProducto from "./DetalleProducto";
import ActionButtons from "../ActionButtons";
import Swal from "sweetalert2";
import AlertBox from "../AlertBox";

const ProductosAlmacen = () => {

  const [currentView, setCurrentView] = useState("acciones");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedProducto, setSelectedProducto] = useState(null);

  const handleAction = (actionID) => {
    if (actionID === "registrar_pro") setCurrentView("formProducto");
    if (actionID === "registrar_cat") setCurrentView("formCategoria");
    if (actionID === "registrar_ubi") setCurrentView("formUbicacion");
    if (actionID === "ver_pro") setCurrentView("verProductos");
  };

  const handleSave = () => {
    setCurrentView("acciones");
    setSuccessMessage("Registro Exitoso");

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // ---- Handlers de tabla ----
  const handleView = (producto) => {
    setSelectedProducto(producto);
    setCurrentView("detalleProducto");
  };

  const handleEdit = (producto) => {
    setSelectedProducto(producto);
    setCurrentView("formProducto");   // Abre el formulario precargado para editar
  };

  const handleDelete = (producto) => {
    if (confirm(`¿Seguro que deseas eliminar el producto ${producto.nombre}?`)) {
      alert("Producto eliminado ✔");
      // Aquí después va la petición a la BD
    }
  };

  return (
    <div className="flex flex-col w-full items-center">

      {successMessage && (
        <div className="bg-green-600 text-white px-6 py-3 rounded-lg mb-6 shadow-lg font-semibold">
          {successMessage}
        </div>
      )}

      {currentView === "acciones" && (
        <>
          <AccionesProducto onAction={handleAction} />
          <ActionButtons />
          <AlertBox />
        </>
      )}

      {currentView === "formProducto" && (
        <FormularioProducto
          producto={selectedProducto} 
          onCancel={() => setCurrentView("acciones")}
          onSave={handleSave}
        />
      )}

      {currentView === "formCategoria" && (
        <FormularioCategoria
          onCancel={() => setCurrentView("acciones")}
          onSave={handleSave}
        />
      )}

      {currentView === "formUbicacion" && (
        <FormularioUbicacion
          onCancel={() => setCurrentView("acciones")}
          onSave={handleSave}
        />
      )}

      {currentView === "verProductos" && (
        <TablaProductos
          onBack={() => setCurrentView("acciones")}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {currentView === "detalleProducto" && (
        <DetalleProducto
          producto={selectedProducto}
          onBack={() => setCurrentView("verProductos")}
        />
      )}

    </div>
  );
};

export default ProductosAlmacen;