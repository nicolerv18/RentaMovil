# Auditoría de Tipografía, Color y Elementos UI — RentaMovil

Alcance: revisión documental del código web (React/Vite) y móvil (React Native/Expo). No se modificó ningún archivo durante esta auditoría.

Las pantallas web elegidas son Inicio/catálogo, Reserva y Pago: cubren el flujo principal de búsqueda, selección y conversión.

## 1. Auditoría tipográfica

### 1.1 Familias tipográficas

| Familia | Tipo / uso detectado | Ubicación |
|---|---|---|
| `system-ui, 'Segoe UI', Roboto, sans-serif` | Fuente global web y encabezados globales | [index.css](C:\Users\Niki\Documents\model\web\Front-end\src\index.css:72) |
| `ui-monospace, Consolas, monospace` | Código y `.counter` | [index.css](C:\Users\Niki\Documents\model\web\Front-end\src\index.css:74) |
| `Poppins, sans-serif` | Inputs, filtros, reserva, pagos, historial y varios módulos administrativos | Home, Reservation, Payment y CSS Modules |
| `Plus Jakarta Sans, sans-serif` | Formularios administrativos de vehículos y mantenimiento | `VehicleForm.module.css`, `MaintenanceForm.module.css` |
| `Franklin Gothic Medium`, `Arial Narrow`, Arial | Navegación administrativa y secundaria | `NavBarAdmin.css`, `NavbarTwo.css` |
| Arial | SVG de marcas de pago; una navegación secundaria | [Payment.jsx](C:\Users\Niki\Documents\model\web\Front-end\src\features\payment\pages\Payment.jsx:71) |
| `Segoe UI`, Tahoma, Geneva, Verdana | Títulos específicos de `CardsInfo` | `CardsInfo.style.css` |
| Fuente del sistema de React Native | App móvil: no se declara `fontFamily` en el tema ni en sus estilos principales | `app_mobile/rentaMovil/src` |

No se encontró una importación de Google Fonts, `@font-face`, ni archivos de fuentes locales para Poppins o Plus Jakarta Sans. Por ello, esas fuentes no están garantizadas: si no llegan por un recurso externo fuera del repositorio, el navegador aplica el fallback `sans-serif`.

La web tiene una base tipográfica global, pero no una estrategia única: los componentes sobreescriben familias y tamaños. La app móvil sí centraliza una escala nominal (`30, 24, 20, 18, 16, 14, 12`), aunque muchos estilos no la consumen directamente. [typography.ts](C:\Users\Niki\Documents\model\app_mobile\rentaMovil\src\theme\constants\typography.ts:1)

### 1.2 Jerarquía tipográfica por pantallas

### PANTALLA 1 — Inicio / catálogo de vehículos

| Elemento | Tipografía | Peso | Tamaño | Estado |
|---|---|---:|---:|---|
| Título principal (H1) | Global `--heading`; no hay H1 renderizado en `Home.jsx` | 500 global | 56 px / 36 px responsive global | 🟡 |
| Encabezados (H2) | `system-ui, Segoe UI, Roboto` | 500 | 24 px / 20 px responsive | 🟢 |
| Subtítulos (H3/H4) | Heredada; tarjeta usa `h3` | No definido / 700 en filtros | 18 px en tarjeta; 24 px en filtros | 🟡 |
| Texto de cuerpo | Heredada global | No definido | 18 px base; 13–16 px en componentes | 🟡 |
| Texto botones | Poppins en filtros móviles; heredada en tarjetas | 600 / no definido | 14–15 px | 🟡 |
| Texto pequeño / notas | Poppins o heredada | 500–600 | 10–14 px | 🟡 |

Observación: `Home.jsx` usa un `h3` para “Flota Disponible” y no un H1 visual del contenido. En las tarjetas aparecen tamaños de 12, 13, 18 y 20 px. [Home.css](C:\Users\Niki\Documents\model\web\Front-end\src\features\vehicles\pages\Home.css:65), [CartVehicule.css](C:\Users\Niki\Documents\model\web\Front-end\src\features\vehicles\components\CartVehicule.css:29)

