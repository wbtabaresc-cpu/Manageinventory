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

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          username: formData.username,
          password: formData.password,
          role: formData.role, // ADMIN, SUPERVISOR, etc.
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Error al registrar usuario");
        return;
      }

      setMessage("Usuario registrado correctamente");
      // Si quieres, puedes volver automáticamente al login:
      // setTimeout(onCancel, 1500);
    } catch (err) {
      console.error(err);
      setMessage("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl border w-full max-w-lg flex flex-col gap-5"
      >
        <h2 className="text-3xl font-bold text-gray-700 mb-4 text-center">
          Registrar Usuario Nuevo
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          value={formData.name}
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={formData.email}
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg"
          required
        />

        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={formData.username}
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg"
          required
        />

        <input
          type="password"
          name="repeatPassword"
          placeholder="Repetir Contraseña"
          value={formData.repeatPassword}
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="ADMIN">Administrador</option>
          <option value="SUPERVISOR">Supervisor</option>
          <option value="COORDINATOR">Coordinador</option>
          <option value="OPERATOR">Operador</option>
        </select>

        {message && (
          <p
            className={`text-sm ${
              message.includes("correctamente") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUserForm;
