import React from "react";
import { AlertCircle } from "lucide-react";

const AlertBox = () => {
  return (
    <footer className="bg-red-600 !bg-red-600 text-white px-20 py-4 rounded-xl flex items-center gap-3 text-lg mt-14 shadow-lg border border-red-700">
      <AlertCircle className="w-8 h-8" />
      Alertas Importantes (bajo stock, productos)
    </footer>
  );
};


export default AlertBox;