### PANTALLA 2 — Reserva

| Elemento | Tipografía | Peso | Tamaño | Estado |
|---|---|---:|---:|---|
| Título principal (H1) | No definido en esta pantalla | — | — | 🔴 |
| Encabezados (H2) | No definido en esta pantalla | — | — | 🔴 |
| Subtítulos (H3/H4) | Heredada global | No definido | 18 px / 20 px en móvil | 🟡 |
| Texto de cuerpo | Poppins en inputs; heredada en tarjeta | 400–700 | 13–16 px | 🟡 |
| Texto botones | Heredada | 600 en móvil | 14 px móvil | 🟡 |
| Texto pequeño / notas | Heredada | 600–700 | 13–15 px | 🟡 |

La pantalla depende de `h3`, `h4`, párrafos y etiquetas sin una jerarquía de título de página explícita. Los inputs/select usan Poppins de 16 px, 14 px en móvil. [Reservation.css](C:\Users\Niki\Documents\model\web\Front-end\src\features\booking\pages\Reservation.css:31)

### PANTALLA 3 — Pago

| Elemento | Tipografía | Peso | Tamaño | Estado |
|---|---|---:|---:|---|
| Título principal (H1) | Heredada global | 800 | 26 px | 🟡 |
| Encabezados (H2) | No definido | — | — | 🟡 |
| Subtítulos (H3/H4) | Heredada / Poppins en opciones | 700–800 | 13–20 px | 🟡 |
| Texto de cuerpo | Poppins y heredada | 400–700 | 13–16 px | 🟡 |
| Texto botones | Poppins | 700 | 15 px | 🟢 |
| Texto pequeño / notas | Heredada | 700 / no definido | 12–14 px | 🟡 |

Pago es la pantalla más estructurada tipográficamente del flujo web: tiene título, subtítulo, cabeceras, valores y CTA explícitos. Sin embargo, mezcla la fuente global con Poppins y usa pesos altos repetidamente. [Payment.css](C:\Users\Niki\Documents\model\web\Front-end\src\features\payment\pages\Payment.css:18)

### 1.3 Consistencia tipográfica

| Hallazgo | Estado |
|---|---|
| Base web global definida: 18 px, interlineado 145 %, `letter-spacing` 0.18 px | 🟢 |
| Poppins y Plus Jakarta Sans se declaran sin carga identificable en el código | 🔴 |
| Múltiples familias para funciones equivalentes: títulos, formularios y navegación | 🔴 |
| Tamaños recurrentes pero no tokenizados en web: 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 26, 28, 35, 56 px | 🟡 |
| Títulos de Inicio y Reserva sin H1 visible propio | 🟡 |
| Captions de 9–10 px en módulos de historial/inventario | 🔴 |
| `line-height` aparece solo en algunos componentes | 🟡 |
| App móvil cuenta con escala formal, pero muchos archivos usan números directos | 🟡 |

**Escala actualmente usada:** 9–56 px, con alta concentración entre 12 y 16 px.

**Escala recomendada, no aplicada:** `12 / 14 / 16 / 20 / 24 / 32 / 40 px`; pesos `400 / 500 / 600 / 700`. Mantendría una familia principal real y cargada para web; en móvil, la fuente del sistema hasta que se incorpore una fuente compartida.

## 2. Auditoría de color

### 2.1 Extracción y centralización

La web centraliza buena parte del tema con variables CSS en `index.css`, pero coexiste con una cantidad alta de colores hardcodeados. Se localizaron más de cien valores únicos entre hex, RGB y RGBA.

Paleta funcional central de web:

