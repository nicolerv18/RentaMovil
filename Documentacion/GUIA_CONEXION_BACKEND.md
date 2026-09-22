# 🔌 Guía de Conexión al Backend — RentaMovil Front-end

**Fecha:** 22-09-2026
**Alcance:** todo lo que hoy es un mock/simulación en `web/Front-end/src` y necesita un backend real.
**Cómo leer esto:** cada servicio tiene su estado actual, el endpoint REST sugerido, el payload/respuesta esperados (basados en `src/types/*.ts`, que ya documentan el dominio) y notas de negocio relevantes. Al final hay un checklist de "cómo activar un servicio" paso a paso.

---

## 1. Patrón recomendado: ya existe, solo falta generalizarlo

Buscando en el código encontré que **ya hay un patrón arrancado** en `features/notification/services/notificationService.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL;

export const getNotifications = async () => {
  if (!API_URL) {
    return getMockNotifications(); // fallback al mock
  }
  const response = await fetch(`${API_URL}/notifications`);
  if (!response.ok) throw new Error("No fue posible obtener las notificaciones.");
  return response.json();
};
```

Es el patrón correcto y es el que recomiendo generalizar a **todos** los servicios: una variable de entorno (`VITE_API_URL`) decide si se llama al backend real o se usa el mock. Ventajas:

- El equipo puede seguir trabajando con mocks mientras el backend no esté listo, sin tocar código (solo con no definir la variable).
- Activar el backend real es literalmente crear un archivo `.env` con una línea — no hay que tocar componentes ni hooks, porque todos consumen el servicio por su nombre exportado (`getCars()`, `createReservation()`, etc.), nunca el mock directamente.
- Es progresivo: se puede conectar un servicio a la vez sin romper el resto de la app.

**Hoy esto NO está generalizado:** es el único servicio que lo usa, y ni siquiera existe un archivo `.env` en el proyecto (la variable nunca está definida, así que hoy `notificationService.js` también cae siempre al mock). El resto de servicios (`reservationServices.js`, `PaymentServices.js`, `carsService.js`, etc.) son simulaciones puras con `Promise.resolve(...)`, sin ningún punto de conexión.

### Paso 0 — Antes de tocar servicios

