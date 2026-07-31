# The Engineering Times — Abhijeet Kadu

Editorial-style developer portfolio. A single-page newspaper layout with GSAP motion and Lenis smooth scrolling.

## Tech

- **HTML / CSS / JS** — static site, no build step
- **GSAP + ScrollTrigger** — masthead and scroll animations
- **Lenis** — smooth scroll

## Run locally

Open `index.html` in a browser, or use a local server:

```bash
npm run dev
```

Then visit [http://localhost:3000](http://localhost:3000) (or the port shown by `serve`).

## Structure

```
├── index.html              # Page structure & editorial content
├── style.css               # Newsprint design system & typography
├── main.js                 # GSAP animations, Lenis scroll & interactive modules
├── halftone_ats_chart.png  # SmartResume architecture diagram
└── halftone_rag.png        # RAG System architecture graphic
```

## Deploy

Deploy the repo root to any static host (Vercel, Netlify, GitHub Pages). No build command required.