| Variable / valor | Función |
|---|---|
| `--bg`: `#F5F7FA` claro, `#020617` oscuro | Fondo global |
| `--card-bg`: `#FFFFFF` claro, `#0F172A` oscuro | Superficies y tarjetas |
| `--text`: `#0A0A0A` claro, `#FFFFFF` oscuro | Texto principal |
| `--text-h`: `#37474F` claro, `#AEB1B3` oscuro | Títulos / texto secundario |
| `--navbar`: `#217D47` claro, `#0F172A` oscuro | Navegación |
| `--button`: `#217D47` claro, `#00C853` oscuro | CTA |
| `--accent`: `#E7D351` claro, `#00C853` oscuro | Acento |
| `--border`: `rgba(55,71,79,.12)` claro | Bordes |
| `--placeholder`: `#9CA3AF` | Placeholders y textos auxiliares |

Hay además configuraciones `skylight` y `darkPurple`, por lo que el sistema tiene cuatro conjuntos web de variables, aunque el contexto de tema alterna explícitamente entre `light` y `dark`. [ThemeContext.jsx](C:\Users\Niki\Documents\model\web\Front-end\src\contexts\ThemeContext.jsx:16)

En móvil hay cuatro temas (`light`, `dark`, `Ocean`, `gray`), con tokens de fondo, tarjeta, texto, borde, éxito y error. El tema llamado `dark` no es visualmente oscuro: usa fondo `#F1F5F9` y tarjetas blancas. [themes.ts](C:\Users\Niki\Documents\model\app_mobile\rentaMovil\src\theme\themes.ts:3)

### PALETA DEL PROYECTO — TEMA PRINCIPAL / CLARO

| Rol | HEX | Uso |
|---|---|---|
| Primary | `#217D47` | `--primary`, navbar y botones en `:root.light` |
| Secondary | `#E7D351` | `--accent` |
| Background | `#F5F7FA` | Fondo global |
| Surface | `#FFFFFF` | Tarjetas, modales |
| Text | `#0A0A0A` | Texto principal |
| Text secondary | `#37474F` / `#9CA3AF` | Títulos y placeholder |
| Botones | `#217D47` | Acción principal |
| Warning | No definido | No hay token global de advertencia |
| Error | No definido globalmente; `#EF4444` hardcodeado en reserva | Errores de input |
| Info | No definido | No hay token global de información |

### PALETA DEL PROYECTO — TEMA OSCURO

| Rol | HEX | Uso |
|---|---|---|
| Primary | `#2D7FF9` | `--primary` |
| Secondary | `#00C853` | `--accent` y `--button` |
| Background | `#020617` | Fondo |
| Surface | `#0F172A` | Tarjetas, navbar y modales |
| Text | `#FFFFFF` | Texto principal |
| Text secondary | `#AEB1B3` | Títulos / secundarios |
| Botones | `#00C853` | Acción principal |
| Warning | No definido | — |
| Error | No definido globalmente | — |
| Info | No definido | — |

### Colores hardcodeados representativos

| Valor | Uso identificado |
|---|---|
| `#F8FAFC`, `#0F172A`, `#64748B` | Catálogo de Inicio |
| `#00C853` | Borde de tarjetas de vehículo y sombras/hover |
| `#EF4444` | Error de Reserva |
| `#F59E0B` | Estado mantenimiento de inventario |
| `#1D4ED8` | Filtro/estado y tema `skylight` |
| `#C62828`, `#DC2626`, `#EF4444` | Errores en tema móvil |
| `#1A2E4A`, `#F1EFE8` | Pantallas móviles de login/menú, fuera del tema común |
| `#1A1F71`, `#EB001B`, `#F79E1B`, `#FF5F00`, `#2E77BC` | SVG de marcas de tarjetas; uso de marca, no UI base |

### 2.3 Consistencia de color

