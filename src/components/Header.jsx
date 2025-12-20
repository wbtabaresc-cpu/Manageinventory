import React, { useState, useRef, useEffect } from "react";
import { Bell, Mail, User, Lock, LogOut } from "lucide-react";

const Header = ({ setAuth }) => {
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
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-10 flex justify-between items-center px-8 h-20">

      <div className="flex items-center gap-4">
        <img src="/img/Logo.png" alt="Logo" className="w-28 h-18" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">SISTEMA DE INVENTARIO</h1>
          <h2 className="text-lg text-gray-600">Bienvenido, Usuario Admin</h2>
        </div>
      </div>


      <div className="flex gap-8 text-blue-600 items-center relative" ref={menuRef}>
        <Bell className="w-9 h-9 cursor-pointer hover:text-gray-600 transition-transform hover:scale-110" />
        <Mail className="w-9 h-9 cursor-pointer hover:text-gray-600 transition-transform hover:scale-110" />


        <div className="relative">
          <User
            className="w-9 h-9 cursor-pointer hover:text-gray-600 transition-transform hover:scale-110"
            onClick={() => setMenuOpen(!menuOpen)}
          />

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-20">
              <button
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 gap-2"
                onClick={() => alert('Función de cambiar contraseña')}
              >
                <Lock size={18} /> Cambiar Contraseña
              </button>
              <hr className="my-1" />
              <button
                className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 gap-2"
                onClick={() => setAuth(false)}
              >
                <LogOut size={18} /> Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
