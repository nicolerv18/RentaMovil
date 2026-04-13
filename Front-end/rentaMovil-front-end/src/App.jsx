
import './App.css'

import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Reservation from  './pages/Reservation';
import Count from './pages/Count';
import Notification from "./pages/Notification";
import Payment from "./pages/Payment";
import { useEffect, useState } from "react";
import ChangePassword from "./pages/ChangePassword";



function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Leer el estado guardado en localStorage
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  useEffect(() => {
    // Guardar el estado en localStorage cuando cambia
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
  return (
    
    <BrowserRouter>
      {/* Navegación */}
      <nav>
        <Link to="/payment">Payment</Link>
      </nav>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Reservation" element={<Reservation/>} />
        <Route path="/Count"element={<Count darkMode={darkMode} setDarkMode={setDarkMode} />}/>
        <Route path="/Notification" element={<Notification/>} />
        <Route path="/Payment" element={<Payment/>} />
        <Route path="/ChangePassword" element={<ChangePassword/>} />
      </Routes>

    </BrowserRouter>
  );
}
export default App;
