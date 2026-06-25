import { useState, useEffect } from "react";
import "./App.css";
import { AppContext } from "./context/contex";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "./components/Footer";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {}, []);

  return (
    <>
      <AppContext.Provider value={{ users, setUsers }}>
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<h2>No encontrado</h2>} />
          </Routes>
        </Container>
      <Footer/>
      </AppContext.Provider>
    </>
  );
}

export default App;
