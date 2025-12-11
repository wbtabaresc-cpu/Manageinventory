import React, { useState } from "react";
import { User, Lock } from "lucide-react";

const RegisterAuth = ({ onSuccess, onCancel }) => {
  const [authData, setAuthData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authData), // { username, password }
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
  }
};


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

        <h1 className="mb-2 text-2xl font-bold text-gray-900">AUTENTICAR USUARIO ADMINISTRADOR</h1>
        <h2 className="mb-5 text-lg text-gray-700">Ingrese sus credenciales administrativas</h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
              <User className="w-4 h-4 mr-2" /> Usuario administrador:
            </label>
            <input
              type="text"
              required
              name="username"
              placeholder="Usuario administrador"
              value={authData.username}
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
              placeholder="Contraseña"
              value={authData.password}
              onChange={handleChange}
              className="w-full p-2 border border-[#007af0] rounded-md focus:ring-1 focus:ring-[#007af0]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#007af0] text-white font-bold text-lg rounded-md mt-6 hover:bg-blue-700"
          >
            Confirmar
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full py-3 bg-red-600 text-white font-bold text-lg rounded-md hover:bg-red-700 mt-2"
          >
            Cancelar
          </button>

          {message && (
            <p className={`text-center text-sm pt-2 ${message.includes("correcta") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterAuth;