- 🟢 Las superficies, bordes y texto de buena parte de la web usan variables CSS.
- 🔴 Inicio fuerza `#F8FAFC`, `#FFFFFF`, `#0F172A` y `#64748B`, evitando el tema.
- 🔴 Hay tonos verdes con funciones equivalentes: `#217D47`, `#00C853`, `#4B9835`, `#218B4D`, `#00A844`, `#10B981`, `#16A34A`.
- 🔴 El proyecto no define tokens globales consistentes para `warning`, `error` e `info`.
- 🟡 Móvil tiene tokens por tema, pero algunas pantallas usan hardcodes y nombres de propiedades que no coinciden con el objeto de `themes.ts` (`textSecondary`, `cardSecondary`, `successSurface`, `overlay`, `shadow`).
- 🔴 El tema móvil `dark` contradice su nombre visualmente.

### 2.4 Contraste y legibilidad

- Texto blanco sobre `#217D47`, `#00C853` y `#0F172A`: combinación generalmente legible, pero debe verificarse cada estado porque no existe una política de contraste ni tokens de estados.
- `--placeholder #9CA3AF` sobre fondo blanco se usa también como color de contenido/labels en Reserva y Pago; puede ser demasiado tenue para información persistente.
- El footer usa texto `#CBD5F5` y blanco sobre el color de navbar: razonablemente diferenciable, pero no comparte el token de texto secundario.
- En oscuro, `--text-h #AEB1B3` sobre `#020617` es legible en principio; el riesgo real está en colores hardcodeados claros que no se adaptan.
- En Inicio compiten verde de CTA, amarillo de acento, fondo slate y, según tema, azul de configuración alternativa. Sí hay zonas donde varios colores fuertes compiten, especialmente navegación, iconos, CTA y elementos de estado.

## 3. Componentes y elementos UI

### 3.1 Botones

No existe un componente web único para botones. Se encontraron variantes en tarjetas de vehículo, filtros, reserva, pago, formularios y `buttonBack`.

| Variante | Rasgos |
|---|---|
| Primario web | `var(--button)`, texto `var(--text-btn)`, radios de 8–10 px; Pago usa 45 px de alto y Poppins 15/700 |
| Secundario | “Limpiar filtros”: transparente, borde 1.5 px `var(--button)` |
| Navegación | Iconos y links en navbar; botón menú de 24 px |
| Volver | Fondo transparente, radio 8 px, 20 px; usa `transform: translate(-820px, 10px)` |
| Disabled | Pago: opacidad 0.6 y cursor no permitido |
| Mobile compartido | `ContinueButton`: 16 px vertical, radio 14 px, texto 16/700 |

Los estados hover son incompletos: algunos componentes los implementan, otros solamente tienen `:active`, y no hay un patrón general visible de `:focus-visible`. El desplazamiento rígido del botón de retorno es frágil y puede romper la composición responsive. [buttonBack.css](C:\Users\Niki\Documents\model\web\Front-end\src\shared\components\buttonBack.css:1)

### 3.2 Imágenes

- Vehículos: imágenes en tarjetas con `object-fit: contain`; preserva el vehículo, aunque puede dejar espacio visual desigual.
- Banner Inicio: `img1.png`, `img2.jpg`, `img3.webp`, con `object-fit: cover`, mínimo de 420 px; se oculta en tablet/móvil.
- Reserva: la imagen del vehículo es responsiva, ancho completo y `object-fit: cover`.
- Pago: existe `MapaNeivaPago.png`; el CSS prevé `.pay-map-img` de 240 px, aunque la pantalla actual renderiza una línea de ubicaciones, no dicha imagen.
- Identidad: `logo.png`, `icon.png`, `carro.png`; no se encontró un sistema documentado de proporciones o tratamiento común para todos los recursos.

### 3.3 Iconografía

- Web: `react-icons` con conjuntos Font Awesome, Font Awesome 6, Material Design, Feather, Ant Design, Bootstrap, Typicons, Line Awesome e IcoMoon.
- Móvil: `@expo/vector-icons/FontAwesome`.
- Mapa: Leaflet y marcadores propios.
- Marcas de pago: SVG inline, con Arial.

