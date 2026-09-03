# 💳 FEATURE: Payment (Sistema de Pago)

## 📌 Resumen General
El sistema de pago es responsable de procesar la información de pago del usuario después de que realiza una reserva. Coordina datos del conductor, método de pago, y monto total.

**Fecha de Modificación:** 31-08-2026  
**Lenguaje Principal:** JavaScript (React)  
**Archivos Modificados:** 3

---

## 🏗️ Arquitectura y Flujo de Datos

```
┌─────────────────────────────────────────────────────────┐
│  RESERVATION PAGE (Booking)                             │
│  - Usuario selecciona vehículo, fechas, seguros        │
│  - Guarda datos en ReservationContext                  │
└────────────┬────────────────────────────────────────────┘
             │ handlePaymentWithReservation()
             ↓
┌─────────────────────────────────────────────────────────┐
│  PAYMENT PAGE (Payment Feature)                         │
│  - Muestra: Vehicle Card, Invoice, Payment Methods     │
│  - Lee datos de: ReservationContext, PaymentContext    │
└────────────┬────────────────────────────────────────────┘
             │ handlePayment()
             ↓
┌─────────────────────────────────────────────────────────┐
│  PAYMENT PROCESSING (usePaymentForm Hook)              │
│  - Valida formulario y datos del conductor             │
│  - Calcula días y total                                │
│  - Llama a API de pago                                 │
└────────────┬────────────────────────────────────────────┘
             │ processPayment()
             ↓
┌─────────────────────────────────────────────────────────┐
│  PAYMENT SERVICES / API                                │
│  - createPayment() → Backend                           │
│  - Retorna: status, transactionId                      │
└─────────────────────────────────────────────────────────┘
```

---

## 📂 Estructura de Carpetas

```
src/features/payment/
├── components/
│   ├── PaymentMethosSelector.jsx      ← Selector de tarjetas (Web - convertido de RN)
│   ├── PaymentMethosSelector.css      ← Estilos del selector
│   ├── DriverInfoCard.jsx             ← Información del conductor
│   ├── InvoiceCard.jsx                ← Resumen de factura ⭐ MODIFICADO
│   └── ...
├── context/
│   └── PaymentContext.jsx             ← Estado global de pago
├── hooks/
│   └── usePaymentForm.jsx             ← Lógica de validación y pago ⭐ MODIFICADO
├── pages/
│   └── Payment.jsx                    ← Página principal ⭐ MODIFICADO
├── services/
│   └── PaymentServices.js             ← Llamadas a API
├── utils/
│   ├── calculateDays.js               ← Cálculo de días
│   └── calculateInvoiceTotal.js       ← Cálculo del total
└── data/
    └── mocks/
```

---

## 🔄 Flujo Detallado de Datos

### 1️⃣ **ENTRADA: ReservationContext**
Cuando el usuario viene desde Reservation.jsx, el contexto contiene:

```javascript
reservation = {
  vehicle: {
    img: string,
    name: string,
    price: number,
    branch: Object,
    model: string,
    type: string,
    door: number,
    capacity: number,
    beneficios: string[]
  },
  pickupDate: Date,
  returnDate: Date,
  pickupBranch: Object,
  insuranceId: number | null
}
```

### 2️⃣ **PROCESAMIENTO: PaymentContext**
El contexto de pago almacena:

```javascript
{
  driver: {
    name: string,
    email: string,
    phone: string,
    licenseCategory: string,
    licenseExpirationDate: Date
  },
  selectedPaymentMethod: {
    id: string,
    type: string,
    lastFour: string
  },
  paymentStatus: "IDLE" | "PENDING" | "DECLINED" | "SUCCESS",
  transactionId: string | null
}
```

### 3️⃣ **CÁLCULOS: usePaymentForm Hook**
**Archivo:** `hooks/usePaymentForm.jsx`

```javascript
// 1. Calcula días entre fechas
const days = calculateDays(reservation.pickupDate, reservation.returnDate)
// Output: número entero >= 1

// 2. Calcula total de factura
const total = calculateInvoiceTotal(
  days,
  vehicle.price,
  insurancePrice
)
// Output: number con la suma de vehículo + seguros

// 3. Valida si el formulario puede enviarse
const canReserve = useMemo(() => {
  return (
    driver?.email &&
    driver?.name?.trim() &&
    driver?.phone?.trim() &&
    driver?.licenseCategory &&
    isLicenseValidForReservation &&
    selectedPaymentMethod
  )
}, [driver, isLicenseValidForReservation, selectedPaymentMethod])
```

### 4️⃣ **VISUALIZACIÓN: Payment.jsx**
**Archivo:** `pages/Payment.jsx`

