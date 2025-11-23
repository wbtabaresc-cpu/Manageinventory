import React from "react";
import { Home, Boxes, Layers, FileText, Truck, BarChart2, Shield } from "lucide-react";

const menuItems = [
  { id: "inicio", label: "Inicio", icon: <Home /> },
  { id: "productos", label: "Productos y Almacén", icon: <Boxes /> },
  { id: "movimientos", label: "Movimientos y Stock", icon: <Layers /> },
  { id: "procesos", label: "Procesos (Solicitudes y Órdenes)", icon: <FileText /> },
  { id: "proveedores", label: "Proveedores", icon: <Truck /> },
  { id: "reportes", label: "Reportes", icon: <BarChart2 /> },
  { id: "admin", label: "Administración", icon: <Shield /> },
];

const Sidebar = ({ activeSection, setActiveSection }) => {
  return (
    <aside className="fixed left-5 top-[120px] bg-blue-600 text-white w-60 rounded-2xl p-4 h-[60vh] shadow-lg">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full rounded-full px-4 py-2 text-gray-700"
        />
      </div>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left ${
                  activeSection === item.id
                    ? "bg-blue-800 font-semibold"
                    : "hover:bg-blue-500"
                }`}
              >
                <span className="w-5 h-5">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
