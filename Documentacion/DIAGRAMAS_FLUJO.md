# 📊 Diagramas de Flujo - Cambios 31-08-2026

## 1️⃣ Flujo Completo: Home → Payment

```mermaid
sequenceDiagram
    participant User as 👤 Usuario
    participant Home as 🏠 Home.jsx
    participant Reservation as 📦 Reservation.jsx
    participant ResCon as 📋 ReservationContext
    participant Payment as 💳 Payment.jsx
    participant Backend as ⚙️ Backend

    User->>Home: Selecciona vehículo
    Home->>Reservation: navigate("/Reservation", { vehicleData })
    
    User->>Reservation: Selecciona fechas
    User->>Reservation: Selecciona seguro
    Reservation->>ResCon: updateInsurance(id)
    
    User->>Reservation: Click "Ir a Pago"
    Reservation->>Reservation: handlePaymentWithReservation()
    Reservation->>ResCon: updateReservation({ vehicle, dates, branch })
    ResCon->>ResCon: Almacena datos
    
    Reservation->>Payment: navigate("/Payment")
    Payment->>ResCon: useReservation() → leer datos
    Payment->>Payment: Muestra VehicleCard + Invoice
    
    User->>Payment: Completa conductor + tarjeta
    User->>Payment: Click "Reservar"
    Payment->>Payment: handlePayment()
    Payment->>Backend: POST /api/payments { ... }
    
    Backend->>Backend: Procesa pago
    Backend->>Payment: { status, transactionId }
    
    Payment->>User: ✅ Confirmación o ❌ Error
```

---

## 2️⃣ Flujo de Datos: ReservationContext

```mermaid
stateDiagram-v2
    [*] --> INICIAL: Estado inicial
    
    INICIAL: insuranceId: null<br/>vehicle: null<br/>pickupDate: null
    
    INICIAL --> SELECCIONANDO: updateInsurance(2)
    SELECCIONANDO: insuranceId: 2<br/>vehicle: null<br/>pickupDate: null
    
    SELECCIONANDO --> FECHAS: updateReservation({<br/>vehicle, pickupDate,<br/>returnDate, pickupBranch })
    
    FECHAS: insuranceId: 2<br/>vehicle: { ... }<br/>pickupDate: 2026-08-31
    
    FECHAS --> PAYMENT: navigate("/Payment")
    PAYMENT: Todos los datos<br/>disponibles ✅
    
    PAYMENT --> LIMPIO: clearReservation()
    LIMPIO: Vuelve a estado inicial
```

---

## 3️⃣ Composición de Componentes - Reservation Page

```mermaid
graph TD
    Reservation["<b>Reservation.jsx</b><br/>Página Principal"]
    
    Navbar["<b>Navbar.jsx</b><br/>Barra superior"]
    Calendar["<b>FilterCalendar</b><br/>Selector de fechas"]
    Map["<b>MapComponent</b><br/>Mapa de sucursales"]
    VehicleCard["<b>VehicleReservationCard</b><br/>Tarjeta del vehículo"]
    InsuranceSelector["<b>InsuranceSelector</b><br/>Selector de seguros"]
    Summary["<b>Resumen</b><br/>Cálculos dias/total"]
    Button["<b>ContinueButton</b><br/>Ir a Pago"]
    Footer["<b>Footer.jsx</b><br/>Pie de página"]
    
    Reservation --> Navbar
    Reservation --> Calendar
    Reservation --> Map
    Reservation --> VehicleCard
    Reservation --> InsuranceSelector
    Reservation --> Summary
    Reservation --> Button
    Reservation --> Footer
    
    Calendar -->|setPickupDate| Reservation
    Calendar -->|setReturnDate| Reservation
    InsuranceSelector -->|updateInsurance| Reservation
    Button -->|handlePaymentWithReservation| Reservation
    
    style Reservation fill:#e1f5ff
    style Button fill:#90ee90
```

---

## 4️⃣ Composición de Componentes - Payment Page

```mermaid
graph TD
    Payment["<b>Payment.jsx</b><br/>Página Principal"]
    
    Navbar2["<b>Navbar.jsx</b><br/>Barra superior"]
    VehicleCard2["<b>VehicleReservationCard</b><br/>Vehículo seleccionado"]
    DriverForm["<b>DriverInfoCard</b><br/>Formulario del conductor"]
    Invoice["<b>InvoiceCard</b><br/>Resumen de factura"]
    PaymentMethod["<b>PaymentMethodSelector</b><br/>Selector de tarjeta"]
    Button2["<b>ContinueButton</b><br/>Procesar Pago"]
    Footer2["<b>Footer.jsx</b><br/>Pie de página"]
    
    Payment --> Navbar2
    Payment --> VehicleCard2
    Payment --> DriverForm
    Payment --> Invoice
    Payment --> PaymentMethod
    Payment --> Button2
    Payment --> Footer2
    
    Invoice -->|lee contexto| Payment
    VehicleCard2 -->|lee contexto| Payment
    PaymentMethod -->|onSelect| Payment
    Button2 -->|handlePayment| Payment
    
    style Payment fill:#fff3e0
    style Button2 fill:#ff6b6b
```

---

## 5️⃣ Estados del PaymentContext

```mermaid
stateDiagram-v2
    [*] --> IDLE
    
    IDLE: driver: null<br/>selectedPaymentMethod: null<br/>paymentStatus: "IDLE"
    
    IDLE --> PENDING: setDriver()<br/>setSelectedPaymentMethod()
    
    PENDING: Espera<br/>confirmación<br/>paymentStatus: "PENDING"
    
    PENDING --> SUCCESS: API retorna OK
    PENDING --> DECLINED: API retorna error
    
    SUCCESS: transactionId asignado<br/>paymentStatus: "SUCCESS"
    DECLINED: paymentStatus: "DECLINED"
    
    SUCCESS --> LIMPIO: clearPayment()
    DECLINED --> IDLE: clearPayment()
    
    LIMPIO: Estado inicial
    
    LIMPIO --> [*]
```

---

## 6️⃣ Validaciones en usePaymentForm

```mermaid
graph LR
    V["validateForm()"]
    
    V --> Email["✓ Email"]
    V --> Name["✓ Nombre"]
    V --> Phone["✓ Teléfono"]
    V --> License["✓ Licencia"]
    V --> LicenseDate["✓ Fecha expiración >= returnDate"]
    V --> Payment["✓ Método pago"]
    
    Email --> Result{Todo OK?}
    Name --> Result
    Phone --> Result
    License --> Result
    LicenseDate --> Result
    Payment --> Result
    
    Result -->|SI| Enable["✅ Habilitar botón"]
    Result -->|NO| Disable["❌ Deshabilitar botón"]
    
    style Enable fill:#90ee90
    style Disable fill:#ff6b6b
```

---

## 7️⃣ Cálculo del Total

```mermaid
graph TD
    Inicio["Inicio"]
    
    GetDates["Obtener pickupDate y returnDate"]
    CalcDays["calculateDays(start, end)"]
    
    GetPrice["Obtener vehicle.price"]
    
    CalcVehicle["vehicleTotal = days × price"]
    
    GetInsurance["Obtener insurance.price"]
    
    CalcInsurance["insuranceTotal = insurance.price"]
    
    CalcTotal["total = vehicleTotal + insuranceTotal"]
    
    Format["Formatear a COP<br/>.toLocaleString('es-CO')"]
    
    Display["Mostrar en Invoice"]
    
    Inicio --> GetDates
    GetDates --> CalcDays
    CalcDays --> GetPrice
    GetPrice --> CalcVehicle
    CalcVehicle --> GetInsurance
    GetInsurance --> CalcInsurance
    CalcInsurance --> CalcTotal
    CalcTotal --> Format
    Format --> Display
    
    style CalcDays fill:#e1f5ff
    style CalcVehicle fill:#fff3e0
    style CalcTotal fill:#f3e5f5
    style Display fill:#90ee90
```

---

## 8️⃣ Cambio: React Native → Web

```mermaid
graph LR
    RN["<b>React Native<br/>(Móvil)</b>"]
    
    RN --> View["View"]
    RN --> Text["Text"]
    RN --> TouchableOpacity["TouchableOpacity"]
    RN --> StyleSheet["StyleSheet.create()"]
    
    WEB["<b>HTML Web<br/>(Desktop)</b>"]
    
    View --> Div["div"]
    Text --> Span["span / h3"]
    TouchableOpacity --> Button["button"]
    StyleSheet --> CSS["CSS externo"]
    
    Div --> WEB
    Span --> WEB
    Button --> WEB
    CSS --> WEB
    
    style RN fill:#ffcccc
    style WEB fill:#ccffcc
```

