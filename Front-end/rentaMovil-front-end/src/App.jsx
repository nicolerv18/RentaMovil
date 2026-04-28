import './App.css'
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Auth
import Login from "./features/auth/pages/Login";
import Count from "./features/auth/pages/Count";
import ChangePassword from "./features/auth/pages/ChangePassword";

// Vehicles
import Home from "./features/vehicles/pages/Home";

// Booking
import Reservation from "./features/booking/pages/Reservation";

// Payment
import Payment from "./features/payment/pages/Payment";

// Notification
import Notification from "./features/notification/pages/Notification";

// Admin - Vehicles
import RegisterVehicle from "./features/admin/vehicles/pages/RegisterVehicle";

// Admin - Maintenance
import Maintenance from "./features/admin/maintenance/pages/Maintenance";

// Admin - Status
import CheckStatus from "./features/admin/status/pages/CheckStatus";

// Admin - Contract
import Contract from "./features/admin/Contract/Pages/Contract";
import ContractHistory from "./features/admin/Contract/Pages/ContractHistory";

// Admin - HomeAdmin
import HomeAdmin from "./features/admin/HomeAdmin/Pages/HomeAdmin";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light1"
  );

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Reservation" element={<Reservation />} />
        <Route path="/Count" element={<Count theme={theme} setTheme={setTheme} />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/Payment" element={<Payment />} />
        <Route path="/RegisterVehicle" element={<RegisterVehicle />} />
        <Route path="/Maintenance" element={<Maintenance />} />
        <Route path="/CheckStatus" element={<CheckStatus />} />
        <Route path="/Contract" element={<Contract />} />
        <Route path="/ContractHistory" element={<ContractHistory />} />
        <Route path="/HomeAdmin" element={<HomeAdmin />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
