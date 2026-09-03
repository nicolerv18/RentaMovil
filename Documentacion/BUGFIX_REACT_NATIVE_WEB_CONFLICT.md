# 🔧 CORRECCIÓN: Incompatibilidad React Native en Proyecto Web

## 📌 Resumen General
Se corrigió un error crítico donde el proyecto web (Vite + React) estaba importando componentes de React Native. Esto causaba conflicto durante la compilación porque Vite intenta procesar el código de React Native, que usa Flow (tipado) que no es soportado.

**Fecha de Corrección:** 31-08-2026  
**Tipo de Error:** Build Error / Incompatibilidad de Framework  
**Archivos Afectados:** 3  
**Lenguajes Involucrados:** JavaScript (React + React Native)

---

## 🐛 Problema Original

### Error en Consola Vite
```
Error: Flow is not supported
   ╭─[ node_modules/react-native/index.js:1:1 ]
   │
 1 │ ╭─▶ /**
   ┆ ┆   
 9 │ ├─▶  */
   │ │         
   │ ╰───────── 
───╯

Error during dependency optimization:
Build failed with 1 error:
[PARSE_ERROR] Error: Flow is not supported
```

### Causa Raíz
Dos archivos en el proyecto **web** (Front-end) estaban importando módulos de **React Native** (que es para móvil):

**Archivo 1:**
```jsx
// ❌ INCORRECTO: Proyecto Web importando React Native
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

export default function PaymentMethodSelector({ selectedMethod, onSelect }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Método de Pago</Text>
      {/* ... */}
    </View>
  )
}
```

**Archivo 2:**
```typescript
// ❌ INCORRECTO: Tipo de React Native en proyecto Web
import { ImageSourcePropType } from "react-native"

export type Vehicle = {
  image: ImageSourcePropType  // Este tipo no existe en Web
}
```

### Por Qué Causa Error
1. Vite procesa **toda** dependencia en `node_modules`
2. Encuentra `react-native` en el árbol de dependencias
3. Intenta compilar `/node_modules/react-native/index.js`
4. Ese archivo contiene anotaciones **Flow** (`// @flow`)
5. Vite + Rolldown no soportan Flow
6. ❌ Compilación falla

---

## ✅ Solución Implementada

### Paso 1: Convertir PaymentMethosSelector.jsx
**Ubicación:** `src/features/payment/components/PaymentMethosSelector.jsx`

**Cambio:** React Native → HTML Web

**Antes (React Native):**
```jsx
import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

export default function PaymentMethodSelector({ selectedMethod, onSelect }) {
  const mockMethods = [
    { id: "1", type: "Visa", lastFour: "4242" },
    { id: "2", type: "MasterCard", lastFour: "5555" }
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Método de Pago</Text>
      {mockMethods.map((method) => {
        const isSelected = selectedMethod?.id === method.id
        return (
          <TouchableOpacity
            key={method.id}
            style={[styles.methodCard, isSelected && styles.selectedCard]}
            onPress={() => onSelect?.(method)}
          >
            <Text style={styles.methodText}>
              {method.type} ended in •••• {method.lastFour}
            </Text>
            {isSelected && <View style={styles.radioDot} />}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff", marginVertical: 8, borderRadius: 8 },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 12 },
  methodCard: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    padding: 14, 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 6, 
    marginBottom: 8 
  },
  selectedCard: { borderColor: "#00C853", backgroundColor: "#f0fff4" },
  methodText: { fontSize: 14 },
  radioDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: "#00C853" }
})
```

**Después (HTML Web):**
```jsx
import React from "react"
import { usePayment } from "../context/PaymentContext"
import "./PaymentMethodSelector.css"

export default function PaymentMethodSelector({ selectedMethod, onSelect }) {
  const mockMethods = [
    { id: "1", type: "Visa", lastFour: "4242" },
    { id: "2", type: "MasterCard", lastFour: "5555" }
  ]

  return (
    <div className="payment-container">
      <h3 className="payment-title">Método de Pago</h3>
      {mockMethods.map((method) => {
        const isSelected = selectedMethod?.id === method.id
        return (
          <button
            key={method.id}
            className={`payment-method-card ${isSelected ? "payment-selected-card" : ""}`}
            onClick={() => onSelect?.(method)}
            type="button"
          >
            <span className="payment-method-text">
              {method.type} ended in •••• {method.lastFour}
            </span>
            {isSelected && <div className="payment-radio-dot" />}
          </button>
        )
      })}
    </div>
  )
}
```

