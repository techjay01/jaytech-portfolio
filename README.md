# Joshua Mbamara - Interactive Developer Portfolio

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://jaytech-portfolio-svelte.vercel.app/)
[![Built with SvelteKit](https://img.shields.io/badge/built%20with-SvelteKit-FF3E00?logo=svelte)](https://kit.svelte.dev)
[![Styled with Tailwind](https://img.shields.io/badge/styled%20with-Tailwind-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

A highly interactive, visually immersive developer portfolio built with SvelteKit 5, Three.js, GSAP, and Tailwind CSS — designed to feel like an experience, not just a page.

---

## Project Overview

- **Immersive 3D Background**: Three.js floating geometric shapes with mouse-reactive camera
- **Command Palette**: CMD+K spotlight for keyboard-driven navigation
- **AI Portfolio Assistant**: Groq-powered chatbot that answers questions about Joshua
- **Animated Timeline**: GSAP ScrollTrigger journey from 2015–2026
- **Project Modals**: Expandable cards with images, descriptions, and live links
- **Theme Switcher**: Dark/light cyberpunk modes with localStorage persistence
- **Functional Contact Form**: EmailJS integration with validation and error handling

---

## Features

### Core ✅

| Feature | Implementation |
|---|---|
| SvelteKit | Svelte 5 runes (`$state`, `$derived`, `$effect`), TypeScript |
| Hero | GSAP entrance timeline, typing animation, social links, CV download |
| Projects | Filter tabs, expandable modals, images, live demo + GitHub links |
| Animations | GSAP ScrollTrigger, CSS transitions, Intersection Observer |
| Responsive | Mobile-first, custom `nav` breakpoint at 900px, hamburger menu |
| Performance | Lazy loading, Three.js dynamic import, particle limit, image compression |
| Accessibility | Semantic HTML, ARIA labels, skip nav link, focus states, `prefers-reduced-motion` |
| Contact | EmailJS integration, client-side validation, error/success states, input sanitization |
| Theme | Dark/light toggle, localStorage persistence |

### Creative Features

1. **3D / WebGL** — Three.js particle system: 30 wireframe geometries reacting to mouse
2. **Command Palette** — CMD+K navigation with keyboard arrows, search, and execute
3. **AI Integration** — Groq LLM assistant (llama-3.1-8b-instant) trained on Joshua's resume
4. **Cinematic Storytelling** — GSAP ScrollTrigger alternating timeline, scroll-driven reveals

---

## Architecture

```
src/
├── lib/components/
│   ├── About.svelte          # Bio + GSAP animated timeline
│   ├── AIAssistant.svelte    # Floating Groq-powered chatbot
│   ├── CommandPalette.svelte # CMD+K spotlight
│   ├── Contact.svelte        # EmailJS form with validation
│   ├── Hero.svelte           # GSAP entrance, typing animation
│   ├── Navigation.svelte     # Sticky nav, theme toggle, hamburger
│   ├── ParticleBackground.svelte # Three.js 3D scene
│   ├── Projects.svelte       # Filterable grid with modals
│   └── Skills.svelte         # Animated skill bars
├── routes/
│   ├── api/chat/+server.ts   # Groq API server route
│   ├── +layout.svelte        # Root shell, skip nav, AI assistant
│   └── +page.svelte          # Page composition
├── app.css                   # Global styles, focus states, reduced motion
└── app.html
```

---

## Design Decisions

### Animation Strategy
- **Hero**: GSAP timeline — title → name → typing → description → CTA → socials (staggered 0.3s)
- **Sections**: GSAP ScrollTrigger — slides in from left/right at 80% viewport
- **Timeline**: Each item triggered independently as it enters view
- **Consistency**: 300ms transitions, `power3.out` easing throughout

### Color Palette
| Token | Value | Use |
|---|---|---|
| Neon Blue | `#00d9ff` | Primary accent |
| Neon Green | `#00ff9f` | Success, highlights |
| Neon Purple | `#b400ff` | Secondary accent |
| Dark 900 | `#0a0a0f` | Base background |

### Typography
- **Orbitron**: Display headings — futuristic, geometric
- **JetBrains Mono**: Code blocks, labels — developer aesthetic
- **Inter Variable**: Body text — readable, modern

---

## Performance Optimization

1. **Three.js**: Dynamic import — loads after first paint, not in critical path
2. **Images**: `loading="lazy"` with explicit `width`/`height` to prevent CLS
3. **Particles**: Hard-capped at 30, `pixelRatio` clamped to 2
4. **Animations**: RAF-based loop, cleanup on unmount, `prefers-reduced-motion` respected
5. **Bundle**: Vite tree-shaking, route-level splitting via SvelteKit

---

## Accessibility

- Skip navigation link (visible on Tab)
- `:focus-visible` outline on all interactive elements
- Semantic HTML — `<nav>`, `<section>`, `<dialog>`, `<main id="main-content">`
- ARIA labels on all icon-only buttons
- `prefers-reduced-motion` — disables all animations via CSS media query
- Keyboard navigation — Command palette, modals, and nav fully keyboard-operable

---

## Setup

### Prerequisites
- Node.js 18+

### Install

```bash
git clone https://github.com/techjay01/jaytech-portfolio.git
cd jaytech-portfolio
npm install
npm run dev
```

### Environment Variables

Create `.env` in the project root:

```
PUBLIC_EMAILJS_SERVICE_ID=your_service_id
PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
GROQ_API_KEY=your_groq_key
```

- EmailJS values from [emailjs.com](https://emailjs.com)
- Groq key from [console.groq.com](https://console.groq.com)
- Add all four to **Vercel → Project Settings → Environment Variables**

---

## Trade-offs

| Decision | Reason |
|---|---|
| Three.js dynamic import | Keeps initial bundle lean; loads after first paint |
| Groq over Anthropic API | Free tier; fast inference for portfolio chat |
| CSS class-based light theme | Avoids full Tailwind dark-mode refactor; simpler toggle |
| 30 particle limit | Maintains 60fps on mid-range devices |
| No backend DB | Static portfolio; no persistence needed |

---

## Author

**Joshua Mbamara (Jay~Tech)**
- GitHub: [@techjay01](https://github.com/techjay01)
- LinkedIn: [jaytech01](https://www.linkedin.com/in/jaytech01)
- Twitter: [@techjay01](https://x.com/techjay01)
- Email: techjay2023@gmail.com

---

*Built by Jay Tech*