```javascript
// Obtiene datos de contextos
const { reservation } = useReservation()
const { days, total, canReserve, isProcessing, handlePayment } = usePaymentForm()
const { setSelectedPaymentMethod } = usePayment()

// Renderiza componentes
<VehicleReservationCard vehicle={reservation.vehicle} />
<InvoiceCard days={days} total={total} vehicle={reservation.vehicle} />
<PaymentMethodSelector onSelect={setSelectedPaymentMethod} />
<ContinueButton onPress={handlePayment} disabled={!canReserve} />
```

### 5️⃣ **SALIDA: PaymentServices**
**Archivo:** `services/PaymentServices.js`

```javascript
async function createPayment(paymentData) {
  // POST a backend con:
  // {
  //   driverId, vehicleId, amount, paymentMethodId,
  //   pickupDate, returnDate, insuranceId, ...
  // }
  
  return {
    status: "SUCCESS" | "DECLINED",
    transactionId: string,
    message: string
  }
}
```

---

## 🔌 Contextos Utilizados

### **PaymentContext**
**Ubicación:** `context/PaymentContext.jsx`

**Funciones:**
- `setDriver(driver)` - Almacena info del conductor
- `setSelectedPaymentMethod(method)` - Selecciona tarjeta
- `processPayment(paymentData)` - Procesa pago
- `clearPayment()` - Limpia estado

```javascript
const PaymentContext = createContext(null)

export function PaymentProvider({ children }) {
  const [driver, setDriver] = useState(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
  const [paymentStatus, setPaymentStatus] = useState("IDLE")
  const [transactionId, setTransactionId] = useState(null)
  
  return (
    <PaymentContext.Provider value={{...}}>
      {children}
    </PaymentContext.Provider>
  )
}
```

### **ReservationContext**
**Ubicación:** `../../booking/context/ReservationContext.jsx`

**Nuevas funciones:**
- `updateReservation(data)` - Actualiza datos de la reserva
- `updateInsurance(insuranceId)` - Selecciona seguro

---

## 📊 Componentes Principales

### **InvoiceCard.jsx** ⭐
Muestra el resumen de factura.

**Props Recibidas:**
```javascript
{
  days: number,        // Días de renta
  total: number,       // Total a pagar
  vehicle: Object      // Datos del vehículo
}
```

**Lógica:**
- Recibe datos o los obtiene del contexto (fallback)
- Calcula: vehicleTotal = days × vehicle.price
- Suma seguro si existe
- Formatea moneda en COP

### **PaymentMethosSelector.jsx** ⭐ (CONVERTIDO)
**Cambio Principal:** De React Native a HTML Web

**Antes (React Native):**
```jsx
import { View, Text, TouchableOpacity } from "react-native"
<TouchableOpacity style={styles.methodCard}>
  <Text>{method.type}</Text>
</TouchableOpacity>
```

**Después (HTML Web):**
```jsx
<button className="payment-method-card" onClick={() => onSelect(method)}>
  <span className="payment-method-text">{method.type}</span>
</button>
```

**Estilos:** `PaymentMethosSelector.css`

---

## 🔢 Utilidades (Utils)

### **calculateDays.js**
```javascript
export function calculateDays(startDate, endDate) {
  if (!startDate || !endDate) return 0
  
  // Convierte strings a Date objects
  const startObj = new Date(startDate)
  const endObj = new Date(endDate)
  
  // Valida que sean fechas válidas
  if (isNaN(startObj.getTime()) || isNaN(endObj.getTime())) return 0
  
  // Calcula diferencia en días
  const difference = endObj.getTime() - startObj.getTime()
  const days = difference / (1000 * 60 * 60 * 24)
  
  return Math.max(days, 1)
}
```

**Entrada:** Fechas en cualquier formato (string, Date)  
**Salida:** Número entero >= 1

### **calculateInvoiceTotal.js**
```javascript
export function calculateInvoiceTotal(days, vehiclePrice, insurancePrice = 0) {
  return (days * vehiclePrice) + insurancePrice
}
```

---

## 🐛 Validaciones Implementadas

### ✅ Validación de Formulario
```javascript
const canReserve = (
  driver?.email &&                           // Email obligatorio
  driver?.name?.trim() &&                    // Nombre obligatorio
  driver?.phone?.trim() &&                   // Teléfono obligatorio
  driver?.licenseCategory &&                 // Categoría de licencia
  isLicenseValidForReservation &&            // Licencia válida
  selectedPaymentMethod                      // Método de pago seleccionado
)
```

### ✅ Validación de Licencia
```javascript
const isLicenseValidForReservation = () => {
  if (!driver?.licenseExpirationDate) return false
  
  const today = new Date()
  const endOfReservation = new Date(reservation.returnDate)
  
  // La licencia debe ser válida en la fecha de retorno
  return new Date(driver.licenseExpirationDate) >= endOfReservation
}
```

