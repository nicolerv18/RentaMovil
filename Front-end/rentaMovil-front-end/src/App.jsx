import './App.css'
import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Reservation from  './pages/Reservation';
import Count from './pages/Count';
import Notification from "./pages/Notification";
import Payment from "./pages/Payment";
import Contract from "./pages/Contract";
import ContractHistory from "./pages/ContractHistory";
import HomeAdmin from "./pages/HomeAdmin";
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
      {/* Navegación */}

      {/* Rutas */}
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Reservation" element={<Reservation/>} />
        <Route path="/Count" element={<Count/>} />
        <Route path="/Notification" element={<Notification/>} />
        <Route path="/Payment" element={<Payment/>} />

        <Route path="/Contract" element={<Contract/>} />
        <Route path="/ContractHistory" element={<ContractHistory/>} />
        <Route path="/HomeAdmin" element={<HomeAdmin/>} />
      </Routes>
      </Suspense>

    </BrowserRouter>
  )
}

export default App;

