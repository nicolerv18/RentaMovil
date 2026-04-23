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
const ChangePassword = lazy(() => import('./features/auth/pages/ChangePassword.jsx'))

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
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>

          <Route path="/" element={<Login />} />

          <Route path="/home" element={<Home />} />

          <Route path="/reservation" element={<Reservation />} />
          <Route
            path="/count"
            element={
              <Count
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

          <Route path="/notification" element={<Notification />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App;