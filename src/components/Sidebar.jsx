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
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        bg-blue-600 text-white w-64 md:w-72
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
        flex flex-col shadow-2xl md:shadow-none
      `}>
        
        <div className="flex items-center justify-between p-6 md:hidden">
          <span className="font-black text-xl italic">SIGI MENU</span>
          <button onClick={() => setIsOpen(false)} className="p-2 bg-white/10 rounded-lg">
            <X size={24} />
          </button>
        </div>

        <div className="hidden md:flex flex-col items-center py-10 px-6">
           <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Boxes className="text-blue-600 w-10 h-10" />
           </div>
           <h2 className="text-xl font-black italic tracking-widest text-blue-100">INVENTARIO</h2>
        </div>

        <div className="px-6 mb-6">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300 group-focus-within:text-white transition-colors" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full bg-blue-700/50 border border-blue-500/30 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-blue-300 outline-none focus:ring-2 focus:ring-white/20 transition-all"
            />
          </div>
        </div>

        <nav className="flex-1 px-4 overflow-y-auto custom-scrollbar">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveSection(item.id);
                    if (window.innerWidth < 768) setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all
                    ${activeSection === item.id
                      ? "bg-white text-blue-600 shadow-lg shadow-blue-800/20 translate-x-1"
                      : "text-blue-100 hover:bg-white/10 hover:translate-x-1"
                    }
                  `}
                >
                  <span className={`${activeSection === item.id ? "text-blue-600" : "text-blue-300"}`}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-6 border-t border-blue-500/30 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white/20 flex items-center justify-center font-bold">
              G
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-blue-200 uppercase tracking-tighter">Operador</p>
              <p className="text-sm font-black truncate">Ge Desarrollador</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;