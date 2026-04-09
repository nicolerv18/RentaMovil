
import './App.css'

import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Reservation from  './pages/Reservation';
import Count from './pages/Count';
import Notificacion from "./pages/notification";
import Pago from "./pages/page";

function App() {
  return (
    <BrowserRouter>
      {/* Navegación */}
      <nav>
        <Link to="/pago">Pago</Link>
      </nav>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reservation" element={<Reservation/>} />
        <Route path="/count" element={<Count/>} />
        <Route path="/notification" element={<Notificacion/>} />
        <Route path="/pago" element={<Pago/>} />
      </Routes>

    </BrowserRouter>
  );
}
export default App;