La biblioteca central es `react-icons`, pero la mezcla de familias produce iconos sólidos, lineales y de estilos distintos en una misma aplicación. No existe un token unificado de tamaños o un set restringido para la interfaz.

### 3.4 Ilustraciones y recursos gráficos

Hay fotografías de vehículos, imágenes de login/banner, logos, un mapa raster y SVG de medios de pago. El estilo es principalmente fotográfico/utilitario; no hay un sistema propio de ilustraciones vectoriales ni una librería de fondos decorativos. Las sombras son frecuentes, pero no están tokenizadas en web; móvil sí tiene un helper de sombra. [shadows.ts](C:\Users\Niki\Documents\model\app_mobile\rentaMovil\src\theme\constants\shadows.ts:1)

## 4. Análisis por pantalla

## Pantalla 1 — Inicio / catálogo

### Tipografía

Tiene base global, Poppins en acciones de filtro y títulos/tarjetas con tamaños distintos. No presenta un título H1 de pantalla.

### Color

El catálogo mezcla los tokens con hardcodes slate (`#F8FAFC`, `#0F172A`, `#64748B`). Eso afecta la adaptación del tema.

### Botones

Los filtros móviles y el CTA de filtrado comparten verde y Poppins; el botón “Limpiar filtros” es secundario coherente en intención, pero no pertenece a un componente reutilizable.

### Imágenes

Banner a 420 px en escritorio y oculto en pantallas medianas/móviles. Las imágenes de vehículo usan `contain`, adecuado para producto.

### Iconografía

Predominan Font Awesome para búsqueda, menú y filtros. Se combina con los iconos de pasos y mapa.

### Problemas encontrados

- No hay H1 de contenido.
- Colores hardcodeados impiden coherencia de tema.
- Los tamaños de texto llegan a 10–12 px en filtros/beneficios.
- Los estilos de tarjeta, filtro y pasos no comparten un sistema de espaciado o tipografía único.

### Estado general

🟡 Necesita revisión.

## Pantalla 2 — Reserva

### Tipografía

Inputs y selects usan Poppins de 16 px; etiquetas, resumen y títulos dependen en gran medida de estilos heredados. No hay título de pantalla jerarquizado.

### Color

Tarjetas y controles emplean tokens correctamente en la mayoría de casos. El error usa `#EF4444` fuera del sistema global.

### Botones

El CTA de resumen toma `var(--button)`. En móvil aparece un botón de filtros de 14/600. No hay especificación global de focus.

### Imágenes

La tarjeta de vehículo usa imagen fluida, radio 10 px y `cover`; el mapa se muestra junto a sucursales en escritorio y se oculta junto con `card-location` a menos de 992 px.

### Iconografía

Marcadores de ubicación de Font Awesome y mapa Leaflet. Son semánticamente claros, aunque pertenecen a estilos visuales diferentes.

### Problemas encontrados

- La ubicación/mapa se elimina en layout móvil en lugar de ofrecer una alternativa visible.
- Falta un H1/H2 de contexto.
- Color de placeholder usado como color de input/contenido.
- Error hardcodeado y sin token común.

### Estado general

🟡 Necesita revisión.

## Pantalla 3 — Pago

### Tipografía

Es la pantalla con mayor jerarquía: título de 26/800, subtítulo de 14 px, totales de 22/800 y CTA 15/700. Aun así, mezcla fuente global con Poppins.

### Color

Usa correctamente fondo, tarjeta, borde, navbar y botón mediante variables. Las marcas de pago se representan con sus colores propios, justificados por marca.

### Botones

El CTA principal tiene disabled, hover y active; es el patrón web más completo. Las opciones de pago son botones visuales con radio propio.

### Imágenes

