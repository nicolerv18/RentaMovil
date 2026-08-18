# Cambios pendientes en el SRS

Checklist de lo que hay que actualizar en `SRS.docx` para que quede alineado con el MER actual (`Mer.puml` / `MerEspañol.puml`) y con lo que ya está construido en el front-end y el backend.

## A. Errores internos del documento (no dependen de cambios de diseño)

- [ ] **Falta RF5 completo.** La numeración salta de RF4 a RF6 sin ninguna nota. Revisar si se perdió un requisito o quedó mal renumerado.
- [ ] **RF2 incompleto en el resumen (3.2.2).** Solo lista `ERF2.3 Eliminar vehículo` y `ERF2.4 Consultar disponibles`, pero más abajo sí existen las fichas detalladas `RF 2.1 Registrar vehículo` y `RF 2.2 Consultar estado de disponibilidad`. Agregarlas al resumen.
- [ ] **`ERF6.3` duplicado.** Se usa tanto para "Editar mantenimiento" como para "Eliminar mantenimiento". Renumerar uno de los dos.

## B. Funcionalidad ya modelada/construida que el SRS no menciona

- [ ] **Conductor como entidad separada del cliente.** Agregar RF/criterios sobre validar licencia de conducir (número, fecha de vencimiento) y sobre asignar un conductor distinto al cliente en la reserva/contrato.
- [ ] **Tipo_Seguro y su impacto en el precio.** Se mantiene en el MER (`subtotal_seguro` en Reserva) pero no hay ningún RF sobre selección de cobertura/seguro al reservar. Agregar RF o sub-requisito dentro de RF4.
- [ ] **Firma digital y generación de PDF del contrato.** El modelo ya tiene `estado_firma`, `fecha_firma`, `ip_firmante`, `url_pdf_contrato`, y el front ya tiene el feature `Contract`/`ContractHistory`. RF3 solo dice "crear/consultar/finalizar contrato"; agregar el flujo de firma electrónica y generación de PDF.
- [ ] **Roles y permisos granulares.** El modelo soporta `Rol`, `Permiso`, `Rol_Permiso`, pero RF1 solo cubre login/registro/recuperar contraseña. Agregar un RF de "Administrar roles y permisos".
- [ ] **Auditoría.** La entidad `Auditoria`/`Audit` ya existe en el MER y en el backend, pero no hay ningún RF sobre trazabilidad/logs de acciones administrativas. Agregar RF correspondiente.
- [ ] **Dashboards con gráficas ya construidos.** `FleetChartMaintenance`, `MonthlyChart` (en `historyMaintenance/`) y `FleetChart` (en `status/`) no están mencionados en RF2.2 ni en RF6. Decidir si cuelgan de RF9 (Panel Administrativo) o si merecen su propio RF.
- [ ] **Historial de mantenimientos como módulo aparte.** El front ya tiene `historyMaintenance` con filtros, pero RF6 solo cubre registrar/inhabilitar/editar/eliminar. Agregar "Consultar historial de mantenimientos".

## C. Pago vs. Contrato (decisión ya tomada: pago completo va en la Reserva, el Contrato es solo legal)

El modelo (`Contrato` sin campos de costo, `Pago` enlazado a `Reserva`) ya refleja esto. Falta corregir el texto:

- [ ] **RF 3.1 — Crear contrato:**
  - Quitar de "Documentos de visualización asociados": *"Sección para costos, condiciones y observaciones"* → dejar solo condiciones/observaciones, sin costos.
  - Quitar de "Entrada": *"El administrador registra costos, condiciones y observaciones asociadas al contrato"* → el contrato no registra costos.
- [ ] **RF 7.1 — Registrar pago:**
  - Cambiar *"Selección de cliente y contrato asociado"* → *"Selección de cliente y reserva asociada"*.
  - Cambiar *"El administrador selecciona un contrato válido"* → *"...una reserva válida"*.
  - Cambiar *"Actualización automática del saldo pendiente del contrato"* → *"Confirmación del pago total de la reserva"* (ya no hay saldo pendiente: el pago es completo, no parcial).
  - En la Descripción: *"Cada pago deberá vincularse a un contrato existente y actualizar automáticamente el saldo pendiente..."* → *"El pago deberá vincularse a una reserva existente y cubrir su valor total."*
  - En "Manejo de situaciones anormales": *"Si el monto ingresado supera el saldo pendiente..."* → *"Si el monto ingresado no coincide con el valor total de la reserva, el sistema debe rechazar el pago."*
  - En "Criterios de aceptación": *"Todos los pagos deben estar asociados a un contrato existente"* → *"...a una reserva existente"*; eliminar *"El saldo pendiente del contrato debe actualizarse..."* (no aplica); *"Debe conservarse un historial de pagos asociado a cada contrato"* → *"...asociado a cada reserva"*.
- [ ] Dejar explícita la secuencia lógica en la Descripción de RF3.1: **Reserva → Pago completo de la reserva → Contrato (documento legal generado, sin tocar dinero)**.

## D. Ya resuelto, no requiere acción

- [x] `Poliza_Seguro_Flota` se eliminó del MER. Se confirmó que el SRS actual no menciona "póliza" ni "aseguradora" en ningún lado, así que no queda nada huérfano en el documento.

## Pendiente relacionado (fuera del SRS, en el MER)

- [ ] Agregar `numero_documento` a `Persona` para identificación legal del cliente en el contrato (hoy solo `Conductor` lo tiene). Cuando se resuelva, agregar también como criterio de aceptación nuevo en RF3.1.