1. Crear `web/Front-end/.env.example` (y cada dev su propio `.env`, que ya está en `.gitignore`) con:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```
2. Crear un cliente HTTP centralizado en `src/shared/services/apiClient.js` para no repetir `fetch` + manejo de errores en cada archivo:

   ```javascript
   const API_URL = import.meta.env.VITE_API_URL;

   export function isBackendConnected() {
     return Boolean(API_URL);
   }

   async function request(path, options = {}) {
     const response = await fetch(`${API_URL}${path}`, {
       headers: { "Content-Type": "application/json", ...options.headers },
       ...options,
     });

     if (!response.ok) {
       let message = `Error ${response.status} en ${path}`;
       try {
         const body = await response.json();
         message = body.message || message;
       } catch { /* respuesta sin cuerpo JSON */ }
       throw new Error(message);
     }

     if (response.status === 204) return null; // sin contenido
     return response.json();
   }

   export const apiClient = {
     get: (path) => request(path),
     post: (path, data) => request(path, { method: "POST", body: JSON.stringify(data) }),
     patch: (path, data) => request(path, { method: "PATCH", body: JSON.stringify(data) }),
     delete: (path) => request(path, { method: "DELETE" }),
   };
   ```

   Con esto, cada servicio queda así de simple:
   ```javascript
   import { apiClient, isBackendConnected } from "../../../shared/services/apiClient";

   export const createReservation = async (reservationRequest) => {
     if (!isBackendConnected()) {
       return createMockReservation(reservationRequest); // lo que hoy hace Promise.resolve(...)
     }
     return apiClient.post("/reservations", reservationRequest);
   };
   ```

3. Agregar autenticación (JWT/Bearer) al `apiClient` cuando exista el flujo de login real (hoy `authService.js` está vacío — ver sección 5).

---

## 2. Inventario de servicios a conectar

### 2.1 Reservas — `features/booking/services/reservationServices.js`

Ya reescribí `createReservation` para devolver la forma correcta de la entidad `Reservation` (`reservationId` en la raíz, no envuelto en `{data: {...}}}`) — ver `src/types/reservation.ts`.

| Función | Endpoint sugerido | Body | Respuesta esperada |
|---|---|---|---|
| `getReservations()` | `GET /reservations` (o `/users/:id/reservations`) | — | `Reservation[]` |
| `createReservation(reservationRequest)` | `POST /reservations` | `{ vehicleId, pickupBranchId, returnBranchId, insuranceId, startDate, endDate, vehicleSubtotal, insuranceSubtotal, totalAmount, status: "PENDING_PAYMENT" }` (así lo arma `buildReservationRequest.jsx`) | `Reservation` completo (con `reservationId`, `reservationDate` generados por el backend) |
| `cancelReservation(id)` | `PATCH /reservations/:id/cancel` o similar | — | `Reservation` actualizado (`status: "CANCELLED"`) |

**Reglas de negocio a validar en el backend (no solo en el front):**
- INV-002 (`types/reservation.ts`): `vehicleId` no se puede cambiar una vez creada la reserva.
- INV-003: `endDate` solo se puede modificar para EXTENDER, nunca acortar.
- INV-008: `totalAmount = vehicleSubtotal + insuranceSubtotal` — el backend debe recalcularlo, no confiar en el valor que manda el front (hoy el front lo calcula y lo envía, útil para mostrarlo en pantalla, pero el backend es la fuente de verdad).

### 2.2 Pagos — `features/payment/services/PaymentServices.js`

Ya reescribí `createPayment` para devolver la forma de `Payment` (`types/payment.ts`) con `status: "PENDING_REVIEW"` siempre (nunca se autoaprueba desde el front — **INV-004: no hay pasarela de pago automática**, es transferencia manual + revisión humana).

| Función | Endpoint sugerido | Body | Respuesta esperada |
|---|---|---|---|
| `createPayment(paymentData)` | `POST /payments` — **multipart/form-data**, no JSON (por el archivo) | `reservationId, bankAccountId, amount, referenceNumber, receiptFile` (el `File` crudo) | `Payment` (`paymentId`, `status: "PENDING_REVIEW"`, `receiptFileUrl` real ya subido a S3/MinIO) |

⚠️ **Cambio importante al conectar:** hoy `createPayment` simula la subida del comprobante con `URL.createObjectURL(receiptFile)` (una URL temporal que solo existe en esa pestaña del navegador). Con backend real, `receiptFile` se debe enviar como `multipart/form-data` (no `JSON.stringify`), y `receiptFileUrl` en la respuesta debe ser la URL real del archivo ya almacenado. El `apiClient` de la sección 1 solo cubre JSON — para este endpoint específico se necesita un `fetch` con `FormData` en vez de `JSON.stringify`.

No hay endpoints de aprobar/rechazar pago en el front porque esa acción es del panel de Admin (fuera del alcance de `Front-end`, a menos que exista una vista de admin para eso — no vi una revisada en este flujo).

### 2.3 Vehículos — `features/vehicles/Services/carsService.js`

Hoy es 100% mock (`cars` importado de `carsMock.js`, `vehicle_id` en snake_case). El resto de la app ya espera identificar vehículos con `vehicleId` (ver `types/vehicle.ts` y el fix que aplicamos en `Reservation.jsx`, que normaliza `vehicle_id ?? vehicleId ?? id`). **Recomendación:** que el backend devuelva `vehicleId` directamente (camelCase, como en el tipo), así se puede simplificar esa normalización cuando se conecte.

| Función | Endpoint sugerido | Respuesta esperada |
|---|---|---|
| `getCars()` | `GET /vehicles?status=AVAILABLE` | `Vehicle[]` |
| `getBrands()` / `getModels()` / `getTypes()` / `getEngineTypes()` / `getcapacity()` / `getPrices()` | Hoy se calculan en el front a partir de `getCars()`. Lo más simple es mantenerlos así (siguen funcionando igual sobre los datos reales) en vez de crear un endpoint por filtro, salvo que el catálogo crezca mucho y convenga que el backend lo resuelva. |

### 2.4 Notificaciones — `features/notification/services/notificationService.js`

Ya tiene el patrón `VITE_API_URL` implementado — es el único que **no** requiere reescritura, solo:
1. Definir `VITE_API_URL` en `.env`.
2. Confirmar que el backend expone `GET /notifications` y `PATCH /notifications/:id/read` devolviendo la forma de `Notification` (`types/notification.ts`).

Nota: `INV-001` de `Notification` exige que tenga al menos uno de `reservationId / invoiceId / paymentId / maintenanceId` — el backend debe garantizarlo al crearlas, no el front.

### 2.5 Autenticación — `features/auth/services/`

- **`authService.js` está vacío (0 bytes)** — el login/registro todavía no tiene ninguna llamada implementada, ni mock ni real. Es lo primero que hay que construir, porque el `apiClient` de la sección 1 va a necesitar adjuntar el token que devuelva el login a cada request.
- **`changePasswordService.js`** ya tiene un `fetch` real, pero apunta a una URL hardcodeada de ejemplo (`http://tu-backend.com/api/auth/change-password`) en vez de usar `VITE_API_URL`. Al conectar el backend real, cambiar esto para que use el `apiClient` centralizado (sección 1) y así quede consistente con el resto.

Endpoints típicos a definir con el equipo de backend: `POST /auth/login`, `POST /auth/register`, `POST /auth/change-password`, `POST /auth/verify-email`, `POST /auth/verify-code`.

### 2.6 Panel de administración — `features/admin/**/services/CarsMock.js` (x3)

