# Auditoría visual breve — RentaMovil

## Alcance

Revisión documental de la web (React/Vite) y la app móvil (React Native). Pantallas representativas revisadas: Inicio/catálogo, Reserva y Pago.

## Estado general

**🟡 Necesita revisión.** El proyecto cuenta con variables de tema, componentes compartidos y layouts responsive, pero la tipografía, los colores y los controles no siguen todavía un sistema único entre features ni entre web y móvil.

## Tipografía

| Aspecto | Estado actual | Hallazgo |
| --- | --- | --- |
| Fuente principal web | `system-ui, 'Segoe UI', Roboto, sans-serif` | Está definida globalmente. |
| Fuentes adicionales | Poppins, Plus Jakarta Sans, Arial, Franklin Gothic | Se usan por componente; no se encontró carga local ni importación de Poppins/Plus Jakarta Sans. |
| Fuente móvil | Sistema | Hay escala declarada de 12 a 30 px, pero no se consume de forma uniforme. |
| Jerarquía | H1 global: 56 px; Pago: H1 de 26 px/800 | Inicio y Reserva no muestran un H1 de pantalla claro. |
| Legibilidad | Textos de 9–10 px en módulos administrativos | Demasiado pequeño para contenido funcional. |

**Recomendación:** usar una sola familia garantizada, crear tokens tipográficos y mantener una escala de `12 / 14 / 16 / 20 / 24 / 32 px`.

## Color

| Rol | Tema claro | Tema oscuro |
| --- | --- | --- |
| Fondo | `#F5F7FA` | `#020617` |
| Superficie | `#FFFFFF` | `#0F172A` |
| Texto | `#0A0A0A` | `#FFFFFF` |
| Texto secundario | `#37474F` / `#9CA3AF` | `#AEB1B3` |
| Acción principal | `#217D47` | `#00C853` |
| Acento | `#E7D351` | `#00C853` |
| Error / warning / info | No definidos globalmente | No definidos globalmente |

**Hallazgos clave:**

- Inicio usa colores hardcodeados (`#F8FAFC`, `#0F172A`, `#64748B`) y no se adapta por completo al tema.
- Hay varios verdes para la misma función, entre ellos `#217D47`, `#00C853`, `#4B9835` y `#16A34A`.
- El tema móvil llamado `dark` usa fondo claro (`#F1F5F9`), por lo que su nombre no coincide con su apariencia.
- Algunos estilos móviles usan tokens no definidos en `themes.ts`, como `textSecondary`, `overlay` y `shadow`.

## Componentes UI

| Elemento | Estado | Observación |
| --- | --- | --- |
| Botones web | 🔴 Inconsistente | No hay componente único; cambian tamaño, radio y estados por feature. |
| Inputs | 🟡 Parcial | Usan radios de 8 px y Poppins en varias pantallas, pero no una regla única. |
| Cards | 🟡 Parcial | Superficies y bordes son similares, pero sombras/radios cambian. |
| Iconos | 🟡 Parcial | Se mezclan múltiples familias de `react-icons`; móvil usa FontAwesome. |
| Imágenes | 🟢 Funcional | Vehículos usan `contain`; banners usan `cover`; son responsive. |

Caso prioritario: `buttonBack` usa `transform: translate(-820px, 10px)`, un posicionamiento fijo que puede romper el diseño responsive.

## Análisis por pantalla

### Inicio / catálogo — 🟡

- Buen uso de imágenes de vehículos y diseño responsive.
- No cuenta con H1 visible de contenido.
- Mezcla tokens y colores hardcodeados.
- Filtros y tarjetas no comparten una escala tipográfica única.

### Reserva — 🟡

- Inputs y selects usan Poppins de 16 px.
- No tiene título de página jerarquizado.
- El mapa/ubicación se oculta en móvil sin una alternativa equivalente.
- El error usa `#EF4444` fuera del sistema global.

### Pago — 🟡

- Es la pantalla más cohesionada: CTA con estados hover, active y disabled.
- Usa variables de tema en tarjetas, bordes y acción principal.
- Mezcla la fuente global y Poppins; precios, fechas y resumen están hardcodeados.

## Prioridades

1. Cargar una fuente única real o usar la fuente del sistema de manera consistente.
2. Definir tokens semánticos compartidos: texto secundario, éxito, warning, error, info, overlay y sombra.
3. Crear componentes web compartidos para botón, input, card y badge.
4. Sustituir colores hardcodeados por variables de tema y consolidar el color primario.
5. Corregir los tokens faltantes y el nombre/configuración del tema móvil `dark`.
6. Añadir H1 a Inicio y Reserva y evitar tamaños inferiores a 12 px para contenido funcional.

## Sistema visual recomendado

- **Tipografía:** una sola familia UI; Body 16/400, Caption 12/400, H3 20/600, H2 24/700, H1 32/700.
- **Color:** conservar fondo/superficies actuales y elegir un único verde primario por tema; añadir tokens explícitos para estados.
- **Componentes:** botón primario/secundario/destructivo con estados comunes, card con radio 12–16 px, input con foco visible e iconografía limitada a un conjunto principal.

## Conclusión

RentaMovil tiene una base válida para consolidar su identidad visual. El mayor impacto vendrá de unificar fuentes, colores semánticos y componentes reutilizables; después, de corregir jerarquías de página y detalles responsive.
