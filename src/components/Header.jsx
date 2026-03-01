import React, { useState, useRef, useEffect } from "react";
import { Bell, Mail, User, Lock, LogOut, Menu } from "lucide-react";

const Header = ({ setAuth, setIsSidebarOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 bg-white/90 backdrop-blur-md shadow-sm z-20 flex justify-between items-center px-4 md:px-8 h-16 md:h-20 border-b border-gray-100">

      <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
        <button 
          onClick={() => setIsSidebarOpen?.(prev => !prev)}
          className="p-2 hover:bg-gray-100 rounded-lg md:hidden"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

        <img src="/img/Logo.png" alt="Logo" className="w-16 h-auto md:w-24 shrink-0" />
        
        <div className="min-w-0">
          <h1 className="text-sm md:text-xl font-black text-gray-800 truncate uppercase tracking-tight">
            SISTEMA DE INVENTARIO
          </h1>
          <h2 className="text-[10px] md:text-sm text-blue-600 font-bold truncate">
            Admin: Ge
          </h2>
        </div>
      </div>

      <div className="flex gap-3 md:gap-6 text-blue-600 items-center relative" ref={menuRef}>
        <div className="hidden sm:flex gap-4">
          <Bell className="w-5 h-5 md:w-7 md:h-7 cursor-pointer hover:text-gray-400 transition-all" />
          <Mail className="w-5 h-5 md:w-7 md:h-7 cursor-pointer hover:text-gray-400 transition-all" />
        </div>

        <div className="relative">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 md:p-2 rounded-xl transition-all border border-transparent hover:border-gray-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="bg-blue-100 p-1.5 md:p-2 rounded-lg">
              <User className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
            </div>
            <span className="hidden lg:inline text-sm font-bold text-gray-700">Mi Perfil</span>
          </div>

          {menuOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 z-30 animate-in fade-in zoom-in duration-200">
              <div className="px-4 py-2 border-b border-gray-50 mb-1">
                <p className="text-xs text-gray-400 font-bold">CONFIGURACIÓN</p>
              </div>
              <button
                className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors gap-3"
                onClick={() => alert('Función de cambiar contraseña')}
              >
                <Lock size={16} /> Cambiar Contraseña
              </button>
              <hr className="my-1 border-gray-50" />
              <button
                className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors gap-3 font-bold"
                onClick={() => setAuth(false)}
              >
                <LogOut size={16} /> Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;