No hay imagen visible en el render actual; el CSS conserva soporte para un mapa raster.

### Iconografía

No depende de iconos de biblioteca en el núcleo de pago; usa radios y SVG de tarjetas.

### Problemas encontrados

- Valores de precio, fechas y contenido de resumen están hardcodeados.
- El botón de retorno usa posicionamiento por transformación fija.
- El hover de opción de pago es blanco translúcido y resulta poco perceptible en tema claro.
- La información de ubicación no usa el recurso de mapa que el CSS contempla.

### Estado general

🟡 Necesita revisión.

## 5. Hallazgos generales

| Nº | Hallazgo | Categoría | Severidad | Ubicación | Recomendación |
|---:|---|---|---|---|---|
| 1 | Poppins y Plus Jakarta Sans no tienen carga identificable | Tipografía | 🔴 | CSS web | Importar/autohospedar las fuentes o eliminar sus referencias |
| 2 | Varias familias para las mismas funciones | Tipografía | 🔴 | Web, especialmente admin y tarjetas | Definir una familia UI y una alternativa justificada |
| 3 | No existe un H1 visible en Inicio ni Reserva | Jerarquía | 🟡 | `Home.jsx`, `Reservation.jsx` | Añadir título de página semántico y visual |
| 4 | Escala web dispersa de 9 a 56 px | Tipografía | 🟡 | CSS de features | Crear tokens tipográficos y migrar gradualmente |
| 5 | Inicio usa colores fuera de tokens | Color | 🔴 | `Home.css` | Sustituir `#F8FAFC`, `#0F172A`, `#64748B` por variables |
| 6 | Estados warning/info no están definidos globalmente | Color/UI | 🔴 | `index.css`, temas móviles | Crear tokens semánticos para estados |
| 7 | Existen muchos verdes para acciones similares | Color | 🔴 | Web y móvil | Consolidar un verde de acción por tema |
| 8 | Tema móvil `dark` usa fondo claro | Color | 🟡 | `themes.ts` | Renombrarlo o definir un dark real |
| 9 | Propiedades de color móvil usadas pero no definidas en el tema base | Mantenibilidad | 🔴 | Estilos móviles vs. `themes.ts` | Completar y tipar el contrato de tokens |
| 10 | No hay sistema único de botones web | UI | 🔴 | Features y shared | Crear botón primario/secundario/destructivo compartido |
| 11 | `buttonBack` usa desplazamiento fijo de −820 px | Responsive | 🔴 | `buttonBack.css` | Posicionarlo con layout flex/grid, no con transform fijo |
| 12 | Mezcla amplia de familias de iconos | Iconografía | 🟡 | Web | Restringir a un set principal y tamaños tokenizados |
| 13 | Texto de 9–10 px presente en módulos | Legibilidad | 🔴 | Historial e inventario admin | Subir texto funcional a mínimo 12 px |
| 14 | Codificación visible corrupta en cadenas/comentarios | Contenido/UI | 🟡 | JSX/CSS varios | Normalizar archivos a UTF-8 sin BOM y traducciones |

## 6. Recomendaciones

### Alta prioridad

- Cargar realmente Poppins/Plus Jakarta Sans o eliminar las declaraciones. Hoy la apariencia depende del fallback del dispositivo.
- Definir tokens semánticos compartidos para `success`, `warning`, `error`, `info`, `surface`, `textSecondary`, `overlay` y `shadow`; alinear web y móvil.
- Corregir el contrato de colores móvil: varios estilos invocan claves que no aparecen en `themes.ts`.
- Sustituir colores hardcodeados de Inicio y estados por variables.
- Reemplazar el posicionamiento fijo del botón Back por una estructura de cabecera responsive.
- Crear un componente web de botón con variantes primario, secundario, destructivo, disabled y focus visible.

### Media prioridad