### Mapeo de Componentes

| React Native | HTML Web | Elemento |
|--------------|----------|----------|
| `View` | `<div>` | Contenedor |
| `Text` | `<span>` o `<h3>` | Texto |
| `TouchableOpacity` | `<button>` | Elemento clickeable |
| `StyleSheet.create()` | CSS `.css` file | Estilos |

### Paso 2: Crear Archivo de Estilos
**Archivo:** `src/features/payment/components/PaymentMethodSelector.css`

**Contenido:**
```css
.payment-container {
  padding: 16px;
  background-color: #fff;
  margin: 8px 0;
  border-radius: 8px;
}

.payment-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
  margin-top: 0;
}

.payment-method-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 8px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  text-align: left;
  font-family: inherit;
}

.payment-method-card:hover {
  border-color: #00c853;
  background-color: #f9fff7;
}

.payment-selected-card {
  border-color: #00c853;
  background-color: #f0fff4;
}

.payment-method-text {
  font-size: 14px;
}

.payment-radio-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #00c853;
  flex-shrink: 0;
}
```

### Paso 3: Actualizar Tipo en vehicles.ts
**Ubicación:** `src/types/vehicles.ts`

**Antes:**
```typescript
import { ImageSourcePropType } from "react-native"

export type Vehicle = {
  image: ImageSourcePropType  // ❌ Tipo de React Native
}
```

**Después:**
```typescript
// ❌ Eliminada importación de React Native
// Solo se importa lo necesario para el tipo web

export type Vehicle = {
  image: string  // ✅ URL de imagen (estándar web)
}
```

### Paso 4: Actualizar vite.config.js
**Ubicación:** `vite.config.js`

**Agregada Configuración:**
```javascript
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['react-native']  // ⭐ Excluir react-native de optimización
  }
})
```

**Por Qué:** Vite no intenta procesar `react-native` si accidentalmente se importa.

---

## 🔄 Comparación: React Native vs Web

### React Native (Móvil - app_mobile/)
```
react-native/
├── View → Renderiza componentes nativos iOS/Android
├── Text → Texto nativo
├── StyleSheet → Estilos nativos
├── TouchableOpacity → Respuesta táctil
└── Tipos: ImageSourcePropType, Platform, etc.
```

**Características:**
- Compila a código nativo (Xcode/Android Studio)
- No existe DOM (Document Object Model)
- No usa CSS
- Optimizado para móviles

### React Web (Web - web/Front-end/)
```
react/
├── <div> → Contenedores HTML
├── <span>, <h3>, <p> → Texto HTML
├── .css → Estilos CSS
├── <button> → Elementos clickeables
└── Tipos estándar: string, number, etc.
```

**Características:**
- Compila a HTML/CSS/JavaScript
- Usa DOM
- CSS estándar
- Optimizado para navegadores

---

## 📊 Tabla Resumen de Cambios

| Componente | Antes | Después | Razón |
|-----------|-------|---------|-------|
| **PaymentMethodSelector.jsx** | React Native | HTML Web | No es compatible con Vite |
| **PaymentMethodSelector.css** | En `StyleSheet.create()` | Archivo `.css` externo | Separación de estilos |
| **vehicles.ts** | `ImageSourcePropType` | `string` | Tipo nativo vs web |
| **vite.config.js** | Sin configuración | `exclude: ['react-native']` | Evitar procesamiento |

---

## ✅ Verificación Post-Corrección

### Errores Antes
```
❌ [PARSE_ERROR] Error: Flow is not supported
❌ node_modules/react-native/index.js can't be parsed
❌ Build failed with 1 error
```

### Errores Después
```
✅ No hay errores de React Native
✅ Compilación exitosa
✅ Proyecto web funciona con Vite
```

---

## 🎯 Lecciones Aprendidas

### ❌ QUÉ NO HACER
```javascript
// ❌ No importar React Native en proyecto web
import { View, Text } from "react-native"

// ❌ No usar tipos de React Native en web
import { ImageSourcePropType } from "react-native"

// ❌ No usar StyleSheet en web
const styles = StyleSheet.create({ /* ... */ })
```

