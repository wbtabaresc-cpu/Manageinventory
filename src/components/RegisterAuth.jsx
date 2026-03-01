import React, { useState } from "react";
import { User, Lock, ShieldCheck } from "lucide-react";

const RegisterAuth = ({ onSuccess, onCancel }) => {
  const [authData, setAuthData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("https://manageinventory-bbot.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Usuario o Contraseña incorrectas");
        return;
      }

      if (data.user.role !== "ADMIN") {
        setMessage("Este usuario no tiene permisos de administrador");
        return;
      }

      setMessage("Autenticación correcta");
      setTimeout(() => onSuccess(), 1200);
    } catch (err) {
      console.error(err);
      setMessage("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 md:p-6"
      style={{ backgroundImage: 'url("/img/Fondo.png")', fontFamily: "Segoe UI, sans-serif" }}
    >
      <div className="relative bg-white pt-24 md:pt-28 pb-8 px-6 md:px-10 rounded-2xl shadow-2xl w-full max-w-[420px] text-center border border-gray-100">
        
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white p-4 rounded-full shadow-lg">
          <img
            src="/img/Logo.png"
            alt="Logo"
            className="w-24 h-auto md:w-32"
          />
        </div>

        <div className="mt-4 mb-6">
          <div className="flex justify-center mb-2">
            <ShieldCheck className="text-[#007af0] w-8 h-8" />
          </div>
          <h1 className="text-xl md:text-2xl font-black text-gray-900 leading-tight uppercase">
            Validación de Admin
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Se requiere autorización para registrar nuevos usuarios
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="flex flex-col gap-1">
            <label className="flex items-center text-sm font-bold text-gray-700 ml-1">
              <User className="w-4 h-4 mr-2 text-[#007af0]" /> Usuario Administrador
            </label>
            <input
              type="text"
              required
              name="username"
              placeholder="Ingrese su usuario"
              value={authData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#007af0] outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="flex items-center text-sm font-bold text-gray-700 ml-1">
              <Lock className="w-4 h-4 mr-2 text-[#007af0]" /> Contraseña
            </label>
            <input
              type="password"
              required
              name="password"
              placeholder="••••••••"
              value={authData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#007af0] outline-none transition-all"
            />
          </div>

          <div className="pt-2 space-y-3">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 bg-[#007af0] text-white font-bold text-lg rounded-xl shadow-lg transition-all active:scale-95 ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
            >
              {loading ? "Validando..." : "Confirmar"}
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="w-full py-3 bg-gray-100 text-gray-600 font-bold text-lg rounded-xl hover:bg-gray-200 transition-all"
            >
              Cancelar
            </button>
          </div>

          {message && (
            <div className={`text-center p-2 rounded-lg mt-2 text-sm font-semibold animate-pulse ${
              message.includes("correcta") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterAuth;