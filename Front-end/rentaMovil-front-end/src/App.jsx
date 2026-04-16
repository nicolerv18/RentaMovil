import './App.css'

import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Login = lazy(() => import('./features/auth/pages/Login.jsx'))
const Home = lazy(() => import('./features/vehicles/pages/Home.jsx'))
const Reservation = lazy(() => import('./features/booking/pages/Reservation.jsx'))
const Count = lazy(() => import('./features/auth/pages/Count.jsx'))
const Notification = lazy(() => import('./features/notification/pages/notification.jsx'))
const Payment = lazy(() => import('./features/payment/pages/Payment.jsx'))


function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/count" element={<Count />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App;

