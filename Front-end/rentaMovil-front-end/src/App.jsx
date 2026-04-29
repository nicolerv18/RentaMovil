import './App.css'
import 'leaflet/dist/leaflet.css';
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Auth
const Login = lazy(() => import('./features/auth/pages/Login.jsx'));
const Count = lazy(() => import('./features/auth/pages/Count.jsx'));
const ChangePassword = lazy(() => import('./features/auth/pages/ChangePassword.jsx'));

// Vehicles
const Home = lazy(() => import('./features/vehicles/pages/Home.jsx'));

// Booking
const Reservation = lazy(() => import('./features/booking/pages/Reservation.jsx'));
const HistorialReservation = lazy(() => import('./features/booking/HistorialReservation.jsx'));

// Payment
const Payment = lazy(() => import('./features/payment/pages/Payment.jsx'));

// Notification
const Notification = lazy(() => import('./features/notification/pages/Notification.jsx'));

// Admin - Vehicles
const RegisterVehicle = lazy(() => import('./features/admin/vehicles/pages/RegisterVehicle.jsx'));

// Admin - Maintenance
const Maintenance = lazy(() => import('./features/admin/maintenance/pages/Maintenance.jsx'));

// Admin - Status
const CheckStatus = lazy(() => import('./features/admin/status/pages/CheckStatus.jsx'));

// Admin - Contract
const Contract = lazy(() => import('./features/admin/Contract/Pages/Contract.jsx'));
const ContractHistory = lazy(() => import('./features/admin/Contract/Pages/ContractHistory.jsx'));

// Admin - HomeAdmin
const HomeAdmin = lazy(() => import('./features/admin/HomeAdmin/Pages/HomeAdmin.jsx'));

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
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Auth */}
          <Route path="/" element={<Login />} />
          <Route path="/count" element={<Count theme={theme} setTheme={setTheme} />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />

          {/* Vehicles */}
          <Route path="/home" element={<Home />} />

          {/* Booking */}
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/HistorialReservation" element={<HistorialReservation />} />

          {/* Payment */}
          <Route path="/payment" element={<Payment />} />

          {/* Notification */}
          <Route path="/Notification" element={<Notification />} />

          {/* Admin */}
          <Route path="/RegisterVehicle" element={<RegisterVehicle />} />
          <Route path="/Maintenance" element={<Maintenance />} />
          <Route path="/CheckStatus" element={<CheckStatus />} />
          <Route path="/Contract" element={<Contract />} />
          <Route path="/ContractHistory" element={<ContractHistory />} />
          <Route path="/HomeAdmin" element={<HomeAdmin />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;