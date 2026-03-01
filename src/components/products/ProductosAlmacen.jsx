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

import { API_URL } from "../../config";

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

  const token = localStorage.getItem("token");

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 2500);
  };

  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch(`${API_URL}/products`, {
        headers: { "Authorization": `Bearer ${token}` }
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
      const res = await fetch(`${API_URL}/categories`, {
        headers: { "Authorization": `Bearer ${token}` }
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
      const res = await fetch(`${API_URL}/locations`, {
        headers: { "Authorization": `Bearer ${token}` }
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

      let res;
      const headers = { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      if (p._id) {
        res = await fetch(`${API_URL}/products/${p._id}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_URL}/products`, {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
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
      const res = await fetch(`${API_URL}/products/${producto._id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
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

  const handleSaveCategory = async (c) => {
    try {
      const payload = { name: (c.name || "").trim(), description: c.description || "", status: c.status || "ACTIVE" };
      const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${token}` };
      const res = await fetch(`${API_URL}/categories${c._id ? `/${c._id}` : ""}`, {
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
      const res = await fetch(`${API_URL}/categories/${c._id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) { loadCategories(); showSuccess("Eliminada"); }
    } catch (err) { console.error(err); }
  };

  const handleSaveLocation = async (l) => {
    try {
      const payload = { warehouse: Number(l.warehouse), aisle: Number(l.aisle), rack: l.rack, description: l.description, status: l.status };
      const res = await fetch(`${API_URL}/locations${l._id ? `/${l._id}` : ""}`, {
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
      const res = await fetch(`${API_URL}/locations/${l._id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) { loadLocations(); showSuccess("Eliminada"); }
    } catch (err) { console.error(err); }
  };

  const handleViewProduct = (p) => { setSelectedProducto(p); setCurrentView("detalleProducto"); };
  const handleEditProduct = (p) => { setSelectedProducto(p); setCurrentView("formProducto"); };
  const handleViewCategory = (c) => { setSelectedCategoria(c); setCurrentView("detalleCategoria"); };
  const handleEditCategory = (c) => { setSelectedCategoria(c); setCurrentView("formCategoria"); };
  const handleViewLocation = (l) => { setSelectedUbicacion(l); setCurrentView("detalleUbicacion"); };
  const handleEditLocation = (l) => { setSelectedUbicacion(l); setCurrentView("formUbicacion"); };

  return (
    <div className="flex flex-col w-full items-center px-4 md:px-8 py-6 max-w-7xl mx-auto min-h-screen">
      
      {/* Mensaje de éxito flotante */}
      {successMessage && (
        <div className="fixed top-5 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-2xl font-semibold animate-bounce">
          {successMessage}
        </div>
      )}

      {/* VISTA: ACCIONES PRINCIPALES */}
      {currentView === "acciones" && (
        <div className="w-full flex flex-col gap-10">
          <AccionesProducto onAction={handleAction} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            <ActionButtons />
            <AlertBox />
          </div>
        </div>
      )}

      {/* VISTA: FORMULARIO PRODUCTO */}
      {currentView === "formProducto" && (
        <div className="w-full max-w-3xl">
          <FormularioProducto
            producto={selectedProducto}
            categories={categories} 
            locations={locations}
            onCancel={() => { setSelectedProducto(null); setCurrentView("acciones"); }}
            onSave={handleSaveProduct}
          />
        </div>
      )}

      {/* VISTA: TABLA PRODUCTOS */}
      {currentView === "verProductos" && (
        <div className="w-full flex flex-col gap-4">
          <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
            {loadingProducts && <div className="p-4 text-center text-blue-600 font-medium">Cargando productos...</div>}
            <TablaProductos
              products={products}
              onBack={() => setCurrentView("acciones")}
              onView={handleViewProduct}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          </div>
        </div>
      )}

      {/* VISTA: DETALLE PRODUCTO */}
      {currentView === "detalleProducto" && (
        <div className="w-full max-w-4xl">
          <DetalleProducto producto={selectedProducto} onBack={() => setCurrentView("verProductos")} />
        </div>
      )}

      {/* VISTA: FORMULARIO CATEGORÍA */}
      {currentView === "formCategoria" && (
        <div className="w-full max-w-2xl">
          <FormularioCategoria
            categoria={selectedCategoria}
            onCancel={() => { setSelectedCategoria(null); setCurrentView("acciones"); }}
            onSave={handleSaveCategory}
          />
        </div>
      )}

      {/* VISTA: TABLA CATEGORÍAS */}
      {currentView === "verCategorias" && (
        <div className="w-full overflow-x-auto bg-white rounded-xl shadow-md">
          {loadingCategories && <div className="p-4 text-center">Cargando categorías...</div>}
          <TablaCategorias
            categories={categories}
            onBack={() => setCurrentView("acciones")}
            onView={handleViewCategory}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
          />
        </div>
      )}

      {/* VISTA: DETALLE CATEGORÍA */}
      {currentView === "detalleCategoria" && (
        <div className="w-full max-w-2xl">
          <DetalleCategoria categoria={selectedCategoria} onBack={() => setCurrentView("verCategorias")} />
        </div>
      )}

      {/* VISTA: FORMULARIO UBICACIÓN */}
      {currentView === "formUbicacion" && (
        <div className="w-full max-w-2xl">
          <FormularioUbicacion
            location={selectedUbicacion}
            onCancel={() => { setSelectedUbicacion(null); setCurrentView("acciones"); }}
            onSave={handleSaveLocation}
          />
        </div>
      )}

      {/* VISTA: TABLA UBICACIONES */}
      {currentView === "verUbicaciones" && (
        <div className="w-full overflow-x-auto bg-white rounded-xl shadow-md">
          {loadingLocations && <div className="p-4 text-center">Cargando ubicaciones...</div>}
          <TablaUbicaciones
            locations={locations}
            onBack={() => setCurrentView("acciones")}
            onView={handleViewLocation}
            onEdit={handleEditLocation}
            onDelete={handleDeleteLocation}
          />
        </div>
      )}

      {/* VISTA: DETALLE UBICACIÓN */}
      {currentView === "detalleUbicacion" && (
        <div className="w-full max-w-2xl">
          <DetalleUbicacion
            location={selectedUbicacion}
            onBack={() => setCurrentView("verUbicaciones")}
          />
        </div>
      )}
    </div>
  );
};

export default ProductosAlmacen;