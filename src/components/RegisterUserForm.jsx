import React from "react";

const RegisterUserForm = ({ onCancel }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-6">
      <form className="bg-white p-8 rounded-2xl shadow-xl border w-full max-w-lg flex flex-col gap-5">
        
        <h2 className="text-3xl font-bold text-gray-700 mb-4 text-center">
          Registrar Usuario Nu evo
        </h2>

        <input type="text" placeholder="Nombre completo"
          className="border px-4 py-2 rounded-lg" />

        <input type="email" placeholder="Correo"
          className="border px-4 py-2 rounded-lg" />

        <input type="text" placeholder="Nombre de usuario"
          className="border px-4 py-2 rounded-lg" />

        <input type="password" placeholder="Contraseña"
          className="border px-4 py-2 rounded-lg" />

          <input type="password" placeholder="Repetir Contraseña"
          className="border px-4 py-2 rounded-lg" />

        <select className="border px-4 py-2 rounded-lg">
          <option>Seleccionar rol</option>
          <option>Administrador</option>
          <option>Supervisor</option>
          <option>Coordinador</option>
          <option>Operador</option>
        </select>

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
