import React, { useState, useRef, useEffect } from "react";
import { Bell, Mail, User, Lock, LogOut, Menu, Boxes } from "lucide-react";

const Header = ({ setAuth, setIsSidebarOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Usuario" };

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
    <header className="fixed top-0 right-0 left-0 bg-white shadow-sm z-20 flex justify-between items-center px-4 md:px-8 h-20 border-b border-gray-100">
      
      <div className="flex items-center gap-4 md:gap-6 flex-1">
        <button 
          onClick={() => setIsSidebarOpen?.(prev => !prev)}
          className="p-2 hover:bg-gray-100 rounded-lg md:hidden shrink-0"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

        <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-2xl shadow-lg shrink-0">
          <Boxes className="text-white w-8 h-8 md:w-10 md:h-10" />
        </div>
        
        <div className="flex flex-col min-w-0">
          <h1 className="text-base md:text-2xl font-black text-gray-800 tracking-tighter leading-tight uppercase whitespace-normal md:whitespace-nowrap">
            SISTEMA DE GESTIÓN DE INVENTARIO
          </h1>
          <h2 className="text-xs md:text-base text-blue-600 font-bold leading-none">
            Bienvenido, {user.name} 👋
          </h2>
        </div>
      </div>

      <div className="flex gap-4 md:gap-6 text-gray-500 items-center relative shrink-0" ref={menuRef}>
        <div className="hidden sm:flex gap-4">
          <Bell className="w-6 h-6 cursor-pointer hover:text-blue-600 transition-colors" />
          <Mail className="w-6 h-6 cursor-pointer hover:text-blue-600 transition-colors" />
        </div>

        <div className="relative">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="bg-blue-100 p-2 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <span className="hidden lg:inline text-sm font-bold text-gray-700">Mi Perfil</span>
          </div>

          {menuOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 z-30">
              <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 gap-3">
                <Lock size={16} /> Cambiar Contraseña
              </button>
              <hr className="my-1" />
              <button className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 gap-3 font-bold" onClick={() => setAuth(false)}>
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