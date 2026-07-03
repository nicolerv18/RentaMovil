**Arquitectura Frontend — Resumen**
Uso arquitectura _Component-driven_ combinada con organización _Feature-based_ (organizar por funcionalidades/páginas). Esta aproximación agrupa todo lo relacionado con una funcionalidad (componentes, hooks, estilos, servicios, tests), lo que mejora la mantenibilidad, la escalabilidad y la colaboración.

**explicacion de como se implementa y directorios:**

*assets/:* Contiene imágenes, fuentes y archivos estáticos. Mantenerlos organizados facilita su gestión y uso en la aplicación.

*features/:* Cada carpeta representa una funcionalidad o pagina. dentro de cada feature se encuentran los componentes especificos de esa funcionalida , los *hooks/:* que se encargan de la logica de negocio sirve para traer datos o manejar estados relacionados con esa funcionalidad, *services/:* para las llamadas a la API específicas de esa feature y *pages/:* para los componentes de página que componen la UI de esa funcionalidad.

**shared/:**sirva para componentes, hooks y utilidades que son compartidos entre varias features, evitando la duplicación de código y promoviendo la reutilización.

**state/:** Contiene los context providers o la configuración de la store para el estado global de la aplicación, como la autenticación o el tema. Esto centraliza el manejo del estado compartido y facilita su acceso desde cualquier parte de la aplicación manteniendo la consistencia del estado por ejemplo para los roles de usuario.

**services/:** Contiene el cliente HTTP central (como una instancia de axios) y utilidades relacionadas con las llamadas a la API. Esto permite configurar aspectos como la baseURL, los interceptores y el manejo de errores en un solo lugar.


arquitectura feature-based profesional








====------------------------====
<============Tareas============>
====------------------------====
- refactorizar registrar nuevo mantenimiento.

- ajustar traduciones en contract hystory .

-verificar que todo este traducido.

MOVILLL.
====------------------------====



