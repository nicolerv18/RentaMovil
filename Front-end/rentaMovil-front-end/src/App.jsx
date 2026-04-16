import './App.css'
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Reservation from  './pages/Reservation';
import Count from './pages/Count';
import Notification from "./pages/Notification";
import Payment from "./pages/Payment";

function App() {
  return (
    <BrowserRouter>
      {/* Navegación */}

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Reservation" element={<Reservation/>} />
        <Route path="/Count" element={<Count/>} />
        <Route path="/Notification" element={<Notification/>} />
        <Route path="/Payment" element={<Payment/>} />
      </Routes>

    </BrowserRouter>
  );
}
export default App;