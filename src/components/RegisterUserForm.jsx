import React, { useState } from "react";

const RegisterUserForm = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
    role: "OPERATOR",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.password !== formData.repeatPassword) {
      setMessage("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://manageinventory-bbot.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          username: formData.username,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Error al registrar usuario");
        return;
      }

      setMessage("Usuario registrado correctamente");
    } catch (err) {
      console.error(err);
      setMessage("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl border border-gray-100 w-full max-w-2xl flex flex-col gap-6"
      >
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 uppercase tracking-tight">
            Nuevo Usuario
          </h2>
          <p className="text-gray-500 text-sm font-medium">Asigne credenciales y roles al personal</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Nombre Completo</label>
            <input
              type="text"
              name="name"
              placeholder="Ej: Juan Pérez"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="correo@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Usuario de Sistema</label>
            <input
              type="text"
              name="username"
              placeholder="jperez2026"
              value={formData.username}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Rol de Acceso</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none bg-white font-medium"
            >
              <option value="ADMIN">Administrador</option>
              <option value="SUPERVISOR">Supervisor</option>
              <option value="COORDINATOR">Coordinador</option>
              <option value="OPERATOR">Operador</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Confirmar Contraseña</label>
            <input
              type="password"
              name="repeatPassword"
              placeholder="••••••••"
              value={formData.repeatPassword}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              required
            />
          </div>
        </div>

        {message && (
          <div className={`text-center p-3 rounded-xl text-sm font-bold animate-pulse ${
            message.includes("correctamente") 
            ? "bg-green-50 text-green-700 border border-green-200" 
            : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            {message}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-3 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-all order-2 sm:order-1"
          >
            Regresar
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 order-1 sm:order-2 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Registrando..." : "Crear Usuario"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUserForm;