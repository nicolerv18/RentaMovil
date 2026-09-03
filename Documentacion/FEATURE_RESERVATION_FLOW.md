# 📦 FEATURE: Reservation / Booking (Sistema de Reservas)

## 📌 Resumen General
El sistema de reservas permite a los usuarios seleccionar un vehículo, elegir fechas de recogida/entrega, seleccionar seguros, y ver un resumen del costo total. Es el punto de entrada hacia el pago.

**Fecha de Modificación:** 31-08-2026  
**Lenguaje Principal:** JavaScript (React)  
**Archivos Modificados:** 2

---

## 🏗️ Arquitectura y Flujo de Datos

```
┌──────────────────────────────────────────┐
│  HOME PAGE                               │
│  - Lista de vehículos disponibles       │
│  - Click en vehículo                     │
└────────┬─────────────────────────────────┘
         │ navigate("/Reservation", { state: vehicleData })
         ↓
┌──────────────────────────────────────────┐
│  RESERVATION PAGE                        │
│  - Calendario (FilterCalendar)          │
│  - Mapa de sucursales (MapComponent)     │
│  - Selector de seguros                  │
│  - Resumen de factura                   │
│  - Botón "Ir a Pago"                    │
└────────┬─────────────────────────────────┘
         │ handlePaymentWithReservation()
         │ updateReservation() → ReservationContext
         ↓
┌──────────────────────────────────────────┐
│  PAYMENT PAGE                            │
│  (Flujo continúa en Payment feature)    │
└──────────────────────────────────────────┘
```

---

## 📂 Estructura de Carpetas

```
src/features/booking/
├── components/
│   ├── VehicleReservationCard.jsx        ← Tarjeta del vehículo
│   ├── VehicleReservationCard.css        ← Estilos
│   ├── InsuranceSelector.jsx             ← Selector de seguros
│   ├── MapComponents.jsx                 ← Mapa interactivo
│   └── ...
├── context/
│   └── ReservationContext.jsx            ← Estado global ⭐ MODIFICADO
├── hooks/
│   └── useReservationForm.jsx            ← Lógica de formulario
├── pages/
│   └── Reservation.jsx                   ← Página principal ⭐ MODIFICADO
├── services/
│   └── reservationServices.js            ← Llamadas a API
├── utils/
│   └── buildReservationRequest.js        ← Constructor de request
├── data/
│   └── mocks/
│       └── insurance.js                  ← Seguros disponibles
└── ...
```

---

## 🔄 Flujo Detallado de Datos

### 1️⃣ **ENTRADA: Props desde Home**
Cuando el usuario viene desde Home.jsx haciendo clic en un vehículo:

```javascript
// location.state contiene:
const {
  img,              // URL de imagen
  name,             // Nombre: "Tesla Model 3"
  price,            // Precio por día: 150000
  branch,           // Sucursal por defecto
  model,            // "Model 3"
  type,             // "Sedan"
  door,             // 4
  capacity,         // 5 pasajeros
  beneficios,       // ["GPS", "Seguro básico", ...]
  rentalSearch      // Parámetros de búsqueda anterior (opcional)
} = location.state || {}
```

### 2️⃣ **CONTEXTO: ReservationContext** ⭐ MODIFICADO
**Archivo:** `context/ReservationContext.jsx`

**Estado Anterior:**
```javascript
{
  insuranceId: null
}
```

**Estado Nuevo:**
```javascript
{
  insuranceId: null,                    // ID del seguro seleccionado
  vehicle: null,                        // Datos del vehículo
  pickupDate: null,                     // Fecha de recogida
  returnDate: null,                     // Fecha de entrega
  pickupBranch: null                    // Sucursal de recogida
}
```

**Funciones:**
- `updateInsurance(insuranceId)` - Selecciona seguro
- `updateReservation(data)` - ⭐ **NUEVA** - Guarda todos los datos
- `clearReservation()` - Limpia estado

### 3️⃣ **PROCESAMIENTO: useReservationForm Hook**
**Archivo:** `hooks/useReservationForm.js`

**Responsabilidades:**
```javascript
const {
  pickupDate,          // Fecha seleccionada en calendario
  setPickupDate,       // Actualizar fecha de recogida
  returnDate,          // Fecha de retorno
  setReturnDate,       // Actualizar fecha de entorno
  pickupBranch,        // Sucursal elegida
  setPickupBranch,     // Cambiar sucursal
  selectedBranch,      // Sucursal de entrega
  setSelectedBranch,   // Cambiar sucursal de entrega
  days,                // Días calculados
  total,               // Total calculado
  errorFecha,          // Validación de fechas
  errorEdad,           // Validación de edad
  handlePayment,       // Navega a /Payment
  ...
} = useReservationForm(price, navigate, t, branch, rentalSearch)
```

### 4️⃣ **VALIDACIONES**
```javascript
// Validación de rango de fechas
const hasInvalidDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return false
  return new Date(endDate) <= new Date(startDate)
}

// Validación de mayoría de edad (mínimo 18 años)
const isAdult = (birthDate) => {
  const today = new Date()
  const birth = new Date(birthDate)
  const age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1 >= 18
  }
  return age >= 18
}
```

### 5️⃣ **RENDERIZADO: Reservation.jsx** ⭐ MODIFICADO
**Archivo:** `pages/Reservation.jsx`

```javascript
// Obtiene datos del contexto
const { reservation, updateReservation } = useReservation()

// Nueva función para guardar antes de ir a pago
const handlePaymentWithReservation = () => {
  // 1. Validar fechas
  if (!pickupDate || !returnDate) {
    alert("Selecciona fechas")
    return
  }
  
  // 2. Guardar en contexto
  updateReservation({
    vehicle: { img, name, price, branch, model, type, door, capacity, beneficios },
    pickupDate,
    returnDate,
    pickupBranch: pickupBranch || branch
  })
  
  // 3. Navegar a /Payment
  navigate("/Payment")
}
```

---

## 🔌 Contextos Utilizados

### **ReservationContext** ⭐ PRINCIPAL
**Ubicación:** `context/ReservationContext.jsx`

**Estructura Completa:**
```javascript
const ReservationContext = createContext(null)

export function ReservationProvider({ children }) {
  const [reservation, setReservation] = useState({
    insuranceId: null,
    vehicle: null,
    pickupDate: null,
    returnDate: null,
    pickupBranch: null
  })

  function updateInsurance(insuranceId) {
    setReservation(previous => ({
      ...previous,
      insuranceId
    }))
  }

  function updateReservation(data) {  // ⭐ NUEVA FUNCIÓN
    setReservation(previous => ({
      ...previous,
      ...data
    }))
  }

  function clearReservation() {
    setReservation({
      insuranceId: null,
      vehicle: null,
      pickupDate: null,
      returnDate: null,
      pickupBranch: null
    })
  }

  const contextValue = useMemo(() => ({
    reservation,
    updateInsurance,
    updateReservation,
    clearReservation
  }), [reservation])

  return (
    <ReservationContext.Provider value={contextValue}>
      {children}
    </ReservationContext.Provider>
  )
}

export function useReservation() {
  const context = useContext(ReservationContext)
  if (!context) {
    throw new Error("useReservation debe utilizarse dentro de ReservationProvider")
  }
  return context
}
```

**Optimización:** Usa `useMemo` para evitar re-renders innecesarios de componentes hijos.

---

## 📊 Componentes Principales

### **Reservation.jsx** (Página Principal)
**Props:** `location.state` con datos del vehículo

**Secciones:**
1. **Navbar** - Navegación superior
2. **Calendario** (FilterCalendar)
   - Selecciona sucursal de recogida
   - Selecciona fecha de recogida
   - Selecciona fecha de entrega
3. **Mapa** (MapComponent)
   - Muestra sucursales
   - Permite cambiar sucursal de entrega
4. **Tarjeta del Vehículo** (VehicleReservationCard)
   - Imagen del vehículo
   - Especificaciones
   - Beneficios incluidos
5. **Resumen de Precio**
   - Cálculo: días × precio
   - Seguro
   - Total
6. **Botón "Ir a Pago"**
   - Valida fechas
   - Guarda en ReservationContext
   - Navega a /Payment

### **VehicleReservationCard.jsx**
**Props:**
```javascript
{
  vehicle: {
    img: string,
    name: string,
    branch: Object,
    model: string,
    type: string,
    door: number,
    capacity: number,
    beneficios: string[]
  }
}
```

**Contenido:**
- Imagen con badge de sucursal
- Nombre del vehículo
- Especificaciones: pasajeros, puertas, A/C, tipo
- Lista de beneficios incluidos

### **InsuranceSelector.jsx**
**Funcionalidad:**
- Lista seguros disponibles
- Click selecciona seguro
- `updateInsurance(insuranceId)` actualiza contexto

**Datos de Seguros:**
```javascript
[
  { id: 1, name: "Básico", price: 0 },
  { id: 2, name: "Cobertura Total", price: 50000 },
  { id: 3, name: "Cobertura Premium", price: 100000 }
]
```

### **MapComponents.jsx**
**Funcionalidad:**
- Muestra mapa con marcadores de sucursales
- Click en sucursal selecciona como entrega
- Usa Leaflet para renderizar mapa

---

## 🔢 Cálculos Principales

### Cálculo de Días
```javascript
const days = calculateRentalDays(pickupDate, returnDate)
// Resultado: número entero >= 1
```

**Lógica en** `shared/utils/rental.js`:
```javascript
export function calculateRentalDays(startDate, endDate) {
  if (!startDate || !endDate) return 0
  const start = new Date(startDate)
  const end = new Date(endDate)
  const difference = end.getTime() - start.getTime()
  const days = difference / (1000 * 60 * 60 * 24)
  return Math.max(Math.ceil(days), 1)
}
```

### Cálculo del Total
```javascript
const total = calculateTotal(pickupDate, returnDate, price)
// = days × price
```

**Lógica en** `shared/utils/rental.js`:
```javascript
export function calculateTotal(startDate, endDate, price) {
  const days = calculateRentalDays(startDate, endDate)
  return days * price
}
```

---

## 🎨 Estilos

### VehicleReservationCard.css
Clases principales:
- `.reservation-vehicle-card` - Contenedor principal
- `.reservation-vehicle-image` - Imagen del vehículo
- `.reservation-vehicle-title` - Nombre (h2)
- `.reservation-vehicle-pill` - Tags de especificaciones
- `.reservation-vehicle-includes` - Sección de beneficios

---

## 🔗 Integración con Otros Features

### Con Home
- Home pasa props con datos del vehículo
- Home navega a `/Reservation`

### Con Payment
- Reservation.jsx llama `updateReservation()`
- Navega a `/Payment`
- Payment.jsx lee `useReservation()`

### Con Insurance
- Reservation obtiene lista de seguros
- `InsuranceSelector` actualiza `insuranceId` en contexto
- Payment calcula el total incluyendo seguro

---

## 📱 Estados Responsivos

**Hook:**
```javascript
const isMobile = useIsMobile(768)
```

**Cambios según pantalla:**
- **Mobile:** Calendario colapsable (muestra/oculta filtros)
- **Desktop:** Calendario siempre visible

```javascript
{(!isMobile || showFilters) && (
  <FilterCalendar 
    onSearch={handleCalendarChange}
    value={currentCalendarValue}
  />
)}
```

---

## 🧪 Datos de Prueba

```javascript
// Vehículo de prueba
{
  img: "/img/tesla.jpg",
  name: "Tesla Model 3",
  price: 150000,
  branch: { id: 1, name: "Bogotá Centro" },
  model: "Model 3",
  type: "Sedan",
  door: 4,
  capacity: 5,
  beneficios: ["GPS gratuito", "Seguro básico", "Asistencia 24/7"]
}

// Fechas de prueba
pickupDate: "2026-08-31"
returnDate: "2026-09-05"
days: 5
total: 750000 COP (5 × 150000)

// Con seguro
insuranceId: 2
insurancePrice: 50000
total con seguro: 800000 COP (750000 + 50000)
```

---

## ⚠️ Cambios Realizados Hoy

### ✅ ReservationContext

**Antes:**
```javascript
{
  insuranceId: null
}
```

**Después:**
```javascript
{
  insuranceId: null,
  vehicle: null,           // ⭐ NUEVO
  pickupDate: null,        // ⭐ NUEVO
  returnDate: null,        // ⭐ NUEVO
  pickupBranch: null       // ⭐ NUEVO
}
```

**Nuevas Funciones:**
```javascript
// ⭐ NUEVA
function updateReservation(data) {
  setReservation(previous => ({
    ...previous,
    ...data
  }))
}
```

**Optimización:**
```javascript
// ⭐ NUEVO - Evita re-renders innecesarios
const contextValue = useMemo(() => ({
  reservation,
  updateInsurance,
  updateReservation,
  clearReservation
}), [reservation])
```

### ✅ Reservation.jsx

**Nueva Función:**
```javascript
// ⭐ NUEVA - Reemplaza handlePayment()
const handlePaymentWithReservation = () => {
  if (!pickupDate || !returnDate) {
    alert(t("reservation.selectDates"))
    return
  }
  
  updateReservation({
    vehicle: { img, name, price, branch, model, type, door, capacity, beneficios },
    pickupDate,
    returnDate,
    pickupBranch: pickupBranch ?? branch
  })
  
  navigate("/Payment")
}
```

**Cambio en Form:**
```javascript
// Antes:
<form onSubmit={(e) => {
  e.preventDefault()
  handlePayment()
}}>

// Después:
<form onSubmit={(e) => {
  e.preventDefault()
  handlePaymentWithReservation()  // ⭐ Nueva función
}}>
```

---

## 🔗 URLs del Flujo

| Ruta | Componente | Descripción |
|-----|-----------|------------|
| `/Home` | Home.jsx | Lista de vehículos |
| `/Reservation` | Reservation.jsx | Selecciona fechas y seguros |
| `/Payment` | Payment.jsx | Completa pago |
| `/Historial` | HistorialReservation.jsx | Reservas anteriores |

---

## 📋 Flujo Completo de Usuario

```
1. Usuario en Home.jsx
   ↓
2. Click en tarjeta de vehículo
   → navigate("/Reservation", { state: vehicleData })
   ↓
3. Reservation.jsx carga con props del vehículo
   → Muestra VehicleReservationCard
   ↓
4. Usuario selecciona:
   - Fechas en calendario
   - Sucursal de recogida
   - Sucursal de entrega (opcional)
   - Seguro en InsuranceSelector
   → updateInsurance(insuranceId)
   ↓
5. Usuario ve resumen:
   - Vehículo seleccionado
   - Fechas
   - Días calculados
   - Precio total
   → canReserve validación
   ↓
6. Click "Ir a Pago"
   → handlePaymentWithReservation()
   → updateReservation() guarda todo en contexto
   → navigate("/Payment")
   ↓
7. Payment.jsx carga con datos del contexto
   (Continúa en FEATURE_PAYMENT_FLOW.md)
```

---

## 🎯 Próximos Pasos / Mejoras Sugeridas

1. Agregar filtro de precio en calendario
2. Mostrar disponibilidad de vehículos en tiempo real
3. Guardar búsquedas favoritas
4. Agregar comentarios/reseñas del vehículo
5. Permitir extender reserva desde el formulario
6. Mostrar términos y condiciones
7. Agregar protección de cancelación

---

## 🚨 Problemas Conocidos

- ❌ Antes: Datos no persistían al navegar a Payment
- ✅ Después: ReservationContext almacena todo

- ❌ Antes: calculateRentalDays en ubicación incorrecta
- ✅ Después: Centralizado en `shared/utils/rental.js`

---

## 📚 Referencias de Código

**Validación Conjunta:**
```javascript
const hasInvalidDateRange = (start, end) => {
  if (!start || !end) return false
  return new Date(end) <= new Date(start)
}

const isAdult = (birthDate) => {
  const today = new Date()
  const birth = new Date(birthDate)
  const age = today.getFullYear() - birth.getFullYear()
  return age >= 18
}
```

**useEffect para Validación:**
```javascript
useEffect(() => {
  const invalid = hasInvalidDateRange(pickupDate, returnDate)
  setErrorFecha(invalid ? t("reservation.ErrorDate") : "")
}, [pickupDate, returnDate, t])

useEffect(() => {
  if (!birthDate) {
    setErrorEdad("")
    return
  }
  setErrorEdad(isAdult(birthDate) ? "" : t("reservation.ErrorAge"))
}, [birthDate, t])
```

