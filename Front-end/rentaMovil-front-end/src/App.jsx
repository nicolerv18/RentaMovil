import "./App.css";
import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";


// Auth
const Login = lazy(() => import("./features/auth/pages/Login"));
const Count = lazy(() => import("./features/auth/pages/Count"));
const ChangePassword = lazy(() => import("./features/auth/pages/ChangePassword"));

// Vehicles
const Home = lazy(() => import("./features/vehicles/pages/Home"));

// Booking
const Reservation = lazy(() => import("./features/booking/pages/Reservation"));

// Payment
const Payment = lazy(() => import("./features/payment/pages/Payment"));

// Notification
const Notification = lazy(() => import("./features/notification/pages/Notification"));

// Admin - Vehicles
const RegisterVehicle = lazy(() => import("./features/admin/vehicles/pages/RegisterVehicle"));

// Admin - Maintenance
const Maintenance = lazy(() => import("./features/admin/maintenance/pages/Maintenance"));

// Admin - Status
const CheckStatus = lazy(() => import("./features/admin/status/pages/CheckStatus"));

// Admin - Contract
const Contract = lazy(() => import("./features/admin/Contract/Pages/Contract"));
const ContractHistory = lazy(() => import("./features/admin/Contract/Pages/ContractHistory"));

// Admin - HomeAdmin
const HomeAdmin = lazy(() => import("./features/admin/HomeAdmin/Pages/HomeAdmin"));

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <BrowserRouter>
      {/* Navegación */}

      {/* Rutas */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Reservation" element={<Reservation />} />
          <Route path="/Count" element={<Count darkMode={darkMode} setDarkMode={setDarkMode} />} />
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
      </Suspense>
    </BrowserRouter>
  );
}


export default App;
