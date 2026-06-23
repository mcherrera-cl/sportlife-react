import { useState, useEffect } from "react";
import "./App.css";
import { AppContext } from "./context/contex";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {}, []);

  return (
    <>
      <AppContext.Provider value={{ users, setUsers }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<h2>No encontrado</h2>} />
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