---

## 9️⃣ Ciclo de Vida: Reservation → Payment

```mermaid
timeline
    title Flujo del Usuario en Reservation
    
    section Home
    Usuario selecciona vehículo : 1 min
    
    section Reservation
    Carga página : Lee props
    Usuario ve vehículo : 30 seg
    Selecciona fechas : 2-3 min
    Selecciona seguro : 1 min
    Ve resumen : 30 seg
    Click "Ir a Pago" : updateReservation()
    
    section Navegación
    navigate("/Payment") : 200ms
    
    section Payment
    Carga página : Lee ReservationContext
    Usuario ve resumen : 1 min
    Completa datos conductor : 2 min
    Selecciona tarjeta : 30 seg
    Click "Reservar" : Envía a API
    
    section Backend
    Procesa pago : 500-2000ms
    
    section Resultado
    Muestra confirmación o error : 30 seg
```

---

## 🔟 Árbol de Dependencias: Payment Feature

```mermaid
graph TB
    Payment["Payment.jsx"]
    
    Payment --> ResCon["ReservationContext"]
    Payment --> PayCon["PaymentContext"]
    Payment --> UsePayForm["usePaymentForm()"]
    
    UsePayForm --> CalcDays["calculateDays()"]
    UsePayForm --> CalcTotal["calculateInvoiceTotal()"]
    UsePayForm --> Insurance["insurance.mock"]
    
    Payment --> VehicleCard["VehicleReservationCard"]
    Payment --> DriverInfo["DriverInfoCard"]
    Payment --> Invoice["InvoiceCard"]
    Payment --> PaymentMethod["PaymentMethodSelector"]
    Payment --> ContinueBtn["ContinueButton"]
    
    PaymentMethod --> CSS["PaymentMethodSelector.css"]
    
    style Payment fill:#e1f5ff
    style ResCon fill:#fff3e0
    style PayCon fill:#fff3e0
    style UsePayForm fill:#f3e5f5
```

---

## 1️⃣1️⃣ Mapa Mental: Cambios del Día

```mermaid
mindmap
  root((Cambios 31-08-2026))
    🔧 Bug Fixes
      React Native conflict
        Convertir PaymentMethodSelector
        Crear PaymentMethodSelector.css
        Actualizar vite.config.js
        Cambiar tipo ImageSourcePropType
    
    ✨ Features
      Payment Feature
        Actualizar Payment.jsx
        Actualizar InvoiceCard.jsx
        Leer de ReservationContext
      Reservation Feature
        Actualizar ReservationContext
        Nueva función updateReservation()
        Actualizar Reservation.jsx
        Nueva función handlePaymentWithReservation()
    
    📚 Documentación
      FEATURE_PAYMENT_FLOW.md
      FEATURE_RESERVATION_FLOW.md
      BUGFIX_REACT_NATIVE_WEB_CONFLICT.md
      RESUMEN_CAMBIOS_31-08-2026.md
      DIAGRAMAS_FLUJO.md
```

---

## 1️⃣2️⃣ Comparación: Antes vs Después

### ReservationContext

**ANTES:**
```
┌─────────────────────┐
│ ReservationContext  │
├─────────────────────┤
│ insuranceId: null   │
└─────────────────────┘
```

**DESPUÉS:**
```
┌─────────────────────────────────┐
│ ReservationContext              │
├─────────────────────────────────┤
│ insuranceId: null               │
│ vehicle: null          ⭐ NEW   │
│ pickupDate: null       ⭐ NEW   │
│ returnDate: null       ⭐ NEW   │
│ pickupBranch: null     ⭐ NEW   │
│                                 │
│ updateReservation()    ⭐ NEW   │
└─────────────────────────────────┘
```

### PaymentMethodSelector

**ANTES (React Native):**
```jsx
<TouchableOpacity
  style={styles.methodCard}
  onPress={() => onSelect?.(method)}
>
  <Text>{method.type}</Text>
</TouchableOpacity>
```

**DESPUÉS (Web):**
```jsx
<button
  className="payment-method-card"
  onClick={() => onSelect?.(method)}
>
  <span>{method.type}</span>
</button>
```

---

## Notas Importantes

✅ Todos los diagramas son editables en Mermaid  
✅ Los flujos están documentados en archivos .md separados  
✅ Los colores indican propósito (azul = lectura, naranja = entrada, verde = éxito, rojo = error)

