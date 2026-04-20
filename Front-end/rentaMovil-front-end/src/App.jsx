import './App.css'
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Reservation from  './pages/Reservation';
import Count from './pages/Count';
import Notification from "./pages/Notification";
import Payment from "./pages/Payment";
import HomeAdmin from "./pages/HomeAdmin";

function App() {
  return (
    <BrowserRouter>
      {/* Navegación */}
      <div style={{padding: '10px', background: '#f0f0f0'}}>
        <Link to="/HomeAdmin" style={{marginRight: '15px', textDecoration: 'none', color: '#2563eb', fontWeight: 'bold'}}>
          HomeAdmin
        </Link>
      </div>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Reservation" element={<Reservation/>} />
        <Route path="/Count" element={<Count/>} />
        <Route path="/Notification" element={<Notification/>} />
        <Route path="/Payment" element={<Payment/>} />
        <Route path="/HomeAdmin" element={<HomeAdmin/>} />
      </Routes>

    </BrowserRouter>
  );
}
export default App;