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

  if (activeSection === "inicio") {
    return (
      <div className="flex flex-col items-center w-full px-4 md:px-6 pt-4 md:pt-10 transition-all">
        <section className="w-full max-w-7xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight">
              Panel de Resumen
            </h2>
            <p className="text-sm text-gray-500 font-medium">Estado general de tu almacén hoy</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {[
              { icon: <Boxes />, label: "Productos Totales", value: "120" },
              { icon: <CheckCircle />, label: "Stock Actual", value: "850" },
              { icon: <AlertTriangle />, label: "Alertas", value: "3" },
              { icon: <Clock />, label: "Último Ingreso", value: "10:30 AM" }
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 p-6 md:p-8 rounded-3xl flex flex-col justify-center items-center gap-2 shadow-sm hover:shadow-xl hover:border-blue-100 cursor-pointer transition-all group"
              >
                <div className="text-3xl md:text-4xl text-blue-600 group-hover:scale-110 transition-transform mb-1">
                  {card.icon}
                </div>
                <p className="text-2xl md:text-3xl font-black text-gray-800">{card.value}</p>
                <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider">
                  {card.label}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-4 md:space-y-6">
            <ActionButtons />
            <AlertBox />
          </div>
        </section>
      </div>
    );
  }

  if (activeSection === "productos") {
    return (
      <div className="flex flex-col items-center w-full px-4 md:px-6 pt-4 md:pt-10">
        <div className="w-full max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight">
              Productos y Almacén
            </h2>
          </div>
          <ProductosAlmacen />
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 pt-10">
      <h2 className="text-2xl font-black text-gray-800 capitalize mb-6 tracking-tight">
        {activeSection}
      </h2>
      <div className="bg-white p-10 rounded-3xl border border-dashed border-gray-200 text-center text-gray-400">
        Sección en desarrollo para la Fase 2 del proyecto.
      </div>
    </div>
  );
};

export default MainContent;