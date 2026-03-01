import React from "react";
import { AlertCircle } from "lucide-react";

const AlertBox = () => {
  return (
    <div className="bg-red-600 text-white px-6 py-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4 mt-6 md:mt-8 shadow-xl border border-red-700 w-full transition-all hover:scale-[1.01]">
      <div className="bg-white/20 p-2 rounded-lg shrink-0">
        <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
      </div>
      
      <div className="text-center sm:text-left">
        <p className="font-bold text-base md:text-lg leading-tight">
          Alertas de Inventario
        </p>
        <p className="text-xs md:text-sm text-red-100 opacity-90 font-medium">
          Tienes productos con bajo stock o ubicaciones por vencer.
        </p>
      </div>
    </div>
  );
};

export default AlertBox;