import React, { useEffect, useState } from "react";
import AccionesProducto from "./AccionesProducto";
import FormularioProducto from "./FormularioProducto";
import FormularioCategoria from "../categorias/FormularioCategoria";
import FormularioUbicacion from "../ubicaciones/FormularioUbicacion";
import TablaProductos from "./TablaProductos";
import DetalleProducto from "./DetalleProducto";
import ActionButtons from "../ActionButtons";
import AlertBox from "../AlertBox";

const API_URL = "http://localhost:5000";

const ProductosAlmacen = () => {
  const [currentView, setCurrentView] = useState("acciones");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedProducto, setSelectedProducto] = useState(null);

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 2500);
  };

  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error cargando productos");
        return;
      }

      setProducts(data);
    } catch (err) {
      console.error(err);
      alert("No se pudo conectar con el servidor para cargar productos.");
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    // Cargamos productos una sola vez al entrar al módulo
    loadProducts();
  }, []);

  const handleAction = (actionID) => {
    if (actionID === "registrar_pro") {
      setSelectedProducto(null); // importante: nuevo producto
      setCurrentView("formProducto");
    }
    if (actionID === "registrar_cat") setCurrentView("formCategoria");
    if (actionID === "registrar_ubi") setCurrentView("formUbicacion");
    if (actionID === "ver_pro") setCurrentView("verProductos");
  };

  // ✅ Crear / Editar producto (POST / PUT)
  const handleSaveProduct = async (p) => {
    try {
      const qty = Number(p.initialQuantity) || 0;

      const payload = {
        code: p.code,
        name: p.name,
        category: p.category,
        subcategory: p.subcategory,
        quantity: qty,
        stock: qty, // para arrancar; luego lo moveremos a movimientos
        unit: p.unit,
        location: p.location,
        supplier: p.supplier,
        description: p.description,
      };

      let res;
      let data;

      if (p._id) {
        // EDITAR
        res = await fetch(`${API_URL}/api/products/${p._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        data = await res.json();

        if (!res.ok) {
          alert(data.message || "Error actualizando producto");
          return;
        }

        showSuccess("Producto actualizado correctamente");
      } else {
        // CREAR
        res = await fetch(`${API_URL}/api/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        data = await res.json();

        if (!res.ok) {
          alert(data.message || "Error registrando producto");
          return;
        }

        showSuccess("Producto registrado correctamente");
      }

      await loadProducts();
      setSelectedProducto(null);
      setCurrentView("acciones");
    } catch (err) {
      console.error(err);
      alert("No se pudo guardar el producto.");
    }
  };

  // ---- Handlers de tabla ----
  const handleView = (producto) => {
    setSelectedProducto(producto);
    setCurrentView("detalleProducto");
  };

  const handleEdit = (producto) => {
    setSelectedProducto(producto);
    setCurrentView("formProducto");
  };

  // ✅ Eliminar producto (DELETE)
  const handleDelete = async (producto) => {
    if (!producto?._id) {
      alert("No se puede eliminar: falta el _id del producto.");
      return;
    }

    const ok = confirm(`¿Seguro que deseas eliminar el producto "${producto.name}"?`);
    if (!ok) return;

    try {
      const res = await fetch(`${API_URL}/api/products/${producto._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error eliminando producto");
        return;
      }

      await loadProducts();
      showSuccess("Producto eliminado correctamente");
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el producto.");
    }
  };

  return (
    <div className="flex flex-col w-full items-center px-6">
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
          onCancel={() => {
            setSelectedProducto(null);
            setCurrentView("acciones");
          }}
          onSave={handleSaveProduct}
        />
      )}

      {currentView === "formCategoria" && (
        <FormularioCategoria
          onCancel={() => setCurrentView("acciones")}
          onSave={() => {
            showSuccess("Categoría guardada (luego conectamos API)");
            setCurrentView("acciones");
          }}
        />
      )}

      {currentView === "formUbicacion" && (
        <FormularioUbicacion
          onCancel={() => setCurrentView("acciones")}
          onSave={() => {
            showSuccess("Ubicación guardada (luego conectamos API)");
            setCurrentView("acciones");
          }}
        />
      )}

      {currentView === "verProductos" && (
        <>
          {loadingProducts && (
            <div className="text-gray-600 mb-3">Cargando productos...</div>
          )}

          <TablaProductos
            products={products}
            onBack={() => setCurrentView("acciones")}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
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
