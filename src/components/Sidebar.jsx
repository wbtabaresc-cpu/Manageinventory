import React from "react";
import { Home, Boxes, Layers, FileText, Truck, BarChart2, Shield, X, Search } from "lucide-react";

const menuItems = [
  { id: "inicio", label: "Inicio", icon: <Home size={20} /> },
  { id: "productos", label: "Productos y Almacén", icon: <Boxes size={20} /> },
  { id: "movimientos", label: "Movimientos y Stock", icon: <Layers size={20} /> },
  { id: "procesos", label: "Procesos", icon: <FileText size={20} /> },
  { id: "proveedores", label: "Proveedores", icon: <Truck size={20} /> },
  { id: "reportes", label: "Reportes", icon: <BarChart2 size={20} /> },
  { id: "admin", label: "Administración", icon: <Shield size={20} /> },
];

const Sidebar = ({ activeSection, setActiveSection, isOpen, setIsOpen }) => {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "William" };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsOpen(false)} />}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 bg-blue-600 text-white w-64 md:w-72 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform flex flex-col`}>
        
        <div className="flex flex-col items-center py-10 px-6">
           <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-xl p-2">
              <img src="/img/Logo.png" alt="Logo" className="w-full h-full object-contain" />
           </div>
           <p className="text-xs text-blue-100 font-bold uppercase tracking-widest text-center">
             GESTIÓN DE INVENTARIO
           </p>
        </div>

        <nav className="flex-1 px-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button onClick={() => { setActiveSection(item.id); if (window.innerWidth < 768) setIsOpen(false); }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeSection === item.id ? "bg-white text-blue-600" : "text-blue-100 hover:bg-white/10"}`}>
                  {item.icon} <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-6 border-t border-blue-500/30 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">W</div>
            <div className="min-w-0 text-white">
              <p className="text-xs font-bold opacity-70">ADMIN</p>
              <p className="text-sm font-black truncate">{user.name}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;