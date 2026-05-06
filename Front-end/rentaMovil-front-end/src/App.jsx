import './App.css'
import 'leaflet/dist/leaflet.css';

import React, { Suspense, lazy, useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Login = lazy(() => import('./features/auth/pages/Login.jsx'))
const Home = lazy(() => import('./features/vehicles/pages/Home.jsx'))
const Reservation = lazy(() => import('./features/booking/pages/Reservation.jsx'))
const Count = lazy(() => import('./features/auth/pages/Count.jsx'))
const Notification = lazy(() => import('./features/notification/pages/notification.jsx'))
const Payment = lazy(() => import('./features/payment/pages/Payment.jsx'))
const RegisterVehicle = lazy(() => import('./features/admin/vehicles/pages/RegisterVehicle.jsx'))
const Maintenance = lazy(() => import('./features/admin/maintenance/pages/Maintenance.jsx'))
const CheckStatus = lazy(() => import('./features/admin/status/pages/CheckStatus.jsx'))
const ChangePassword = lazy(() => import('./features/auth/pages/Register.jsx'))
const Register = lazy(() => import('./features/auth/pages/Register.jsx'))

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

          <Route path="/" element={<Login />} />

          <Route path="/home" element={<Home />} />

          <Route path="/reservation" element={<Reservation />} />
          <Route
            path="/count"
            element={
              <Count
                theme={theme}
                setTheme={setTheme}
              />
            }
          />
          <Route path="/Register" element={<Register />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/RegisterVehicle" element={<RegisterVehicle />} />
          <Route path="/Maintenance" element={<Maintenance />} />
          <Route path="/CheckStatus" element={<CheckStatus />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />

        </Routes>
        
      </Suspense>
    </BrowserRouter>
  )
}

export default App;