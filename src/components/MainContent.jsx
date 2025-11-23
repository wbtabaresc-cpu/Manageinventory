import React from "react";
import {
  Boxes,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react";

import ActionButtons from "./ActionButtons";
import AlertBox from "./AlertBox";
import ProductosAlmacen from "./products/ProductosAlmacen";


const MainContent = ({ activeSection }) => {

  // inicio
  if (activeSection === "inicio") {
    return (
      <div className="flex flex-col items-center w-full px-6 pt-20">
        <section className="w-full max-w-6xl">
          <h2 className="text-3xl font-bold mb-9 text-gray-700">
            Panel de Resumen
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-7">
            {[
              { icon: <Boxes />, label: "Productos Totales" },
              { icon: <CheckCircle />, label: "Stock Actual" },
              { icon: <AlertTriangle />, label: "Alertas" },
              { icon: <Clock />, label: "Último Ingreso" }
            ].map((card, i) => (
              <div
                key={i}
                className="bg-blue-600 text-white p-10 rounded-2xl flex flex-col justify-center items-center gap-3 shadow-lg hover:bg-blue-700 cursor-pointer transition transform hover:scale-105"
              >
                <div className="text-5xl">{card.icon}</div>
                <p className="text-xl font-semibold">{card.label}</p>
              </div>
            ))}
          </div>
          <ActionButtons />
          <AlertBox />
        </section>
      </div>
    );
  }

 // Productos y almacen
if (activeSection === "productos") {
  return (
    <div className="flex flex-col items-center w-full px-6 pt-20">
      <div className="w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">
          Productos y Almacén
        </h2>
        <ProductosAlmacen />
      </div>
    </div>
  );
}



  // Contenedor base para futuras secciones del sistem
  return (
    <div className="px-6 pt-20">
      <h2 className="text-2xl font-bold text-gray-700 capitalize mb-6">
        {activeSection}
      </h2>
    </div>
  );
};

export default MainContent;
