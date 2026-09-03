# 🎓 Guía de Estudio - Cambios 31-08-2026

## 📖 Introducción

Esta guía te ayudará a entender, estudiar y aprender los cambios realizados en el proyecto RentaMovil. Está organizada por niveles de profundidad.

---

## 🎯 Nivel 1: Resumen Rápido (5-10 minutos)

### ¿Qué cambió?

1. **ReservationContext** - Ahora almacena más datos
   - Antes: solo `insuranceId`
   - Ahora: vehículo, fechas, sucursal

2. **Payment Page** - Ahora muestra datos del vehículo
   - Lee datos de ReservationContext
   - Muestra VehicleReservationCard
   - Calcula totales correctamente

3. **PaymentMethodSelector** - Convertido de React Native a Web
   - Antes: Componentes nativos (`View`, `Text`)
   - Ahora: Elementos HTML (`div`, `span`, `button`)

### Problema Resuelto
❌ Error en compilación: "Flow is not supported"  
✅ Causa: React Native no es compatible con proyecto web  
✅ Solución: Convertir a componentes web estándar

---

## 🎯 Nivel 2: Entendimiento Intermedio (20-30 minutos)

### Lee estos archivos en orden:

1. **[RESUMEN_CAMBIOS_31-08-2026.md](./RESUMEN_CAMBIOS_31-08-2026.md)**
   - Visión general de todos los cambios
   - Matriz de cambios
   - Contextos utilizados

2. **[DIAGRAMAS_FLUJO.md](./DIAGRAMAS_FLUJO.md)**
   - Visualiza cómo funcionan los flujos
   - Entiende la secuencia paso a paso
   - Ve estados y transiciones

### Conceptos Clave a Entender

#### A. Context API en React
```javascript
// 1. Crear contexto
const ReservationContext = createContext(null)

// 2. Crear Provider
function ReservationProvider({ children }) {
  const [reservation, setReservation] = useState(initialState)
  
  function updateReservation(data) {
    setReservation(prev => ({ ...prev, ...data }))
  }
  
  return (
    <ReservationContext.Provider value={{ reservation, updateReservation }}>
      {children}
    </ReservationContext.Provider>
  )
}

// 3. Usar en componente
function MyComponent() {
  const { reservation, updateReservation } = useReservation()
}
```

#### B. Flujo de Datos Unidireccional
```
Reservation.jsx
    ↓ (actualiza contexto)
ReservationContext
    ↓ (lee Payment.jsx)
Payment.jsx
```

#### C. Optimización con useMemo
```javascript
// Sin optimización: se crea nuevo objeto en cada render
const contextValue = { reservation, updateReservation }

// Con optimización: solo crea si reservation cambia
const contextValue = useMemo(() => ({
  reservation,
  updateReservation
}), [reservation])
```

---

## 🎯 Nivel 3: Dominio Avanzado (45-60 minutos)

### Lee estos archivos en profundidad:

1. **[FEATURE_PAYMENT_FLOW.md](./FEATURE_PAYMENT_FLOW.md)**
   - Arquitectura completa del sistema de pago
   - Validaciones implementadas
   - Integración con API

2. **[FEATURE_RESERVATION_FLOW.md](./FEATURE_RESERVATION_FLOW.md)**
   - Flujo desde Home hasta Payment
   - Cálculos de días y totales
   - Validaciones de fechas y licencia

3. **[BUGFIX_REACT_NATIVE_WEB_CONFLICT.md](./BUGFIX_REACT_NATIVE_WEB_CONFLICT.md)**
   - Comprende el problema a fondo
   - Diferencias React Native vs Web
   - Configuración de Vite

### Ejercicios Prácticos

#### Ejercicio 1: Rastrear Datos
```
1. Abre Reservation.jsx
2. Busca handlePaymentWithReservation()
3. Identifica qué datos se pasan a updateReservation()
4. Abre ReservationContext y verifica cómo se guardan
5. Abre Payment.jsx y rastrea cómo se leen
```

#### Ejercicio 2: Entender Validaciones
```
1. Abre usePaymentForm hook
2. Encuentra la validación de licencia
3. Entiende por qué se compara con returnDate
4. Modifica la lógica (ej: cambiar a pickupDate)
5. Predice qué cambiaría en el comportamiento
```

#### Ejercicio 3: Reconstruir un Componente
```
1. Copia PaymentMethosSelector.jsx (web)
2. Intenta convertirlo manualmente a React Native
3. Compara con la versión original (git history)
4. Identifica las diferencias clave
```

---

## 📚 Preguntas de Estudio

