# Auditoría UX/UI — Aplicación Mis notas

**Objetivo:** detectar problemas de uso y documentar cómo el rediseño facilita crear, encontrar y eliminar notas. La evaluación inicial descrita abajo corresponde a una versión sencilla de notas sin mejoras; reemplaza las capturas de ejemplo por capturas reales de tu aplicación antes y después.

## Cinco heurísticas de Nielsen

| Heurística | Problema de la versión original | Solución aplicada en el rediseño |
|---|---|---|
| Visibilidad del estado del sistema | Al guardar o eliminar una nota no se indicaba claramente qué había ocurrido. | Se muestra un mensaje después de agregar, filtrar, cancelar o eliminar una nota. |
| Coincidencia entre el sistema y el mundo real | Los controles podían tener nombres poco claros y no explicar qué información se debía escribir. | Se usan palabras comunes, etiquetas visibles y botones como “Agregar nota” y “Eliminar nota”. |
| Control y libertad del usuario | Una eliminación podía ser accidental y no había forma clara de volver atrás. | Se solicita confirmación y se ofrece “Deshacer eliminación”. |
| Prevención de errores | Era posible guardar una nota vacía o con espacios. | Se comprueba el título y el contenido después de aplicar `trim()` y se enfoca el campo que falta. |
| Reconocimiento en lugar de recuerdo | Sin etiquetas permanentes ni agrupación, el usuario debía recordar el propósito de los controles. | Cada campo tiene `label`; las notas muestran su categoría y existe un filtro visible. |

## Leyes de usabilidad

- **Ley de Fitts:** el botón “Agregar nota” ocupa todo el ancho disponible y tiene al menos 44 px de alto, por lo que es más fácil de localizar y pulsar.
- **Ley de Hick:** el filtro permite mostrar “Todas” o una categoría concreta (Personal, Estudios o Trabajo), reduciendo las notas que hay que revisar.
- **Ley de Miller:** el formulario separa título, contenido y categoría en campos cortos y relacionados; así la tarea se divide en partes fáciles de comprender.

## Cambios visuales y accesibilidad

- Las propiedades de color están centralizadas en `:root`.
- La página tiene un único `h1` y una jerarquía clara con encabezados secundarios.
- Se utiliza espaciado consistente de 8, 16 y 24 px.
- Cada campo tiene una etiqueta `label` relacionada con su `id`.
- El foco de teclado se distingue mediante `:focus-visible`.
- Los campos y botones tienen una altura mínima de 44 px.
- Se emplean colores de texto oscuros sobre fondos claros para favorecer el contraste.
- La interfaz se adapta a pantallas estrechas.

## Pruebas que se deben ejecutar

1. Intentar agregar una nota sin título ni contenido: debe impedirse y mostrarse un mensaje.
2. Agregar una nota completa: debe aparecer en la lista y mostrarse “Nota agregada correctamente”.
3. Filtrar por categoría: deben mostrarse solo las notas de esa categoría y un mensaje de confirmación.
4. Eliminar una nota y pulsar Cancelar: la nota debe conservarse.
5. Eliminar una nota y confirmar: debe aparecer la opción “Deshacer eliminación”.
6. Recorrer todos los controles con `Tab` y activar botones con `Enter` o barra espaciadora.
7. Ejecutar Lighthouse en Chrome/Edge, seleccionar Accessibility y guardar una captura del resultado real.

## Capturas requeridas para la entrega

### Antes del rediseño
Pega aquí una captura real de la versión original de tu app-notas del Laboratorio 05. No se incluye una captura porque no se adjuntó el proyecto original.

### Después del rediseño
Pega aquí una captura de la aplicación abierta en el navegador, con algunas notas de ejemplo.

### Lighthouse
Pega aquí la captura del puntaje de accesibilidad obtenido en tu navegador. No se afirma un puntaje de 90 o más hasta que se ejecute la auditoría real.

### Auditoría publicada
Pega aquí una captura de este archivo renderizado en GitHub.

## Resultado y limitaciones

El código implementa los cambios descritos y está preparado para probarse localmente. El resultado de Lighthouse, las capturas, los commits publicados y la URL activa de GitHub Pages deben verificarse después de subir el proyecto a la cuenta. Las notas se guardan solo durante la sesión de la página y no se conservan al recargar.
