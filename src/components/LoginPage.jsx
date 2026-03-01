import React, { useState } from "react";
import { User, Lock } from "lucide-react";
import RegisterAuth from "./RegisterAuth";
import RegisterUserForm from "./RegisterUserForm";

const LoginPage = ({ setAuth }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [showRegisterAuth, setShowRegisterAuth] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("https://manageinventory-bbot.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage("Usuario o contraseña incorrectos.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Inicio de sesión exitoso.");
      setAuth(true);
    } catch (error) {
      console.error(error);
      setMessage("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  if (showRegisterAuth) {
    return (
      <RegisterAuth
        onSuccess={() => {
          setShowRegisterAuth(false);
          setShowRegisterForm(true);
        }}
        onCancel={() => setShowRegisterAuth(false)}
      />
    );
  }

  if (showRegisterForm) {
    return <RegisterUserForm onCancel={() => setShowRegisterForm(false)} />;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 md:p-6"
      style={{ backgroundImage: 'url("/img/Fondo.png")', fontFamily: "Segoe UI, sans-serif" }}
    >
      <div className="relative bg-white pt-24 md:pt-32 pb-8 px-6 md:px-10 rounded-2xl shadow-2xl w-full max-w-[420px] text-center border border-gray-100">
        
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white p-4 rounded-full shadow-lg">
          <img
            src="/img/Logo.png"
            alt="Logo"
            className="w-24 h-auto md:w-32"
          />
        </div>

        <div className="mt-4 md:mt-0">
          <h1 className="mb-1 text-2xl md:text-3xl font-black text-gray-900 tracking-tight">BIENVENIDO</h1>
          <p className="mb-6 text-gray-500 font-medium italic">Iniciar Sesión</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="flex flex-col gap-1">
            <label className="flex items-center text-sm font-bold text-gray-700 ml-1">
              <User className="w-4 h-4 mr-2 text-[#007af0]" /> Usuario
            </label>
            <input
              type="text"
              required
              name="username"
              placeholder="Tu nombre de usuario"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#007af0] focus:border-[#007af0] outline-none transition-all shadow-sm"
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
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#007af0] focus:border-[#007af0] outline-none transition-all shadow-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 bg-[#007af0] text-white font-bold text-lg rounded-xl mt-4 shadow-lg transition-all transform hover:scale-[1.01] active:scale-95 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Verificando..." : "Ingresar"}
          </button>

          {message && (
            <div className={`text-center p-2 rounded-lg mt-2 text-sm font-semibold ${
              message.includes("exitoso") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {message}
            </div>
          )}

          <div className="pt-6 flex flex-col gap-3 text-center sm:flex-row sm:justify-between sm:text-left text-xs md:text-sm">
            <a href="#" className="text-[#007af0] font-bold hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
            <button
              type="button"
              onClick={() => setShowRegisterAuth(true)}
              className="text-[#007af0] font-bold hover:underline"
            >
              Crear cuenta nueva
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;