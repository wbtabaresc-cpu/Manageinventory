import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const Dashboard = ({ setAuth }) => {
  const [activeSection, setActiveSection] = useState("inicio");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Menu con barra lateral fija */}
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      {/* Contenedor de los botones principales */}
      <div className="flex-1 flex flex-col">
        <Header setAuth={setAuth} />

        <main className="flex-1 px-6 pt-24 pb-6 bg-transparent">
        <MainContent activeSection={activeSection} />
        </main>

      </div>
    </div>
  );
};

export default Dashboard;
