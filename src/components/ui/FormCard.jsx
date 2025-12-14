// src/components/ui/FormCard.jsx
import React from "react";

const FormCard = ({
  title,
  subtitle,
  children,
  onCancel,
  onSubmit,
  submitText = "Guardar",
  cancelText = "Cancelar",
}) => {
  return (
    <div className="w-full flex flex-col justify-start items-center px-6 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-xl border w-full max-w-lg flex flex-col gap-5">

        {/* Títulos */}
        <h2 className="text-3xl font-bold text-gray-700 text-center">{title}</h2>

        {subtitle && (
          <h3 className="text-md text-gray-500 text-center -mt-4 mb-2">
            {subtitle}
          </h3>
        )}

        {/* Contenido del formulario */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (onSubmit) onSubmit();
          }}
          className="flex flex-col gap-4"
        >
          {children}

          {/* Footer de botones */}
          <div className="flex justify-end gap-4 mt-2">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
              >
                {cancelText}
              </button>
            )}

            {onSubmit && (
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                {submitText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormCard;