### ✅ Validación de Fechas
```javascript
// Se valida en calculateDays
if (isNaN(startDate) || isNaN(endDate)) return 0
```

---

## 📱 Componentes Relacionados

| Componente | Ubicación | Función |
|-----------|----------|---------|
| DriverInfoCard | components/ | Formulario de datos del conductor |
| VehicleReservationCard | ../../booking/components/ | Tarjeta del vehículo seleccionado |
| ContinueButton | ../../shared/components/ | Botón para procesar pago |
| Navbar | ../../shared/components/layout/ | Barra de navegación |
| Footer | ../../shared/components/layout/ | Pie de página |

---

## 🔗 Integración con Backend

**Endpoint:** `POST /api/payments` o similar

**Payload Enviado:**
```javascript
{
  driverId: number,
  vehicleId: number,
  reservationId: number,
  amount: number,           // Total calculado
  currency: "COP",
  paymentMethodId: string,
  pickupDate: Date,
  returnDate: Date,
  insuranceId: number | null,
  transactionId: string     // ID de la transacción
}
```

**Respuesta Esperada:**
```javascript
{
  status: "SUCCESS" | "DECLINED",
  transactionId: string,
  reservationId: number,
  message: string
}
```

---

## ⚠️ Errores Conocidos (Antes de Correcciones)

❌ **React Native en proyecto Web:**
- Error: `Flow is not supported` en vite
- Archivos importaban `react-native`
- Solución: Convertir a componentes HTML estándar

❌ **VehicleReservationCard no mostraba datos:**
- No recibía props correctamente
- Solución: Pasar `vehicle={reservation.vehicle}` desde Payment.jsx

❌ **InvoiceCard sin datos:**
- No leía el contexto correctamente
- Solución: Aceptar props pero con fallback al contexto

---

## 🎯 Casos de Uso Principales

### 1. Usuario Completa Reserva
```
1. Reservation.jsx: Selecciona vehículo, fechas, seguros
2. Click "Reservar" → updateReservation() guarda en contexto
3. Navega a /Payment
4. Payment.jsx carga datos del contexto
5. Usuario completa info del conductor y tarjeta
6. Click "Reservar" → handlePayment()
7. usePaymentForm valida y llama API
8. Muestra confirmación o error
```

### 2. Usuario Cambia Tarjeta de Crédito
```
1. PaymentMethodSelector lista tarjetas disponibles
2. Click en tarjeta → onSelect(method)
3. setSelectedPaymentMethod(method) actualiza contexto
4. canReserve se recalcula (useMemo)
5. Botón se habilita/deshabilita según validación
```

### 3. Validación de Datos
```
1. Usuario ingresa datos del conductor
2. usePaymentForm valida:
   - Email: email@example.com
   - Nombre: no vacío
   - Teléfono: no vacío
   - Categoría licencia: seleccionada
   - Expiración licencia: >= fecha retorno
   - Método pago: seleccionado
3. Si todo es válido: canReserve = true
4. Botón "Reservar" se activa
```

---

## 🧪 Datos de Prueba

```javascript
// Vehículo de Ejemplo
{
  id: 1,
  img: "/assets/vehicles/tesla.jpg",
  name: "Tesla Model 3",
  price: 150000,
  brand: "Tesla",
  model: "Model 3",
  type: "Sedan",
  door: 4,
  capacity: 5,
  beneficios: ["Seguros incluidos", "GPS gratuito"]
}

// Método de Pago de Ejemplo
{
  id: "1",
  type: "Visa",
  lastFour: "4242"
}

// Conductor de Ejemplo
{
  name: "Juan Pérez",
  email: "juan@example.com",
  phone: "+57 310 123 4567",
  licenseCategory: "B",
  licenseExpirationDate: "2026-12-31"
}

// Cálculo de Ejemplo
pickupDate: "2026-08-31"
returnDate: "2026-09-05"
days: 5
vehiclePrice: 150000
insurancePrice: 50000
total: 800000 COP
```

---

## 📝 Notas Importantes

- ⚠️ Las fechas se validan en `calculateDays()` - debe retornar >= 1
- ⚠️ La licencia debe ser válida en la fecha de RETORNO, no de recogida
- ⚠️ El total se formatea con `.toLocaleString("es-CO")`
- ⚠️ PaymentContext no usa useMemo (considerar en futuro para optimizar)
- ⚠️ ReservationContext SÍ usa useMemo (para evitar re-renders innecesarios)

---

## 🔄 Próximos Pasos / Mejoras Sugeridas

1. Implementar encriptación para datos de tarjeta
2. Agregar validación de CVV
3. Implementar reintentos automáticos en fallos de pago
4. Agregar comprobante de pago (PDF/Email)
5. Implementar webhook para confirmación de pago

