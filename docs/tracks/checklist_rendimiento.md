# Track: Checklist de Rendimiento

## 📝 Descripción
Implementación de una utilidad para ayudar a los jammers a optimizar sus juegos, especialmente para builds Web/HTML5, antes de la entrega final.

## 🛠️ Implementación
- **API:** `src/app/api/checklist-rendimiento/route.ts`
  - Utiliza Gemini 3.0 Flash para generar un plan de optimización basado en el motor y problemas específicos.
  - Salida estructurada en JSON con prioridades.
- **Frontend:** `src/app/checklist-rendimiento/page.tsx`
  - Formulario para seleccionar motor y describir problemas.
  - Visualización de tareas con checkboxes y prioridades por color.
  - Estética Neon Island integrada.
- **Dashboard:** Integrado en la FASE 3: TÉCNICO.

## ✅ Verificación Realizada
1.  [x] Endpoint API responde con JSON estructurado.
2.  [x] Página frontend carga correctamente y se comunica con la API.
3.  [x] Diseño responsivo y alineado con el branding.
4.  [x] Icono `Gauge` añadido al dashboard.

## 📅 Fecha
2026-XX-XX (Simulado para la Jam)
