# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Always Do First
- **Invoke the `frontend-design` skill** (defined in [frontend_design_skill.md](frontend_design_skill.md)) before writing any frontend code, every session, no exceptions.

## Project Overview

Static website for the Lynk Youth Initiative (lynkyouth.org), a youth-led nonprofit. Hosted on GitHub Pages from the `main` branch — pushing to main deploys automatically.

## Development

No build step. Open any `.html` file directly in a browser to preview locally. For live reloading, use any static file server:

```bash
python3 -m http.server 8080
```

## Architecture

All pages share a single `styles.css`. The site has no JavaScript framework — interactivity (e.g., member profile modals) is implemented with vanilla JS inline in the HTML files.

**Pages:** `index.html` (home), `about.html` (team/profiles), `projects.html` (projects listing). The nav references `donate.html` and `contact.html` which do not yet exist.

**Images** live in `images/`. Member photos `member2.jpg` and `member3.jpg` are referenced in `about.html` but not yet added.

## Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color