### Nivel Básico
- ¿Qué es Context API?
- ¿Dónde se guarda la información del vehículo?
- ¿Cuál es la diferencia entre `<button>` y `<TouchableOpacity>`?
- ¿Por qué falla la compilación con React Native?

### Nivel Intermedio
- ¿Cómo fluyen los datos de Reservation a Payment?
- ¿Qué hace `useMemo` en ReservationContext?
- ¿Por qué se valida la licencia en el cliente?
- ¿Qué es "Flow" en programación?

### Nivel Avanzado
- ¿Cómo podrías compartir lógica entre app_mobile y web?
- ¿Cuál sería el flujo si agregaras más contextos?
- ¿Cómo optimizarías el re-render de Payment?
- ¿Qué sucedería si Reservation.jsx tuviera sus propios estados en lugar de contexto?

---

## 🧪 Pruebas para Validar Comprensión

### Test 1: Compresión Básica
```
PREGUNTA: ¿Qué data guarda ahora ReservationContext?
OPCIONES:
a) Solo insuranceId
b) insuranceId, vehicle, dates, branch
c) Toda la información del usuario
d) Solo el vehículo

RESPUESTA: b) ✅
```

### Test 2: Flujo de Datos
```
PREGUNTA: ¿En qué orden ocurren estos eventos?
1. Navegar a Payment
2. Click en "Ir a Pago"
3. updateReservation()
4. Mostrar VehicleReservationCard

ORDEN CORRECTO: 2 → 3 → 1 → 4 ✅
```

### Test 3: Componentes Web
```
PREGUNTA: ¿Cuál es el equivalente web de TouchableOpacity?
RESPUESTA: <button> ✅
```

---

## 🔧 Laboratorio Práctico

### Proyecto 1: Agregar Campo a Contexto
**Objetivo:** Agregar `driverInfo` a ReservationContext

**Pasos:**
1. Abre ReservationContext.jsx
2. Agrega `driverInfo: null` al estado inicial
3. Modifica `updateReservation()` para incluirlo
4. Abre Reservation.jsx
5. Captura datos del conductor y guárdalos
6. Abre Payment.jsx
7. Muestra datos del conductor desde contexto

**Validación:** 
- ✅ Los datos persisten al navegar
- ✅ No hay errores en consola
- ✅ Payment.jsx lee correctamente

### Proyecto 2: Crear Nuevo Componente
**Objetivo:** Crear `ResumeneCard.jsx` que muestre todos los datos

**Pasos:**
1. Crea archivo `ResumeneCard.jsx`
2. Lee datos de ReservationContext
3. Lee datos de PaymentContext
4. Muestra: vehículo + fechas + conductor + total
5. Intégralo en Payment.jsx

### Proyecto 3: Migrar Componente a Web
**Objetivo:** Convertir un componente React Native a Web

**Pasos:**
1. Copia un componente de app_mobile
2. Reemplaza imports de `react-native`
3. Convierte componentes nativos a HTML
4. Crea archivo `.css` con estilos
5. Prueba en proyecto web

---

## 📊 Mapa Mental: Conceptos Clave

```
React Context
├── createContext()
├── useContext()
├── Provider component
├── Value prop
└── useMemo optimization

Payment Flow
├── ReservationContext
├── PaymentContext
├── usePaymentForm hook
├── Validaciones
└── API Integration

Web Components
├── <div> vs View
├── <button> vs TouchableOpacity
├── CSS vs StyleSheet
├── onClick vs onPress
└── className vs style prop
```

---

## 💡 Tips de Aprendizaje

### 1. Usa DevTools
```
✅ Abre React DevTools
✅ Selecciona componentes
✅ Observa el estado del contexto
✅ Ve cómo cambia en tiempo real
```

### 2. Agrega Console.logs
```javascript
// En ReservationContext
function updateReservation(data) {
  console.log("📝 Actualizando:", data)
  setReservation(previous => ({...}))
}

// En Payment.jsx
const { reservation } = useReservation()
console.log("📦 Leyendo:", reservation)
```

### 3. Dibuja Diagramas
```
En papel:
- Caja para cada contexto
- Flechas para flujo de datos
- Colores para diferentes tipos
```

### 4. Explica a Alguien Más
```
✅ Mejor forma de validar comprensión
✅ Enseña a un compañero
✅ Escribe un blog post
✅ Graba un video explicativo
```

---

## 🎬 Roadmap de Estudio

### Día 1: Conceptos Básicos
- [ ] Lee RESUMEN_CAMBIOS_31-08-2026.md
- [ ] Visualiza DIAGRAMAS_FLUJO.md
- [ ] Responde Nivel Básico de preguntas