Hay tres archivos `CarsMock.js` distintos (en `historyMaintenance`, `maintenance` y `status`) con datos de mantenimiento/estado de flota, cada uno con su propia copia de mocks. Antes de conectarlos a backend conviene unificarlos en un solo servicio (`features/admin/vehicles/services/vehicleAdminService.js` o similar) que exponga `getFleetStatus()`, `getMaintenanceHistory()`, `getVehiclesInMaintenance()`, etc., siguiendo el mismo patrón `apiClient` + fallback a mock. No profundicé en el detalle de cada uno porque son pantallas internas de administración, pero el patrón a seguir es idéntico al de las secciones anteriores.

---

## 3. Otras cosas a resolver antes/durante la conexión (no bloquean, pero hay que decidirlas)

Estas son inconsistencias que encontré revisando el código, documentadas para que el equipo las decida conscientemente y no se cuelen como bugs silenciosos al conectar el backend real:

1. **`Branch.id` vs `Branch.branchId`:** el mock de sucursales (`shared/mocks/branches.js`) usa `id`, pero el tipo formal `Branch` (`types/branch.ts`) define `branchId`. Toda la UI hoy usa `.id` consistentemente. Si el backend real devuelve `branchId` (lo más probable, siguiendo el dominio documentado), hay que decidir: ¿el backend responde con `id` para no tocar el front, o se actualiza el front a `branchId` en el momento de conectar? Recomiendo lo segundo (alinear al dominio), pero implica tocar varios componentes (`CardsInfo.jsx`, `Reservation.jsx`, `MapComponents.jsx`, `usePaymentForm.jsx`, `buildReservationRequest.jsx`, entre otros).

2. **Precio como string formateado:** `CartVehicule.jsx` formatea el precio con `.toLocaleString("es-CO")` (ej. `"80.000"`) y ese string viaja hasta `usePaymentForm.jsx`, donde se vuelve a convertir con `Number(...)`. Para vehículos de menos de 1.000.000 esto da un número equivocado pero no cero (ej. `Number("80.000")` = `80`, no `80000`); para precios de 7 cifras (`"1.500.000"`) da `NaN`. **Antes de conectar el backend real conviene separar "precio numérico" (para cálculos) de "precio formateado" (solo para mostrar en pantalla)**, para no arrastrar este bug a producción.

3. **`amount` como número plano vs `Money { amount, currency }`:** el dominio (`types/common.ts`) modela todo monto como `Money`. Hoy el front maneja todo como `number` (COP implícito). Si el backend requiere `Money`, hay que envolver los montos al armar los payloads (`{ amount: totalAmount, currency: "COP" }`) en los servicios de reserva y pago — es un cambio acotado a esos dos archivos si se hace en la capa de servicio, no en los componentes.

4. **`insurance` viene de mocks distintos según el archivo:** vi imports de `insurance` desde `features/Insurance/data/mocks/insurance.jsx`, `features/booking/data/mocks/insurance.js` **y** `features/payment/hooks/usePaymentForm.jsx` importa desde `features/Insurance/...`. Antes de conectar `InsuranceType` a un endpoint real, conviene unificar a una sola fuente para no tener que actualizar tres lugares.

---

## 4. Checklist para activar un servicio (repetible por cada uno)

1. Confirmar con el equipo de backend el contrato exacto (método, path, payload, respuesta) — usar las tablas de la sección 2 como punto de partida, no como verdad absoluta.
2. Si el servicio aún es un `Promise.resolve(...)` puro: refactorizarlo al patrón `isBackendConnected()` de la sección 1, moviendo la simulación actual a una función interna (`createMockReservation`, por ejemplo) que se sigue usando de fallback.
3. Definir `VITE_API_URL` en `.env` local apuntando al backend (real o de pruebas).
4. Probar el flujo completo en el navegador (no solo el endpoint aislado) — varias pantallas leen el mismo estado de contexto (`ReservationContext`, `PaymentContext`) y pueden mostrar datos inconsistentes si el shape de la respuesta no calza exactamente con lo que espera el hook/componente.
5. Revisar la consola del navegador: los `console.error` ya están puestos en los `catch` de `usePaymentForm.jsx` y muestran el error real que devuelva el backend.
6. Quitar el mock del archivo **solo cuando** el equipo decida que ya no hace falta desarrollar sin backend (yo recomiendo dejarlo, es gratis y ya sigue el patrón de `notificationService.js`).

---

## 5. Resumen ejecutivo (para no leer todo)

- Ya existe un patrón bueno (`VITE_API_URL` + fallback a mock) en un solo archivo; generalizarlo a los demás es el trabajo principal.
- Reserva y Pago (`reservationServices.js`, `PaymentServices.js`) ya devuelven la forma correcta de las entidades del dominio (`Reservation`, `Payment`) — conectarlos es cambiar el cuerpo de la función, no su firma ni quien los llama.
- Login/registro no tiene nada implementado todavía (`authService.js` vacío) — es el primer bloque real de backend que hace falta para que el `apiClient` centralizado tenga sentido (headers de autenticación).
- Hay 3 inconsistencias de datos (branch id, precio como string, Money vs number) que conviene resolver a propósito al conectar, no dejar que se cuelen.
