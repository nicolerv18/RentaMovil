import './App.css'
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Auth
import Login from './features/auth/pages/Login.jsx';
import Count from './features/auth/pages/Count.jsx';
import CountAdmin from './features/auth/pages/CountAdmin.jsx';
import ChangePassword from './features/auth/pages/ChangePassword.jsx';

import VehicleInventary from './features/admin/VehicleInventary/pages/VehicleInventary.jsx';
// Vehicles
import Home from './features/vehicles/pages/Home.jsx';
import HomeS from './features/vehicles/pages/HomeS.jsx';

// Booking
import Reservation from './features/booking/pages/Reservation.jsx';
import HistorialReservation from './features/booking/HistorialReservation.jsx';

// Payment
import Payment from './features/payment/pages/Payment.jsx';

// Notification
import Notification from './features/notification/pages/Notification.jsx';
import NotificationAdmin from './features/notification/pages/NotificationAdmin.jsx';

// Admin - Vehicles
import RegisterVehicle from './features/admin/vehicles/pages/RegisterVehicle.jsx';

// Admin - Maintenance
import Maintenance from './features/admin/maintenance/pages/Maintenance.jsx';

// Admin - Status
import CheckStatus from './features/admin/status/pages/CheckStatus.jsx';

// Admin - Contract
import Contract from './features/admin/Contract/Pages/Contract.jsx';
import ContractHistory from './features/admin/Contract/Pages/ContractHistory.jsx';

// Admin - HomeAdmin
import HomeAdmin from './features/admin/HomeAdmin/Pages/HomeAdmin.jsx';


import History from './features/admin/historyMaintenance/pages/History.jsx';

import RegisterForm from './features/auth/components/RegisterForm.jsx';

import EmailVerification from './features/auth/pages/EmailVerification.jsx';

import CodeVerification from "./features/auth/pages/CodeVerification.jsx";

import ChangePasswordLogin from './features/auth/pages/ChangePasswordLogin.jsx';



function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/count" element={<Count theme={theme} setTheme={setTheme} />} />
        <Route path="/CountAdmin" element={<CountAdmin theme={theme} setTheme={setTheme} />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/homeS" element={<HomeS />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/HistorialReservation" element={<HistorialReservation />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/NotificationAdmin" element={<NotificationAdmin />} />
        <Route path="/RegisterVehicle" element={<RegisterVehicle />} />
        <Route path="/Maintenance" element={<Maintenance />} />
        <Route path="/CheckStatus" element={<CheckStatus />} />
        <Route path="/Contract" element={<Contract />} />
        <Route path="/ContractHistory" element={<ContractHistory />} />
        <Route path="/HomeAdmin" element={<HomeAdmin />} />
        <Route path="/History" element={<History />} />
        <Route path="/VehicleInventary" element={<VehicleInventary />} />
        <Route path="/Register" element={<RegisterForm />} />
        <Route path="/EmailVerification" element={<EmailVerification />} />
        <Route path="/CodeVerification" element={<CodeVerification />} />
        <Route path="/ChangePasswordLogin" element={<ChangePasswordLogin />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;