### Día 2: Profundidad Media
- [ ] Lee FEATURE_PAYMENT_FLOW.md
- [ ] Lee FEATURE_RESERVATION_FLOW.md
- [ ] Realiza Ejercicio 1 (Rastrear Datos)

### Día 3: Dominio Completo
- [ ] Lee BUGFIX_REACT_NATIVE_WEB_CONFLICT.md
- [ ] Realiza Ejercicio 2 y 3
- [ ] Responde Nivel Intermedio/Avanzado

### Día 4: Práctica
- [ ] Realiza Proyecto 1 (Agregar Campo)
- [ ] Realiza Proyecto 2 (Nuevo Componente)
- [ ] Realiza Proyecto 3 (Migrar Componente)

### Día 5: Consolidación
- [ ] Ejecuta todos los tests
- [ ] Revisa tu código
- [ ] Documenta lo aprendido

---

## 🎓 Referencias Externas

### React Context API
- Documentación oficial: https://react.dev/reference/react/useContext
- Tutorial: https://react.dev/learn/passing-data-deeply-with-context

### Hooks
- useState: https://react.dev/reference/react/useState
- useMemo: https://react.dev/reference/react/useMemo
- useEffect: https://react.dev/reference/react/useEffect

### Vite
- Configuración: https://vitejs.dev/config/
- Optimización: https://vitejs.dev/guide/dep-pre-bundling.html

### React Native (para comparación)
- Documentación: https://reactnative.dev/docs/intro

---

## ✅ Checklist de Dominio

### Comprensión
- [ ] Entiendo qué es Context API
- [ ] Entiendo el flujo de datos Reservation → Payment
- [ ] Entiendo por qué se cambió React Native
- [ ] Entiendo las validaciones en usePaymentForm

### Aplicación
- [ ] Puedo modificar ReservationContext
- [ ] Puedo agregar un campo al contexto
- [ ] Puedo convertir componentes React Native a Web
- [ ] Puedo rastrear datos entre componentes

### Análisis
- [ ] Puedo explicar el flujo a alguien más
- [ ] Puedo identificar problemas en el código
- [ ] Puedo sugerir mejoras
- [ ] Puedo escribir tests para los componentes

### Síntesis
- [ ] Puedo crear nuevos componentes siguiendo patrones
- [ ] Puedo integrar nuevas features al flujo
- [ ] Puedo optimizar re-renders
- [ ] Puedo documentar cambios

---

## 🆘 Preguntas Frecuentes

### P: ¿Por qué usar Context en lugar de props drilling?
**R:** Context evita pasar props a través de muchos componentes. Más limpio y mantenible.

### P: ¿Dónde se valida el pago realmente?
**R:** En cliente (JavaScript) en usePaymentForm, pero DEBE validarse también en backend.

### P: ¿Qué es "Flow" en React Native?
**R:** Sistema de tipado estático. Similar a TypeScript pero específico de React Native.

### P: ¿Puedo usar React Native en proyecto web?
**R:** No. Cada proyecto tiene su propio stack. Web usa React DOM, móvil usa React Native.

### P: ¿Cómo comparto código entre app_mobile y web?
**R:** Lógica pura en carpetas compartidas (utils, hooks sin UI). UI separada en cada proyecto.

---

## 📝 Plantilla de Notas

Usa esta plantilla mientras estudias:

```markdown
## Tema: _____________

### ¿Qué es?
[Tu explicación]

### ¿Dónde se usa?
[Ubicación en el código]

### ¿Por qué es importante?
[Contexto y relevancia]

### Ejemplo:
[Código o diagrama]

### Preguntas pendientes:
- [ ] 
- [ ] 
- [ ]

### Fuentes:
- [Documento]
- [Archivo de código]
```

---

## 🎯 Objetivos de Aprendizaje

Al completar esta guía, podrás:

- ✅ Explicar el flujo Payment-Reservation
- ✅ Modificar ReservationContext sin romper la app
- ✅ Convertir componentes React Native a Web
- ✅ Debuggear problemas de estado
- ✅ Crear nuevas features siguiendo estos patrones
- ✅ Documentar cambios de forma clara

---

## 📞 Próximos Pasos

1. **Estudia:** Dedica 5 días siguiendo el roadmap
2. **Practica:** Realiza los proyectos prácticos
3. **Experimenta:** Intenta modificar el código
4. **Enseña:** Explica a otros lo que aprendiste
5. **Contribuye:** Agrega nuevas features o mejoras

---

**Última actualización:** 31-08-2026  
**Versión:** 1.0  
**Estado:** Listo para estudiar 📚

¡Buena suerte en tu aprendizaje! 🚀

