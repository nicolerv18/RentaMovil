
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
    const saved = localStorage.getItem('darkMode'); //hace que al recargar la pagina no se reinice a modo claro, guardandolo en el localStorage del navegador, y al cargar la pagina se lee ese valor para establecer el estado inicial de darkMode. Si no hay un valor guardado, se establece como false (modo claro).
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
