import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const Dashboard = ({ setAuth }) => {
  const [activeSection, setActiveSection] = useState("inicio");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">

    
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col min-w-0"> 
        
        <Header setAuth={setAuth} setIsSidebarOpen={setIsSidebarOpen} />

  
        <main className="flex-1 overflow-y-auto px-4 md:px-8 pt-20 md:pt-24 pb-6 scroll-smooth">
          <div className="max-w-7xl mx-auto w-full">
            <MainContent activeSection={activeSection} />
          </div>
        </main>

      </div>
    </div>
  );
};

export default Dashboard;