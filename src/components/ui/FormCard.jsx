import React from "react";

const FormCard = ({
  title,
  subtitle,
  children,
  onCancel,
  onSubmit,
  submitText = "Guardar",
  cancelText = "Cancelar",
  maxWidth = "max-w-2xl", // Nuevo prop con valor por defecto más amplio
}) => {
  return (
    /* Ajustamos el padding lateral (px-4) para que en móvil no pegue a los bordes */
    <div className="w-full flex flex-col justify-start items-center px-4 md:px-6 py-6 md:py-10">
      
      {/* Cambiamos max-w-lg por la prop {maxWidth}. 
         Esto permite que el formulario de productos sea max-w-4xl 
         mientras que el de login siga siendo pequeño.
      */}
      <div className={`bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 w-full ${maxWidth} flex flex-col gap-5 transition-all`}>

        <div className="text-center space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800">{title}</h2>
          {subtitle && (
            <h3 className="text-sm md:text-base text-gray-500 font-medium italic">
              {subtitle}
            </h3>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (onSubmit) onSubmit();
          }}
          className="flex flex-col gap-4"
        >
          {/* Aquí inyectamos los campos de los formularios */}
          <div className="w-full">
            {children}
          </div>

          {/* Botones responsivos: se ponen uno arriba del otro en móviles muy pequeños */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="order-2 sm:order-1 bg-gray-100 text-gray-700 px-8 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                {cancelText}
              </button>
            )}

            {onSubmit && (
              <button
                type="submit"
                className="order-1 sm:order-2 bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
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