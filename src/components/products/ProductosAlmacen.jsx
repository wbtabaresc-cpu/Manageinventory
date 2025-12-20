import React, { useEffect, useState } from "react";
import AccionesProducto from "./AccionesProducto";
import FormularioProducto from "./FormularioProducto";

import FormularioCategoria from "../categorias/FormularioCategoria";
import TablaCategorias from "../categorias/TablaCategorias";
import DetalleCategoria from "../categorias/DetalleCategoria";

import FormularioUbicacion from "../ubicaciones/FormularioUbicacion";
import TablaUbicaciones from "../ubicaciones/TablaUbicaciones";
import DetalleUbicacion from "../ubicaciones/DetalleUbicacion";

import TablaProductos from "./TablaProductos";
import DetalleProducto from "./DetalleProducto";

import ActionButtons from "../ActionButtons";
import AlertBox from "../AlertBox";

const API_URL = "http://localhost:5000";

const ProductosAlmacen = () => {
  const [currentView, setCurrentView] = useState("acciones");
  const [successMessage, setSuccessMessage] = useState("");

  const [selectedProducto, setSelectedProducto] = useState(null);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [selectedUbicacion, setSelectedUbicacion] = useState(null);

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const [locations, setLocations] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(false);

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

  const loadCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await fetch(`${API_URL}/api/categories`);
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error cargando categorías");
        return;
      }

      setCategories(data);
    } catch (err) {
      console.error(err);
      alert("No se pudo conectar con el servidor para cargar categorías.");
    } finally {
      setLoadingCategories(false);
    }
  };

  const loadLocations = async () => {
    setLoadingLocations(true);
    try {
      const res = await fetch(`${API_URL}/api/locations`);
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error cargando ubicaciones");
        return;
      }

      setLocations(data);
    } catch (err) {
      console.error(err);
      alert("No se pudo conectar con el servidor para cargar ubicaciones.");
    } finally {
      setLoadingLocations(false);
    }
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
    loadLocations();
  }, []);

  const handleAction = (actionID) => {

    if (actionID === "registrar_pro") {
      setSelectedProducto(null);
      setCurrentView("formProducto");
    }
    if (actionID === "ver_pro") setCurrentView("verProductos");

    if (actionID === "registrar_cat") {
      setSelectedCategoria(null);
      setCurrentView("formCategoria");
    }
    if (actionID === "ver_cat") setCurrentView("verCategorias");

    if (actionID === "registrar_ubi") {
      setSelectedUbicacion(null);
      setCurrentView("formUbicacion");
    }
    if (actionID === "ver_ubi") setCurrentView("verUbicaciones");
  };

  const handleSaveProduct = async (p) => {
    try {
      const qty = Number(p.initialQuantity) || 0;

      const payload = {
        code: p.code,
        name: p.name,
        category: p.category,
        subcategory: p.subcategory,
        quantity: qty,
        stock: qty,
        unit: p.unit,
        location: p.location,
        supplier: p.supplier,
        description: p.description,
      };

      let res;
      let data;

      if (p._id) {
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

  const handleViewProduct = (producto) => {
    setSelectedProducto(producto);
    setCurrentView("detalleProducto");
  };

  const handleEditProduct = (producto) => {
    setSelectedProducto(producto);
    setCurrentView("formProducto");
  };

  const handleDeleteProduct = async (producto) => {
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

  const handleSaveCategory = async (c) => {
    try {
      const payload = {
        name: (c.name || "").trim(),
        description: c.description || "",
        status: c.status || "ACTIVE",
      };

      let res, data;

      if (c._id) {
        res = await fetch(`${API_URL}/api/categories/${c._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        data = await res.json();

        if (!res.ok) {
          alert(data.message || "Error actualizando categoría");
          return;
        }

        showSuccess("Categoría actualizada correctamente");
      } else {
        res = await fetch(`${API_URL}/api/categories`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        data = await res.json();

        if (!res.ok) {
          alert(data.message || "Error registrando categoría");
          return;
        }

        showSuccess("Categoría registrada correctamente");
      }

      await loadCategories();
      setSelectedCategoria(null);
      setCurrentView("acciones");
    } catch (err) {
      console.error(err);
      alert("No se pudo guardar la categoría.");
    }
  };

  const handleViewCategory = (c) => {
    setSelectedCategoria(c);
    setCurrentView("detalleCategoria");
  };

  const handleEditCategory = (c) => {
    setSelectedCategoria(c);
    setCurrentView("formCategoria");
  };

  const handleDeleteCategory = async (c) => {
    if (!c?._id) {
      alert("No se puede eliminar: falta el _id de la categoría.");
      return;
    }

    const ok = confirm(`¿Seguro que deseas eliminar la categoría "${c.name}"?`);
    if (!ok) return;

    try {
      const res = await fetch(`${API_URL}/api/categories/${c._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error eliminando categoría");
        return;
      }

      await loadCategories();
      showSuccess("Categoría eliminada correctamente");
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar la categoría.");
    }
  };
  const handleSaveLocation = async (l) => {
    try {
      const payload = {
        warehouse: Number(l.warehouse),
        aisle: Number(l.aisle),
        rack: (l.rack || "").trim(),
        description: l.description || "",
        status: l.status || "ACTIVE",
      };

      let res, data;

      if (l._id) {
        res = await fetch(`${API_URL}/api/locations/${l._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        data = await res.json();

        if (!res.ok) {
          alert(data.message || "Error actualizando ubicación");
          return;
        }

        showSuccess("Ubicación actualizada correctamente");
      } else {
        res = await fetch(`${API_URL}/api/locations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        data = await res.json();

        if (!res.ok) {
          alert(data.message || "Error registrando ubicación");
          return;
        }

        showSuccess("Ubicación registrada correctamente");
      }

      await loadLocations();
      setSelectedUbicacion(null);
      setCurrentView("acciones");
    } catch (err) {
      console.error(err);
      alert("No se pudo guardar la ubicación.");
    }
  };

  const handleViewLocation = (l) => {
    setSelectedUbicacion(l);
    setCurrentView("detalleUbicacion");
  };

  const handleEditLocation = (l) => {
    setSelectedUbicacion(l);
    setCurrentView("formUbicacion");
  };

  const handleDeleteLocation = async (l) => {
    if (!l?._id) {
      alert("No se puede eliminar: falta el _id de la ubicación.");
      return;
    }

    const ok = confirm(`¿Seguro que deseas eliminar la ubicación "${l.label || l.rack}"?`);
    if (!ok) return;

    try {
      const res = await fetch(`${API_URL}/api/locations/${l._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error eliminando ubicación");
        return;
      }

      await loadLocations();
      showSuccess("Ubicación eliminada correctamente");
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar la ubicación.");
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

      {currentView === "verProductos" && (
        <>
          {loadingProducts && <div className="text-gray-600 mb-3">Cargando productos...</div>}

          <TablaProductos
            products={products}
            onBack={() => setCurrentView("acciones")}
            onView={handleViewProduct}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </>
      )}

      {currentView === "detalleProducto" && (
        <DetalleProducto producto={selectedProducto} onBack={() => setCurrentView("verProductos")} />
      )}

      {currentView === "formCategoria" && (
        <FormularioCategoria
          categoria={selectedCategoria}
          onCancel={() => {
            setSelectedCategoria(null);
            setCurrentView("acciones");
          }}
          onSave={handleSaveCategory}
        />
      )}

      {currentView === "verCategorias" && (
        <>
          {loadingCategories && <div className="text-gray-600 mb-3">Cargando categorías...</div>}

          <TablaCategorias
            categories={categories}
            onBack={() => setCurrentView("acciones")}
            onView={handleViewCategory}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
          />
        </>
      )}

      {currentView === "detalleCategoria" && (
        <DetalleCategoria categoria={selectedCategoria} onBack={() => setCurrentView("verCategorias")} />
      )}

      {currentView === "formUbicacion" && (
        <FormularioUbicacion
          location={selectedUbicacion}
          onCancel={() => {
            setSelectedUbicacion(null);
            setCurrentView("acciones");
          }}
          onSave={handleSaveLocation}
        />
      )}

      {currentView === "verUbicaciones" && (
        <>
          {loadingLocations && <div className="text-gray-600 mb-3">Cargando ubicaciones...</div>}

          <TablaUbicaciones
            locations={locations}
            onBack={() => setCurrentView("acciones")}
            onView={handleViewLocation}
            onEdit={handleEditLocation}
            onDelete={handleDeleteLocation}
          />
        </>
      )}

      {currentView === "detalleUbicacion" && (
        <DetalleUbicacion
          location={selectedUbicacion}
          onBack={() => setCurrentView("verUbicaciones")}
        />
      )}
    </div>
  );
};

export default ProductosAlmacen;
