# 🤖 Protocolo Maestro: Desarrollo de Features con Subagentes

Este prompt está diseñado para ser entregado a un subagente (Generalist) para que implemente funcionalidades en el proyecto **Island Jam Copilot 2026** manteniendo la integridad técnica y estética.

---

## 📝 El Prompt Maestro (Copiar y Pegar)

> **Contexto del Proyecto:**
> Estás trabajando en "Island Jam Copilot 2026", una herramienta de productividad para Game Jams. 
> - **Stack:** Next.js 16 (App Router), Tailwind CSS 4, Gemini 3.0 Flash.
> - **Diseño:** Estética "Neon Island" (Magenta #E52E8A, Cian #00B5E2, Lima #8DC63F sobre Abyss Blue #0B1E4D).
>
> **Tarea:** Implementar la funcionalidad: **[NOMBRE_DE_LA_FEATURE]**.
>
> **Instrucciones de Implementación:**
> 1. **Backend:** Crear el endpoint en `src/app/api/[ruta]/route.ts` usando el SDK de GoogleGenAI con el modelo `gemini-3-flash-preview`. Usa esquemas JSON estrictos para la respuesta.
> 2. **Frontend:** Crear la página en `src/app/[ruta]/page.tsx`. Debe usar `poster-card`, `glass-panel`, y animaciones de `framer-motion`. Mantener la coherencia con el estilo del cartel oficial (textos gigantes, neones, rejilla geométrica).
> 3. **Integración:** Activar la tarjeta correspondiente en el Dashboard (`src/app/page.tsx`) eliminando cualquier estado de "Próximamente".
>
> **Protocolo de Cierre (OBLIGATORIO):**
> Tu tarea NO finaliza hasta que cumplas estos 4 pasos en orden:
> 1. **Validación Técnica:** Ejecuta `bun x tsc --noEmit`. Si hay errores, DEBES arreglarlos antes de continuar. No se permite el uso de `any`.
> 2. **Documentación:** Actualiza `docs/TODO.md` marcando la tarea como completada y crea un pequeño log en `docs/tracks/[feature_name].md` con los archivos creados/modificados.
> 3. **Git Push:** Ejecuta `git add .`, `git commit -m "feat: implement [feature_name] module"` y `git push`.
> 4. **Resumen Final:** Entrega un reporte de los cambios realizados y confirma que el push ha sido exitoso.
>
> **Restricciones:**
> - Usa iconos de `lucide-react`.
> - Los nombres de la interfaz deben estar en ESPAÑOL y ser claros para jammers.
> - El diseño debe ser responsive (Mobile First).

---

## 💡 Por qué funciona este Workflow:

1.  **Aislamiento de Errores:** Al obligar a pasar el `tsc` antes del push, evitamos que un subagente rompa la build principal.
2.  **Continuidad de Memoria:** El archivo de `track` y el `TODO.md` permiten que el siguiente subagente sepa exactamente qué se ha hecho sin tener que leer todo el historial.
3.  **Consistencia Estética:** Al referenciar los tokens de diseño (`poster-card`, `island-gradient`), todas las páginas nuevas parecen diseñadas por la misma persona.
4.  **Autonomía Total:** El subagente tiene permiso para realizar el ciclo completo (Code -> Test -> Deploy), lo que ahorra turnos de conversación.