### ✅ QUÉ HACER
```javascript
// ✅ Usar componentes HTML estándar
import React from "react"
<div>, <span>, <button>

// ✅ Usar tipos web estándar
type Vehicle = {
  image: string  // URL
}

// ✅ Usar CSS en archivos separados
import "./Component.css"
<div className="container">
```

---

## 🏗️ Estructura Correcta del Proyecto

```
RentaMovil/
├── app_mobile/              ← Proyecto React Native (móvil)
│   ├── rentaMovil/
│   │   ├── src/
│   │   │   └── features/
│   │   │       ├── booking/
│   │   │       └── payment/
│   │   └── package.json     ← react-native, expo, etc.
│
├── web/                     ← Proyecto React Web
│   └── Front-end/
│       ├── src/
│       │   └── features/
│       │       ├── booking/
│       │       │   └── components/
│       │       │       └── VehicleReservationCard.jsx  ✅ Componente Web
│       │       └── payment/
│       │           ├── components/
│       │           │   ├── PaymentMethosSelector.jsx  ✅ Convertido a Web
│       │           │   └── PaymentMethosSelector.css  ✅ Estilos CSS
│       │           └── hooks/
│       └── package.json     ← react, react-dom, vite (NO react-native)
│
└── model/                   ← Backend Java
```

---

## 🚀 Próxima Iteración

Para evitar este problema en futuro:

1. **Revisar imports al crear componentes**
   ```javascript
   // Verificar línea 1 de cada archivo .jsx
   ❌ from "react-native"  // Revisar en proyecto web
   ✅ from "react"         // Correcto
   ```

2. **Configurar ESLint para detectar**
   ```javascript
   // En .eslintrc.js agregar:
   "rules": {
     "no-restricted-imports": [
       "error",
       {
         "name": "react-native",
         "message": "Usar componentes web estándar en proyecto web"
       }
     ]
   }
   ```

3. **Agregar comentario en código compartido**
   ```javascript
   // Si reutilizas lógica entre móvil y web:
   // ✅ En shared/utils/ - lógica pura (sin imports de RN)
   // ❌ En shared/components/ - no incluir componentes UI
   ```

---

## 📚 Referencias Técnicas

### Configuración Vite
- **Docs:** https://vitejs.dev/config/
- **optimizeDeps:** Controla qué dependencias optimizar

### React Native en Vite
- El error ocurre porque Vite intenta procesar con Rolldown
- Rolldown usa esbuild que no soporta Flow
- `exclude` le dice a Vite que ignoren esas dependencias

### Tipado TypeScript Web
```typescript
// ✅ Tipos web estándar
string    // Texto
number    // Números
boolean   // Booleano
Date      // Fechas
URL       // URLs (web)
Blob      // Datos binarios (web)
```

---

## 🔐 Checklist de Migración React Native → Web

- [ ] Reemplazar `View` con `<div>`
- [ ] Reemplazar `Text` con `<span>` o `<h3>`
- [ ] Reemplazar `TouchableOpacity` con `<button>`
- [ ] Reemplazar `StyleSheet.create()` con `.css` externo
- [ ] Reemplazar `onPress` con `onClick`
- [ ] Reemplazar `style={styles.x}` con `className="x"`
- [ ] Eliminar tipos de `react-native`
- [ ] Usar tipos web estándar (`string`, `URL`, etc.)
- [ ] Verificar que no haya `@flow` en imports
- [ ] Ejecutar `npm run build` para confirmar

---

## 📝 Notas Importantes

- ⚠️ El proyecto tiene **dos ramas separadas**: app_mobile y web
- ⚠️ No compartir código de componentes UI entre ramas
- ⚠️ Compartir solo lógica pura (utils, hooks sin UI)
- ⚠️ Cada rama tiene su propio `package.json`
- ⚠️ Web no debe tener `react-native` en dependencias

---

## 🎓 Conclusión

Este error fue causado por importaciones de **React Native en proyecto web**. La solución fue:

1. ✅ Convertir componentes React Native a HTML web
2. ✅ Mover estilos a archivos CSS
3. ✅ Cambiar tipos nativos por tipos web
4. ✅ Configurar Vite para excluir react-native

Ahora el proyecto web compila correctamente sin conflictos. ✨

