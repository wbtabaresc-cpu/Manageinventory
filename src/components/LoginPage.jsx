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
    const res = await fetch("http://localhost:5000/api/auth/login", {
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

    // Guardar token y usuario
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
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat p-4"
      style={{ backgroundImage: 'url("/img/Fondo.png")', fontFamily: "Segoe UI, sans-serif" }}
    >
      <div className="relative bg-white pt-[180px] pb-10 px-10 rounded-xl shadow-2xl w-[450px] text-center">
        <img
          src="/img/Logo.png"
          alt="Logo"
          className="absolute top-20 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[100px]"
        />

        <h1 className="mb-2 text-2xl font-bold text-gray-900">BIENVENIDO</h1>
        <h2 className="mb-5 text-lg text-gray-700">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
              <User className="w-4 h-4 mr-2" /> Usuario:
            </label>
            <input
              type="text"
              required
              name="username"
              placeholder="Escribe tu usuario"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-[#007af0] rounded-md focus:ring-1 focus:ring-[#007af0]"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
              <Lock className="w-4 h-4 mr-2" /> Contraseña:
            </label>
            <input
              type="password"
              required
              name="password"
              placeholder="Escribe tu contraseña"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border border-[#007af0] rounded-md focus:ring-1 focus:ring-[#007af0]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-[#007af0] text-white font-bold text-lg rounded-md mt-6 hover:bg-blue-700 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Cargando..." : "Ingresar"}
          </button>

          {message && (
            <p className={`text-center text-sm pt-2 ${message.includes("exitoso") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          <div className="pt-2 flex justify-between text-sm">
            <a href="#" className="text-[#007af0] hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
            <button
              type="button"
              onClick={() => setShowRegisterAuth(true)}
              className="text-[#007af0] hover:underline"
            >
              Registrar nuevo usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
