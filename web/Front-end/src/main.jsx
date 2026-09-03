import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../src/Traductions/index.js'

import App from './App.jsx'
import { ReservationProvider } from './features/booking/context/ReservationContext.jsx'
import { PaymentProvider } from './features/payment/context/PaymentContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReservationProvider>
      <PaymentProvider>
        <App />
      </PaymentProvider>
    </ReservationProvider>
  </StrictMode>,
)