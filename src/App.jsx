import React, { useState } from 'react';
import LoginPage from './components/LoginPage.jsx'; 
import Dashboard from './components/Dashboard.jsx';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <Dashboard setAuth={setAuth} />
      ) : (
        <LoginPage setAuth={setAuth} />
      )}
    </div>
  );
};

export default App;