- Adoptar una única familia UI, con Poppins o una fuente del sistema; reservar mono solo para código.
- Implementar tokens tipográficos y una escala mínima de 12 px.
- Añadir H1 por pantalla y normalizar H2/H3.
- Definir una biblioteca de iconos principal —por ejemplo Font Awesome/FA6— y usar las demás solo cuando haya justificación.
- Ofrecer mapa/ubicación alternativo en móvil dentro de Reserva.

### Baja prioridad

- Centralizar sombras y radios para web, como ya ocurre parcialmente en móvil.
- Documentar las proporciones de banners, vehículos y logos.
- Convertir los elementos de pago/estado en componentes reutilizables.
- Revisar los colores del footer y placeholders con pruebas WCAG en cada tema.

## 7. Sistema visual propuesto

### Sistema actual

**Tipografía**

- Principal web: `system-ui, Segoe UI, Roboto, sans-serif`.
- Secundarias: Poppins, Plus Jakarta Sans, Franklin Gothic, Arial.
- Móvil: fuente de sistema.
- Escala: no centralizada en web; móvil declara 12–30 px.

**Colores**

- Claro: verde `#217D47`, amarillo `#E7D351`, fondo `#F5F7FA`, superficie blanca.
- Oscuro: azul `#2D7FF9`, verde `#00C853`, fondo `#020617`, superficie `#0F172A`.
- Estados: error/advertencia/información no unificados.

**Componentes**

- Botones y cards implementados por feature.
- Radios predominantes: 8, 10, 12, 14, 16, 24 y 999 px.
- Iconos: varias familias.
- Inputs: principalmente Poppins 16 px con radio 8 px.

### Sistema recomendado

**Tipografía**

- Familia principal: una sola familia garantizada (`Poppins` cargada de forma explícita, o fuente de sistema).
- H1: 32 px / 700.
- H2: 24 px / 700.
- H3: 20 px / 600.
- Body: 16 px / 400, line-height 1.5.
- Caption: 12 px / 400, line-height 1.4.
- Botones: 14–16 px / 600.

**Colores**

- Primary: conservar un único verde por tema (`#217D47` en claro como punto de partida).
- Secondary: conservar `#E7D351` únicamente para acentos no críticos.
- Background: `#F5F7FA` claro / `#020617` oscuro.
- Surface: `#FFFFFF` claro / `#0F172A` oscuro.
- Text: `#0A0A0A` claro / `#FFFFFF` oscuro.
- Text secondary: token propio, distinto de placeholder.
- Warning, Error e Info: definirlos explícitamente antes de utilizarlos.

**Componentes**

- Botón primario: color primary, texto contrastado, radio 10–12 px, estados hover/active/disabled/focus.
- Botón secundario: transparente, borde primary.
- Card: superficie, borde único y sombra tokenizada; radios 12–16 px.
- Input: 16 px, etiqueta persistente, foco con token primary y error semántico.
- Modal: overlay tokenizado, superficie, radio 16–24 px.
- Badge: tokens por estado.
- Iconos: un set principal, 16/20/24 px como tamaños estándar.

## 8. Conclusión

RentaMovil tiene una base visual aprovechable: variables CSS web, temas móviles, componentes compartidos, layouts responsive y una estructura Feature First clara. Pago es la pantalla web más cohesionada; las tarjetas, controles y recursos fotográficos también tienen una base funcional sólida.

La consistencia general es **media**. Los problemas más relevantes son la falta de fuentes realmente cargadas, la dispersión tipográfica, los colores hardcodeados, la ausencia de tokens semánticos de estado, el desacople entre contrato de tema móvil y estilos que lo consumen, y la inexistencia de componentes web de botón/entrada unificados.

La prioridad debe ser consolidar tokens de color y tipografía, corregir el contrato de temas móvil, cargar o simplificar fuentes y construir componentes compartidos. Con esas medidas, el proyecto quedaría bien preparado para sostener una identidad visual consistente entre web y móvil.