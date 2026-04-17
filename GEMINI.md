# 🏝️ Island Jam Copilot 2026

**The Ultimate Multimodal Assistant for High-Performance Game Jam Teams.**

Este proyecto es una herramienta de productividad diseñada específicamente para la **Gran Canaria Game Island Jam 2026**. Su objetivo es mitigar el bloqueo creativo y optimizar el flujo de trabajo durante el "crunch" de 48 horas sin sustituir el talento humano.

---

## 🛠️ Tecnologías

| Componente | Tecnología |
|------------|------------|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS 4 + Vanilla CSS |
| IA | Gemini 3.0 Flash (Multimodal) |
| Animaciones | Framer Motion |
| Iconos | Lucide React |

---

## 📁 Estructura del Proyecto

- `src/app/`: Rutas y lógica de páginas.
- `src/app/api/`: Endpoints para integración con Gemini.
- `src/components/ui/`: Componentes visuales reutilizables y atómicos.
- `design-system/`: Definiciones de branding y guías de estilo (Neon Island Aesthetic).

---

## 🧭 Roadmap de Desarrollo

- [x] **MVP Core:** Dashboard, Countdown y Brainstorming básico.
- [x] **Design Alignment:** Adaptación visual al branding oficial (Magenta/Cyan/Lime).
- [ ] **Feature Expansion:** Implementación de las [20 nuevas funcionalidades](./docs/TODO.md) propuestas para Jammers.
- [ ] **Offline Mode:** Cache local para momentos de mala conexión en el CDTIC.

---

## 🧬 Guía de Estilo Agéntica

### 1. Zero Tolerance for "any"
Todo el código debe estar estrictamente tipado. No se permiten hacks de tipos.

### 2. Neon-Island Aesthetic
- **Fondo:** `#0B1E4D` (Abyss Blue).
- **Acentos:** Neon Magenta (`#E52E8A`), Cyan (`#00B5E2`), Lime (`#8DC63F`).
- **Fuentes:** `Orbitron` para headings, `JetBrains Mono` para cuerpo.

### 3. Workflow de Validación
Cada cambio debe ser validado con:
1. `bun x tsc --noEmit`
2. Revisión de contraste (4.5:1 min).
3. Verificación de responsividad (Mobile first).

---

## 📋 Índice de Documentación
- [Design System Master](./design-system/island-jam-copilot/MASTER.md)
- [Feature Tracking](./docs/TODO.md) (To be created)
