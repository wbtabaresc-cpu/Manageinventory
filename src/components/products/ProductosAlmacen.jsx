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

  // Recuperamos el token del localStorage
  const token = localStorage.getItem("token");

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 2500);
  };

  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch(`${API_URL}/api/products`, {
        headers: { "Authorization": `Bearer ${token}` } // INTEGRACIÓN SEGURIDAD
      });
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
      const res = await fetch(`${API_URL}/api/categories`, {
        headers: { "Authorization": `Bearer ${token}` } // INTEGRACIÓN SEGURIDAD
      });
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
      const res = await fetch(`${API_URL}/api/locations`, {
        headers: { "Authorization": `Bearer ${token}` } // INTEGRACIÓN SEGURIDAD
      });
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
    if (token) {
      loadProducts();
      loadCategories();
      loadLocations();
    }
  }, [token]);

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

      let res, data;
      const headers = { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // INTEGRACIÓN SEGURIDAD
      };

      if (p._id) {
        res = await fetch(`${API_URL}/api/products/${p._id}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_URL}/api/products`, {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });
      }

      data = await res.json();
      if (!res.ok) {
        alert(data.message || "Error al guardar producto");
        return;
      }

      showSuccess(p._id ? "Producto actualizado correctamente" : "Producto registrado correctamente");
      await loadProducts();
      setSelectedProducto(null);
      setCurrentView("acciones");
    } catch (err) {
      console.error(err);
      alert("No se pudo guardar el producto.");
    }
  };

  const handleDeleteProduct = async (producto) => {
    if (!producto?._id) return;
    const ok = confirm(`¿Seguro que deseas eliminar "${producto.name}"?`);
    if (!ok) return;

    try {
      const res = await fetch(`${API_URL}/api/products/${producto._id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` } // INTEGRACIÓN SEGURIDAD
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Error eliminando producto");
        return;
      }
      await loadProducts();
      showSuccess("Producto eliminado correctamente");
    } catch (err) {
      console.error(err);
    }
  };

  // --- MÉTODOS SIMILARES PARA CATEGORÍAS Y UBICACIONES (También con Token) ---

  const handleSaveCategory = async (c) => {
    try {
      const payload = { name: (c.name || "").trim(), description: c.description || "", status: c.status || "ACTIVE" };
      const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` };
      const res = await fetch(`${API_URL}/api/categories${c._id ? `/${c._id}` : ""}`, {
        method: c._id ? "PUT" : "POST",
        headers,
        body: JSON.stringify(payload),
      });
      if (!res.ok) return alert("Error al guardar categoría");
      showSuccess("Categoría guardada correctamente");
      await loadCategories();
      setCurrentView("acciones");
    } catch (err) { console.error(err); }
  };

  const handleDeleteCategory = async (c) => {
    if (!confirm("¿Eliminar categoría?")) return;
    try {
      const res = await fetch(`${API_URL}/api/categories/${c._id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) { loadCategories(); showSuccess("Eliminada"); }
    } catch (err) { console.error(err); }
  };

  const handleSaveLocation = async (l) => {
    try {
      const payload = { warehouse: Number(l.warehouse), aisle: Number(l.aisle), rack: l.rack, description: l.description, status: l.status };
      const res = await fetch(`${API_URL}/api/locations${l._id ? `/${l._id}` : ""}`, {
        method: l._id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (res.ok) { loadLocations(); showSuccess("Ubicación guardada"); setCurrentView("acciones"); }
    } catch (err) { console.error(err); }
  };

  const handleDeleteLocation = async (l) => {
    if (!confirm("¿Eliminar ubicación?")) return;
    try {
      const res = await fetch(`${API_URL}/api/locations/${l._id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) { loadLocations(); showSuccess("Eliminada"); }
    } catch (err) { console.error(err); }
  };

  // --- RENDERIZADO (Se mantiene igual que el tuyo) ---

  const handleViewProduct = (p) => { setSelectedProducto(p); setCurrentView("detalleProducto"); };
  const handleEditProduct = (p) => { setSelectedProducto(p); setCurrentView("formProducto"); };
  const handleViewCategory = (c) => { setSelectedCategoria(c); setCurrentView("detalleCategoria"); };
  const handleEditCategory = (c) => { setSelectedCategoria(c); setCurrentView("formCategoria"); };
  const handleViewLocation = (l) => { setSelectedUbicacion(l); setCurrentView("detalleUbicacion"); };
  const handleEditLocation = (l) => { setSelectedUbicacion(l); setCurrentView("formUbicacion"); };

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
          onCancel={() => { setSelectedProducto(null); setCurrentView("acciones"); }}
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
          onCancel={() => { setSelectedCategoria(null); setCurrentView("acciones"); }}
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
          onCancel={() => { setSelectedUbicacion(null); setCurrentView("acciones"); }}
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